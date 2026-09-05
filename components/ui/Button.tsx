import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-semibold leading-none transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-token active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-accent text-accent-ink shadow-token-accent hover:bg-accent-2 hover:-translate-y-0.5",
  secondary: "border-transparent bg-surface-2 text-ink hover:bg-surface-3",
  ghost: "border-line-2 bg-transparent text-ink hover:border-accent hover:text-accent",
  light: "border-transparent bg-hero-ink text-navy hover:-translate-y-0.5 hover:bg-white",
  "outline-light": "border-hero-ink/35 bg-transparent text-hero-ink hover:border-hero-ink hover:bg-hero-ink/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13.5px]",
  md: "h-11 px-[22px] text-[14.5px]",
  lg: "h-[52px] px-7 text-[15.5px]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: IconName;
  iconPosition?: "left" | "right";
};

/** Props consumed here rather than forwarded to the DOM element. */
const ownProps = new Set(["variant", "size", "className", "children", "icon", "iconPosition", "href", "external", "ariaLabel"]);

type ButtonProps = BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = BaseProps & { href: string; external?: boolean; ariaLabel?: string };

/** Renders a Next `<Link>` when `href` is set, otherwise a `<button>`. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, icon, iconPosition = "right" } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const glyph = icon ? (
    <Icon
      name={icon}
      size={size === "sm" ? 15 : 17}
      className={cn(
        "shrink-0 transition-transform duration-200",
        icon === "arrowRight" && "group-hover/btn:translate-x-0.5",
        icon === "arrowUpRight" && "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
      )}
    />
  ) : null;
  const content = (
    <>
      {iconPosition === "left" && glyph}
      <span>{children}</span>
      {iconPosition === "right" && glyph}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const external = props.external ?? isExternalHref(props.href);
    if (external) {
      return (
        <a href={props.href} className={classes} target={props.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={props.ariaLabel}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} aria-label={props.ariaLabel}>
        {content}
      </Link>
    );
  }

  const buttonProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !ownProps.has(key)),
  ) as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
