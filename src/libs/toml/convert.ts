import { parse } from "@std/toml";
import { transcodeXmlUrl } from "../utils/sites.ts";
import type { Feed, List, Lists } from "../types.ts";

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
