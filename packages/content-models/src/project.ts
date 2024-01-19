import { defineField, defineType } from "sanity";
import { z } from "zod";
import * as S from "sanity-zod-types";
import { Tag } from "./tag";

export const projectSanityDefinition = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longBody",
      title: "Full Content",
      description: "Used on the projects/:id page",
      type: "blockContent",
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
        "Hidden projects will not show on the site unless explicitly queried",
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
});

export const Project = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  url: S.Url.nullable(),
  mainImage: S.Image.nullable(),
  body: z.any().nullable(), // Zod will not validate Portable Text
  longBody: z.any().nullable(), // Zod will not validate Portable Text
  importance: S.Number.min(0).max(100),
  isVisible: S.Boolean,
  tags: z.array(Tag).nullable(),
});

export type Project = z.infer<typeof Project>;
