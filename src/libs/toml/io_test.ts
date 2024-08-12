import { assertEquals, assertIsError } from "@std/assert";

import { readTOML } from "./io.ts";
import type { Lists } from "../types.ts";

Deno.test("Read TOML", async (t: Deno.TestContext) => {
  await t.step("normal", async () => {
    const toml = `
[[lists]]
name = "list name"

[[lists.feeds]]
title = "feed title"
xmlUrl = "https://example.com/feed"
`;

    const lists: Lists = {
      lists: [{
        name: "list name",
        feeds: [{
          title: "feed title",
          xmlUrl: new URL("https://example.com/feed"),
        }],
      }],
    };

    const file: string = await Deno.makeTempFile({ suffix: ".toml" });
    await Deno.writeTextFile(file, toml);

    assertEquals(await readTOML(file), lists);
  });

  await t.step("file not found", async () => {
    try {
      await readTOML("file-not-found.toml");
    } catch (error) {
      assertEquals(error.message, 'file not found: "file-not-found.toml"');
    }
  });

  await t.step("permission denied", async () => {
    const file: string = await Deno.makeTempFile({ suffix: ".toml" });
    await Deno.chmod(file, 0o000);
    try {
      await readTOML(file);
    } catch (error) {
      assertEquals(error.message, `permission denied: "${file}"`);
    }
  });

  await t.step("unexpected error", async () => {
    try {
      await readTOML("");
    } catch (error) {
      assertIsError(error);
    }
  });
});
