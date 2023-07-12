import { FunctionComponent } from "react";
import { Tweet, Vimeo, YouTube } from "mdx-embed";
import getYouTubeID from "get-youtube-id";

type EmbedProvider<TProps> = {
  title: string;
  regexp: RegExp;
  render: FunctionComponent<TProps>;
};

interface EmbedRegistry {
  [key: string]: EmbedProvider<any>;
}

export const embedRegistry: EmbedRegistry = {
  twitter: {
    title: "Twitter",
    regexp: /^https?:\/\/twitter\.com/,
    render: ({ url, id, ...props }) =>
      id ? (
        <Tweet id={id} {...props} />
      ) : (
        url && <Tweet tweetLink={url} {...props} />
      ),
  },
  vimeo: {
    title: "Vimeo",
    regexp: /^https?:\/\/vimeo\.com/,
    render: ({ url, ...props }) =>
      url ? <Vimeo url={url} {...props} /> : null,
  },
  youTube: {
    title: "YouTube",
    regexp:
      /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w\-]+)(?:$|\&|\?)/,
    render: ({ url, ...props }) => {
      if (url) {
        const videoId = getYouTubeID(url);
        return <YouTube youTubeId={videoId} {...props} />;
      } else {
        return <p>YouTube url is missing!</p>;
      }
    },
  },
};
