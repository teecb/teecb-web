import type { MetadataRoute } from "next";
import { localePath, locales, localeTags } from "@/lib/i18n/locales";
import { siteUrl } from "@/lib/seo";

const routes = ["/", "/sermons", "/watch", "/events", "/about", "/beliefs", "/visit", "/give"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const abs = (path: string) => new URL(path, base).toString();
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: abs(localePath(locale, route)),
      changeFrequency: route === "/" || route === "/watch" ? "daily" : "weekly",
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], abs(localePath(l, route))])),
      },
    })),
  );
}
