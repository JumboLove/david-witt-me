import { groq, useSanityClient } from "astro-sanity";
import { Resource } from "content-models";
import { z } from "zod";
import { TagsResult, tagsQuery } from "./partials/tag";
import { backlinksQuery, BacklinkResult } from "./partials/backlink";
import {
  ResoruceContentResult,
  resourceContentQuery,
} from "./partials/resourceContent";

// Resources are sorted by importance by default
// To use creation date as the sorter:
// swap out `order(importance desc)` with `order(_createdAt desc)`
export async function getAllResourcesList() {
  const query = groq`*[_type == "resource" && isVisible == true] | order(importance desc) {
    title,
    slug,
    description,
    ${tagsQuery}
  }`;

  const MergedResource = Resource.extend({
    tags: TagsResult,
  });

  const ResourcesResult = z.array(
    MergedResource.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return ResourcesResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllResourcesList, \n${error.message}`);
  }
}

export async function getAllResourcesFull() {
  const query = groq`*[_type == "resource" && isVisible == true] | order(importance asc) {
    title,
    slug,
    description,
    url,
    affiliateUrl,
    ${resourceContentQuery},
    ${tagsQuery},
    ${backlinksQuery},
  }`;

  const MergedResource = Resource.extend({
    resourceContent: ResoruceContentResult,
    tags: TagsResult,
    backlinks: BacklinkResult,
  });

  const ResourcesResult = z.array(
    MergedResource.pick({
      title: true,
      slug: true,
      description: true,
      url: true,
      affiliateUrl: true,
      resourceContent: true,
      tags: true,
      backlinks: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return ResourcesResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllResourcesFull, \n${error.message}`);
  }
}

export async function getResource(slug: string) {
  if (!slug) {
    throw new Error(`Error in getResource: No slug provided`);
  }
  const query = groq`*[_type == "resource" && slug.current == $slug][0] {
    title,
    slug,
    description,
    mainImage,
    url,
    affiliateUrl,
    creator,
    ${resourceContentQuery},
    ${tagsQuery},
    ${backlinksQuery},
  }`;

  const MergedResource = Resource.extend({
    resourceContent: ResoruceContentResult,
    tags: TagsResult,
    backlinks: BacklinkResult,
  });

  const ResourceResult = MergedResource.pick({
    title: true,
    slug: true,
    description: true,
    mainImage: true,
    url: true,
    affiliateUrl: true,
    creator: true,
    resourceContent: true,
    tags: true,
    backlinks: true,
  });

  const data = await useSanityClient().fetch(query, {
    slug: slug,
  });

  try {
    return ResourceResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getResource: ${slug}, \n${error.message}`);
  }
}

interface GetBooksProps {
  order: "recent" | "importance";
  limit: number;
}

export async function getBooksList({
  order = "recent",
  limit = 5,
}: GetBooksProps) {
  const sortString =
    order === "recent" ? "_createdAt desc" : "order(importance desc)";
  const query = groq`*[_type == "resource" && (("fiction" in tags[]->slug.current) || ("nonfiction" in tags[]->slug.current))]
  | order(${sortString})[0...$limit] {
    title,
    slug,
    description,
    mainImage,
    url,
    affiliateUrl,
    creator
  }`;

  const ResourcesResult = z.array(
    Resource.pick({
      title: true,
      slug: true,
      description: true,
      mainImage: true,
      url: true,
      affiliateUrl: true,
      resourceContent: true,
      creator: true,
    })
  );

  const data = await useSanityClient().fetch(query, {
    limit: limit,
  });

  try {
    return ResourcesResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getBooksList, \n${error.message}`);
  }
}
