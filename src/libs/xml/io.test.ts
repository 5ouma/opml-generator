import { assertEquals } from "@std/assert";
import { join } from "@std/path";

import { write } from "./io.ts";
import type { Lists } from "../types.ts";

Deno.test("Write XML", async () => {
  const lists: Lists = {
    lists: [{
      name: "list name",
      feeds: [{
        title: "feed title",
        xmlUrl: "https://example.com/feed",
      }],
    }],
  };

  const xml = `\
<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <body>
    <outline title="feed title" text="feed title" xmlUrl="https://example.com/feed" type="rss"/>
  </body>
</opml>`;

  const dir: string = await Deno.makeTempDir();
  await write(lists, dir);

  assertEquals(await Deno.readTextFile(join(dir, "list-name.xml")), xml);
});
