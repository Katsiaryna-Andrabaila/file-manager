import { createHash } from "node:crypto";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { state } from "../state/state.js";
import { COLORS, ERRORS } from "../constants/constants.js";

const { stdout } = process;

export const getHash = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile.trim());
    const content = await readFile(path);
    const hash = createHash("sha256").update(content).digest("hex");
    console.log(COLORS.green, `${hash}\n`);
  } catch {
    console.error(COLORS.red, !pathToFile ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
