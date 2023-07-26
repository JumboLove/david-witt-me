import groq from "groq";
import { z } from "zod";
import * as S from "sanity-zod-types";

// Get Parent Resources up to 4 levels deep
export const allParentResourcesQuery = groq`
  "parentResource": @.parentResource -> {
    _type,
    title,
    slug,
    "parentResource": @.parentResource -> {
      _type,
      title,
      slug,
      "parentResource": @.parentResource -> {
        _type,
        title,
        slug,
        "parentResource": @.parentResource -> {
          _type,
          title,
          slug
        }
      }
    }
  }
`;

export const AllParentResourcesResult = z
  .object({
    _type: z.literal("resource"),
    title: z.string(),
    slug: S.Slug,
    parentResource: z
      .object({
        _type: z.literal("resource"),
        title: z.string(),
        slug: S.Slug,
        parentResource: z
          .object({
            _type: z.literal("resource"),
            title: z.string(),
            slug: S.Slug,
            parentResource: z
              .object({
                _type: z.literal("resource"),
                title: z.string(),
                slug: S.Slug,
              })
              .nullable(),
          })
          .nullable(),
      })
      .nullable(),
  })
  .nullable();

export type AllParentResourcesResult = z.infer<typeof AllParentResourcesResult>;
