import type { SiteSettings } from "@/lib/content/types";
import { text, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function endTime(start: string, durationMinutes = 120): string {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + durationMinutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/**
 * schema.org `Church` markup so Google can show the address, service times
 * and links next to the search result. Placeholder contact details are left
 * out on purpose; add `telephone`/`email` here once the real ones are in.
 */
export function ChurchJsonLd({ site, locale }: { site: SiteSettings; locale: Locale }) {
  const origin = siteUrl().origin;
  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: text(site.name, locale),
    alternateName: locale === "en" ? site.name.am : site.name.en,
    description: text(site.description, locale),
    url: origin,
    logo: `${origin}/brand/icon-512.png`,
    image: `${origin}/${locale}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: [site.address.line1, site.address.line2].filter(Boolean).join(", "),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country ?? "US",
    },
    openingHoursSpecification: site.services.map((service) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${days[service.dayOfWeek]}`,
      opens: service.startTime,
      closes: endTime(service.startTime, service.durationMinutes),
      description: text(service.name, locale),
    })),
    sameAs: [...new Set([site.youtube.channelUrl, ...site.socials.map((s) => s.href)])].filter((href) => /^https?:\/\/\S+\/\S/.test(href)),
    inLanguage: ["am", "en"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
