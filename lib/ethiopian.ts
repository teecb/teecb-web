/**
 * Ethiopian calendar helpers, built on `Intl` (ICU ships the Ethiopic
 * calendar), so there is no conversion table to maintain.
 */
import { localeTags, type Locale } from "@/lib/i18n/locales";

type EthiopicParts = { year: number; month: number; day: number };

function ethiopicParts(date: Date, timeZone: string): EthiopicParts {
  const parts = new Intl.DateTimeFormat("en-US-u-ca-ethiopic-nu-latn", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** "ነሐሴ 30, 2018" / "Nehasse 30, 2018" for the given instant. */
export function ethiopianDate(date: Date, locale: Locale, timeZone: string): string {
  // Drop the era ("AM" / "ዓ/ም") — it reads as noise next to a Gregorian site.
  return new Intl.DateTimeFormat(`${localeTags[locale]}-u-ca-ethiopic`, {
    timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  })
    .formatToParts(date)
    .filter((part) => part.type !== "era")
    .map((part) => part.value)
    .join("")
    .replace(/[\s,]+$/u, "");
}

/** Fixed-date celebrations on the Ethiopian calendar (movable feasts such as Fasika are omitted). */
const feasts: Array<{ month: number; day: number; name: Record<Locale, string> }> = [
  { month: 1, day: 1, name: { en: "Enkutatash (New Year)", am: "እንቁጣጣሽ (አዲስ ዓመት)" } },
  { month: 1, day: 17, name: { en: "Meskel", am: "መስቀል" } },
  { month: 4, day: 29, name: { en: "Genna (Christmas)", am: "ገና (ልደት)" } },
  { month: 5, day: 11, name: { en: "Timket", am: "ጥምቀት" } },
];

export type UpcomingFeast = { name: string; date: Date; daysAway: number };

/** The next fixed-date feast within the coming year, with how many days away it is. */
export function nextFeast(locale: Locale, timeZone: string, now = new Date()): UpcomingFeast | null {
  const dayMs = 86_400_000;
  for (let offset = 0; offset < 400; offset++) {
    const date = new Date(now.getTime() + offset * dayMs);
    const { month, day } = ethiopicParts(date, timeZone);
    const feast = feasts.find((f) => f.month === month && f.day === day);
    if (feast) return { name: feast.name[locale], date, daysAway: offset };
  }
  return null;
}
