import { defineField, defineType } from "sanity";

const required = (Rule: { required: () => unknown }) => Rule.required() as never;

export const staffMember = defineType({
  name: "staffMember",
  title: "Leader",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: required }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: required }),
    defineField({ name: "role", type: "localizedString", validation: required }),
    defineField({ name: "bio", type: "localizedText", validation: required }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role.en", media: "photo" } },
});
