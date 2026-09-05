import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomePage } from "@/lib/content/types";
import { text, type Locale } from "@/lib/i18n";

export function VerseBlock({ verse, locale, eyebrow }: { verse: NonNullable<HomePage["verse"]>; locale: Locale; eyebrow: string }) {
  return (
    <Container className="py-4">
      <Reveal>
        <figure className="relative isolate overflow-hidden rounded-token-xl bg-dark px-6 py-14 text-center text-hero-ink sm:px-16 sm:py-20">
          <div className="mesh" aria-hidden />
          <div className="grain" aria-hidden />
          <p className="relative text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-3">{eyebrow}</p>
          <blockquote className="relative mx-auto mt-6 max-w-3xl font-display text-step-2 leading-snug text-hero-ink">
            <span className="text-accent-3">“</span>
            {text(verse.text, locale)}
            <span className="text-accent-3">”</span>
          </blockquote>
          <figcaption className="relative mt-6 text-[14px] font-semibold uppercase tracking-[0.14em] text-hero-muted">{text(verse.reference, locale)}</figcaption>
        </figure>
      </Reveal>
    </Container>
  );
}
