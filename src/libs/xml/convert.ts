import { stringify } from "@libs/xml";

import { transcodeXmlUrl } from "../utils/sites.ts";
import type { Feed, List, OPMLOutline } from "../types.ts";

/**
 * Convert Lists to OPML.
 *
 * @param list The feed list to convert
 * @see {@link List}
 * @returns The OPML stringified data
 *
 * @example
 * ```ts
 * import type { List } from "../types.ts";
 *
 * const list: List = {
 *   name: "list name",
 *   feeds: [{
 *     title: "feed title",
 *     xmlUrl: new URL("https://example.com/feed"),
 *   }],
 * };
 * const opml: string = convert(list);
 * ```
 */
export function convert(list: List): string {
  const body = {
    outline: list.feeds.map((feed: Feed): OPMLOutline => {
      return {
        "@title": feed.title,
        "@text": feed.title,
        "@xmlUrl": feed.xmlUrl
          ? new URL(feed.xmlUrl)
          : transcodeXmlUrl(feed.title, feed.type, feed.id),
        "@type": "rss",
      };
    }),
  };

  return stringify({
    "@version": "1.0",
    "@encoding": "UTF-8",
    opml: { "@version": "2.0", body: [body] },
  });
}
