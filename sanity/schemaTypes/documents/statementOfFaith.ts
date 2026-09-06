import { defineField, defineType } from "sanity";

export const statementOfFaith = defineType({
  name: "statementOfFaith",
  title: "Statement of Faith",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "beliefSection" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: { prepare: () => ({ title: "Statement of Faith" }) },
});
