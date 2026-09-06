"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { YouTubePlayer } from "@/components/media/YouTubePlayer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLiveStatus, type LiveVideo } from "@/lib/use-live-status";
import { youtubeWatchUrl } from "@/lib/utils";
import { NextService } from "./NextService";

type Latest = { id: string; title: string; poster: string; dateLabel: string | null; href: string };

/**
 * The top of the Watch page. Server-rendered with the current state, then it
 * keeps polling: the moment the church goes live the player swaps to the
 * broadcast (autoplaying) and the countdown gives way to the LIVE badge.
 */
export function WatchStage({
  initialLive,
  latest,
  nextServiceAt,
  channelUrl,
  labels,
}: {
  initialLive: LiveVideo | null;
  latest: Latest | null;
  nextServiceAt: string | null;
  channelUrl: string;
  labels: {
    title: string;
    liveNow: string;
    liveBadge: string;
    introLive: string;
    introOffline: string;
    latestService: string;
    play: string;
    about: string;
    watchOnYouTube: string;
    channel: string;
    empty: string;
    countdown: { startsIn: string; startingNow: string; days: string; hours: string; minutes: string; seconds: string };
  };
}) {
  const live = useLiveStatus(initialLive);
  const isLive = live !== null;
  const featured = live ? { id: live.id, title: live.title, poster: undefined } : latest ? { id: latest.id, title: latest.title, poster: latest.poster } : null;
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash !== "#watch-player") return;

    const frame = requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-dark text-hero-ink">
      <div className="mesh" aria-hidden />
      <div className="grain" aria-hidden />
      <Container className="relative py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {isLive && <Badge tone="live">{labels.liveBadge}</Badge>}
            <h1 className={isLive ? "mt-4 text-step-4 text-hero-ink" : "text-step-4 text-hero-ink"}>{isLive ? labels.liveNow : labels.title}</h1>
            <p className="mt-4 text-step-1 text-hero-muted">{isLive ? labels.introLive : labels.introOffline}</p>
          </div>
          {!isLive && nextServiceAt && <NextService target={nextServiceAt} onDark labels={labels.countdown} />}
        </div>

        {featured ? (
          <div ref={playerRef} id="watch-player" className="overflow-hidden rounded-token-lg shadow-token-lg ring-1 ring-white/10">
            {/* Keyed so a switch to the live broadcast remounts the player and autoplays. */}
            <YouTubePlayer key={`${featured.id}:${isLive}`} videoId={featured.id} title={featured.title} poster={featured.poster} autoplay={isLive} playLabel={labels.play} />
            <div className="flex flex-col gap-4 bg-dark-2/80 px-5 py-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent-3">{isLive ? labels.liveBadge : labels.latestService}</p>
                <h2 className="mt-1 truncate font-display text-[20px] text-hero-ink">{featured.title}</h2>
                {!isLive && latest?.dateLabel && <p className="mt-1 text-sm text-hero-muted">{latest.dateLabel}</p>}
              </div>
              <div className="flex shrink-0 gap-3">
                {!isLive && latest && (
                  <Link href={latest.href} className="inline-flex h-9 items-center rounded-full border border-hero-ink/35 px-4 text-[13.5px] font-semibold text-hero-ink transition-colors hover:border-hero-ink hover:bg-hero-ink/10">
                    {labels.about}
                  </Link>
                )}
                <Button href={youtubeWatchUrl(featured.id)} variant="light" size="sm" icon="arrowUpRight">
                  {labels.watchOnYouTube}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-token-lg border border-white/10 bg-white/5 p-10 text-center">
            <p className="mx-auto max-w-lg text-hero-muted">{labels.empty}</p>
            <div className="mt-6">
              <Button href={channelUrl} variant="light" icon="youtube" iconPosition="left">
                {labels.channel}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
