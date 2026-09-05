# Working in this repo

Read `README.md` first — it describes the structure and the conventions.

Rules of thumb for changes:

- Keep `pnpm check` (typecheck + lint) green. No `any`, no unused code.
- Add copy to `lib/i18n/dictionaries/en.ts` **and** `am.ts` (TypeScript enforces parity).
- New content fields: extend `lib/content/types.ts` → the Sanity schema in `sanity/schemaTypes` → the GROQ projection in `lib/cms/queries.ts` → the local fallback in `lib/content` → the UI. Never let a component invent a field.
- Style with token utilities (`bg-surface`, `text-ink`, `text-accent`, `rounded-token-lg`, `shadow-token-md`, `text-step-2`…). No raw hex or ad-hoc font sizes in components.
- Server components by default; add `"use client"` only for real interaction.
- Do not add dependencies without a strong reason; the site intentionally has none beyond Next, React, Tailwind and Sanity.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
<!-- END:nextjs-agent-rules -->
