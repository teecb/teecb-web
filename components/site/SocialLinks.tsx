import { Icon, type IconName } from "@/components/ui/Icon";
import type { SocialLink } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const icons: Record<SocialLink["platform"], IconName> = {
  youtube: "youtube",
  facebook: "facebook",
  instagram: "instagram",
  tiktok: "tiktok",
  x: "x",
  telegram: "send",
  other: "social",
};

export function SocialLinks({ links, className, onDark = false }: { links: SocialLink[]; className?: string; onDark?: boolean }) {
  if (!links.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200",
              onDark
                ? "border-white/15 text-hero-ink/80 hover:border-accent-3 hover:text-accent-3"
                : "border-line-2 text-ink-soft hover:border-accent hover:text-accent",
            )}
          >
            <Icon name={icons[link.platform] ?? "social"} size={18} />
            <span className="sr-only">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
