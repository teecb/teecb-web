import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSite } from "@/lib/cms";
import { getDictionary, resolveLocale, text, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { telHref } from "@/lib/utils";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/give", title: t.give.title, description: t.give.intro });
}

function Method({ icon, title, body, children, delay = 0, featured = false }: { icon: IconName; title: string; body: string; children?: React.ReactNode; delay?: number; featured?: boolean }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className={featured ? "h-full rounded-token-lg border border-accent/30 bg-accent-soft/60 p-7 sm:p-9" : "h-full rounded-token-lg border border-line bg-surface p-7 shadow-token-sm sm:p-9"}>
        <span className={featured ? "flex h-12 w-12 items-center justify-center rounded-token bg-accent text-accent-ink" : "flex h-12 w-12 items-center justify-center rounded-token bg-accent-soft text-accent"}>
          <Icon name={icon} size={22} />
        </span>
        <h2 className="mt-6 font-display text-[24px] text-ink">{title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </Reveal>
  );
}

export default async function GivePage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const site = await getSite();
  const { onlineUrl, textNumber, textKeyword } = site.giving;
  const a = site.address;

  return (
    <>
      <PageHero eyebrow={t.give.eyebrow} title={t.give.title} intro={t.give.intro} />
      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Method icon="heart" title={t.give.online} body={t.give.onlineBody} featured>
            {onlineUrl ? (
              <Button href={onlineUrl} size="lg" icon="arrowUpRight">
                {t.give.onlineButton}
              </Button>
            ) : (
              <p className="rounded-token border border-dashed border-accent/40 bg-surface/60 px-4 py-3 text-[14px] text-ink-soft">{t.give.onlinePending}</p>
            )}
          </Method>

          <Method icon="phone" title={t.give.text} body={t.give.textBody} delay={80}>
            {textNumber ? (
              <p className="font-display text-[26px] text-ink">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">{t.give.textTo} </span>
                <a href={telHref(textNumber)} className="hover:text-accent">
                  {textNumber}
                </a>
                {textKeyword && <span className="ml-3 rounded-full bg-accent-soft px-3 py-1 font-text text-[14px] font-semibold text-accent-2">“{textKeyword}”</span>}
              </p>
            ) : (
              <p className="rounded-token border border-dashed border-line-2 px-4 py-3 text-[14px] text-muted">{t.give.onlinePending}</p>
            )}
          </Method>

          <Method icon="users" title={t.give.inPerson} body={t.give.inPersonBody} delay={160} />

          <Method icon="mail" title={t.give.byMail} body={t.give.byMailBody} delay={240}>
            <address className="font-display text-[19px] not-italic leading-snug text-ink">
              {text(site.name, locale)}
              <br />
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
          </Method>
        </div>
      </Section>

      <Section tone="soft" space="sm">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-step-2">{t.give.questions}</h2>
            <p className="mt-2 max-w-xl text-muted">{t.give.questionsBody}</p>
          </div>
          <Button href={`mailto:${site.contact.email}`} variant="ghost" icon="mail" iconPosition="left">
            {t.common.emailUs}
          </Button>
        </div>
      </Section>
    </>
  );
}
