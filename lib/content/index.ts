/**
 * Local fallback content.
 *
 * The site reads from Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set and
 * the relevant document has been published; otherwise these values are used.
 * That keeps `pnpm dev` working with zero configuration and lets the church
 * review real copy in Studio before it goes live.
 */
export { site } from "./site";
export { home } from "./home";
export { about } from "./about";
export { events } from "./events";
export { staff } from "./staff";
export { beliefs } from "./beliefs";
export * from "./types";
