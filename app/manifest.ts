import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name.en,
    short_name: site.shortName.en,
    description: site.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#0f1a33",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
