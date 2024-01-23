import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
import { z } from "zod";
import * as S from "sanity-zod-types";
import { formatDate } from "./util";

export const siteConfigSanityDefinition = defineType({
  name: "siteConfig",
  title: "Site Config",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "featuredBook",
      title: "Featured Book",
      description: "Book highlighted on library page",
      type: "reference",
      to: { type: "resource" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "currentPlaylist",
      title: "Current Playlist",
      description: "Spotify playlist, album share URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { updated: "_updatedAt" },
    prepare(selection) {
      const { updated } = selection;
      return {
        title: "Active Site Configuration",
        subtitle: `Last edited: ${formatDate(updated)}`,
      };
    },
  },
});

export const SiteConfig = S.Document.extend({
  featuredBook: S.Reference.nullable(),
  currentPlaylist: S.Url,
});

export type SiteConfig = z.infer<typeof SiteConfig>;
