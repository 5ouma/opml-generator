import { assertEquals } from "@std/assert";
import { transcodeXmlUrl } from "../../src/libs/sites.ts";
import type { Feed } from "../../src/types/mod.ts";

Deno.test("Get XML URL (RSS)", () => {
  const feed: Feed = {
    title: "feed title",
    type: "rss",
    rssUrl: new URL("https://example.com/feed"),
  };
  assertEquals(
    transcodeXmlUrl(feed.title, feed.type, feed.rssUrl),
    feed.rssUrl,
  );
});

Deno.test("Get XML URL (Site)", () => {
  const feed: Feed = {
    title: "feed title",
    type: "bluesky",
    id: "username",
  };
  assertEquals(
    transcodeXmlUrl(feed.title, feed.type, feed.rssUrl, feed.id),
    new URL("https://bsky.app/profile/username/rss"),
  );
});

Deno.test("Get XML URL (rssUrl not set)", () => {
  try {
    transcodeXmlUrl("feed title", "rss");
  } catch (error) {
    assertEquals(error.message, 'Parameter not set: "rssUrl" of "feed title"');
  }
});

Deno.test("Get XML URL (id not set)", () => {
  try {
    transcodeXmlUrl("feed title", "bluesky");
  } catch (error) {
    assertEquals(error.message, 'Parameter not set: "id" of "feed title"');
  }
});

Deno.test("Get XML URL (Site not found)", () => {
  try {
    transcodeXmlUrl("feed title", "unknown", undefined, "username");
  } catch (error) {
    assertEquals(error.message, 'Site not found: "unknown" of "feed title"');
  }
});
