"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Native share sheet where available, otherwise copies the link. */
export function ShareButton({ title, url, label, copiedLabel, className }: { title: string; url: string; label: string; copiedLabel: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const absolute = new URL(url, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title, url: absolute });
        return;
      }
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[14.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      <Icon name={copied ? "check" : "share"} size={16} />
      {copied ? copiedLabel : label}
    </button>
  );
}
