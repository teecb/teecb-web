import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

/** Interior-page opener: eyebrow, large title, intro, optional actions. */
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  aside,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden border-b border-line bg-bg-2", className)}>
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-3/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative flex flex-col gap-8 py-14 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow className="mb-5 animate-fade-up">{eyebrow}</Eyebrow>}
          <h1 className="animate-fade-up text-step-4 [--delay:60ms]">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl animate-fade-up text-step-1 text-muted [--delay:120ms]">{intro}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [--delay:180ms]">{actions}</div>}
        </div>
        {aside && <div className="shrink-0 animate-fade-up [--delay:200ms]">{aside}</div>}
      </Container>
    </div>
  );
}
