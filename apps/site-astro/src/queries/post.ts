import { groq, useSanityClient } from "astro-sanity";
import { Post } from "content-models";
import { z } from "zod";
import { blockContentQuery } from "./partials/blockContent";
import { tagsQuery, TagsResult } from "./partials/tag";
import { backlinksQuery, BacklinkResult } from "./partials/backlink";

// Posts are sorted by creation date by default
// To use importance as the sorter:
// swap out `order(_createdAt desc)` with `order(importance desc)`
export async function getAllPostsList() {
  const query = groq`*[_type == "post" && isVisible == true] | order(_createdAt desc) {
    title,
    slug,
    description,
    ${tagsQuery}
  }`;

  const MergedPost = Post.extend({
    tags: TagsResult,
  });

  const PostsResult = z.array(
    MergedPost.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return PostsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllPostsList, \n${error.message}`);
  }
}

interface GetPostsListProps {
  order: "recent" | "importance";
  limit: number;
}

export async function getPostsList({
  order = "recent",
  limit = 5,
}: GetPostsListProps) {
  const sortString =
    order === "recent" ? "_createdAt desc" : "order(importance desc)";
  const query = groq`*[_type == "post" && isVisible == true] | order(${sortString})[0...$limit] {
    title,
    slug,
    description,
    ${tagsQuery}
  }`;

  const MergedPost = Post.extend({
    tags: TagsResult,
  });

  const PostsResult = z.array(
    MergedPost.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
    })
  );

  const data = await useSanityClient().fetch(query, {
    limit: limit,
  });

  try {
    return PostsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getPostsList, \n${error.message}`);
  }
}

export async function getAllPostsFull() {
  const query = groq`*[_type == "post" && isVisible == true] | order(_createdAt asc) {
    title,
    slug,
    description,
    ${tagsQuery},
    ${blockContentQuery},
    ${backlinksQuery},
  }`;

  const MergedPost = Post.extend({
    tags: TagsResult,
    backlinks: BacklinkResult,
  });

  const PostsResult = z.array(
    MergedPost.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
      body: true,
      backlinks: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return PostsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllPostsFull, \n${error.message}`);
  }
}

export async function getPost(slug: string) {
  if (!slug) {
    throw new Error(`Error in getPost: No slug provided`);
  }
  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    description,
    ${tagsQuery},
    ${blockContentQuery}
  }`;

  const MergedPost = Post.extend({
    tags: TagsResult,
  });

  const PostResult = MergedPost.pick({
    title: true,
    slug: true,
    description: true,
    tags: true,
    body: true,
  });

  const data = await useSanityClient().fetch(query, {
    slug: slug,
  });

  try {
    return PostResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getPost: ${slug}, \n${error.message}`);
  }
}
