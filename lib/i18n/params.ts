import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./locales";

export type LangParams = { params: Promise<{ lang: string }> };

/** Resolve and validate the `[lang]` route segment; unknown languages 404. */
export async function resolveLocale({ params }: LangParams): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
