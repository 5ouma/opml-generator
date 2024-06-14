import { stringify } from "@libs/xml";
import { parse } from "@std/toml";
import { transcodeXmlUrl } from "./sites.ts";
import type { Feed, List, Lists, OPMLOutline } from "../types/mod.ts";

export function convertFromTOML(data: string): Lists {
  const lists: Lists = parse(data) as Lists;
  lists.lists.map((list: List) => {
    list.feeds.map((feed: Feed) => {
      if (feed.rssUrl) {
        feed.rssUrl = new URL(feed.rssUrl as URL);
      }
      feed.xmlUrl = transcodeXmlUrl(
        feed.title,
        feed.type,
        feed.rssUrl,
        feed.id,
      );
    });
  });
  return lists;
}

export function convertToOPML(list: List): string {
  const body = {
    outline: list.feeds.map((feed: Feed): OPMLOutline => {
      return {
        "@title": feed.title,
        "@text": feed.title,
        "@xmlUrl": transcodeXmlUrl(feed.title, feed.type, feed.rssUrl, feed.id),
        "@type": "rss",
      };
    }),
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
${stringify({ opml: { "@version": "2.0", body: [body] } })}
`;
}
