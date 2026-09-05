import type { PortableTextBlock } from "next-sanity";

/**
 * Build Portable Text paragraphs from plain strings so local fallback content
 * renders through the same `<RichText>` component as Sanity content.
 */
export function paragraphs(...texts: string[]): PortableTextBlock[] {
  return texts.map((text, index) => ({
    _type: "block",
    _key: `p${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));
}
