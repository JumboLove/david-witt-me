import { FunctionComponent } from "react";
import { Tweet, Vimeo, YouTube } from "mdx-embed";
import getYouTubeID from "get-youtube-id";

export type EmbedProvider<TProps> = {
  title: string;
  regexp: RegExp;
  getRenderProps: (urlOrId: string) => { id: string };
  render: FunctionComponent<TProps>;
};

interface EmbedRegistry {
  [key: string]: EmbedProvider<any>;
}

export const embedRegistry: EmbedRegistry = {
  twitter: {
    title: "Twitter",
    regexp: /^https?:\/\/twitter\.com/,
    getRenderProps: (urlOrId: string) => {
      const tweetIdRegex = /^https?:\/\/twitter\.com\/([\w-]+\/status\/\d+)/;
      const match = urlOrId.match(tweetIdRegex);
      const id = match ? match[1] : "";
      return { id };
    },
    render: ({ id, ...props }) =>
      id ? (
        <div className="aspect-video">
          <Tweet tweetLink={id} {...props} />
        </div>
      ) : null,
  },
  vimeo: {
    title: "Vimeo",
    regexp: /^https?:\/\/vimeo\.com/,
    getRenderProps: (urlOrId: string) => {
      const id = urlOrId.replace(/^https?:\/\/vimeo\.com\/(\d+)$/, "$1");
      return { id };
    },
    render: ({ id, ...props }) =>
      id ? (
        <div className="aspect-video">
          <Vimeo vimeoId={id} {...props} />
        </div>
      ) : null,
  },
  youTube: {
    title: "YouTube",
    regexp:
      /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w\-]+)(?:$|\&|\?)/,
    getRenderProps: (urlOrId: string) => {
      const id = getYouTubeID(urlOrId) || "";
      return { id };
    },
    render: ({ id, ...props }) =>
      id ? (
        <div className="aspect-video">
          <YouTube youTubeId={id} {...props} />
        </div>
      ) : null,
  },
};
