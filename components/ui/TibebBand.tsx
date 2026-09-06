import { cn } from "@/lib/utils";

/**
 * A thin decorative band inspired by ጥበብ (tibeb), the woven border on
 * traditional Ethiopian dress: repeating diamonds and crosses in gold.
 */
export function TibebBand({ className, opacity = 0.7 }: { className?: string; opacity?: number }) {
  return (
    <div className={cn("h-[14px] w-full overflow-hidden", className)} aria-hidden style={{ opacity }}>
      <svg width="100%" height="14" preserveAspectRatio="none">
        <defs>
          <pattern id="tibeb" width="56" height="14" patternUnits="userSpaceOnUse">
            <path d="M7 1l6 6-6 6-6-6z" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
            <path d="M7 4.5v5M4.5 7h5" stroke="var(--gold)" strokeWidth="1.2" />
            <path d="M21 7h8" stroke="var(--gold)" strokeWidth="1.2" />
            <path d="M35 1l6 6-6 6-6-6z" fill="var(--gold)" />
            <path d="M49 7h4" stroke="var(--gold)" strokeWidth="1.2" />
            <path d="M0 0h56M0 14h56" stroke="var(--gold)" strokeWidth="0.6" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tibeb)" />
      </svg>
    </div>
  );
}
