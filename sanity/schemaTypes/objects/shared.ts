import { defineField, defineType } from "sanity";

const required = (Rule: { required: () => unknown }) => Rule.required() as never;

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "localizedString", validation: required }),
    defineField({
      name: "href",
      title: "Destination",
      type: "string",
      description: "A site path like /visit, or a full https://, mailto: or tel: link.",
      validation: (Rule) =>
        Rule.required().custom((value?: string) =>
          !value || /^(\/|https?:\/\/|mailto:|tel:)/.test(value)
            ? true
            : "Use a site path (/visit) or a full https://, mailto: or tel: link.",
        ),
    }),
  ],
  preview: { select: { title: "label.en", subtitle: "href" } },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "TikTok", value: "tiktok" },
          { title: "X", value: "x" },
          { title: "Telegram", value: "telegram" },
          { title: "Other", value: "other" },
        ],
      },
      validation: required,
    }),
    defineField({ name: "label", type: "string", validation: required }),
    defineField({ name: "href", title: "URL", type: "url", validation: required }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const serviceTime = defineType({
  name: "serviceTime",
  title: "Service time",
  type: "object",
  fields: [
    defineField({ name: "name", type: "localizedString", validation: required }),
    defineField({
      name: "dayOfWeek",
      title: "Day",
      type: "number",
      options: {
        list: [
          { title: "Sunday", value: 0 },
          { title: "Monday", value: 1 },
          { title: "Tuesday", value: 2 },
          { title: "Wednesday", value: 3 },
          { title: "Thursday", value: 4 },
          { title: "Friday", value: 5 },
          { title: "Saturday", value: 6 },
        ],
      },
      validation: required,
    }),
    defineField({
      name: "startTime",
      title: "Start time (24h, HH:MM)",
      type: "string",
      placeholder: "10:00",
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "24-hour time such as 10:00 or 18:30" }),
    }),
    defineField({ name: "durationMinutes", title: "Length (minutes)", type: "number" }),
    defineField({ name: "note", type: "localizedString", description: "e.g. Amharic & English" }),
    defineField({
      name: "isPrimary",
      title: "Main weekly service",
      type: "boolean",
      description: "Drives the “next service” countdown on the Watch page.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name.en", time: "startTime", day: "dayOfWeek" },
    prepare: ({ title, time, day }) => ({
      title,
      subtitle: `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day as number] ?? ""} ${time ?? ""}`,
    }),
  },
});

export const address = defineType({
  name: "address",
  title: "Address",
  type: "object",
  fields: [
    defineField({ name: "line1", title: "Street", type: "string", validation: required }),
    defineField({ name: "line2", title: "Suite / floor", type: "string" }),
    defineField({ name: "city", type: "string", validation: required }),
    defineField({ name: "region", title: "State", type: "string", validation: required }),
    defineField({ name: "postalCode", title: "ZIP", type: "string", validation: required }),
    defineField({ name: "country", type: "string", initialValue: "US" }),
    defineField({ name: "mapUrl", title: "Maps link", type: "url", description: "Optional Google/Apple Maps link. Leave blank to search by address." }),
    defineField({ name: "parkingNote", type: "localizedText" }),
  ],
});

export const beliefCopy = defineType({
  name: "beliefCopy",
  title: "Belief text",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: required }),
    defineField({ name: "body", type: "text", rows: 8 }),
    defineField({ name: "references", title: "Scripture references", type: "string" }),
  ],
});

export const beliefSection = defineType({
  name: "beliefSection",
  title: "Belief section",
  type: "object",
  fields: [
    defineField({ name: "number", type: "string", validation: required }),
    defineField({ name: "amharic", title: "አማርኛ", type: "beliefCopy", validation: required }),
    defineField({ name: "english", title: "English", type: "beliefCopy" }),
    defineField({
      name: "subSections",
      title: "Subsections",
      type: "array",
      of: [{ type: "beliefSection" }],
    }),
  ],
  preview: { select: { title: "amharic.title", subtitle: "number" } },
});
