"use client";

import { useEffect, useState } from "react";
import { countdownParts } from "@/lib/dates";
import { cn } from "@/lib/utils";

/**
 * Live countdown to the next service. The target instant is computed on the
 * server (time-zone aware) and passed in; the client only ticks the clock.
 */
export function NextService({
  target,
  labels,
  className,
  onDark = false,
}: {
  /** ISO instant of the next service start. */
  target: string;
  labels: { startsIn: string; startingNow: string; days: string; hours: string; minutes: string; seconds: string };
  className?: string;
  onDark?: boolean;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const parts = countdownParts(new Date(target), now ?? new Date(target));
  const units = [
    [parts.days, labels.days],
    [parts.hours, labels.hours],
    [parts.minutes, labels.minutes],
    [parts.seconds, labels.seconds],
  ] as const;

  if (now && parts.total <= 0) {
    return <p className={cn("font-display text-step-2", onDark ? "text-hero-ink" : "text-ink", className)}>{labels.startingNow}</p>;
  }

  return (
    <div className={className}>
      <p className={cn("text-[12px] font-semibold uppercase tracking-[0.14em]", onDark ? "text-accent-3" : "text-accent")}>{labels.startsIn}</p>
      <div className="mt-3 flex gap-2 sm:gap-3" role="timer" aria-live="off" suppressHydrationWarning>
        {units.map(([value, label], index) => (
          <div
            key={label}
            className={cn(
              "flex min-w-[64px] flex-col items-center rounded-token px-3 py-3 sm:min-w-[76px]",
              onDark ? "bg-white/8 ring-1 ring-white/10" : "bg-surface-2",
              index === 0 && parts.days === 0 && "hidden",
            )}
          >
            <span className={cn("font-display text-[28px] leading-none tabular-nums sm:text-[34px]", onDark ? "text-hero-ink" : "text-ink")} suppressHydrationWarning>
              {String(value).padStart(2, "0")}
            </span>
            <span className={cn("mt-1.5 text-[11px] font-medium uppercase tracking-[0.1em]", onDark ? "text-hero-muted" : "text-muted")}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
