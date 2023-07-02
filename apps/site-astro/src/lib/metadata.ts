export const siteTitle = "David Witt";
export const siteTagline = "developer, writer, dubious philosopher";
export const siteDescription =
  "David's digital garden with content on web development, polyamory, and living a rich, full life";
export const hostname =
  process.env.NODE_ENV === "production"
    ? "https://davidwitt.me/"
    : "https://localhost:3000/";

export function titleTemplate(title?: string, tagline: string = siteTagline) {
  const pieces: string[] = [siteTitle, tagline];
  if (title) {
    pieces.unshift(title);
  }
  return pieces.join(" | ");
}

export function getPublicAssetUrl(assetPath: string) {
  return `${hostname}${assetPath}`;
}
