"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn, youtubeEmbedUrl } from "@/lib/utils";

/**
 * "Lite" YouTube embed: renders the poster image and only loads the iframe
 * when the visitor presses play (or when `autoplay` is set, e.g. live).
 * Saves ~1 MB of third-party JavaScript on every page load.
 */
export function YouTubePlayer({
  videoId,
  title,
  poster,
  autoplay = false,
  playLabel,
  className,
}: {
  videoId: string;
  title: string;
  poster?: string;
  autoplay?: boolean;
  playLabel: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(autoplay);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-dark", className)}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={youtubeEmbedUrl(videoId, true)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center text-hero-ink"
          aria-label={`${playLabel}: ${title}`}
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              priority
              sizes="(min-width: 1180px) 1180px, 100vw"
              className="object-cover transition-transform duration-700 ease-token group-hover:scale-[1.03]"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" aria-hidden />
          <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-hero-ink text-navy shadow-token-lg transition-transform duration-300 ease-token group-hover:scale-105">
            <Icon name="play" size={28} className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}
