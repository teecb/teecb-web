/**
 * Date helpers. Everything on the site is displayed in the church's time zone
 * (`site.timeZone`) regardless of where the visitor is, using `Intl` so both
 * English and Amharic get proper month and weekday names with no library.
 */
import { localeTags, type Locale } from "@/lib/i18n/locales";
import type { ServiceTime } from "@/lib/content/types";

type Parts = { year: number; month: number; day: number; hour: number; minute: number; weekday: number };

const weekdayIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Break an instant into wall-clock parts in the given time zone. */
export function getZonedParts(date: Date, timeZone: string): Parts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    weekday: weekdayIndex[get("weekday")] ?? 0,
  };
}

/** Convert a wall-clock time in `timeZone` to a UTC instant (handles DST). */
export function zonedTimeToUtc(
  { year, month, day, hour, minute }: Omit<Parts, "weekday">,
  timeZone: string,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const actual = getZonedParts(new Date(guess), timeZone);
  const asUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
  return new Date(guess - (asUtc - guess));
}

/** The next time a weekly service starts, at or after `now`. */
export function nextServiceStart(service: ServiceTime, timeZone: string, now = new Date()): Date {
  const [hour, minute] = service.startTime.split(":").map(Number);
  const today = getZonedParts(now, timeZone);

  for (let offset = 0; offset < 8; offset++) {
    const candidateDay = new Date(Date.UTC(today.year, today.month - 1, today.day + offset));
    if (candidateDay.getUTCDay() !== service.dayOfWeek) continue;
    const start = zonedTimeToUtc(
      {
        year: candidateDay.getUTCFullYear(),
        month: candidateDay.getUTCMonth() + 1,
        day: candidateDay.getUTCDate(),
        hour,
        minute,
      },
      timeZone,
    );
    // Keep showing "starting now" for the first part of the service.
    const graceMs = Math.min(service.durationMinutes ?? 90, 90) * 60_000;
    if (start.getTime() + graceMs > now.getTime()) return start;
  }
  // Unreachable for a valid weekly schedule, but keep the type honest.
  return now;
}

/** The primary weekly service, or the first one listed. */
export function primaryService(services: ServiceTime[]): ServiceTime | undefined {
  return services.find((s) => s.isPrimary) ?? services[0];
}

function fmt(locale: Locale, timeZone: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(localeTags[locale], { timeZone, ...options });
}

/** "September 13, 2026" */
export function formatDate(iso: string | Date, locale: Locale, timeZone: string): string {
  return fmt(locale, timeZone, { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
}

/** "Sep 13" */
export function formatShortDate(iso: string | Date, locale: Locale, timeZone: string): string {
  return fmt(locale, timeZone, { month: "short", day: "numeric" }).format(new Date(iso));
}

/** "Sunday" */
export function formatWeekday(iso: string | Date, locale: Locale, timeZone: string): string {
  return fmt(locale, timeZone, { weekday: "long" }).format(new Date(iso));
}

/** "10:00 AM" */
export function formatTime(iso: string | Date, locale: Locale, timeZone: string): string {
  return fmt(locale, timeZone, { hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

/** "Sunday, September 13 · 12:30 – 2:00 PM" */
export function formatEventWhen(
  startsAt: string,
  endsAt: string | undefined,
  locale: Locale,
  timeZone: string,
): string {
  const start = new Date(startsAt);
  const day = fmt(locale, timeZone, { weekday: "long", month: "long", day: "numeric" }).format(start);
  const time = endsAt
    ? fmt(locale, timeZone, { hour: "numeric", minute: "2-digit" }).formatRange(start, new Date(endsAt))
    : formatTime(start, locale, timeZone);
  return `${day} · ${time}`;
}

/** Weekday name for a 0–6 index, in the given locale. */
export function weekdayName(dayOfWeek: number, locale: Locale, style: "long" | "short" = "long"): string {
  // 2024-09-01 was a Sunday.
  const reference = new Date(Date.UTC(2024, 8, 1 + dayOfWeek, 12));
  return new Intl.DateTimeFormat(localeTags[locale], { weekday: style, timeZone: "UTC" }).format(reference);
}

/** "10:00 AM" for a service's `HH:MM` start time. */
export function serviceTimeLabel(service: ServiceTime, locale: Locale): string {
  const [hour, minute] = service.startTime.split(":").map(Number);
  const reference = new Date(Date.UTC(2024, 8, 1, hour, minute));
  return new Intl.DateTimeFormat(localeTags[locale], { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(reference);
}

/** Split the ms until an instant into calendar-ish units for a countdown. */
export function countdownParts(target: Date, now = new Date()) {
  const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  return {
    total,
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

/** Google Calendar "add event" URL — no API key or library needed. */
export function googleCalendarUrl(input: {
  title: string;
  startsAt: string;
  endsAt?: string;
  location?: string;
  details?: string;
}): string {
  const toStamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const start = toStamp(input.startsAt);
  const end = toStamp(input.endsAt ?? new Date(new Date(input.startsAt).getTime() + 90 * 60_000).toISOString());
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${start}/${end}`,
  });
  if (input.location) params.set("location", input.location);
  if (input.details) params.set("details", input.details);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Parse an ISO 8601 duration such as "PT1H23M4S" into seconds. */
export function parseIsoDuration(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(value);
  if (!match) return undefined;
  const [, d = "0", h = "0", m = "0", s = "0"] = match;
  return Number(d) * 86_400 + Number(h) * 3_600 + Number(m) * 60 + Number(s);
}

/** "1h 23m" / "45m" */
export function formatDuration(seconds: number | undefined, minutesLabel = "min"): string | null {
  if (!seconds || seconds < 60) return null;
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.round((seconds % 3_600) / 60);
  if (hours === 0) return `${minutes} ${minutesLabel}`;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}
