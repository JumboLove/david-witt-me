import { defineField, defineType } from "sanity";
import type { PortableTextObject, SlugSourceFn } from "@sanity/types";
import { z } from "zod";
import * as S from "sanity-zod-types";
import { Tag } from "./tag";

/**
 * Generate a slug from the body
 * by transforming Portable Text to a string
 * Use the first few words to try to generate a unique slug
 */
const generateSlug: SlugSourceFn = function (doc, options) {
  let defaultVal = "no body content";
  if (!doc.body) {
    return defaultVal;
  }

  // transform the string body and get the first five words
  const stringBody = transformPortableTextToString(
    doc?.body as PortableTextObject[]
  );
  const slugString = stringBody?.split(" ").slice(0, 5).join(" ");

  return slugString ?? defaultVal;
};

export const noteSanityDefinition = defineType({
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: generateSlug,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "importance",
      title: "Importance Score",
      type: "number",
      description: "Used to order search results. Higher is more important",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).max(100).precision(1),
    }),
    defineField({
      name: "isVisible",
      title: "Is Visible",
      description:
        "Hidden notes will not show on the site unless explicitly queried",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Tags help make resources easier to find by search",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
  ],
  preview: {
    select: {
      body: "body",
    },
    prepare(selection) {
      const { body } = selection;

      const bodyTitle =
        transformPortableTextToString(body) ?? "No note content";

      return {
        title: bodyTitle,
      };
    },
  },
});

/**
 * Iterate over Portable Text objects
 * to try to build a short string
 * that can be used within Sanity Studio
 */
function transformPortableTextToString(
  value?: PortableTextObject[]
): string | null {
  if (!value) {
    return null;
  }

  const block: PortableTextObject | undefined = value.find(
    (block) => block._type === "block"
  );

  const children = block?.children as PortableTextObject[];

  if (!children) {
    return null;
  }

  const strVal = children
    .filter((child: PortableTextObject) => child._type === "span")
    .slice(0, 10)
    .map((span: PortableTextObject) => span.text)
    .join("");

  return strVal ?? null;
}

export const Note = S.Document.extend({
  slug: S.Slug,
  body: z.any().nullable(), // Zod will not validate Portable Text
  importance: S.Number.min(0).max(100),
  isVisible: S.Boolean,
  tags: z.array(Tag).nullable(),
});

export type Note = z.infer<typeof Note>;
