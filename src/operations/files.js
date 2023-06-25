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
import { COLORS, ERRORS } from "../constants/constants.js";

const { stdout } = process;

export const read = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile.trim());
    const content = await readFile(path, { encoding: "utf8" });
    console.log(COLORS.green, `\n${content}\n`);
  } catch {
    console.error(COLORS.red, !pathToFile ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const add = async (fileName) => {
  const dir = state.currentDir;
  let fileHandle;

  try {
    fileHandle = await open(join(dir, fileName.trim()), "wx");
    console.log(COLORS.green, `File was successfully added\n`);
    fileHandle.close();
  } catch {
    console.error(COLORS.red, !fileName ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${state.currentDir}\n\n> `);
  }
};

export const rename = async (pathToFile, newName) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile.trim());
    const newPath = join(dirname(path), newName.trim());
    await renameMethod(path, newPath);
    console.log(COLORS.green, `File was successfully renamed\n`);
  } catch {
    console.error(
      COLORS.red,
      !newName || !pathToFile ? ERRORS.input : ERRORS.operation
    );
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const copy = async (pathToFile, newPath, isCopy) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile.trim());
    const newAbsPath = resolve(dir, join(newPath.trim(), basename(path)));

    await access(path);
    await access(resolve(dir, newPath.trim()));

    const readable = createReadStream(path);
    const writable = createWriteStream(newAbsPath);
    readable.pipe(writable);

    if (isCopy) {
      console.log(COLORS.green, `File was successfully copied\n`);
    } else {
      await unlink(path);
      console.log(COLORS.green, `File was successfully moved\n`);
    }
  } catch {
    console.error(
      COLORS.red,
      !newPath || !pathToFile ? ERRORS.input : ERRORS.operation
    );
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const remove = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile.trim());
    await unlink(path);
    console.log(COLORS.green, `File was successfully deleted\n`);
  } catch {
    console.error(COLORS.red, !pathToFile ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
