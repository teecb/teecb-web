import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The church mark: a cross set inside an arched window. */
export function LogoMark({ className, size = 34 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={cn("shrink-0", className)} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" fill="currentColor" />
      <path d="M11 31V20a9 9 0 0 1 18 0v11" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <path d="M20 13v16M15 19h10" fill="none" stroke="var(--gold)" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/** The crest artwork when the church has supplied one, else the built-in mark. */
export function BrandMark({ src, size = 36, className }: { src: string | null; size?: number; className?: string }) {
  if (!src) return <LogoMark className={cn("text-logo", className)} size={size} />;
  return <Image src={src} alt="" width={size} height={size} priority className={cn("shrink-0 object-contain", className)} style={{ width: size, height: size }} />;
}

/** Mark + wordmark, linking home. */
export function Logo({ href, name, logoSrc = null, compact = false, onDark = false }: { href: string; name: string; logoSrc?: string | null; compact?: boolean; onDark?: boolean }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-3 rounded-full", onDark ? "text-hero-ink" : "text-ink")}
      aria-label={name}
    >
      <BrandMark src={logoSrc} size={compact ? 34 : 38} className="transition-transform duration-300 ease-token group-hover:-rotate-3" />
      <span className={cn("font-display text-[17px] font-semibold tracking-tight", compact && "hidden sm:inline")}>{name}</span>
    </Link>
  );
}
