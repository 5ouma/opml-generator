/**
 * Read TOML file and convert to Lists.
 * @module
 */

import { convert } from "./convert.ts";
import type { Lists } from "../types.ts";

/**
 * Read TOML file and convert to Lists.
 *
 * @param file The TOML file to convert
 * @returns The converted lists
 * @see {@link Lists}
 * @throws Deno.errors.NotFound
 * @throws Deno.errors.PermissionDenied
 * @throws Error
 *
 * @example
 * ```ts
 * import type { Lists } from "../types.ts"
 *
 * const lists: Lists = await read("./docs/assets/example/feeds.toml");
 * ```
 */
export async function read(file: string): Promise<Lists> {
  try {
    const data: string = await Deno.readTextFile(file);
    return convert(data);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(`file not found: "${file}"`);
    } else if (error instanceof Deno.errors.PermissionDenied) {
      throw new Error(`permission denied: "${file}"`);
    } else throw error;
  }
}
