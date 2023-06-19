import { open } from "fs/promises";
import { join } from "path";
import { state } from "../state/state.js";

const { stdout } = process;

export const addFile = async (fileName) => {
  let fileHandle;
  try {
    const dir = state.currentDir;
    fileHandle = await open(join(dir, fileName), "wx");
  } catch {
    console.error("Operation failed");
  } finally {
    fileHandle.close();
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  }
};
