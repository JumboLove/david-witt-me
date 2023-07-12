import { parseEmbedUrl } from "./parseEmbedUrl";

interface Props {
  id?: string;
  url?: string;
}

export function AstroEmbed({ id, url, ...props }: Props) {
  const provider = url ? parseEmbedUrl(url) : undefined;

  return (
    <div>{provider && <provider.render url={url} id={id} {...props} />}</div>
  );
}
