import type { Metadata } from "next";
import { SermonCard } from "@/components/sermons/SermonCard";
import { WatchStage } from "@/components/watch/WatchStage";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/cms";
import { formatDate, nextServiceStart, primaryService, serviceTimeLabel, weekdayName } from "@/lib/dates";
import { getDictionary, localePath, resolveLocale, text, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getChannelFeed, getLiveStream } from "@/lib/youtube";

export const revalidate = 60;

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/watch", title: t.watch.title, description: t.watch.introOffline });
}

export default async function WatchPage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const [site, feed] = await Promise.all([getSite(), getChannelFeed(7)]);
  const live = await getLiveStream(site.watch, feed);
  const isLive = live.status === "live";

  const service = primaryService(site.services);
  const livestreamService = service ? { ...service, startTime: site.watch.liveStartTime ?? service.startTime } : null;
  const nextStart = livestreamService ? nextServiceStart(livestreamService, site.timeZone) : null;
  const latest = feed.videos[0];
  const recent = feed.videos.filter((v) => v.id !== latest?.id).slice(0, 6);

  const steps: Array<{ icon: IconName; title: string; body: string }> = [
    { icon: "bell", title: t.watch.stepSubscribe, body: t.watch.stepSubscribeBody },
    { icon: "clock", title: t.watch.stepArrive, body: t.watch.stepArriveBody },
    { icon: "users", title: t.watch.stepJoin, body: t.watch.stepJoinBody },
  ];

  return (
    <>
      <WatchStage
        initialLive={isLive ? { id: live.video.id, title: live.video.title } : null}
        latest={latest ? { id: latest.id, title: latest.title, poster: latest.thumbnailUrl, dateLabel: latest.publishedAt ? formatDate(latest.publishedAt, locale, site.timeZone) : null, href: localePath(locale, `/sermons/${latest.id}`) } : null}
        nextServiceAt={nextStart?.toISOString() ?? null}
        channelUrl={site.youtube.channelUrl}
        labels={{
          title: t.watch.title,
          liveNow: t.common.liveNow,
          liveBadge: t.watch.liveBadge,
          introLive: t.watch.introLive,
          introOffline: t.watch.introOffline,
          latestService: t.watch.latestService,
          play: t.sermons.play,
          about: t.sermons.description,
          watchOnYouTube: t.common.watchOnYouTube,
          channel: t.watch.channel,
          empty: feed.status === "unavailable" ? t.watch.unavailable : t.sermons.empty,
          countdown: {
            startsIn: t.watch.startsIn,
            startingNow: t.watch.startingNow,
            days: t.watch.days,
            hours: t.watch.hours,
            minutes: t.watch.minutes,
            seconds: t.watch.seconds,
          },
        }}
      />

      {/* Next service + how to watch */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {service && (
            <Reveal>
              <div className="h-full rounded-token-lg border border-accent/30 bg-accent-soft/60 p-7 sm:p-9">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.watch.nextService}</p>
                <p className="mt-4 font-display text-step-3 text-ink">
                  {weekdayName(service.dayOfWeek, locale)} · {serviceTimeLabel(service, locale)}
                </p>
                <p className="mt-2 text-[16px] text-ink-soft">
                  {text(service.name, locale)}
                  {service.note && <span className="text-muted"> — {text(service.note, locale)}</span>}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={localePath(locale, "/visit")} variant="ghost" icon="mapPin" iconPosition="left" size="sm">
                    {t.common.planVisit}
                  </Button>
                  <Button href={site.youtube.channelUrl} variant="ghost" icon="youtube" iconPosition="left" size="sm">
                    {t.watch.stepSubscribe}
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
          <div>
            <h2 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.watch.howToWatch}</h2>
            <ol className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={index * 80} className="rounded-token-lg border border-line bg-surface p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-token bg-accent-soft text-accent">
                    <Icon name={step.icon} size={19} />
                  </span>
                  <h3 className="mt-5 font-display text-[19px] text-ink">{step.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {recent.length > 0 && (
        <Section tone="soft">
          <SectionHeading eyebrow={t.sermons.latest} title={t.watch.recentServices} link={{ href: localePath(locale, "/sermons"), label: t.sermons.allSermons }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((video, index) => (
              <Reveal key={video.id} delay={index * 60} className="h-full">
                <SermonCard video={video} locale={locale} timeZone={site.timeZone} minutesLabel={t.common.minutes} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
