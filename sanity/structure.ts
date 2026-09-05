import type { StructureResolver } from "sanity/structure";
import { singletons } from "./schemaTypes";

const singletonNames = new Set<string>(singletons.map((type) => type.name));

/**
 * Studio sidebar: singleton pages first (opened directly, no list), then the
 * repeatable collections.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...singletons.map((type) =>
        S.listItem()
          .title(type.title ?? type.name)
          .id(type.name)
          .child(S.document().schemaType(type.name).documentId(type.name)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonNames.has(item.getId() ?? "")),
    ]);
