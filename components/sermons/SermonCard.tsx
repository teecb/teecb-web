import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatDate, formatDuration } from "@/lib/dates";
import { localePath, type Locale } from "@/lib/i18n";
import type { Video } from "@/lib/youtube";
import { cn } from "@/lib/utils";

/** Thumbnail card linking to a sermon's detail page. */
export function SermonCard({
  video,
  locale,
  timeZone,
  minutesLabel,
  priority = false,
  className,
}: {
  video: Video;
  locale: Locale;
  timeZone: string;
  minutesLabel: string;
  priority?: boolean;
  className?: string;
}) {
  const duration = formatDuration(video.durationSeconds, minutesLabel);
  return (
    <Link
      href={localePath(locale, `/sermons/${video.id}`)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-token-lg border border-line bg-surface shadow-token-sm transition-[transform,box-shadow,border-color] duration-300 ease-token hover:-translate-y-1 hover:border-line-2 hover:shadow-token-md",
        className,
      )}
    >
      <span className="relative block aspect-video overflow-hidden bg-dark">
        {video.thumbnailUrl && (
          <Image
            src={video.thumbnailUrl}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-token group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" aria-hidden />
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-hero-ink text-navy shadow-token-md transition-transform duration-300 group-hover:scale-105">
          <Icon name="play" size={16} className="ml-0.5" />
        </span>
        {duration && (
          <span className="absolute bottom-3 right-3 rounded-full bg-dark/70 px-2 py-0.5 text-[11px] font-semibold text-hero-ink backdrop-blur">
            {duration}
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="line-clamp-2 font-display text-[19px] leading-snug text-ink transition-colors group-hover:text-accent">{video.title}</span>
        {video.publishedAt && <span className="mt-auto pt-3 text-[13.5px] text-muted">{formatDate(video.publishedAt, locale, timeZone)}</span>}
      </span>
    </Link>
  );
}
