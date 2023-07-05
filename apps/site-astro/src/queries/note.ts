import { groq, useSanityClient } from "astro-sanity";
import { Note } from "content-models";
import { z } from "zod";
import { blockContentQuery } from "./partials/blockContent";
import { tagsQuery, TagsResult } from "./partials/tag";

// Notes are sorted by creation date by default
// To use importance as the sorter:
// swap out `order(_createdAt desc)` with `order(importance desc)`
export async function getAllNotes() {
  const query = groq`*[_type == "note" && isVisible == true] | order(_createdAt desc) {
    ${blockContentQuery},
    ${tagsQuery}
  }`;

  const MergedNote = Note.extend({
    tags: TagsResult,
  });

  const NotesResult = z.array(
    MergedNote.pick({
      body: true,
      tags: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return NotesResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllNotes, \n${error.message}`);
  }
}
