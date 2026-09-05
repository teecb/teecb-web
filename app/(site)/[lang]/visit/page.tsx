import type { Metadata } from "next";
import { ServiceTimes } from "@/components/home/ServiceTimes";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/cms";
import { getDictionary, resolveLocale, text, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { mapsEmbedUrl, mapsSearchUrl, telHref } from "@/lib/utils";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/visit", title: t.visit.title, description: t.visit.intro });
}

export default async function VisitPage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const site = await getSite();
  const a = site.address;
  const fullAddress = `${a.line1}${a.line2 ? `, ${a.line2}` : ""}, ${a.city}, ${a.region} ${a.postalCode}`;
  const directions = a.mapUrl ?? mapsSearchUrl(fullAddress);

  const expectations: Array<{ icon: IconName; title: string; body: string }> = [
    { icon: "clock", title: t.visit.expectArrive, body: t.visit.expectArriveBody },
    { icon: "globe", title: t.visit.expectLanguages, body: t.visit.expectLanguagesBody },
    { icon: "users", title: t.visit.expectKids, body: t.visit.expectKidsBody },
    { icon: "coffee", title: t.visit.expectStay, body: t.visit.expectStayBody },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.home.pathsNewHere}
        title={t.visit.title}
        intro={t.visit.intro}
        actions={
          <>
            <Button href={directions} icon="mapPin" iconPosition="left">
              {t.common.getDirections}
            </Button>
            <Button href={`mailto:${site.contact.email}`} variant="ghost" icon="mail" iconPosition="left">
              {t.common.emailUs}
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading eyebrow={t.visit.whatToExpect} title={t.visit.whatToExpect} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expectations.map((item, index) => (
            <Reveal key={item.title} delay={index * 70} className="h-full">
              <div className="h-full rounded-token-lg border border-line bg-surface p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-token bg-accent-soft text-accent">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="mt-5 font-display text-[21px] text-ink">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow={t.visit.serviceTimes} title={t.home.servicesHeading} />
        <ServiceTimes services={site.services} locale={locale} highlight={{ tag: t.home.youthTag, title: t.home.youthTitle, body: t.home.youthBody }} />
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="flex overflow-hidden rounded-token-lg border border-line bg-surface shadow-token-sm">
            <iframe
              title={t.visit.mapTitle}
              src={mapsEmbedUrl(fullAddress)}
              className="h-full min-h-[380px] w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
          <div className="flex flex-col gap-4">
            <Reveal delay={80} className="rounded-token-lg border border-line bg-surface p-7">
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
                <Icon name="mapPin" size={15} />
                {t.visit.findUs}
              </p>
              <address className="mt-4 font-display text-[22px] not-italic leading-snug text-ink">
                {a.line1}
                {a.line2 && (
                  <>
                    <br />
                    {a.line2}
                  </>
                )}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </address>
              <div className="mt-5">
                <Button href={directions} size="sm" variant="ghost" icon="arrowUpRight">
                  {t.common.openInMaps}
                </Button>
              </div>
              {a.parkingNote && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
                    <Icon name="car" size={15} />
                    {t.visit.parking}
                  </p>
                  <p className="mt-2 text-[15px] text-muted">{text(a.parkingNote, locale)}</p>
                </div>
              )}
            </Reveal>
            <Reveal delay={160} className="rounded-token-lg bg-dark p-7 text-hero-ink">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-3">{t.visit.contact}</p>
              <p className="mt-3 text-[15px] text-hero-muted">{t.visit.contactBody}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2.5 font-semibold transition-colors hover:text-accent-3">
                  <Icon name="mail" size={17} className="text-accent-3" />
                  <span className="break-all">{site.contact.email}</span>
                </a>
                {site.contact.phone && (
                  <a href={telHref(site.contact.phone)} className="inline-flex items-center gap-2.5 font-semibold transition-colors hover:text-accent-3">
                    <Icon name="phone" size={17} className="text-accent-3" />
                    {site.contact.phone}
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
