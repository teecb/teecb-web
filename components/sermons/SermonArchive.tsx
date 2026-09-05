"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n";
import type { Video } from "@/lib/youtube";
import { SermonCard } from "./SermonCard";

/** Searchable grid of recordings. Filtering is instant and client-side. */
export function SermonArchive({
  videos,
  locale,
  timeZone,
  labels,
}: {
  videos: Video[];
  locale: Locale;
  timeZone: string;
  labels: { search: string; placeholder: string; noResults: string; clear: string; result: string; results: string; minutes: string };
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter((v) => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q));
  }, [videos, deferred]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">{labels.search}</span>
          <Icon name="search" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder}
            className="h-12 w-full rounded-full border border-line-2 bg-surface pl-11 pr-11 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-faint hover:text-accent"
            >
              <Icon name="x" size={15} />
              <span className="sr-only">{labels.clear}</span>
            </button>
          )}
        </label>
        <p className="text-sm text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? labels.result : labels.results}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-token-lg border border-dashed border-line-2 p-10 text-center text-muted">{labels.noResults}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, index) => (
            <SermonCard key={video.id} video={video} locale={locale} timeZone={timeZone} minutesLabel={labels.minutes} priority={index < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
