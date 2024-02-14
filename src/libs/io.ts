import { paramCase } from "case";
import { parse } from "toml";
import { format } from "path";
import { List, Lists } from "../types/mod.ts";
import { convertToOPML } from "./mod.ts";

export async function readTOML(file: string): Promise<Lists> {
  const data: string = await Deno.readTextFile(file);
  return parse(data) as Lists;
}

export async function writeXML(feeds: Lists): Promise<void> {
  const dir = "outputs";
  await Deno.mkdir(dir, { recursive: true });
  feeds.lists.map(async (list: List) => {
    const file: string = format({
      dir: dir,
      name: paramCase(list.name),
      ext: ".xml",
    });
    await Deno.writeTextFile(file, convertToOPML(list));
  });
}
