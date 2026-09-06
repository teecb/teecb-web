import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { TibebBand } from "@/components/ui/TibebBand";
import type { SiteSettings } from "@/lib/content/types";
import { serviceTimeLabel, weekdayName } from "@/lib/dates";
import { type Dictionary, localePath, text, type Locale } from "@/lib/i18n";
import { mapsSearchUrl, telHref } from "@/lib/utils";
import { BrandMark } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import type { NavItem } from "./Header";

export function Footer({ site, locale, t, items, logoSrc = null }: { site: SiteSettings; locale: Locale; t: Dictionary; items: NavItem[]; logoSrc?: string | null }) {
  const year = new Date().getFullYear();
  const address = `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

  return (
    <footer className="relative mt-auto overflow-hidden bg-dark text-hero-ink">
      <div className="mesh opacity-40" aria-hidden />
      <div className="grain" aria-hidden />
      <TibebBand className="relative" opacity={0.5} />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark src={logoSrc} size={40} className="text-[var(--dark-3)]" />
              <span className="max-w-xs font-display text-[19px] font-semibold leading-tight">{text(site.name, locale)}</span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-hero-muted">{text(site.tagline, locale)}</p>
            <SocialLinks links={site.socials} className="mt-6" onDark />
          </div>

          <div>
            <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-accent-3">{t.footer.explore}</h4>
            <ul className="mt-5 space-y-2.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] text-hero-ink/85 transition-colors hover:text-accent-3">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-accent-3">{t.footer.gather}</h4>
            <ul className="mt-5 space-y-3 text-[15px]">
              {site.services.map((service) => (
                <li key={`${service.dayOfWeek}-${service.startTime}`}>
                  <span className="block text-hero-ink">{text(service.name, locale)}</span>
                  <span className="text-hero-muted">
                    {weekdayName(service.dayOfWeek, locale)} · {serviceTimeLabel(service, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-accent-3">{t.footer.contact}</h4>
            <address className="mt-5 space-y-3 not-italic text-[15px]">
              <a href={site.address.mapUrl ?? mapsSearchUrl(address)} target="_blank" rel="noreferrer" className="group flex gap-3 text-hero-ink/85 transition-colors hover:text-accent-3">
                <Icon name="mapPin" size={18} className="mt-0.5 shrink-0 text-accent-3" />
                <span>
                  {site.address.line1}
                  {site.address.line2 && (
                    <>
                      <br />
                      {site.address.line2}
                    </>
                  )}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex gap-3 text-hero-ink/85 transition-colors hover:text-accent-3">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-accent-3" />
                <span className="break-all">{site.contact.email}</span>
              </a>
              {site.contact.phone && (
                <a href={telHref(site.contact.phone)} className="flex gap-3 text-hero-ink/85 transition-colors hover:text-accent-3">
                  <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-accent-3" />
                  <span>{site.contact.phone}</span>
                </a>
              )}
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-hero-ink/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {text(site.name, locale)}. {t.footer.rights}
          </p>
          <p className="flex items-center gap-4">
            <Link href={localePath(locale, "/watch")} className="transition-colors hover:text-accent-3">
              {t.nav.watch}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
