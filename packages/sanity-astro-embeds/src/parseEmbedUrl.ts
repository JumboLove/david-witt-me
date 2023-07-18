import { embedRegistry, type EmbedProvider } from "./embedRegistry";

export function parseEmbedUrl(
  url: string,
): { provider: EmbedProvider<any>; id: string } | null {
  for (const key in embedRegistry) {
    if (embedRegistry.hasOwnProperty(key)) {
      const provider = embedRegistry[key];
      if (provider.regexp.test(url)) {
        return { provider, id: key };
      }
    }
  }
  return null; // Return null if no match is found
}
