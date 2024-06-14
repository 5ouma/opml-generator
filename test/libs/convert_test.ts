import { assertEquals } from "@std/assert";
import { convertFromTOML, convertToOPML } from "../../src/libs/convert.ts";
import type { List, Lists } from "../../src/types/mod.ts";

Deno.test("Parse TOML", () => {
  const toml = `
[[lists]]
name = "list name"

[[lists.feeds]]
title = "feed title"
type = "rss"
rssUrl = "https://example.com/feed"
`;

  const feeds: Lists = {
    lists: [
      {
        name: "list name",
        feeds: [
          {
            title: "feed title",
            type: "rss",
            rssUrl: new URL("https://example.com/feed"),
            xmlUrl: new URL("https://example.com/feed"),
          },
        ],
      },
    ],
  };

  assertEquals(convertFromTOML(toml), feeds);
});

Deno.test("Convert Lists to OPML", () => {
  const xml = `\
<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <body>
    <outline title="feed title" text="feed title" xmlUrl="https://example.com/feed" type="rss"/>
  </body>
</opml>
`;

  const list: List = {
    name: "list name",
    feeds: [
      {
        title: "feed title",
        type: "rss",
        rssUrl: new URL("https://example.com/feed"),
      },
    ],
  };

  assertEquals(convertToOPML(list), xml);
});
