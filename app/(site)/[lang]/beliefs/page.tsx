import type { Metadata } from "next";
import { StatementOfFaith } from "@/components/about/StatementOfFaith";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getStatementOfFaith } from "@/lib/cms";
import { getDictionary, localePath, resolveLocale, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/beliefs", title: t.about.faithHeading, description: t.about.faithIntro });
}

export default async function BeliefsPage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const faith = await getStatementOfFaith();

  return (
    <>
      <PageHero eyebrow={t.about.faithEyebrow} title={t.about.faithHeading} intro={t.about.faithIntro} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <StatementOfFaith sections={faith.sections} locale={locale} t={t} />
        </div>
      </Section>
      <Section tone="soft" space="sm">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
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
