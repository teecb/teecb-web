import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAbout, getSite, getStaff } from "@/lib/cms";
import { getDictionary, localePath, pick, resolveLocale, text, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const about = await getAbout();
  return pageMetadata({ locale, path: "/about", title: t.about.title, description: text(about.intro, locale) });
}

export default async function AboutPage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const [site, about, staff] = await Promise.all([getSite(), getAbout(), getStaff()]);

  return (
    <>
      <PageHero eyebrow={t.about.title} title={text(site.name, locale)} intro={text(about.intro, locale)} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={t.about.ourStory} title={text(site.tagline, locale)} className="mb-0" />
          </Reveal>
          <Reveal delay={100}>
            <RichText value={pick(about.story, locale)} className="text-step-1" />
          </Reveal>
        </div>
      </Section>

      {about.values.length > 0 && (
        <Section tone="soft">
          <SectionHeading eyebrow={t.about.values} title={t.about.values} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <Reveal key={index} delay={index * 70} className="h-full">
                <div className="h-full rounded-token-lg border border-line bg-surface p-6 sm:p-7">
                  <span className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-[22px] text-ink">{text(value.title, locale)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{text(value.body, locale)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Statement of Faith teaser — the full statement has its own page. */}
      <Section space="sm">
        <div className="relative isolate overflow-hidden rounded-token-xl bg-dark p-8 text-hero-ink sm:p-12">
          <div className="mesh" aria-hidden />
          <div className="grain" aria-hidden />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow className="mb-4 text-accent-3">{t.about.faithEyebrow}</Eyebrow>
              <h2 className="text-step-3 text-hero-ink">{t.about.faithHeading}</h2>
              <p className="mt-4 text-step-0 text-hero-muted">{t.about.faithTeaser}</p>
            </div>
            <Button href={localePath(locale, "/beliefs")} variant="light" icon="arrowRight">
              {t.about.readStatement}
            </Button>
          </div>
        </div>
      </Section>

      {staff.length > 0 && (
        <Section tone="soft">
          <SectionHeading eyebrow={t.about.team} title={t.about.team} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((member, index) => (
              <Reveal key={member.slug} delay={index * 70} className="h-full">
                <div className="h-full rounded-token-lg border border-line bg-surface p-6">
                  <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-full bg-accent-soft font-display text-2xl text-accent">
                    {member.photoUrl ? (
                      <Image src={member.photoUrl} alt={member.name} fill sizes="80px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="font-display text-[20px] text-ink">{member.name}</h3>
                  <p className="mt-0.5 text-[13.5px] font-semibold text-accent">{text(member.role, locale)}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{text(member.bio, locale)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section space="sm">
        <div className="flex flex-col items-start gap-5 rounded-token-xl bg-accent-soft/70 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-step-2">{t.visit.title}</h2>
            <p className="mt-2 max-w-xl text-muted">{t.visit.intro}</p>
          </div>
          <Button href={localePath(locale, "/visit")} icon="arrowRight">
            {t.common.planVisit}
          </Button>
        </div>
      </Section>
    </>
  );
}
