import type { Metadata } from "next";
import { SermonArchive } from "@/components/sermons/SermonArchive";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getSite } from "@/lib/cms";
import { getDictionary, resolveLocale, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getChannelFeed } from "@/lib/youtube";

export async function generateMetadata(props: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/sermons", title: t.sermons.title, description: t.sermons.intro });
}

export default async function SermonsPage(props: LangParams) {
  const locale = await resolveLocale(props);
  const t = getDictionary(locale);
  const [site, feed] = await Promise.all([getSite(), getChannelFeed(50)]);

  return (
    <>
      <PageHero
        eyebrow={t.sermons.eyebrow}
        title={t.sermons.title}
        intro={t.sermons.intro}
        aside={
          <Button href={site.youtube.channelUrl} variant="ghost" icon="youtube" iconPosition="left">
            {t.sermons.visitChannel}
          </Button>
        }
      />
      <Section>
        {feed.videos.length > 0 ? (
          <SermonArchive
            videos={feed.videos}
            locale={locale}
            timeZone={site.timeZone}
            labels={{
              search: t.sermons.searchLabel,
              placeholder: t.sermons.searchPlaceholder,
              noResults: t.sermons.noResults,
              clear: t.sermons.clearSearch,
              result: t.sermons.result,
              results: t.sermons.results,
              minutes: t.common.minutes,
            }}
          />
        ) : (
          <div className="mx-auto max-w-xl rounded-token-lg border border-dashed border-line-2 p-10 text-center">
            <p className="text-muted">{feed.status === "unconfigured" ? t.sermons.unconfigured : feed.status === "unavailable" ? t.watch.unavailable : t.sermons.empty}</p>
            <div className="mt-6">
              <Button href={site.youtube.channelUrl} icon="youtube" iconPosition="left">
                {t.sermons.visitChannel}
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
