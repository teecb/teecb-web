import type { Metadata } from "next";
import { EventCard } from "@/components/events/EventCard";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getEvents, getSite, pastEvents, upcomingEvents } from "@/lib/cms";
import { getDictionary, localePath, resolveLocale, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/events", title: t.events.title, description: t.events.intro });
}

export default async function EventsPage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const [site, events] = await Promise.all([getSite(), getEvents()]);
  const upcoming = upcomingEvents(events);
  const past = pastEvents(events).slice(0, 6);

  return (
    <>
      <PageHero eyebrow={t.home.eventsEyebrow} title={t.events.title} intro={t.events.intro} />
      <Section>
        <h2 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.events.upcoming}</h2>
        {upcoming.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {upcoming.map((event, index) => (
              <Reveal key={event.slug} delay={(index % 2) * 80} className="h-full">
                <EventCard event={event} locale={locale} timeZone={site.timeZone} t={t} className="h-full" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-5 rounded-token-lg border border-dashed border-line-2 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-muted">{t.events.none}</p>
            <Button href={localePath(locale, "/visit")} variant="ghost" icon="arrowRight">
              {t.common.planVisit}
            </Button>
          </div>
        )}
      </Section>
      {past.length > 0 && (
        <Section tone="soft" space="sm">
          <h2 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">{t.events.past}</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} locale={locale} timeZone={site.timeZone} t={t} compact className="opacity-80" />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
