import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes, singletons } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const singletonNames = new Set<string>(singletons.map((type) => type.name));

export default defineConfig({
  name: "teecb-studio",
  title: "TEECB Website",
  basePath: "/studio",
  projectId: projectId ?? "missing-project-id",
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) => templates.filter((template) => !singletonNames.has(template.schemaType)),
  },
  document: {
    // Singletons cannot be duplicated, unpublished, or deleted.
    actions: (actions, { schemaType }) =>
      singletonNames.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
