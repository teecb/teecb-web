import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Optional real crest artwork. Drop the church's logo into `public/brand/` as
 * `logo.svg` (preferred) or `logo.png` (transparent background, ≥1024px) and
 * the header, footer and share card pick it up automatically; until then the
 * built-in arch-and-cross mark is used.
 */
const candidates = ["logo.svg", "logo.png"];

export function brandLogoSrc(): string | null {
  for (const file of candidates) {
    if (existsSync(path.join(process.cwd(), "public", "brand", file))) return `/brand/${file}`;
  }
  return null;
}
