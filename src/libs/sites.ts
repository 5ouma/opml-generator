import type { site } from "../types/mod.ts";

const sites: site[] = [
  { type: "bluesky", url: new URL("https://bsky.app/profile/{id}/rss") },
  { type: "note", url: new URL("https://note.com/{id}/rss") },
  { type: "reddit", url: new URL("https://www.reddit.com/r/{id}/.rss") },
  { type: "sizu.me", url: new URL("https://sizu.me/{id}/rss") },
];

export function transcodeXmlUrl(
  title: string,
  type: string | undefined,
  id: string | undefined,
): URL {
  if (!type) throw new Error(`Parameter not set: "type" of "${title}"`);
  if (!id) throw new Error(`Parameter not set: "id" of "${title}"`);

  const url: URL | undefined = sites
    .find((site: site) => site.type === type)?.url;
  if (!url) throw new Error(`Site not found: "${type}" of "${title}"`);

  return new URL(url.href.replace(encodeURI("{id}"), id));
}
