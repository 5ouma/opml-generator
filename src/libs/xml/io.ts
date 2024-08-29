import { paramCase } from "@wok/case";
import { format } from "@std/path";

import { convert } from "./convert.ts";
import type { List, Lists } from "../types.ts";

export async function write(feeds: Lists, dir: string): Promise<void> {
  await Deno.mkdir(dir, { recursive: true });
  feeds.lists.map(async (list: List) => {
    const file: string = format({
      dir: dir,
      name: paramCase(list.name),
      ext: ".xml",
    });
    await Deno.writeTextFile(file, convert(list));
  });
}
