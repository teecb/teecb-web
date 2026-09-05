import type { Metadata } from "next";
import { localePath, locales, localeTags, type Locale } from "@/lib/i18n/locales";

/** Canonical site origin for absolute URLs (sitemap, Open Graph, hreflang). */
export function siteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return new URL(raw);
}

/**
 * Per-page metadata with hreflang alternates for both languages. `path` is the
 * un-prefixed route ("/watch"); the locale prefix is added here.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex = false,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [localeTags[l], localePath(l, path)]));
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: { ...languages, "x-default": localePath("en", path) },
    },
    openGraph: {
      title,
      description,
      url: localePath(locale, path),
      locale: locale === "am" ? "am_ET" : "en_US",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
