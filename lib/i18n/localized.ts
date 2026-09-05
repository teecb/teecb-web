import type { Locale } from "./locales";

/**
 * A value authored in one or both languages. Content may legitimately exist in
 * only one language (e.g. the Statement of Faith is Amharic-first), so the
 * reader falls back to whichever language is present.
 */
export type Localized<T = string> = Partial<Record<Locale, T>>;

/** Pick the requested language, falling back to any other available language. */
export function pick<T>(value: Localized<T> | undefined | null, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.en ?? value.am;
}

/** Like `pick`, but guarantees a string (empty when nothing is authored). */
export function text(value: Localized<string> | undefined | null, locale: Locale): string {
  return pick(value, locale) ?? "";
}

/** True when the value has content in the requested language specifically. */
export function hasLocale<T>(value: Localized<T> | undefined | null, locale: Locale): boolean {
  return Boolean(value?.[locale]);
}
