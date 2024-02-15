import { assertEquals } from "assert";
import { join } from "path";
import {
  convertToOPML,
  convertToTOML,
  readTOML,
  writeXML,
} from "../../src/libs/mod.ts";
import { Lists } from "../../src/types/toml.ts";

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

Deno.test("Write XML", async () => {
  const feeds: Lists = {
    lists: [
      {
        name: "list name",
        feeds: [
          { title: "feed title", xmlUrl: new URL("https://example.com/feed") },
        ],
      },
    ],
  };

  const dir: string = await Deno.makeTempDir();
  await writeXML(feeds, dir);
  const data: string = await Deno.readTextFile(join(dir, "list-name.xml"));

  assertEquals(convertToOPML(feeds.lists[0]), data);
});
