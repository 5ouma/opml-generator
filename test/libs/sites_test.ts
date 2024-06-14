import { assertEquals } from "@std/assert";
import { transcodeXmlUrl } from "../../src/libs/sites.ts";
import type { Feed } from "../../src/types/mod.ts";

Deno.test("Get XML URL (RSS)", () => {
  const feed: Feed = {
    title: "feed title",
    type: "rss",
    rssUrl: new URL("https://example.com/feed"),
  };
  assertEquals(transcodeXmlUrl(feed.type, feed.rssUrl), feed.rssUrl);
});

Deno.test("Get XML URL (Site)", () => {
  const feed: Feed = {
    title: "feed title",
    type: "bluesky",
    id: "username",
  };
  assertEquals(
    transcodeXmlUrl(feed.type, feed.rssUrl, feed.id),
    new URL("https://bsky.app/profile/username/rss"),
  );
});
