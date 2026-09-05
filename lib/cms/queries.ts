import { defineQuery } from "next-sanity";

/**
 * GROQ projections. Each one returns exactly the shape in `lib/content/types`
 * so the rest of the app never touches raw Sanity documents.
 */

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  name, shortName, tagline, description, timeZone, address, contact,
  services, socials, youtube, watch, giving, announcement
}`);

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  hero, verse, welcome, cta
}`);

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]{
  intro, story, values
}`);

export const statementOfFaithQuery = defineQuery(`*[_type == "statementOfFaith"][0]{
  englishApproved,
  sections[]{ number, amharic, english, subSections[]{ number, amharic, english, subSections[] } }
}`);

export const eventsQuery = defineQuery(`*[_type == "event" && defined(startsAt)] | order(startsAt asc){
  "slug": slug.current, title, startsAt, endsAt, location, summary, details, registrationUrl, cancelled
}`);

export const staffQuery = defineQuery(`*[_type == "staffMember"] | order(order asc, name asc){
  "slug": slug.current, name, role, bio, "photoUrl": photo.asset->url
}`);
