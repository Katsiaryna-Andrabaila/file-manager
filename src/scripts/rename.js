import { state } from "../state/state.js";
import { join, resolve, dirname } from "path";
import { rename as renameMethod } from "fs/promises";

const { stdout } = process;

export const rename = async (pathToFile, newName) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);
    const newPath = join(dirname(path), newName);
    await renameMethod(path, newPath);
  } catch (e) {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n`);
  }
};
