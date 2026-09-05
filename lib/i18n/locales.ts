/**
 * Supported site languages.
 *
 * `en` is the default. `am` (Amharic) is served under the `/am` path prefix.
 * Every route lives under `app/(site)/[lang]`, and `proxy.ts` redirects
 * un-prefixed URLs to the visitor's preferred language.
 */
export const locales = ["en", "am"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "teecb-lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

/** Human-readable language names, written in that language. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
};

/** BCP 47 tags used for `<html lang>` and `Intl` formatting. */
export const localeTags: Record<Locale, string> = {
  en: "en-US",
  am: "am-ET",
};

/** Prefix a site path with the locale, e.g. `localePath("am", "/watch")` → `/am/watch`. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Swap the locale prefix on a localized pathname (`/en/watch` → `/am/watch`). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || "/";
}
