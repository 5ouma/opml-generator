import type { site } from "../types/mod.ts";

const sites: site[] = [
  { type: "bluesky", url: new URL("https://bsky.app/profile/{id}/rss") },
  { type: "note", url: new URL("https://note.com/{id}/rss") },
  { type: "reddit", url: new URL("https://www.reddit.com/r/{id}/.rss") },
  { type: "sizu.me", url: new URL("https://sizu.me/{id}/rss") },
];

export function transcodeXmlUrl(type: string, rssUrl?: URL, id?: string): URL {
  if (type === "rss") {
    return new URL(rssUrl as URL);
  } else {
    const url: URL = sites.find((site: site) => site.type === type)?.url as URL;
    return new URL(url.href.replace(encodeURI("{id}"), id as string));
  }
}
