"use client";

import { useEffect, useState } from "react";
import type { LiveStatusResponse } from "@/app/api/live/route";

export type LiveVideo = { id: string; title: string };

const POLL_MS = 45_000;

/**
 * Keeps live status fresh while the tab is visible. Starts from the
 * server-rendered value so there is no flash, then polls `/api/live`.
 */
export function useLiveStatus(initial: LiveVideo | null): LiveVideo | null {
  const [live, setLive] = useState<LiveVideo | null>(initial);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    async function check() {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as LiveStatusResponse;
        if (cancelled) return;
        setLive((current) => {
          if (data.status !== "live") return current === null ? current : null;
          return current?.id === data.videoId ? current : { id: data.videoId, title: data.title };
        });
      } catch {
        /* transient network error; try again next tick */
      }
    }

    function schedule() {
      timer = setTimeout(async () => {
        await check();
        if (!cancelled) schedule();
      }, POLL_MS);
    }

    const onVisible = () => document.visibilityState === "visible" && void check();
    document.addEventListener("visibilitychange", onVisible);
    schedule();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return live;
}
