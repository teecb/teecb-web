import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HomePage, SiteSettings } from "@/lib/content/types";
import { primaryService, serviceTimeLabel, weekdayName } from "@/lib/dates";
import { localePath, text, type Dictionary, type Locale } from "@/lib/i18n";
import type { LiveStream } from "@/lib/youtube";
import { isExternalHref } from "@/lib/utils";

/** Decorative arch + cross, echoing the logo, drawn large and faint. */
function ArchMark() {
  return (
    <svg
      viewBox="0 0 200 220"
      className="pointer-events-none absolute -right-10 top-1/2 hidden h-[560px] w-auto -translate-y-1/2 opacity-[0.16] lg:block"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d08a" />
          <stop offset="1" stopColor="#c9a24a" />
        </linearGradient>
      </defs>
      <path d="M30 210V100a70 70 0 0 1 140 0v110" stroke="url(#hero-cg)" strokeWidth="6" strokeLinecap="round" />
      <path d="M100 40v130M55 90h90" stroke="url(#hero-cg)" strokeWidth="14" strokeLinecap="round" />
      <circle cx="100" cy="100" r="92" stroke="url(#hero-cg)" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export function Hero({
  locale,
  site,
  home,
  live,
  t,
}: {
  locale: Locale;
  site: SiteSettings;
  home: HomePage;
  live: LiveStream;
  t: Dictionary;
}) {
  const isLive = live.status === "live";
  const service = primaryService(site.services);
  const prayer = site.services.find((s) => !s.isPrimary && s !== service);
  const href = (h: string) => (isExternalHref(h) ? h : localePath(locale, h));

  const facts = [
    service && { k: text(service.name, locale), v: `${weekdayName(service.dayOfWeek, locale, "short")} · ${serviceTimeLabel(service, locale)}` },
    prayer && { k: text(prayer.name, locale), v: `${weekdayName(prayer.dayOfWeek, locale, "short")} · ${serviceTimeLabel(prayer, locale)}` },
    { k: t.visit.findUs, v: site.address.line1 },
    { k: t.visit.expectLanguages, v: `አማርኛ · ${t.home.youthShort}` },
  ].filter((f): f is { k: string; v: string } => Boolean(f));

  return (
    <section className="relative isolate overflow-hidden bg-dark text-hero-ink">
      <div className="mesh" aria-hidden />
      <div className="grain" aria-hidden />
      <ArchMark />
      <Container className="relative flex min-h-[min(calc(100svh-var(--nav-h)),820px)] flex-col justify-center py-16 sm:py-24">
        <div className="max-w-3xl">
          {isLive ? (
            <Badge tone="live" className="animate-fade-up">
              {t.common.liveNow}
            </Badge>
          ) : (
            service && (
              <p className="inline-flex animate-fade-up items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-accent-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-3" aria-hidden />
                {t.home.nextGathering} · {weekdayName(service.dayOfWeek, locale)} {serviceTimeLabel(service, locale)}
              </p>
            )
          )}
          <h1 className="mt-6 animate-fade-up text-step-5 text-hero-ink [--delay:80ms]">
            {text(home.hero.heading, locale)}{" "}
            {home.hero.emphasis && <em className="font-normal text-accent-3">{text(home.hero.emphasis, locale)}</em>}
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-step-1 leading-relaxed text-hero-muted [--delay:160ms]">{text(home.hero.body, locale)}</p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [--delay:240ms]">
            {isLive ? (
              <Button href={localePath(locale, "/watch")} variant="light" size="lg" icon="play" iconPosition="left">
                {t.common.watchLive}
              </Button>
            ) : (
              <Button href={href(home.hero.primaryCta.href)} variant="light" size="lg" icon="arrowRight">
                {text(home.hero.primaryCta.label, locale)}
              </Button>
            )}
            {home.hero.secondaryCta && (
              <Button href={href(home.hero.secondaryCta.href)} variant="outline-light" size="lg" icon="play" iconPosition="left">
                {text(home.hero.secondaryCta.label, locale)}
              </Button>
            )}
          </div>
        </div>

        <dl className="mt-16 grid animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-token-lg bg-white/10 ring-1 ring-white/10 backdrop-blur-sm sm:mt-20 lg:grid-cols-4 [--delay:320ms]">
          {facts.map((fact) => (
            <div key={fact.k} className="bg-dark/40 px-5 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-3">{fact.k}</dt>
              <dd className="mt-1 font-display text-[17px] leading-snug text-hero-ink">{fact.v}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
