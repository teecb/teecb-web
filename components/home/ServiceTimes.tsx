import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceTime } from "@/lib/content/types";
import { serviceTimeLabel, weekdayName } from "@/lib/dates";
import { text, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Grid of weekly gatherings; the primary service is highlighted. */
export function ServiceTimes({
  services,
  locale,
  highlight,
  className,
}: {
  services: ServiceTime[];
  locale: Locale;
  /** An extra card for a gathering without a fixed slot yet (e.g. youth in English). */
  highlight?: { tag: string; title: string; body: string };
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", services.length + (highlight ? 1 : 0) > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {services.map((service, index) => (
        <Reveal key={`${service.dayOfWeek}-${service.startTime}`} delay={index * 70} className="h-full">
          <div
            className={cn(
              "flex h-full flex-col rounded-token-lg border p-6 sm:p-7",
              service.isPrimary ? "border-accent/30 bg-accent-soft/60" : "border-line bg-surface shadow-token-sm",
            )}
          >
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
              <Icon name="calendar" size={15} />
              {weekdayName(service.dayOfWeek, locale)}
            </p>
            <p className="mt-4 font-display text-[34px] leading-none text-ink">{serviceTimeLabel(service, locale)}</p>
            <p className="mt-2 text-[16px] font-medium text-ink-soft">{text(service.name, locale)}</p>
            {service.note && <p className="mt-1 text-[14px] text-muted">{text(service.note, locale)}</p>}
          </div>
        </Reveal>
      ))}
      {highlight && (
        <Reveal delay={services.length * 70} className="h-full">
          <div className="relative isolate flex h-full flex-col overflow-hidden rounded-token-lg bg-dark p-6 text-hero-ink sm:p-7">
            <div className="mesh opacity-70" aria-hidden />
            <p className="relative flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-3">
              <Icon name="users" size={15} />
              {highlight.tag}
            </p>
            <p className="relative mt-4 font-display text-[26px] leading-tight text-hero-ink">{highlight.title}</p>
            <p className="relative mt-2 text-[14.5px] leading-relaxed text-hero-muted">{highlight.body}</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
