"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, locales, switchLocalePath, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

/**
 * አማ / EN segmented switch. Links to the same page in the other language and
 * remembers the choice in a cookie so `proxy.ts` sends the visitor there next time.
 */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitch({ current, label, className }: { current: Locale; label: string; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={cn("inline-flex h-10 items-center rounded-full border border-line-2 p-1 text-[12.5px] font-semibold", className)}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={cn(
              "flex h-full items-center rounded-full px-2.5 transition-colors duration-200",
              active ? "bg-ink text-canvas" : "text-ink-soft hover:text-accent",
            )}
          >
            {locale === "am" ? "አማ" : "EN"}
            <span className="sr-only"> · {localeNames[locale]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
