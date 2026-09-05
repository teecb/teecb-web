import { defineField, defineType } from "sanity";

const required = (Rule: { required: () => unknown }) => Rule.required() as never;

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "intro", type: "localizedText", validation: required }),
    defineField({ name: "story", title: "Our story", type: "localizedRichText", validation: required }),
    defineField({
      name: "values",
      title: "What we hold dear",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", type: "localizedString", validation: required }),
            defineField({ name: "body", type: "localizedText", validation: required }),
          ],
          preview: { select: { title: "title.en", subtitle: "title.am" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
