import { stringify } from "xml";
import { parse } from "toml";
import { Feed, List, Lists, OPMLOutline } from "../types/mod.ts";

export function convertToTOML(data: string): Lists {
  const lists: Lists = parse(data) as Lists;
  lists.lists.map((list: List) => {
    list.feeds.map((feed: Feed) => {
      feed.xmlUrl = new URL(feed.xmlUrl);
    });
  });
  return lists;
}

export function convertToOPML(list: List): string {
  const body = {
    outline: list.feeds.map((feed: Feed): OPMLOutline => {
      return {
        "@title": feed.title,
        "@xmlUrl": feed.xmlUrl,
        "@type": "rss",
      };
    }),
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
${stringify({ opml: { "@version": "2.0", body: [body] } })}
`;
}
