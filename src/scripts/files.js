import { state } from "../state/state.js";
import { createReadStream, createWriteStream } from "fs";
import { join, resolve, dirname, basename } from "path";
import {
  readFile,
  rename as renameMethod,
  access,
  unlink,
  open,
} from "fs/promises";

const { stdout } = process;

export const read = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);
    const content = await readFile(path, { encoding: "utf8" });
    console.log(`\n${content}\n`);
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const addFile = async (fileName) => {
  const dir = state.currentDir;
  let fileHandle;

  try {
    fileHandle = await open(join(dir, fileName), "wx");
    stdout.write(`File was successfully added\n\n`);
  } catch {
    console.error("Operation failed");
  } finally {
    fileHandle.close();
    stdout.write(`You are currently in ${state.currentDir}\n\n> `);
  }
};

export const rename = async (pathToFile, newName) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);
    const newPath = join(dirname(path), newName);
    await renameMethod(path, newPath);
    stdout.write(`File was successfully renamed\n\n`);
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const copy = async (pathToFile, newPath, isCopy) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);
    const newAbsPath = resolve(dir, join(newPath.trim(), basename(path)));

    await access(path);
    await access(resolve(dir, newPath.trim()));

    const readable = createReadStream(path);
    const writable = createWriteStream(newAbsPath);
    readable.pipe(writable);

    if (isCopy) {
      stdout.write(`File was successfully copied\n\n`);
    } else {
      await unlink(path);
      stdout.write(`File was successfully moved\n\n`);
    }
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const remove = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);
    await unlink(path);
    stdout.write(`File was successfully deleted\n\n`);
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
