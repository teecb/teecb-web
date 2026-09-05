import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

/** Eyebrow + heading (+ optional intro and trailing link) used to open a section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  align = "left",
  className,
  id,
  onDark = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  link?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
  id?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex gap-6",
        align === "center" ? "flex-col items-center text-center" : "flex-col sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow className={cn("mb-4", onDark && "text-accent-3", align === "center" && "before:hidden")}>{eyebrow}</Eyebrow>}
        <h2 id={id} className={cn("text-step-3", onDark ? "text-hero-ink" : "text-ink")}>
          {title}
        </h2>
        {intro && <p className={cn("mt-4 text-step-0", onDark ? "text-hero-muted" : "text-muted")}>{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors",
            onDark ? "text-accent-3 hover:text-hero-ink" : "text-accent hover:text-accent-2",
          )}
        >
          {link.label}
          <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
