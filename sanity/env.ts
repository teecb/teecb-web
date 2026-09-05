export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || undefined;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-08-29";

export const sanityConfigured = Boolean(projectId);
