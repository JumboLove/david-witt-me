import { embedRegistry, type EmbedProvider } from "./embedRegistry";

export function parseEmbedUrl(url: string): EmbedProvider | null {
  for (const key in embedRegistry) {
    if (embedRegistry.hasOwnProperty(key)) {
      const provider = embedRegistry[key];
      if (provider.regexp.test(url)) {
        return provider;
      }
    }
  }
  return null; // Return null if no match is found
}
