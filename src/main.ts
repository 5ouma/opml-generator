import { readTOML, writeXML } from "./libs/mod.ts";
import { Lists } from "./types/mod.ts";

try {
  const feeds: Lists = await readTOML("feeds.toml");
  await writeXML(feeds, "outputs");
} catch (error) {
  console.error(`🚨 ${error.message}`);
  Deno.exit(1);
}
