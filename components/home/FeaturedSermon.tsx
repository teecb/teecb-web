import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

/**
 * The hero's sermon card. One click takes the visitor to the big player on
 * the sermon page (or Watch, when live) with playback already started.
 */
export function FeaturedSermon({
  title,
  poster,
  isLive,
  meta,
  href,
  labels,
}: {
  title: string;
  poster: string;
  isLive: boolean;
  /** "September 2, 2026 · 53 min" — already formatted on the server. */
  meta?: string;
  /** Destination with `?play=1` so the player starts on arrival. */
  href: string;
  labels: { live: string; latest: string; play: string };
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-token-xl bg-dark-2 shadow-token-lg ring-1 ring-white/10 transition-transform duration-500 ease-token hover:-translate-y-1"
      aria-label={`${labels.play}: ${title}`}
    >
      <span className="relative block aspect-[16/10] bg-dark">
        {poster && (
          <Image src={poster} alt="" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition-transform duration-700 ease-token group-hover:scale-[1.03]" />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" aria-hidden />
        <span className="absolute left-5 top-5">{isLive ? <Badge tone="live">{labels.live}</Badge> : <Badge tone="onDark">{labels.latest}</Badge>}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-hero-ink text-navy shadow-token-lg transition-transform duration-300 ease-token group-hover:scale-105">
            <Icon name="play" size={26} className="ml-1" />
          </span>
        </span>
      </span>
      <span className="block px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <span className="line-clamp-2 font-display text-[21px] leading-snug text-hero-ink sm:text-[23px]">{title}</span>
        <span className="mt-2.5 flex items-center gap-3 text-[13.5px] text-hero-muted">
          {meta && <span>{meta}</span>}
          <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-accent-3">
            {labels.play}
            <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </Link>
  );
}
