import "server-only";
import { cache } from "react";
import * as local from "@/lib/content";
import type {
  AboutPage,
  ChurchEvent,
  HomePage,
  SiteSettings,
  StaffMember,
  StatementOfFaith,
} from "@/lib/content/types";
import { sanityClient } from "@/sanity/lib/client";
import {
  aboutPageQuery,
  eventsQuery,
  homePageQuery,
  siteSettingsQuery,
  staffQuery,
  statementOfFaithQuery,
} from "./queries";

/**
 * Content access for pages.
 *
 * Rule: once the **Site settings** document is published in Sanity, Sanity is
 * the source of truth for everything. Until then the local fallback content
 * in `lib/content` is used, so the site always renders — with no project id,
 * with an empty dataset, or during a Sanity outage.
 */

const REVALIDATE_SECONDS = 60;

async function query<T>(groq: string): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T | null>(groq, {}, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch (error) {
    console.error("[cms] query failed; using local content.", error);
    return null;
  }
}

type RawSite = Partial<SiteSettings> & { watch?: Partial<SiteSettings["watch"]> };

function normalizeSite(raw: RawSite): SiteSettings {
  const base = local.site;
  return {
    ...base,
    ...raw,
    timeZone: raw.timeZone || base.timeZone,
    wordmark: raw.wordmark?.line1 ? { ...base.wordmark, ...raw.wordmark } : base.wordmark,
    address: { ...base.address, ...raw.address },
    contact: { ...base.contact, ...raw.contact },
    services: raw.services?.length ? raw.services : base.services,
    socials: raw.socials ?? [],
    youtube: { ...base.youtube, ...raw.youtube },
    watch: {
      mode: raw.watch?.mode ?? "auto",
      liveStartTime: raw.watch?.liveStartTime ?? base.watch.liveStartTime,
      liveVideoUrl: raw.watch?.liveVideoUrl,
    },
    giving: { ...raw.giving },
    announcement: raw.announcement?.text ? raw.announcement : null,
  };
}

/** Deduplicated per request with React `cache`; the fetch layer handles real caching. */
const loadSite = cache(async () => {
  const raw = await query<RawSite>(siteSettingsQuery);
  return raw ? { site: normalizeSite(raw), fromCms: true } : { site: local.site, fromCms: false };
});

export async function getSite(): Promise<SiteSettings> {
  return (await loadSite()).site;
}

/** True when Sanity holds published content and should be trusted over local files. */
export async function isCmsReady(): Promise<boolean> {
  return (await loadSite()).fromCms;
}

export async function getHome(): Promise<HomePage> {
  if (!(await isCmsReady())) return local.home;
  return (await query<HomePage>(homePageQuery)) ?? local.home;
}

export async function getAbout(): Promise<AboutPage> {
  if (!(await isCmsReady())) return local.about;
  const page = await query<Partial<AboutPage>>(aboutPageQuery);
  return page ? { intro: page.intro ?? local.about.intro, story: page.story ?? local.about.story, values: page.values ?? [] } : local.about;
}

export async function getStatementOfFaith(): Promise<StatementOfFaith> {
  const fallback = { sections: local.beliefs };
  if (!(await isCmsReady())) return fallback;
  const doc = await query<Partial<StatementOfFaith>>(statementOfFaithQuery);
  return doc?.sections?.length ? { sections: doc.sections } : fallback;
}

export async function getEvents(): Promise<ChurchEvent[]> {
  if (!(await isCmsReady())) return local.events;
  return (await query<ChurchEvent[]>(eventsQuery)) ?? [];
}

export async function getStaff(): Promise<StaffMember[]> {
  if (!(await isCmsReady())) return local.staff;
  return (await query<StaffMember[]>(staffQuery)) ?? [];
}

/** Events that have not finished yet, soonest first. */
export function upcomingEvents(events: ChurchEvent[], now = new Date()): ChurchEvent[] {
  return events
    .filter((event) => new Date(event.endsAt ?? event.startsAt).getTime() >= now.getTime() - 60 * 60_000)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Events that already happened, most recent first. */
export function pastEvents(events: ChurchEvent[], now = new Date()): ChurchEvent[] {
  return events
    .filter((event) => new Date(event.endsAt ?? event.startsAt).getTime() < now.getTime() - 60 * 60_000)
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

/** The announcement, if it is inside its display window. */
export function activeAnnouncement(site: SiteSettings, now = new Date()) {
  const a = site.announcement;
  if (!a?.text) return null;
  if (a.startsAt && new Date(a.startsAt) > now) return null;
  if (a.endsAt && new Date(a.endsAt) < now) return null;
  return a;
}
