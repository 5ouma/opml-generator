import { convert } from "./convert.ts";
import type { Lists } from "../types.ts";

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
