import { assertEquals } from "@std/assert";
import { transcodeXmlUrl } from "../../src/libs/sites.ts";
import type { Feed } from "../../src/types/mod.ts";

Deno.test("Get XML URL (Site)", () => {
  const feed: Feed = {
    title: "feed title",
    type: "bluesky",
    id: "username",
  };
  assertEquals(
    transcodeXmlUrl(feed.title, feed.type, feed.id),
    new URL("https://bsky.app/profile/username/rss"),
  );
});

Deno.test("Get XML URL (type not set)", () => {
  const feed: Feed = { title: "feed title", id: "username" };
  try {
    transcodeXmlUrl(feed.title, undefined, feed.id);
  } catch (error) {
    assertEquals(error.message, `Parameter not set: "type" of "${feed.title}"`);
  }
});

Deno.test("Get XML URL (id not set)", () => {
  const feed: Feed = { title: "feed title", type: "bluesky" };
  try {
    transcodeXmlUrl(feed.title, feed.type, undefined);
  } catch (error) {
    assertEquals(error.message, `Parameter not set: "id" of "${feed.title}"`);
  }
});

Deno.test("Get XML URL (Site not found)", () => {
  const feed: Feed = { title: "feed title", type: "unknown", id: "username" };
  try {
    transcodeXmlUrl(feed.title, feed.type, feed.id);
  } catch (error) {
    assertEquals(
      error.message,
      `Site not found: "${feed.type}" of "${feed.title}"`,
    );
  }
});
