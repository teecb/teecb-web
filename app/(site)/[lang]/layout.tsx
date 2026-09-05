import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Announcement } from "@/components/site/Announcement";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SkipLink } from "@/components/site/SkipLink";
import { ThemeScript } from "@/components/site/ThemeScript";
import { activeAnnouncement, getSite } from "@/lib/cms";
import { brandLogoSrc } from "@/lib/brand";
import { getDictionary, isLocale, localePath, locales, text, type Locale } from "@/lib/i18n";
import { navItems } from "@/lib/navigation";
import { siteUrl } from "@/lib/seo";
import { getLiveStream } from "@/lib/youtube";

export const revalidate = 60;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const site = await getSite();
  const name = text(site.name, locale);
  return {
    metadataBase: siteUrl(),
    title: { default: `${name} · ${site.address.city}`, template: `%s · ${text(site.shortName, locale)}` },
    description: text(site.description, locale),
    applicationName: text(site.shortName, locale),
    openGraph: { siteName: name, type: "website", locale: locale === "am" ? "am_ET" : "en_US" },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = getDictionary(locale);

  const site = await getSite();
  const live = await getLiveStream(site.watch);
  const announcement = activeAnnouncement(site);
  const { home, items, give } = navItems(locale);
  const logoSrc = brandLogoSrc();

  return (
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <head>
        <ThemeScript />
        <link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink label={t.common.skipToContent} />
        {announcement && (
          <Announcement
            label={announcement.label ? text(announcement.label, locale) : undefined}
            text={text(announcement.text, locale)}
            href={announcement.href ? (announcement.href.startsWith("/") ? localePath(locale, announcement.href) : announcement.href) : undefined}
            dismissLabel={t.common.dismiss}
          />
        )}
        <Header
          locale={locale}
          homeHref={localePath(locale)}
          name={text(site.name, locale)}
          wordmark={{ line1: text(site.wordmark.line1, locale), line2: text(site.wordmark.line2, locale) }}
          logoSrc={logoSrc}
          items={items}
          give={give}
          watchHref={localePath(locale, "/watch")}
          liveLabel={t.common.liveNow}
          initialLive={live.status === "live"}
          labels={{
            menu: t.common.menu,
            close: t.common.close,
            switchToDark: t.common.switchToDark,
            switchToLight: t.common.switchToLight,
            languageSwitch: t.common.languageSwitch,
          }}
        />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer site={site} locale={locale} t={t} items={[home, ...items, give]} logoSrc={logoSrc} />
      </body>
    </html>
  );
}
