import { groq, useSanityClient } from "astro-sanity";
import { Project } from "content-models";
import { z } from "zod";
import { blockContentQuery } from "./partials/blockContent";
import { tagsQuery, TagsResult } from "./partials/tag";
import { backlinksQuery, BacklinkResult } from "./partials/backlink";

// Projects are sorted by creation date by default
// To use importance as the sorter:
// swap out `order(_createdAt desc)` with `order(importance desc)`
export async function getAllProjectsList() {
  const query = groq`*[_type == "project" && isVisible == true] | order(importance desc) {
    title,
    slug,
    description,
    ${tagsQuery}
  }`;

  const MergedProject = Project.extend({
    tags: TagsResult,
  });

  const ProjectsResult = z.array(
    MergedProject.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return ProjectsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllProjectsList, \n${error.message}`);
  }
}

export async function getAllProjectsFull() {
  const query = groq`*[_type == "project" && isVisible == true] | order(_createdAt asc) {
    title,
    slug,
    description,
    ${tagsQuery},
    ${blockContentQuery},
    ${backlinksQuery},
  }`;

  const MergedProject = Project.extend({
    tags: TagsResult,
    backlinks: BacklinkResult,
  });

  const ProjectsResult = z.array(
    MergedProject.pick({
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
    return ProjectsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllProjectsFull, \n${error.message}`);
  }
}

export async function getProject(slug: string) {
  if (!slug) {
    throw new Error(`Error in getProject: No slug provided`);
  }
  const query = groq`*[_type == "project" && slug.current == $slug][0] {
    title,
    slug,
    description,
    mainImage,
    ${tagsQuery},
    ${blockContentQuery}
  }`;

  const MergedProject = Project.extend({
    tags: TagsResult,
  });

  const ProjectResult = MergedProject.pick({
    title: true,
    slug: true,
    description: true,
    mainImage: true,
    tags: true,
    body: true,
  });

  const data = await useSanityClient().fetch(query, {
    slug: slug,
  });

  try {
    return ProjectResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getProject: ${slug}, \n${error.message}`);
  }
}
