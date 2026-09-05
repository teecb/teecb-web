"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <h1 className="font-display text-3xl text-ink">Sanity Studio is not connected yet</h1>
        <p className="mt-4 text-muted">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to <code>.env.local</code>, restart the dev server, and reload this page.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
