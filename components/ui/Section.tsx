import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "default" | "soft" | "dark";
type Space = "sm" | "md" | "lg";

const tones: Record<Tone, string> = {
  default: "",
  soft: "bg-bg-2",
  dark: "bg-dark text-hero-ink",
};

const spaces: Record<Space, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
};

/** Vertical rhythm wrapper. `bleed` skips the inner Container. */
export function Section({
  id,
  tone = "default",
  space = "md",
  bleed = false,
  className,
  containerClassName,
  children,
  ...rest
}: {
  id?: string;
  tone?: Tone;
  space?: Space;
  bleed?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} className={cn("relative", tones[tone], spaces[space], className)} {...rest}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
