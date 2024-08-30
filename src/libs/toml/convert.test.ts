import { assertEquals } from "@std/assert";

import { convert } from "./convert.ts";
import type { Lists } from "../types.ts";

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

    assertEquals(convert(toml), feeds);
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

    assertEquals(convert(toml), feeds);
  });
});
