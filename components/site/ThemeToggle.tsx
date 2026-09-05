"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "teecb-theme";

function currentPreference(): "light" | "dark" {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* private mode */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Light/dark toggle. Icon visibility is pure CSS off html[data-theme]
 * (see globals.css), so there is no React state and no hydration mismatch.
 * The pre-paint <ThemeScript> sets the attribute first; the effect below
 * re-applies it after hydration and keeps following the system preference
 * until the visitor chooses a theme.
 */
export function ThemeToggle({ labelDark, labelLight, className }: { labelDark: string; labelLight: string; className?: string }) {
  useEffect(() => {
    apply(currentPreference());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply(currentPreference());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink-soft transition-colors duration-200 hover:border-accent hover:text-accent",
        className,
      )}
    >
      <span className="theme-icon-light">
        <Icon name="moon" size={17} />
        <span className="sr-only">{labelDark}</span>
      </span>
      <span className="theme-icon-dark">
        <Icon name="sun" size={17} />
        <span className="sr-only">{labelLight}</span>
      </span>
    </button>
  );
}
