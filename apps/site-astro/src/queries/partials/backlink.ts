import groq from "groq";
import { z } from "zod";
import * as S from "sanity-zod-types";
import { SanityLinkableType } from "content-models";
import { blockContentQuery } from "./blockContent";

export const backlinksQuery = groq`  
  "backlinks": *[references(^._id) && isVisible == true]{ 
    title,
    _type,
    slug,
    description,
    _type == 'resourceContent' => {
      "resource": @.resource -> {
        _type,
        slug
      }
    },
    _type == 'note' => {
      ${blockContentQuery},
    }
  }
`;

const StandardBacklink = z.object({
  title: S.String,
  _type: SanityLinkableType,
  slug: S.Slug,
  description: S.String,
});

// Resource Content will not have its own page
// Use the parent Resource to build a URL
const ResourceContentBacklink = z.object({
  title: S.String,
  _type: z.literal("resourceContent"),
  slug: S.Slug,
  description: S.String,
  resource: z.object({
    _type: z.literal("resource"),
    slug: S.Slug,
  }),
});

const NoteBacklink = z.object({
  _type: z.literal("note"),
  slug: S.Slug,
  body: z.any().nullable(),
});

// Use a generic object structure here that is
// enough information to render a link card
export const Backlink = z.union([
  StandardBacklink,
  ResourceContentBacklink,
  NoteBacklink,
]);

export const BacklinkResult = z.array(Backlink).nullable();

export type Backlink = z.infer<typeof Backlink>;
export type BacklinkResult = z.infer<typeof BacklinkResult>;
