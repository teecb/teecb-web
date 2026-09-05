# TEECB — Tremont Ethiopian Evangelical Church in Boston

The public website for TEECB: bilingual (English / አማርኛ), fast, and editable by
church staff without touching code.

- **Next.js 16** (App Router, React Server Components) + **TypeScript strict**
- **Tailwind CSS v4** driven by a single design-token file
- **Sanity** for editable content, with typed local fallback content so the site
  always runs
- **YouTube Data API** for the sermon archive and automatic live detection
- No database, no auth, no payment code — giving links out to Vanco

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in the keys you have; everything is optional
pnpm dev                     # http://localhost:3000 → redirects to /en or /am
```

Useful scripts:

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Development server                            |
| `pnpm build`     | Production build (run before deploying)       |
| `pnpm typecheck` | `tsc --noEmit`                                |
| `pnpm lint`      | ESLint (Next + TypeScript rules)              |
| `pnpm check`     | typecheck + lint, the pre-merge gate          |
| `pnpm sanity …`  | Sanity CLI (see "Content" below)              |

## How the site is organised

```
app/
  (site)/[lang]/        every public page, once per language (en, am)
    layout.tsx          html shell, header, footer, announcement bar
    page.tsx            home
    sermons/            archive + /sermons/[videoId] detail
    watch/ events/ about/ beliefs/ visit/ give/
    opengraph-image.tsx social share card
  (studio)/studio/      Sanity Studio at /studio
  icon.svg, manifest.ts, robots.ts, sitemap.ts
components/
  ui/                   primitives: Button, Card, Badge, Section, Icon, Reveal, RichText…
  site/                 chrome: Header, Footer, Announcement, LanguageSwitch, ThemeToggle…
  home/ sermons/ watch/ events/ about/ media/
lib/
  content/              typed content contract + local fallback content
  cms/                  Sanity queries and the getSite()/getEvents()… readers
  i18n/                 locales, UI dictionaries (en.ts / am.ts), Localized helpers
  youtube.ts            channel feed, live detection, single-video lookup
  dates.ts              time-zone-aware formatting, next-service math, calendar links
  seo.ts                metadata + hreflang helpers
proxy.ts                redirects un-prefixed URLs to the visitor's language
sanity/                 schema (objects/, documents/), Studio structure, client
styles/tokens.css       THE design-token file — colours, type, radius, motion
styles/fonts.css        self-hosted Fraunces + Inter (@font-face)
```

Conventions that keep this easy to work in:

1. **Pages wire, components render, content holds the words, tokens hold the look.**
   Components never fetch and never hard-code copy or colours.
2. **`lib/content/types.ts` is the contract.** Sanity queries and local files both
   produce those shapes, so the UI never knows where data came from.
3. **Every string is bilingual.** UI copy lives in `lib/i18n/dictionaries`;
   content fields are `{ en, am }` objects read with `text(value, locale)`,
   which falls back to whichever language exists.
4. **Server components by default.** `"use client"` only where there is real
   interaction (menu, theme, search, countdown, player).
5. **Zero runtime dependencies beyond Next, React, Tailwind and Sanity.** Icons,
   date formatting, class merging and calendar links are small local helpers.

## Languages

Routes live under `/en/…` and `/am/…`. `proxy.ts` sends `/` (or any un-prefixed
path) to the language saved by the header switch, else the browser's
`Accept-Language`. `<html lang>` and all `Intl` formatting follow the route, and
Amharic pages switch to an Ethiopic font stack (`--font-ethiopic`).

The Amharic UI strings in `lib/i18n/dictionaries/am.ts` were drafted for launch
and **should be reviewed by an Amharic speaker** before the site is announced.

## Content

The site reads from Sanity as soon as the **Site settings** document is
published. Until then it uses `lib/content/*` — so `pnpm dev` works with no
configuration and the church can review real copy in Studio before it goes live.

1. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local`.
2. Seed Studio with the local content as *drafts*:
   `pnpm sanity exec scripts/migrate-content.ts --with-user-token`
3. Open `/studio`, review each document, and publish. Publish **Site settings**
   last — that is the switch that makes the site read from Sanity.

What staff can edit in Studio: church name and description, address and
contact, weekly service times, social links, the announcement bar (with a
show/hide window), the livestream override, giving links, home-page copy and
featured verse, the About story and values, the Statement of Faith, events,
and leadership profiles with photos.

## Sermons and livestream

Sermons come straight from the church's YouTube channel — nothing to enter by
hand. Set `YOUTUBE_API_KEY` (server-only, YouTube Data API v3 enabled) and the
`/sermons`, `/watch` and home pages populate themselves.

The integration is quota-friendly: it reads the uploads playlist and one
`videos.list` call (about 2 units, cached for 2 minutes) instead of `search`
(100 units). Live detection uses the same data. If YouTube is unreachable or the
quota is exhausted the pages degrade to a link to the channel.

For Sunday insurance, Site settings → Livestream has **Force live** (paste the
day's video link) and **Force offline** overrides.

## Design

`styles/tokens.css` is the only file a rebrand touches. The palette is gold on
deep navy, drawn from the church crest, over warm cream surfaces; light and dark
themes ship together and follow the system preference until the visitor picks
one. Fonts are self-hosted from `public/fonts` so the build never depends on
Google Fonts. Motion is subtle (fade-up reveals) and fully disabled for
`prefers-reduced-motion`.

To use the real crest: save it as `public/brand/logo.svg` (or `logo.png`,
transparent background, at least 1024 px) — the header and footer switch to it
automatically. Then regenerate the icons from the same artwork: `app/icon.svg`,
`app/apple-icon.png` (180 px) and `public/brand/icon-192.png` / `icon-512.png`.

## Deploying

Push to GitHub and import the repo in Vercel. Set these environment variables:

| Variable                        | Required | Notes                                        |
| ------------------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | yes      | e.g. `https://teecb.org` (sitemap, OG, hreflang) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | for CMS  | from sanity.io/manage                         |
| `NEXT_PUBLIC_SANITY_DATASET`    | no       | defaults to `production`                      |
| `YOUTUBE_API_KEY`               | for video| never prefix with `NEXT_PUBLIC_`              |
| `YOUTUBE_CHANNEL_ID`            | no       | `UC…` id; skips the @handle lookup            |
| `YOUTUBE_CHANNEL_HANDLE`        | no       | defaults to `teecb`                           |

Pages are statically generated and revalidate every minute, so a new sermon
appears within a minute without a redeploy. Live status goes one step further:
open pages poll a tiny `/api/live` endpoint (every 45 s while the tab is
visible), so the header pill and the Watch player switch to the broadcast
without a reload. The YouTube lookup behind it is cached server-side, so
polling visitors cost no API quota.

## Before launch — checklist

- [ ] Real address, email and phone in Site settings (currently placeholders)
- [ ] Vanco Give+ link and text-to-give number in Site settings → Giving
- [ ] Leadership names, bios and photos
- [ ] Church story and values reviewed
- [ ] Amharic UI strings reviewed (`lib/i18n/dictionaries/am.ts`)
- [ ] Church review of the draft English Statement of Faith, then tick “English translation approved” in Studio (`lib/content/beliefs.ts` → `englishApproved` until Sanity is live)
- [ ] Crest artwork for logo and icons
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final domain
