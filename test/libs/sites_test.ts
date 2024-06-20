import { assertEquals } from "@std/assert";
import { transcodeXmlUrl } from "../../src/libs/sites.ts";
import type { Feed } from "@5ouma/opml-generator/types";

Deno.test("Get XML URL", async (t: Deno.TestContext) => {
  await t.step("site", () => {
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

  await t.step("type not set", () => {
    const feed: Feed = { title: "feed title", id: "username" };
    try {
      transcodeXmlUrl(feed.title, undefined, feed.id);
    } catch (error) {
      assertEquals(
        error.message,
        `parameter not set: "type" of "${feed.title}"`,
      );
    }
  });

  await t.step("id not set", () => {
    const feed: Feed = { title: "feed title", type: "bluesky" };
    try {
      transcodeXmlUrl(feed.title, feed.type, undefined);
    } catch (error) {
      assertEquals(error.message, `parameter not set: "id" of "${feed.title}"`);
    }
  });

  await t.step("site not found", () => {
    const feed: Feed = { title: "feed title", type: "unknown", id: "username" };
    try {
      transcodeXmlUrl(feed.title, feed.type, feed.id);
    } catch (error) {
      assertEquals(
        error.message,
        `site not found: "${feed.type}" of "${feed.title}"`,
      );
    }
  });
});
