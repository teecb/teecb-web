import { NextResponse } from "next/server";
import { getSite } from "@/lib/cms";
import { getLiveStream } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export type LiveStatusResponse = { status: "live"; videoId: string; title: string } | { status: "offline" };

/**
 * Lightweight live-status endpoint polled by open pages so the live player
 * and the header pill appear without a reload. The YouTube lookup behind it is
 * cached server-side, so polling clients do not spend API quota.
 */
export async function GET() {
  const site = await getSite();
  const live = await getLiveStream(site.watch);
  const body: LiveStatusResponse =
    live.status === "live" ? { status: "live", videoId: live.video.id, title: live.video.title } : { status: "offline" };
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
