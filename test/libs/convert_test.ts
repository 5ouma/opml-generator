import { assertEquals } from "@std/assert";
import { convertFromTOML, convertToOPML } from "../../src/libs/convert.ts";
import type { List, Lists } from "@5ouma/opml-generator/types";

Deno.test("Parse TOML", async (t: Deno.TestContext) => {
  await t.step("rss", () => {
    const toml = `
[[lists]]
name = "list name"

[[lists.feeds]]
title = "feed title"
xmlUrl = "https://example.com/feed"
`;

    const feeds: Lists = {
      lists: [{
        name: "list name",
        feeds: [{
          title: "feed title",
          xmlUrl: new URL("https://example.com/feed"),
        }],
      }],
    };

    assertEquals(convertFromTOML(toml), feeds);
  });

  await t.step("site", () => {
    const toml = `
[[lists]]
name = "list name"

[[lists.feeds]]
title = "feed title"
type = "bluesky"
id = "username"
`;

    const feeds: Lists = {
      lists: [{
        name: "list name",
        feeds: [{
          title: "feed title",
          type: "bluesky",
          id: "username",
          xmlUrl: new URL("https://bsky.app/profile/username/rss"),
        }],
      }],
    };

    assertEquals(convertFromTOML(toml), feeds);
  });
});

Deno.test("Convert Lists to OPML", async (t: Deno.TestContext) => {
  await t.step("rss", () => {
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
      feeds: [{
        title: "feed title",
        xmlUrl: new URL("https://example.com/feed"),
      }],
    };

    assertEquals(convertToOPML(list), xml);
  });

  await t.step("site", () => {
    const xml = `\
<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <body>
    <outline title="feed title" text="feed title" xmlUrl="https://bsky.app/profile/username/rss" type="rss"/>
  </body>
</opml>
`;

    const list: List = {
      name: "list name",
      feeds: [{
        title: "feed title",
        type: "bluesky",
        id: "username",
      }],
    };

    assertEquals(convertToOPML(list), xml);
  });
});
