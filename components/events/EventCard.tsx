import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import type { ChurchEvent } from "@/lib/content/types";
import { formatEventWhen, getZonedParts, googleCalendarUrl } from "@/lib/dates";
import { localeTags, pick, text, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Calendar-style date block + details. `compact` hides the long description. */
export function EventCard({
  event,
  locale,
  timeZone,
  t,
  compact = false,
  className,
}: {
  event: ChurchEvent;
  locale: Locale;
  timeZone: string;
  t: Dictionary;
  compact?: boolean;
  className?: string;
}) {
  const start = new Date(event.startsAt);
  const { day } = getZonedParts(start, timeZone);
  const month = new Intl.DateTimeFormat(localeTags[locale], { month: "short", timeZone }).format(start);
  const title = text(event.title, locale);
  const location = text(event.location, locale);
  const details = pick(event.details, locale);

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-token-lg border border-line bg-surface shadow-token-sm transition-[transform,box-shadow] duration-300 ease-token",
        !compact && "hover:-translate-y-0.5 hover:shadow-token-md",
        event.cancelled && "opacity-70",
        className,
      )}
    >
      {event.imageUrl && (
        <div className="relative aspect-[16/9] w-full bg-surface-2">
          <Image src={event.imageUrl} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex gap-5 p-5 sm:gap-7 sm:p-7">
      <time
        dateTime={event.startsAt}
        className="flex h-[76px] w-[68px] shrink-0 flex-col items-center justify-center rounded-token bg-accent-soft text-accent-2"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.12em]">{month}</span>
        <span className="font-display text-[30px] leading-none">{day}</span>
      </time>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={cn("font-display text-[21px] leading-snug text-ink", event.cancelled && "line-through")}>{title}</h3>
          {event.cancelled && <Badge tone="live">{t.events.cancelled}</Badge>}
        </div>
        <p className={cn("mt-1.5 flex gap-x-4 gap-y-1 text-[14px] text-muted", compact ? "flex-col" : "flex-wrap items-center")}>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={15} className="shrink-0 text-accent" />
            {formatEventWhen(event.startsAt, event.endsAt, locale, timeZone)}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="mapPin" size={15} className="shrink-0 text-accent" />
              {location}
            </span>
          )}
        </p>
        <p className="mt-3 text-[15px] text-ink-soft">{text(event.summary, locale)}</p>
        {!compact && details && <RichText value={details} className="mt-4 text-[15px]" />}
        {!compact && !event.cancelled && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
            <a
              href={googleCalendarUrl({ title, startsAt: event.startsAt, endsAt: event.endsAt, location, details: text(event.summary, locale) })}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent-2"
            >
              <Icon name="calendar" size={15} />
              {t.events.addToCalendar}
            </a>
            {event.registrationUrl && (
              <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-2">
                <Icon name="arrowUpRight" size={15} />
                {t.events.register}
              </a>
            )}
          </div>
        )}
      </div>
      </div>
    </article>
  );
}
