import { embedRegistry } from "./embedRegistry";

interface Props {
  id: string;
  providerId: string;
}

export function ClientEmbed({ id, providerId }: Props) {
  const provider = embedRegistry[providerId];
  if (!provider) {
    return <div>No Embed Provider found</div>;
  }

  return <div>{provider && <provider.render id={id} />}</div>;
}
