import { assertEquals } from "@std/assert";
import { convert } from "./convert.ts";
import type { List } from "../types.ts";
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

    assertEquals(convert(list), xml);
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

    assertEquals(convert(list), xml);
  });
});
