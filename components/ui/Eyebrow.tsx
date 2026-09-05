import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase label with a leading rule, used above headings. */
export function Eyebrow({ className, rule = true, children }: { className?: string; rule?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent",
        rule && "before:h-px before:w-6 before:bg-current before:opacity-60 before:content-['']",
        className,
      )}
    >
      {children}
    </span>
  );
}
