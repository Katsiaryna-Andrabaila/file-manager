import { state } from "../state/state.js";
import { resolve } from "path";

const { chdir, stdout } = process;

export const goToDir = async (targetPath) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, targetPath);
    chdir(path);
    state.currentDir = path;
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${state.currentDir}\n\n> `);
  }
};
