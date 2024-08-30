type site = {
  type: string;
  url: URL;
};

/**
 * The array of site URLs.
 *
 * @property site.type The site name
 * @property site.url The site URL
 *
 * @example
 * ```ts
 * const sites: sites = [
 *   { type: "type", url: new URL("https://example.com/rss") }
 * ];
 * ```
 */
const sites: site[] = [
  { type: "bluesky", url: new URL("https://bsky.app/profile/id/rss") },
  {
    type: "nitter",
    url: new URL(
      `https://${
        Deno.env.get("NITTER_DOMAIN") ?? "cdn.xcancel.com"
      }/search/rss?f=tweets&q=id`,
    ),
  },
  { type: "note", url: new URL("https://note.com/id/rss") },
  { type: "reddit", url: new URL("https://www.reddit.com/r/id/.rss") },
  { type: "sizu.me", url: new URL("https://sizu.me/id/rss") },
  { type: "zenn", url: new URL("https://zenn.dev/id/feed") },
];

/**
 * Transcode URL by site type.
 *
 * @param title The site title
 * @param type The site type
 * @param id The ID to specify the content
 * @returns The RSS URL
 * @throws Parameter not set: "type" of "title"
 * @throws Parameter not set: "id" of "title"
 * @throws Site not found: "type" of "title"
 *
 * @example
 * ```ts
 * const url: URL = transcodeXmlUrl("title", "type", "id");
 * ```
 */
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

  return new URL(url.href.replace("id", id));
}
