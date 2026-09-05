"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";

const STORAGE_KEY = "teecb-announcement-dismissed";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readDismissed(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeDismissed(text: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, text);
  } catch {
    /* private mode */
  }
  listeners.forEach((listener) => listener());
}

/**
 * Slim announcement bar above the header. Dismissal is remembered per message
 * for the browsing session, so a new announcement reappears.
 */
export function Announcement({
  label,
  text,
  href,
  dismissLabel,
}: {
  label?: string;
  text: string;
  href?: string;
  dismissLabel: string;
}) {
  // Server renders the bar; the client hides it if this exact message was dismissed.
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => null);
  if (dismissed === text) return null;

  const inner = (
    <span className="inline-flex max-w-full items-center justify-center gap-x-2.5">
      {label && (
        <span className="hidden shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-accent-ink sm:inline">{label}</span>
      )}
      <span className="truncate">{text}</span>
      {href && <Icon name="arrowRight" size={14} className="hidden shrink-0 opacity-70 sm:inline" />}
    </span>
  );

  return (
    <div className="relative bg-dark px-10 py-2.5 text-center text-[13.5px] text-hero-ink sm:px-12">
      <div className="mesh opacity-60" aria-hidden />
      <div className="relative flex justify-center">{href ? <Link href={href} className="flex min-w-0 max-w-full hover:underline underline-offset-4">{inner}</Link> : inner}</div>
      <button
        type="button"
        onClick={() => writeDismissed(text)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-hero-ink/60 transition-colors hover:bg-white/10 hover:text-hero-ink"
      >
        <Icon name="x" size={15} />
        <span className="sr-only">{dismissLabel}</span>
      </button>
    </div>
  );
}
