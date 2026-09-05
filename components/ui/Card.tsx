import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Lift on hover; use for cards that are links or contain one primary action. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddings = { none: "", sm: "p-5", md: "p-6 sm:p-7", lg: "p-7 sm:p-9" };

/** Surface panel with token border, radius, and shadow. */
export function Card({ className, interactive = false, padding = "md", ...rest }: Props) {
  return (
    <div
      className={cn(
        "rounded-token-lg border border-line bg-surface shadow-token-sm",
        "transition-[transform,box-shadow,border-color] duration-300 ease-token",
        interactive && "hover:-translate-y-1 hover:border-line-2 hover:shadow-token-md",
        paddings[padding],
        className,
      )}
      {...rest}
    />
  );
}
