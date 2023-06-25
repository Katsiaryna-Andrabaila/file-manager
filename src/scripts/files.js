import { state } from "../state/state.js";
import { readFile as read, createReadStream, createWriteStream } from "fs";
import { join, resolve, dirname, basename } from "path";
import { rename as renameMethod, access, unlink } from "fs/promises";
import { open } from "fs/promises";

const { stdout } = process;

export const readFile = async (pathToFile) => {
  const dir = state.currentDir;

  read(join(dir, pathToFile), (error, data) => {
    if (error) {
      read(pathToFile, (e, data) => (e ? cb(data, true) : cb(data, false)));
    } else {
      cb(data, false);
    }
  });

  const cb = (output, isError) => {
    isError
      ? console.error("Operation failed\n")
      : console.log("\n" + output + "\n");
    stdout.write(`You are currently in ${state.currentDir}\n\n> `);
  };
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
