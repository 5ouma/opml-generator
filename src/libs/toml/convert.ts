import { parse } from "@std/toml";

import { transcodeXmlUrl } from "../utils/sites.ts";
import type { Feed, List, Lists } from "../types.ts";

/**
 * Convert TOML data to Lists.
 *
 * @param data The TOML data to convert
 * @returns The converted lists
 * @see {@link Lists}
 *
 * @example
 * ```ts
 * import type { Lists } from "../types.ts"
 *
 * const toml = `
 * [[lists]]
 * name = "list name"
 *
 * [[lists.feeds]]
 * title = "feed title"
 * xmlUrl = "https://example.com/feed"
 * `;
 * const lists: Lists = convert(toml);
 * ```
 */
export function convert(data: string): Lists {
  const lists: Lists = parse(data) as Lists;
  lists.lists.map((list: List) => {
    list.feeds.map((feed: Feed) => {
      feed.xmlUrl = feed.xmlUrl
        ? new URL(feed.xmlUrl)
        : transcodeXmlUrl(feed.title, feed.type, feed.id);
    });
  });
  return lists;
}
