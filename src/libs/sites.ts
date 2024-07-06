import { join } from "@std/url";
import type { site } from "@5ouma/opml-generator/types";

const sites: site[] = [
  { type: "bluesky", url: new URL("https://bsky.app/profile/{id}/rss") },
  {
    type: "nitter",
    url: join(
      new URL(`https://${Deno.env.get("NITTER_DOMAIN") ?? "cdn.xcancel.com"}`),
      "/search/rss?f=tweets&q={id}",
    ),
  },
  { type: "note", url: new URL("https://note.com/{id}/rss") },
  { type: "reddit", url: new URL("https://www.reddit.com/r/{id}/.rss") },
  { type: "sizu.me", url: new URL("https://sizu.me/{id}/rss") },
  { type: "zenn", url: new URL("https://zenn.dev/{id}/feed") },
];

export function transcodeXmlUrl(
  title: string,
  type: string | undefined,
  id: string | undefined,
): URL {
  if (!type) throw new Error(`parameter not set: "type" of "${title}"`);
  if (!id) throw new Error(`parameter not set: "id" of "${title}"`);

  const url: URL | undefined = sites
    .find((site: site) => site.type === type)?.url;
  if (!url) throw new Error(`site not found: "${type}" of "${title}"`);

  return new URL(
    url.href.replace(encodeURI("{id}"), id).replaceAll("%3F", "?"),
  );
}
