import { assertEquals } from "@std/assert";

import { transcodeXmlUrl } from "./sites.ts";
import type { Feed } from "../types.ts";

Deno.test("Get XML URL", async (t: Deno.TestContext) => {
  await t.step("site", () => {
    const feed: Feed = {
      title: "feed title",
      type: "bluesky",
      id: "username",
    };

    assertEquals(
      transcodeXmlUrl(feed.title, feed.type, feed.id),
      "https://bsky.app/profile/username/rss",
    );
  });

  await t.step("type not set", () => {
    const feed: Feed = { title: "feed title", id: "username" };
    try {
      transcodeXmlUrl(feed.title, undefined, feed.id);
    } catch (error) {
      assertEquals(
        (error as Error).message,
        `parameter not set: "type" of "${feed.title}"`,
      );
    }
  });

  await t.step("id not set", () => {
    const feed: Feed = { title: "feed title", type: "bluesky" };
    try {
      transcodeXmlUrl(feed.title, feed.type, undefined);
    } catch (error) {
      assertEquals(
        (error as Error).message,
        `parameter not set: "id" of "${feed.title}"`,
      );
    }
  });

  await t.step("site not found", () => {
    const feed: Feed = { title: "feed title", type: "unknown", id: "username" };
    try {
      transcodeXmlUrl(feed.title, feed.type, feed.id);
    } catch (error) {
      assertEquals(
        (error as Error).message,
        `site not found: "${feed.type}" of "${feed.title}"`,
      );
    }
  });
});
