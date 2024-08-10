import { stringify } from "@libs/xml";
import { transcodeXmlUrl } from "../utils/sites.ts";
import type { Feed, List, OPMLOutline } from "../types.ts";

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

  return `<?xml version="1.0" encoding="UTF-8"?>
${stringify({ opml: { "@version": "2.0", body: [body] } })}
`;
}
