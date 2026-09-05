import { am } from "./dictionaries/am";
import { en, type Dictionary } from "./dictionaries/en";
import type { Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { en, am };

/** UI strings for a locale. Synchronous — dictionaries are small and bundled. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./locales";
export * from "./localized";
export * from "./params";
