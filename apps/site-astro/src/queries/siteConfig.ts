import { groq, useSanityClient } from "astro-sanity";
import { SiteConfig } from "content-models";
import * as S from "sanity-zod-types";
import { z } from "zod";

export async function getSiteConfig() {
  const query = groq`*[_type == "siteConfig"][0] {
    "featuredBook" : featuredBook -> {
      slug,
    }
  }`;

  const SiteConfigResult = z.object({
    featuredBook: z.object({
      slug: S.Slug,
    }),
  });

  const data = await useSanityClient().fetch(query, {});

  try {
    return SiteConfigResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getSiteConfig, \n${error.message}`);
  }
}
