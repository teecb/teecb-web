import { defineField, defineType } from "sanity";

const required = (Rule: { required: () => unknown }) => Rule.required() as never;

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localizedString", validation: required }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.en", maxLength: 80 },
      validation: required,
    }),
    defineField({ name: "startsAt", title: "Starts", type: "datetime", validation: required }),
    defineField({
      name: "endsAt",
      title: "Ends",
      type: "datetime",
      validation: (Rule) => Rule.min(Rule.valueOfField("startsAt")).warning("Should end after it starts."),
    }),
    defineField({ name: "location", type: "localizedString", description: "e.g. Fellowship Hall" }),
    defineField({ name: "summary", type: "localizedText", validation: required }),
    defineField({ name: "details", type: "localizedRichText" }),
    defineField({ name: "registrationUrl", title: "Registration link", type: "url" }),
    defineField({ name: "cancelled", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Date", name: "date", by: [{ field: "startsAt", direction: "asc" }] }],
  preview: {
    select: { title: "title.en", am: "title.am", startsAt: "startsAt", cancelled: "cancelled" },
    prepare: ({ title, am, startsAt, cancelled }) => ({
      title: `${cancelled ? "✕ " : ""}${title || am}`,
      subtitle: startsAt ? new Date(startsAt).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" }) : "",
    }),
  },
});
