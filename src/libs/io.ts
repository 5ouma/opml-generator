import { parse } from "toml";
import { Lists } from "../types/mod.ts";

export async function readTOML(file: string): Promise<Lists> {
  const data: string = await Deno.readTextFile(file);
  return parse(data) as Lists;
}
