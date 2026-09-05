/**
 * The content contract between data and UI.
 *
 * Every page reads these shapes and nothing else. They are populated either
 * from Sanity (see `lib/cms`) or from the local fallback content in this
 * folder, so the UI never needs to know where a value came from.
 */
import type { PortableTextBlock } from "next-sanity";
import type { Localized } from "@/lib/i18n/localized";

export type { Localized };

/** Editorial rich text (paragraphs, links, lists) in one or both languages. */
export type RichText = Localized<PortableTextBlock[]>;

export type Link = {
  label: Localized;
  href: string;
  /** Opens in a new tab; inferred from the href when omitted. */
  external?: boolean;
};

export type SocialPlatform = "youtube" | "facebook" | "instagram" | "tiktok" | "x" | "telegram" | "other";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

/** 0 = Sunday … 6 = Saturday (matches `Date.prototype.getDay`). */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ServiceTime = {
  name: Localized;
  dayOfWeek: DayOfWeek;
  /** 24-hour local time in the site's time zone, e.g. "10:00". */
  startTime: string;
  durationMinutes?: number;
  note?: Localized;
  /** The main weekly worship service; drives the "next service" countdown. */
  isPrimary?: boolean;
};

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country?: string;
  /** Outbound maps link (Google/Apple). Never an embed snippet. */
  mapUrl?: string;
  parkingNote?: Localized;
};

export type WatchMode = "auto" | "forceLive" | "forceOffline";

export type Announcement = {
  label?: Localized;
  text: Localized;
  href?: string;
  /** ISO datetimes; the bar only shows inside this window when set. */
  startsAt?: string;
  endsAt?: string;
};

export type SiteSettings = {
  name: Localized;
  shortName: Localized;
  tagline: Localized;
  description: Localized;
  /** IANA zone used for every date/time on the site. */
  timeZone: string;
  address: Address;
  contact: {
    email: string;
    phone?: string;
  };
  services: ServiceTime[];
  socials: SocialLink[];
  youtube: {
    channelUrl: string;
  };
  watch: {
    mode: WatchMode;
    /** Direct YouTube video URL; used only when mode is `forceLive`. */
    liveVideoUrl?: string;
  };
  giving: {
    /** Vanco Give+ (or similar) hosted giving page. */
    onlineUrl?: string;
    textNumber?: string;
    textKeyword?: string;
  };
  announcement?: Announcement | null;
};

export type HomePage = {
  hero: {
    eyebrow?: Localized;
    heading: Localized;
    /** Optional italic emphasis rendered inside the heading, e.g. "table". */
    emphasis?: Localized;
    body: Localized;
    primaryCta: Link;
    secondaryCta?: Link;
  };
  verse?: {
    text: Localized;
    reference: Localized;
  };
  welcome: {
    eyebrow?: Localized;
    heading: Localized;
    body: Localized;
    cta?: Link;
  };
  cta: {
    heading: Localized;
    body: Localized;
    button: Link;
  };
};

export type ValueItem = {
  title: Localized;
  body: Localized;
};

export type AboutPage = {
  intro: Localized;
  story: RichText;
  values: ValueItem[];
};

export type ChurchEvent = {
  slug: string;
  title: Localized;
  /** ISO 8601 with offset, e.g. "2026-09-13T10:00:00-04:00". */
  startsAt: string;
  endsAt?: string;
  location?: Localized;
  summary: Localized;
  details?: RichText;
  registrationUrl?: string;
  cancelled?: boolean;
};

export type StaffMember = {
  slug: string;
  name: string;
  role: Localized;
  bio: Localized;
  photoUrl?: string;
};

export type BeliefCopy = {
  title: string;
  body: string;
  references?: string;
};

export type Belief = {
  number: string;
  amharic: BeliefCopy;
  english?: BeliefCopy;
  subSections?: Belief[];
};

export type StatementOfFaith = {
  sections: Belief[];
  /** False while the English text is an unreviewed draft; the site labels it as such. */
  englishApproved: boolean;
};
