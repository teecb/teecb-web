import { ImageResponse } from "next/og";
import { getSite } from "@/lib/cms";
import { isLocale, text, type Locale } from "@/lib/i18n";

export const alt = "Tremont Ethiopian Evangelical Church in Boston";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share card: gold cross mark on navy with the church name. */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const site = await getSite();
  // Satori's bundled font has no Ethiopic glyphs, so the card always uses English.
  const name = locale === "am" ? site.name.en ?? text(site.name, locale) : text(site.name, locale);
  const tagline = site.tagline.en ?? text(site.tagline, locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0f1a33 0%, #16244a 60%, #1e2f5c 100%)",
          color: "#faf5ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 84, height: 84, borderRadius: 24, background: "#0b1120", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(226,185,90,0.35)" }}>
            <svg width="52" height="52" viewBox="0 0 40 40">
              <path d="M11 31V20a9 9 0 0 1 18 0v11" fill="none" stroke="#e2b95a" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
              <path d="M20 13v16M15 19h10" fill="none" stroke="#e2b95a" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#e2b95a", fontWeight: 700 }}>{site.address.city}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1000 }}>{name}</div>
          <div style={{ fontSize: 28, color: "rgba(250,245,236,0.72)", maxWidth: 900, lineHeight: 1.35 }}>{tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
