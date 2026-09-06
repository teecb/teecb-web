"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { countdownParts } from "@/lib/dates";
import { fill } from "@/lib/i18n/format";

const WINDOW_MS = 8 * 60 * 60_000;

/**
 * On Sunday morning the hero grows a gold pill: "We go live at 10:00 AM · in
 * 2h 14m". Renders nothing outside the eight hours before a service, so most
 * of the week it is invisible.
 */
export function LiveSoon({ startsAt, timeLabel, href, labels }: { startsAt: string; timeLabel: string; href: string; labels: { soon: string; now: string; h: string; m: string } }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (!now) return null;
  const target = new Date(startsAt);
  const remaining = target.getTime() - now.getTime();
  if (remaining > WINDOW_MS || remaining < -90 * 60_000) return null;

  const { hours, minutes } = countdownParts(target, now);
  const countdown = hours > 0 ? `${hours}${labels.h} ${minutes}${labels.m}` : `${minutes}${labels.m}`;
  const text = remaining <= 60_000 ? fill(labels.now, { time: timeLabel }) : fill(labels.soon, { time: timeLabel, countdown });

  return (
    <Link
      href={href}
      className="mt-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-4 py-2 text-[13.5px] font-semibold text-accent-3 transition-colors hover:bg-gold/25"
    >
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent-3" aria-hidden />
      {text}
      <Icon name="arrowRight" size={14} />
    </Link>
  );
}
