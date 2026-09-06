/**
 * Seed Sanity with the local fallback content as **drafts** so the church can
 * review and publish each document from Studio.
 *
 *   pnpm sanity exec scripts/migrate-content.ts --with-user-token
 *
 * Safe to re-run: existing drafts are replaced, published documents are never
 * touched. Publish "Site settings" last — that is the switch that makes the
 * site read from Sanity instead of the local files.
 */
import { getCliClient } from "sanity/cli";
import { about, beliefs, events, home, site, staff } from "../lib/content";

const client = getCliClient({ apiVersion: "2026-08-29" });

const documents = [
  { _id: "drafts.siteSettings", _type: "siteSettings", ...site },
  { _id: "drafts.homePage", _type: "homePage", ...home },
  { _id: "drafts.aboutPage", _type: "aboutPage", ...about },
  { _id: "drafts.statementOfFaith", _type: "statementOfFaith", sections: beliefs },
  ...events.map(({ slug, ...rest }) => ({
    _id: `drafts.event-${slug}`,
    _type: "event",
    slug: { _type: "slug", current: slug },
    ...rest,
  })),
  ...staff.map(({ slug, photoUrl, ...rest }, index) => ({
    _id: `drafts.staff-${slug}`,
    _type: "staffMember",
    slug: { _type: "slug", current: slug },
    order: index + 1,
    ...rest,
    ...(photoUrl ? { photoUrl } : {}),
  })),
];

async function migrate() {
  const transaction = client.transaction();
  for (const document of documents) {
    transaction.createOrReplace(document as Parameters<typeof transaction.createOrReplace>[0]);
  }
  await transaction.commit();
  console.log(`Created ${documents.length} draft documents. Review and publish them in /studio.`);
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
