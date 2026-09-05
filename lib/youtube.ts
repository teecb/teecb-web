import "server-only";
import { parseIsoDuration } from "@/lib/dates";
import { youtubeVideoId } from "@/lib/utils";
import type { SiteSettings } from "@/lib/content/types";

/**
 * YouTube Data API integration — deliberately quota-friendly.
 *
 * The church streams every service to YouTube, so the channel *is* the sermon
 * archive. Instead of `search.list` (100 quota units per call) we read the
 * channel's uploads playlist (1 unit) and then `videos.list` (1 unit) for the
 * details. That gives the archive and live status in ~2 units, cached for
 * one minute (≈3,000 units/day worst case), which stays inside the free
 * 10,000-unit daily quota even on a busy Sunday.
 *
 * Environment:
 *   YOUTUBE_API_KEY        server-only key with YouTube Data API v3 enabled
 *   YOUTUBE_CHANNEL_ID     optional `UC…` id (skips the handle lookup)
 *   YOUTUBE_CHANNEL_HANDLE handle without the @ (default: teecb)
 */

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  durationSeconds?: number;
  broadcast: "none" | "live" | "upcoming";
};

export type ChannelFeed = {
  status: "ok" | "unconfigured" | "unavailable";
  /** The broadcast happening right now, if any. */
  live?: Video;
  /** Completed recordings, newest first. */
  videos: Video[];
};

export type LiveStream =
  | { status: "live"; video: Pick<Video, "id" | "title">; source: "youtube" | "manual" }
  | { status: "offline" | "unconfigured" | "unavailable" };

const API = "https://www.googleapis.com/youtube/v3";
const FEED_REVALIDATE = 60;
const VIDEO_REVALIDATE = 3_600;
const CHANNEL_REVALIDATE = 86_400;
/** Uploads shorter than this are clips or Shorts, not services, and are left out of the archive. */
const MIN_RECORDING_SECONDS = 10 * 60;

type Thumbnails = Record<string, { url?: string }>;

type PlaylistItemsResponse = {
  items?: Array<{ contentDetails?: { videoId?: string } }>;
};

type VideosResponse = {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      thumbnails?: Thumbnails;
      liveBroadcastContent?: "none" | "live" | "upcoming";
    };
    contentDetails?: { duration?: string };
    liveStreamingDetails?: { actualStartTime?: string; scheduledStartTime?: string };
    status?: { privacyStatus?: string };
  }>;
};

type ChannelsResponse = { items?: Array<{ id?: string }> };

function apiKey(): string | null {
  return process.env.YOUTUBE_API_KEY?.trim() || null;
}

async function api<T>(path: string, params: Record<string, string>, revalidate: number): Promise<T> {
  const search = new URLSearchParams(params);
  const response = await fetch(`${API}${path}?${search}`, { next: { revalidate } });
  if (!response.ok) throw new Error(`YouTube API ${path} failed: ${response.status}`);
  return response.json() as Promise<T>;
}

async function resolveChannelId(key: string): Promise<string | null> {
  const configured = process.env.YOUTUBE_CHANNEL_ID?.trim();
  if (configured) return configured;

  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE ?? "teecb").trim().replace(/^@/, "");
  if (!handle) return null;

  const data = await api<ChannelsResponse>("/channels", { part: "id", forHandle: `@${handle}`, key }, CHANNEL_REVALIDATE);
  return data.items?.[0]?.id ?? null;
}

function bestThumbnail(thumbnails: Thumbnails | undefined): string {
  return (
    thumbnails?.maxres?.url ??
    thumbnails?.standard?.url ??
    thumbnails?.high?.url ??
    thumbnails?.medium?.url ??
    thumbnails?.default?.url ??
    ""
  );
}

function toVideo(item: NonNullable<VideosResponse["items"]>[number]): Video | null {
  const id = item.id;
  const title = item.snippet?.title;
  if (!id || !title || item.status?.privacyStatus === "private") return null;
  return {
    id,
    title,
    description: item.snippet?.description ?? "",
    publishedAt: item.liveStreamingDetails?.actualStartTime ?? item.snippet?.publishedAt ?? "",
    thumbnailUrl: bestThumbnail(item.snippet?.thumbnails),
    durationSeconds: parseIsoDuration(item.contentDetails?.duration),
    broadcast: item.snippet?.liveBroadcastContent ?? "none",
  };
}

async function fetchVideos(ids: string[], key: string, revalidate: number): Promise<Video[]> {
  if (!ids.length) return [];
  const data = await api<VideosResponse>(
    "/videos",
    { part: "snippet,contentDetails,liveStreamingDetails,status", id: ids.join(","), key },
    revalidate,
  );
  return (data.items ?? []).map(toVideo).filter((v): v is Video => v !== null);
}

/**
 * The channel's recent full-length recordings plus any broadcast that is live right now.
 * Always fetches one full playlist page (50) so every page on the site shares
 * the same cached YouTube responses; `limit` only trims the result.
 */
export async function getChannelFeed(limit = 50): Promise<ChannelFeed> {
  const key = apiKey();
  if (!key) return { status: "unconfigured", videos: [] };

  try {
    const channelId = await resolveChannelId(key);
    if (!channelId) return { status: "unavailable", videos: [] };

    // A channel's uploads playlist id is its channel id with "UC" → "UU".
    const uploadsPlaylistId = channelId.replace(/^UC/, "UU");
    const playlist = await api<PlaylistItemsResponse>(
      "/playlistItems",
      { part: "contentDetails", playlistId: uploadsPlaylistId, maxResults: "50", key },
      FEED_REVALIDATE,
    );
    const ids = (playlist.items ?? []).flatMap((item) => item.contentDetails?.videoId ?? []);
    const all = await fetchVideos(ids, key, FEED_REVALIDATE);

    const live = all.find((v) => v.broadcast === "live");
    const videos = all
      .filter((v) => v.broadcast === "none" && (v.durationSeconds ?? Infinity) >= MIN_RECORDING_SECONDS)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit);

    return { status: "ok", live, videos };
  } catch {
    // Quota exhaustion or an outage must never take the site down.
    return { status: "unavailable", videos: [] };
  }
}

/** A single recording, for the sermon detail page. */
export async function getVideo(id: string): Promise<Video | null> {
  const key = apiKey();
  if (!key || !/^[\w-]{6,}$/.test(id)) return null;
  try {
    const [video] = await fetchVideos([id], key, VIDEO_REVALIDATE);
    return video ?? null;
  } catch {
    return null;
  }
}

/**
 * Live status, honoring the editor override in Site settings. "Force live"
 * is the Sunday fallback when automatic detection misbehaves.
 */
export async function getLiveStream(watch: SiteSettings["watch"], feed?: ChannelFeed): Promise<LiveStream> {
  if (watch.mode === "forceOffline") return { status: "offline" };

  if (watch.mode === "forceLive") {
    const id = youtubeVideoId(watch.liveVideoUrl);
    if (id) return { status: "live", video: { id, title: "Live worship service" }, source: "manual" };
  }

  const resolved = feed ?? (await getChannelFeed(12));
  if (resolved.status !== "ok") return { status: resolved.status };
  return resolved.live
    ? { status: "live", video: { id: resolved.live.id, title: resolved.live.title }, source: "youtube" }
    : { status: "offline" };
}
