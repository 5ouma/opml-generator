import { readTOML } from "./libs/mod.ts";

const feeds = await readTOML("feeds.toml");
console.log(feeds);
