import type { Metadata } from "next";
import { EventCard } from "@/components/events/EventCard";
import { Hero } from "@/components/home/Hero";
import { ServiceTimes } from "@/components/home/ServiceTimes";
import { VerseBlock } from "@/components/home/VerseBlock";
import { SermonCard } from "@/components/sermons/SermonCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEvents, getHome, getSite, upcomingEvents } from "@/lib/cms";
import { getDictionary, localePath, resolveLocale, text, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { isExternalHref } from "@/lib/utils";
import { getChannelFeed, getLiveStream } from "@/lib/youtube";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const site = await getSite();
  return { ...pageMetadata({ locale, path: "/", description: text(site.description, locale) }), title: { absolute: `${text(site.name, locale)} · ${site.address.city}` } };
}

export default async function HomePage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);

  const [site, home, events, feed] = await Promise.all([getSite(), getHome(), getEvents(), getChannelFeed(12)]);
  const live = await getLiveStream(site.watch, feed);
  const featured = feed.live ?? feed.videos[0] ?? null;
  const latest = feed.videos.filter((v) => v.id !== featured?.id).slice(0, 3);
  const upcoming = upcomingEvents(events).slice(0, 3);
  const href = (h: string) => (isExternalHref(h) ? h : localePath(locale, h));

  return (
    <>
      <Hero locale={locale} site={site} home={home} live={live} featured={featured} t={t} />

      {/* Latest sermons */}
      <Section>
        <SectionHeading
          eyebrow={t.home.sermonsEyebrow}
          title={t.home.sermonsHeading}
          link={{ href: localePath(locale, "/sermons"), label: t.sermons.allSermons }}
        />
        {latest.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {latest.map((video, index) => (
              <Reveal key={video.id} delay={index * 80} className="h-full">
                <SermonCard video={video} locale={locale} timeZone={site.timeZone} minutesLabel={t.common.minutes} priority={index === 0} className="h-full" />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-token-lg border border-dashed border-line-2 p-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-muted">{feed.status === "unconfigured" ? t.sermons.unconfigured : t.sermons.empty}</p>
              <Button href={site.youtube.channelUrl} variant="ghost" icon="youtube" iconPosition="left">
                {t.sermons.visitChannel}
              </Button>
            </div>
          </Reveal>
        )}
      </Section>

      {/* Service times */}
      <Section tone="soft">
        <SectionHeading eyebrow={t.home.servicesEyebrow} title={t.home.servicesHeading} link={{ href: localePath(locale, "/visit"), label: t.common.planVisit }} />
        <ServiceTimes services={site.services} locale={locale} highlight={{ tag: t.home.youthTag, title: t.home.youthTitle, body: t.home.youthBody }} />
      </Section>

      {/* Welcome */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            {home.welcome.eyebrow && <Eyebrow className="mb-4">{text(home.welcome.eyebrow, locale)}</Eyebrow>}
            <h2 className="text-step-3">{text(home.welcome.heading, locale)}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-step-1 leading-relaxed text-muted">{text(home.welcome.body, locale)}</p>
            {home.welcome.cta && (
              <div className="mt-8">
                <Button href={href(home.welcome.cta.href)} variant="ghost" icon="arrowRight">
                  {text(home.welcome.cta.label, locale)}
                </Button>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {home.verse && <VerseBlock verse={home.verse} locale={locale} eyebrow={t.home.verseEyebrow} />}

      {/* Upcoming events */}
      <Section tone="soft">
        <SectionHeading eyebrow={t.home.eventsEyebrow} title={t.home.eventsHeading} link={{ href: localePath(locale, "/events"), label: t.common.viewAll }} />
        {upcoming.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {upcoming.map((event, index) => (
              <Reveal key={event.slug} delay={index * 80} className="h-full">
                <EventCard event={event} locale={locale} timeZone={site.timeZone} t={t} compact className="h-full" />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-token-lg border border-dashed border-line-2 p-8 text-muted">{t.home.noUpcomingEvents}</p>
        )}
      </Section>

      {/* Closing CTA */}
      <Section bleed tone="dark" space="lg" className="isolate overflow-hidden">
        <div className="mesh" aria-hidden />
        <div className="grain" aria-hidden />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-step-3 text-hero-ink">{text(home.cta.heading, locale)}</h2>
            <p className="mx-auto mt-5 max-w-xl text-step-1 text-hero-muted">{text(home.cta.body, locale)}</p>
            <div className="mt-9">
              <Button href={href(home.cta.button.href)} variant="light" size="lg" icon="arrowRight">
                {text(home.cta.button.label, locale)}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
