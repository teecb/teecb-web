import { defineField, defineType } from "sanity";

const required = (Rule: { required: () => unknown }) => Rule.required() as never;

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localizedString" }),
        defineField({ name: "heading", type: "localizedString", validation: required }),
        defineField({
          name: "emphasis",
          title: "Emphasised word(s)",
          type: "localizedString",
          description: "Rendered in italics at the end of the heading.",
        }),
        defineField({ name: "body", type: "localizedText", validation: required }),
        defineField({ name: "primaryCta", title: "Primary button", type: "link", validation: required }),
        defineField({ name: "secondaryCta", title: "Secondary button", type: "link" }),
      ],
    }),
    defineField({
      name: "verse",
      title: "Featured scripture",
      type: "object",
      fields: [
        defineField({ name: "text", type: "localizedText", validation: required }),
        defineField({ name: "reference", type: "localizedString", validation: required }),
      ],
    }),
    defineField({
      name: "welcome",
      title: "Welcome section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localizedString" }),
        defineField({ name: "heading", type: "localizedString", validation: required }),
        defineField({ name: "body", type: "localizedText", validation: required }),
        defineField({ name: "cta", title: "Link", type: "link" }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Closing call to action",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "localizedString", validation: required }),
        defineField({ name: "body", type: "localizedText", validation: required }),
        defineField({ name: "button", type: "link", validation: required }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
