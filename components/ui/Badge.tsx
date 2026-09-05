import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "live" | "onDark";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted",
  accent: "bg-accent-soft text-accent-2",
  live: "bg-live text-white",
  onDark: "bg-white/12 text-hero-ink ring-1 ring-white/15",
};

/** Small uppercase pill. `tone="live"` adds the pulsing dot. */
export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {tone === "live" && <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" aria-hidden />}
      {children}
    </span>
  );
}
