import { defineField, defineType } from "sanity";

/**
 * Bilingual field types. At least one language must be filled in; the site
 * falls back to whichever language exists, so editors are never forced to
 * translate before they can save a truthful update.
 */

const atLeastOne = (Rule: { custom: (fn: (value?: { en?: unknown; am?: unknown }) => true | string) => unknown }) =>
  Rule.custom((value) => (value?.en || value?.am ? true : "Add the text in at least one language.")) as never;

export const localizedString = defineType({
  name: "localizedString",
  title: "Text (EN / AM)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "am", title: "አማርኛ", type: "string" }),
  ],
  validation: atLeastOne,
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Paragraph (EN / AM)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
    defineField({ name: "am", title: "አማርኛ", type: "text", rows: 4 }),
  ],
  validation: atLeastOne,
});

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [defineField({ name: "href", title: "URL", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }) })],
          },
        ],
      },
    },
  ],
});

export const localizedRichText = defineType({
  name: "localizedRichText",
  title: "Rich text (EN / AM)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "richText" }),
    defineField({ name: "am", title: "አማርኛ", type: "richText" }),
  ],
  validation: atLeastOne,
});
