import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // The Studio pulls in a large bundle; keep it out of the server-side tracing for pages.
  serverExternalPackages: ["@sanity/vision"],
};

export default nextConfig;
