import { paramCase } from "@wok/case";
import { format } from "@std/path";
import { convertFromTOML, convertToOPML } from "./convert.ts";
import type { List, Lists } from "@5ouma/opml-generator/types";

export async function readTOML(file: string): Promise<Lists> {
  try {
    const data: string = await Deno.readTextFile(file);
    return convertFromTOML(data);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(`file not found: "${file}"`);
    } else if (error instanceof Deno.errors.PermissionDenied) {
      throw new Error(`permission denied: "${file}"`);
    } else throw error;
  }
}

export async function writeXML(feeds: Lists, dir: string): Promise<void> {
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
