import { defineField, defineType } from "sanity";

export const statementOfFaith = defineType({
  name: "statementOfFaith",
  title: "Statement of Faith",
  type: "document",
  fields: [
    defineField({
      name: "englishApproved",
      title: "English translation approved",
      type: "boolean",
      initialValue: false,
      description: "Until this is on, the English text is shown with a “draft translation” notice.",
    }),
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
