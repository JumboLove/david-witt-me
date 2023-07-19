import { embedRegistry } from "./embedRegistry";

interface Props extends Record<string, any> {
  id: string;
  providerId: string;
}

export function ClientEmbed({ id, providerId, ...restProps }: Props) {
  const provider = embedRegistry[providerId];
  if (!provider) {
    return <div>No Embed Provider found</div>;
  }

  return <div>{provider && <provider.render id={id} {...restProps} />}</div>;
}
