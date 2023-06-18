import { readdir } from "fs/promises";
import { state } from "../state/state.js";

const { stdout } = process;

export const getList = async () => {
  try {
    const dir = state.currentDir;
    const array = [];

    const files = await readdir(dir, { withFileTypes: true });
    for (const file of files) {
      array.push({
        Name: file.name,
        Type: file.isFile() ? "file" : "directory",
      });
    }

    console.table(array.sort((a, b) => (a.Type > b.Type ? 1 : -1)));
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  } catch (e) {
    console.error(e);
  }
};
