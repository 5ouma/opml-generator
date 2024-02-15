import { readTOML, writeXML } from "./libs/mod.ts";

try {
  const feeds = await readTOML("feeds.toml");
  await writeXML(feeds);
} catch (error) {
  console.error(`🚨 ${error.message}`);
  Deno.exit(1);
}
