import { parseArgs } from "@std/cli";
import { basename, resolve } from "@std/path";

import { type Lists, toml, xml } from "./libs/mod.ts";

const flags = parseArgs(Deno.args, {
  string: ["feeds", "output"],
  default: { feeds: "./feeds.toml", output: "./outputs" },
});
flags.feeds = resolve(flags.feeds);
flags.output = resolve(flags.output);

try {
  const feeds: Lists = await toml.read(flags.feeds);
  await xml.write(feeds, flags.output);
} catch (error) {
  console.error(`🚨 ${error.message}`);
  Deno.exit(1);
}
console.log(`✅ ${basename(flags.feeds)}`);
