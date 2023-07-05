import { state } from "../state/state.js";
import { createReadStream, createWriteStream } from "fs";
import { join, resolve, dirname, basename } from "path";
import { rename as renameMethod, access, unlink, open } from "fs/promises";
import os from "os";
import { COLORS, ERRORS } from "../constants/constants.js";
import { getNameWithoutQuotes } from "../utils/getNameWithoutQuotes.js";

const { stdout } = process;

export const read = async (pathToFile) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, getNameWithoutQuotes(pathToFile));
    await access(path);
    if (pathToFile && pathToFile !== os.EOL) {
      const stream = createReadStream(path);

      stream.on("data", (chunk) => {
        console.log(COLORS.green, `\n${chunk}\n`);
        stdout.write(`You are currently in ${dir}\n\n> `);
      });
    }
  } catch {
    console.error(
      COLORS.red,
      !pathToFile || pathToFile === os.EOL ? ERRORS.input : ERRORS.operation
    );
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};

export const add = async (fileName) => {
  const dir = state.currentDir;
  let fileHandle;

  try {
    fileHandle = await open(join(dir, getNameWithoutQuotes(fileName)), "wx");
    console.log(COLORS.green, `File was successfully added\n`);
    fileHandle.close();
  } catch (e) {
    console.error(e);
    console.error(COLORS.red, !fileName ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${state.currentDir}\n\n> `);
  }
};

export const rename = async (pathToFile, newName) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, getNameWithoutQuotes(pathToFile));
    const newPath = join(dirname(path), getNameWithoutQuotes(newName));
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
    const path = resolve(dir, getNameWithoutQuotes(pathToFile));
    const newAbsPath = resolve(
      dir,
      join(getNameWithoutQuotes(newPath), basename(path))
    );

    await access(path);
    await access(resolve(dir, getNameWithoutQuotes(newPath)));

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
    const path = resolve(dir, getNameWithoutQuotes(pathToFile));
    await unlink(path);
    console.log(COLORS.green, `File was successfully deleted\n`);
  } catch {
    console.error(COLORS.red, !pathToFile ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
