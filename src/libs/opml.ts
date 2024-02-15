import { stringify } from "xml";
import { Feed, List, OPMLOutline } from "../types/mod.ts";

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
`.replaceAll("amp;", "");
}
