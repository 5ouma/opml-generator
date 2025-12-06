/**
 * Convert and write Lists to XML files.
 * @module
 */

import { paramCase } from "@wok/case";
import { format } from "@std/path";

import { convert } from "./convert.ts";
import type { List, Lists } from "../types.ts";

/**
 * Write Lists to XML files.
 *
 * @param feeds The feed lists to convert
 * @see {@link Lists}
 * @param dir The directory to save XML files to
 *
 * @example
 * ```ts
 * import type { Lists } from "../types.ts";
 *
 * const feeds: Lists = {
 *   lists: [{
 *     name: "list name",
 *     feeds: [{
 *       title: "feed title",
 *       xmlUrl: "https://example.com/feed",
 *    }],
 *   }],
 * };
 * const dir: string = await Deno.makeTempDir();
 * await write(feeds, dir);
 * ```
 */
export async function write(feeds: Lists, dir: string): Promise<void> {
  await Deno.mkdir(dir, { recursive: true });
  await Promise.all(feeds.lists.map(async (list: List) => {
    const file: string = format({
      dir: dir,
      name: paramCase(list.name),
      ext: ".xml",
    });
    await Deno.writeTextFile(file, convert(list));
  }));
}
