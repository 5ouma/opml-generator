import { assertEquals, assertIsError } from "@std/assert";
import { join } from "@std/path";
import { readTOML, writeXML } from "../../src/libs/io.ts";
import { convertToOPML, convertToTOML } from "../../src/libs/convert.ts";
import type { Lists } from "../../src/types/mod.ts";

Deno.test("Read TOML", async () => {
  const toml = `
[[lists]]
name = "list name"

[[lists.feeds]]
title = "feed title"
xmlUrl = "https://example.com/feed"
`;

  const file: string = await Deno.makeTempFile({ suffix: ".toml" });
  await Deno.writeTextFile(file, toml);
  const lists: Lists = await readTOML(file);

  assertEquals(convertToTOML(toml), lists);
});

Deno.test("Read TOML (File not found)", async () => {
  try {
    await readTOML("file-not-found.toml");
  } catch (error) {
    assertEquals(error.message, 'File not found: "file-not-found.toml"');
  }
});

Deno.test("Read TOML (Permission denied)", async () => {
  const file: string = await Deno.makeTempFile({ suffix: ".toml" });
  await Deno.chmod(file, 0o000);
  try {
    await readTOML(file);
  } catch (error) {
    assertEquals(error.message, `Permission denied: "${file}"`);
  }
});

Deno.test("Read TOML (Unexpected error)", async () => {
  try {
    await readTOML("");
  } catch (error) {
    assertIsError(error);
  }
});

Deno.test("Write XML", async () => {
  const feeds: Lists = {
    lists: [
      {
        name: "list name",
        feeds: [
          {
            title: "feed title",
            text: "feed title",
            xmlUrl: new URL("https://example.com/feed"),
          },
        ],
      },
    ],
  };

  const dir: string = await Deno.makeTempDir();
  await writeXML(feeds, dir);
  const data: string = await Deno.readTextFile(join(dir, "list-name.xml"));

  assertEquals(convertToOPML(feeds.lists[0]), data);
});
