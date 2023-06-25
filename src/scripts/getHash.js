import { createHash } from "node:crypto";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { state } from "../state/state.js";

const { stdout } = process;

export const getHash = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);
    const content = await readFile(path);
    const hash = createHash("sha256").update(content).digest("hex");
    stdout.write(`${hash}\n\n`);
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
