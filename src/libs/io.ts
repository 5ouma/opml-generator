import { paramCase } from "@wok/case";
import { format } from "@std/path";
import { List, Lists } from "../types/mod.ts";
import { convertToOPML, convertToTOML } from "./mod.ts";

export async function readTOML(file: string): Promise<Lists> {
  try {
    const data: string = await Deno.readTextFile(file);
    return await convertToTOML(data);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw Error(`File not found: "${file}"`);
    } else if (error instanceof Deno.errors.PermissionDenied) {
      throw Error(`Permission denied: "${file}"`);
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
