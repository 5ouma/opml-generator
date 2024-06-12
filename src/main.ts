import { parseArgs } from "@std/cli";
import { basename, resolve } from "@std/path";
import { readTOML, writeXML } from "./libs/mod.ts";
import type { Lists } from "./types/mod.ts";

const flags = parseArgs(Deno.args, {
  string: ["feeds", "output"],
  default: {
    feeds: "./feeds.toml",
    output: "./outputs",
  },
});
flags.feeds = resolve(flags.feeds);
flags.output = resolve(flags.output);

try {
  const feeds: Lists = await readTOML(flags.feeds);
  await writeXML(feeds, flags.output);
} catch (error) {
  console.error(`🚨 ${error.message}`);
  Deno.exit(1);
}
console.log(`✅ ${basename(flags.feeds)}`);
