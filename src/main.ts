import { readTOML, writeXML } from "./libs/mod.ts";

const feeds = await readTOML("feeds.toml");
await writeXML(feeds);
