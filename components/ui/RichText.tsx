import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = /^https?:/.test(href);
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
};

/** Renders Portable Text (from Sanity or `lib/content/portable`) with the site's editorial styles. */
export function RichText({ value, className }: { value: PortableTextBlock[] | undefined; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={cn("prose-church", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
