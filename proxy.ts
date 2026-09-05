import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/locales";

/**
 * Locale routing. Every public page lives under `/en/…` or `/am/…`; requests
 * without a prefix are redirected to the visitor's preferred language:
 * the cookie set by the language switch, else the browser's Accept-Language.
 */

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const wantsAmharic = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .some((tag) => tag === "am" || tag.startsWith("am-"));
  return wantsAmharic ? "am" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    // Everything except Next internals, the Studio, metadata routes and static files.
    "/((?!_next|studio|api|fonts|brand|icon|apple-icon|opengraph-image|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|favicon\\.ico|.*\\.[\\w]+$).*)",
  ],
};
