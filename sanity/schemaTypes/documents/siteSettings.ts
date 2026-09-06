import { defineField, defineType } from "sanity";

const required = (Rule: { required: () => unknown }) => Rule.required() as never;

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "gather", title: "Services & location" },
    { name: "watch", title: "Livestream" },
    { name: "giving", title: "Giving" },
    { name: "announcement", title: "Announcement bar" },
  ],
  fields: [
    defineField({ name: "name", title: "Church name", type: "localizedString", group: "identity", validation: required }),
    defineField({ name: "shortName", type: "localizedString", group: "identity", validation: required }),
    defineField({
      name: "wordmark",
      title: "Header wordmark",
      type: "object",
      group: "identity",
      description: "Two short lines shown next to the logo, e.g. “Tremont Ethiopian” / “Evangelical Church · Boston”.",
      fields: [
        defineField({ name: "line1", title: "Top line", type: "localizedString", validation: required }),
        defineField({ name: "line2", title: "Bottom line", type: "localizedString", validation: required }),
      ],
    }),
    defineField({ name: "tagline", type: "localizedString", group: "identity", validation: required }),
    defineField({
      name: "description",
      title: "Search description",
      type: "localizedText",
      group: "identity",
      description: "Shown in Google results and link previews. One or two sentences.",
      validation: required,
    }),
    defineField({
      name: "contact",
      type: "object",
      group: "identity",
      fields: [
        defineField({ name: "email", type: "email", validation: required }),
        defineField({ name: "phone", type: "string" }),
      ],
    }),
    defineField({ name: "socials", title: "Social links", type: "array", of: [{ type: "socialLink" }], group: "identity" }),
    defineField({
      name: "timeZone",
      type: "string",
      group: "gather",
      initialValue: "America/New_York",
      readOnly: true,
      description: "All times on the site are shown in this zone.",
    }),
    defineField({ name: "address", type: "address", group: "gather", validation: required }),
    defineField({
      name: "services",
      title: "Weekly services",
      type: "array",
      of: [{ type: "serviceTime" }],
      group: "gather",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "youtube",
      type: "object",
      group: "watch",
      fields: [
        defineField({ name: "channelUrl", title: "YouTube channel URL", type: "url", validation: required }),
      ],
    }),
    defineField({
      name: "watch",
      title: "Livestream override",
      type: "object",
      group: "watch",
      fields: [
        defineField({
          name: "mode",
          title: "Mode",
          type: "string",
          initialValue: "auto",
          options: {
            layout: "radio",
            list: [
              { title: "Automatic — detect the live broadcast from YouTube", value: "auto" },
              { title: "Force live — show the video below as live", value: "forceLive" },
              { title: "Force offline — hide the live player", value: "forceOffline" },
            ],
          },
        }),
        defineField({
          name: "liveVideoUrl",
          title: "Live video URL (for Force live)",
          type: "url",
          description: "Paste the YouTube watch/live link for today's broadcast — not the channel URL.",
        }),
        defineField({
          name: "liveStartTime",
          title: "Weekly livestream start time (24h, HH:MM)",
          type: "string",
          initialValue: "10:30",
          description: "Sunday worship begins at 10:00 AM; use this for when the YouTube broadcast normally starts.",
          validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "24-hour time such as 10:30" }),
        }),
      ],
    }),
    defineField({
      name: "giving",
      type: "object",
      group: "giving",
      fields: [
        defineField({ name: "onlineUrl", title: "Online giving link (Vanco Give+)", type: "url" }),
        defineField({ name: "textNumber", title: "Text-to-give number", type: "string" }),
        defineField({ name: "textKeyword", title: "Text-to-give keyword", type: "string" }),
      ],
    }),
    defineField({
      name: "announcement",
      type: "object",
      group: "announcement",
      description: "Leave the text empty to hide the bar.",
      fields: [
        defineField({ name: "label", title: "Badge", type: "localizedString" }),
        defineField({ name: "text", type: "localizedString" }),
        defineField({ name: "href", title: "Link", type: "string" }),
        defineField({ name: "startsAt", title: "Show from", type: "datetime" }),
        defineField({ name: "endsAt", title: "Hide after", type: "datetime" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
