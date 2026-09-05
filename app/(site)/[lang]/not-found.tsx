"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary, isLocale, localePath, type Locale } from "@/lib/i18n";

/** Localized 404. The locale comes from the URL because not-found receives no params. */
export default function NotFound() {
  const pathname = usePathname();
  const first = pathname.split("/")[1];
  const locale: Locale = isLocale(first) ? first : "en";
  const t = getDictionary(locale);

  return (
    <Section space="lg">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-display text-[88px] leading-none text-accent/25">404</p>
        <h1 className="mt-2 text-step-3">{t.notFound.title}</h1>
        <p className="mt-4 text-muted">{t.notFound.body}</p>
        <div className="mt-8">
          <Button href={localePath(locale)} icon="arrowLeft" iconPosition="left">
            {t.notFound.goHome}
          </Button>
        </div>
      </div>
    </Section>
  );
}
