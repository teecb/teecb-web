import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width wrapper with responsive gutters. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]", className)} {...rest} />;
}
