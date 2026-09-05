import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/media/ShareButton";
import { YouTubePlayer } from "@/components/media/YouTubePlayer";
import { SermonCard } from "@/components/sermons/SermonCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/cms";
import { formatDate, formatDuration } from "@/lib/dates";
import { getDictionary, localePath, resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { truncate, youtubeWatchUrl } from "@/lib/utils";
import { getChannelFeed, getVideo } from "@/lib/youtube";

type Props = { params: Promise<{ lang: string; videoId: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const locale = await resolveLocale(props);
  const { videoId } = await props.params;
  const video = await getVideo(videoId);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/sermons/${videoId}`,
    title: video?.title ?? t.sermons.notFoundTitle,
    description: video ? truncate(video.description || video.title, 160) : undefined,
    image: video?.thumbnailUrl,
  });
}

/** Turn a YouTube description into paragraphs with clickable links. */
function Description({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const linkify = (line: string) =>
    line.split(/(https?:\/\/\S+)/g).map((part, i) =>
      /^https?:\/\//.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="break-all text-accent underline underline-offset-4">
          {part}
        </a>
      ) : (
        part
      ),
    );
  return (
    <div className="prose-church">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {linkify(p)}
        </p>
      ))}
    </div>
  );
}

export default async function SermonPage(props: Props) {
  const locale = await resolveLocale(props);
  const { videoId } = await props.params;
  const t = getDictionary(locale);
  const [site, video] = await Promise.all([getSite(), getVideo(videoId)]);
  if (!video) notFound();

  const feed = await getChannelFeed(12);
  const more = feed.videos.filter((v) => v.id !== video.id).slice(0, 3);
  const duration = formatDuration(video.durationSeconds, t.common.minutes);
  const path = localePath(locale, `/sermons/${video.id}`);

  return (
    <>
      <div className="bg-dark">
        <Container className="pt-6 sm:pt-8">
          <Link href={localePath(locale, "/sermons")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-hero-muted transition-colors hover:text-hero-ink">
            <Icon name="arrowLeft" size={16} />
            {t.sermons.allSermons}
          </Link>
        </Container>
        <Container className="py-6 sm:py-8">
          <YouTubePlayer videoId={video.id} title={video.title} poster={video.thumbnailUrl} playLabel={t.sermons.play} className="rounded-token-lg shadow-token-lg ring-1 ring-white/10" />
        </Container>
      </div>

      <Section space="sm">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-muted">
              {video.publishedAt && (
                <time dateTime={video.publishedAt} className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" size={15} className="text-accent" />
                  {formatDate(video.publishedAt, locale, site.timeZone)}
                </time>
              )}
              {duration && (
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" size={15} className="text-accent" />
                  {duration}
                </span>
              )}
            </p>
            <h1 className="mt-3 text-step-3">{video.title}</h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShareButton title={video.title} url={path} label={t.common.share} copiedLabel={t.common.linkCopied} />
              <Button href={youtubeWatchUrl(video.id)} variant="ghost" icon="arrowUpRight">
                {t.common.watchOnYouTube}
              </Button>
            </div>
            {video.description && (
              <div className="mt-10">
                <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.sermons.description}</h2>
                <Description text={video.description} />
              </div>
            )}
          </article>

          <aside className="lg:pt-2">
            <div className="rounded-token-lg border border-line bg-surface p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.watch.title}</p>
              <p className="mt-3 text-[15px] text-muted">{t.watch.introOffline}</p>
              <div className="mt-5">
                <Button href={localePath(locale, "/watch")} size="sm" icon="play" iconPosition="left">
                  {t.common.watchLive}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="soft">
          <SectionHeading eyebrow={t.sermons.latest} title={t.sermons.moreSermons} link={{ href: localePath(locale, "/sermons"), label: t.sermons.allSermons }} />
          <div className="grid gap-5 md:grid-cols-3">
            {more.map((v) => (
              <SermonCard key={v.id} video={v} locale={locale} timeZone={site.timeZone} minutesLabel={t.common.minutes} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
