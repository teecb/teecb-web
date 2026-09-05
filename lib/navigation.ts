import type { NavItem } from "@/components/site/Header";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

/** Primary navigation. Order here is the order in the header and footer. */
export function navItems(locale: Locale): { home: NavItem; items: NavItem[]; give: NavItem } {
  const t = getDictionary(locale);
  return {
    home: { href: localePath(locale), label: t.nav.home },
    items: [
      { href: localePath(locale, "/sermons"), label: t.nav.sermons },
      { href: localePath(locale, "/watch"), label: t.nav.watch },
      { href: localePath(locale, "/events"), label: t.nav.events },
      { href: localePath(locale, "/about"), label: t.nav.about },
      { href: localePath(locale, "/beliefs"), label: t.nav.beliefs },
      { href: localePath(locale, "/visit"), label: t.nav.visit },
    ],
    give: { href: localePath(locale, "/give"), label: t.nav.give },
  };
}
