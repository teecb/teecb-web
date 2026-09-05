"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n/locales";
import { useLiveStatus } from "@/lib/use-live-status";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { href: string; label: string };

export type HeaderProps = {
  locale: Locale;
  homeHref: string;
  name: string;
  /** Path to real crest artwork, when present in public/brand. */
  logoSrc?: string | null;
  items: NavItem[];
  give: NavItem;
  /** Where the live pill links; the pill itself appears whenever the church is live. */
  watchHref: string;
  liveLabel: string;
  initialLive: boolean;
  labels: {
    menu: string;
    close: string;
    switchToDark: string;
    switchToLight: string;
    languageSwitch: string;
  };
};

/** Sticky site header: frosted on scroll, active-link state, full-screen mobile menu. */
export function Header({ locale, homeHref, name, logoSrc, items, give, watchHref, liveLabel, initialLive, labels }: HeaderProps) {
  const pathname = usePathname();
  const liveNow = useLiveStatus(initialLive ? { id: "", title: "" } : null);
  const live = liveNow ? { href: watchHref, label: liveLabel } : undefined;
  const [scrolled, setScrolled] = useState(false);
  // The menu is "open for this pathname" so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open; Escape closes it.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === homeHref ? pathname === href : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[border-color,box-shadow] duration-300",
        scrolled || open ? "glass border-line shadow-token-sm" : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[var(--maxw)] items-center justify-between gap-4 px-[var(--gutter)] transition-[height] duration-300 ease-token",
          scrolled ? "h-[var(--nav-h-compact)]" : "h-[var(--nav-h)]",
        )}
      >
        <Logo href={homeHref} name={name} logoSrc={logoSrc} compact />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-200",
                isActive(item.href) ? "text-accent" : "text-ink-soft hover:text-accent",
                "after:absolute after:bottom-0.5 after:left-1/2 after:h-[3px] after:w-[3px] after:-translate-x-1/2 after:rounded-full after:bg-accent after:opacity-0 after:transition-opacity",
                isActive(item.href) && "after:opacity-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {live && (
            <Link
              href={live.href}
              className="mr-1 hidden items-center gap-1.5 rounded-full bg-live px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              {live.label}
            </Link>
          )}
          <span className="hidden sm:inline-flex">
            <LanguageSwitch current={locale} label={labels.languageSwitch} />
          </span>
          <ThemeToggle labelDark={labels.switchToDark} labelLight={labels.switchToLight} />
          <span className="hidden sm:inline-flex">
            <Button href={give.href} size="sm" icon="heart" iconPosition="left">
              {give.label}
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpenAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink-soft transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            <Icon name={open ? "x" : "menu"} size={19} />
            <span className="sr-only">{open ? labels.close : labels.menu}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu. The header's backdrop-filter makes it the containing block
          for fixed children, so the drawer is positioned relative to the header. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-bg lg:hidden"
      >
        <nav className="mx-auto flex max-w-[var(--maxw)] flex-col px-[var(--gutter)] py-6" aria-label="Mobile">
          {[...items, give].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
              className={cn(
                "animate-fade-up flex items-center justify-between border-b border-line py-4 font-display text-[26px] transition-colors",
                isActive(item.href) ? "text-accent" : "text-ink hover:text-accent",
              )}
            >
              {item.label}
              <Icon name="arrowRight" size={20} className="text-faint" />
            </Link>
          ))}
          {live && (
            <Link href={live.href} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-live px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              {live.label}
            </Link>
          )}
          <div className="mt-8 flex items-center gap-3">
            <LanguageSwitch current={locale} label={labels.languageSwitch} />
          </div>
        </nav>
      </div>
    </header>
  );
}
