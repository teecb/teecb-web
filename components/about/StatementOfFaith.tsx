"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Belief, BeliefCopy } from "@/lib/content/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Lang = "am" | "en";

function copyFor(item: Belief, lang: Lang): BeliefCopy | undefined {
  return lang === "am" ? item.amharic : item.english;
}

function hasEnglish(items: Belief[]): boolean {
  return items.some((item) => item.english);
}

function Item({ item, lang, open, onToggle, nested = false }: { item: Belief; lang: Lang; open: Set<string>; onToggle: (n: string) => void; nested?: boolean }) {
  const copy = copyFor(item, lang) ?? item.amharic;
  const isOpen = open.has(item.number);
  const panelId = `belief-${item.number.replace(/\W/g, "-")}`;

  return (
    <div className={cn(nested ? "border-t border-line pt-5" : "rounded-token-lg border border-line bg-surface p-5 sm:p-7")}>
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => onToggle(item.number)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 text-left"
        >
          <span className="mt-1 w-8 shrink-0 font-display text-[13px] font-semibold tracking-[0.08em] text-accent">{item.number}</span>
          <span lang={lang} className={cn("flex-1 text-[20px] leading-snug text-ink sm:text-[23px]", lang === "am" ? "font-ethiopic font-semibold" : "font-display")}>
            {copy.title}
          </span>
          <span className={cn("mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300", isOpen && "rotate-45")}>
            <Icon name="plus" size={15} />
          </span>
        </button>
      </h3>
      <div id={panelId} hidden={!isOpen} lang={lang} className="pl-12 pr-2">
        {copy.body && <p className={cn("mt-4 text-[16.5px] text-ink-soft", lang === "am" ? "leading-[1.95]" : "leading-relaxed")}>{copy.body}</p>}
        {copy.references && <p className="mt-4 text-[14px] leading-7 text-muted">({copy.references})</p>}
        {item.subSections && (
          <div className="mt-6 space-y-5">
            {item.subSections.map((sub) => (
              <Item key={sub.number} item={sub} lang={lang} open={open} onToggle={onToggle} nested />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Accordion of the Statement of Faith. Amharic is the authoritative text;
 * English shows only when the church has supplied an approved translation.
 */
export function StatementOfFaith({ sections, englishApproved, locale, t }: { sections: Belief[]; englishApproved: boolean; locale: Locale; t: Dictionary }) {
  const englishReady = hasEnglish(sections);
  const [lang, setLang] = useState<Lang>(locale === "en" && englishReady ? "en" : "am");
  const [open, setOpen] = useState<Set<string>>(() => new Set(sections[0] ? [sections[0].number] : []));

  const all = (items: Belief[]): string[] => items.flatMap((i) => [i.number, ...(i.subSections ? all(i.subSections) : [])]);
  const toggle = (n: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        {englishReady ? (
          <div className="inline-flex rounded-full border border-line-2 p-1 text-[13px] font-semibold">
            {(["am", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn("rounded-full px-4 py-1.5 transition-colors", lang === l ? "bg-ink text-canvas" : "text-ink-soft hover:text-accent")}
              >
                {l === "am" ? "አማርኛ" : "English"}
              </button>
            ))}
          </div>
        ) : (
          locale === "en" && <p className="max-w-xl text-[14.5px] text-muted">{t.about.translationPending}</p>
        )}
        <div className="flex gap-4 text-[13.5px] font-semibold text-accent">
          <button type="button" onClick={() => setOpen(new Set(all(sections)))} className="hover:text-accent-2">
            {t.about.expandAll}
          </button>
          <button type="button" onClick={() => setOpen(new Set())} className="hover:text-accent-2">
            {t.about.collapseAll}
          </button>
        </div>
      </div>
      {lang === "en" && !englishApproved && (
        <p className="mb-6 rounded-token border border-gold/40 bg-gold-soft px-4 py-3 text-[14px] text-ink-soft">{t.about.translationDraft}</p>
      )}
      <div className="space-y-4">
        {sections.map((section) => (
          <Item key={section.number} item={section} lang={lang} open={open} onToggle={toggle} />
        ))}
      </div>
    </div>
  );
}
