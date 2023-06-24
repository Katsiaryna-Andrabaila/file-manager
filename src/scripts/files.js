import { state } from "../state/state.js";
import { readFile as read } from "fs";
import { join, resolve, dirname } from "path";
import { rename as renameMethod } from "fs/promises";
import { open } from "fs/promises";

const { stdout } = process;

export const readFile = async (pathToFile) => {
  const dir = state.currentDir;

  read(join(dir, pathToFile), "utf8", (error, data) => {
    if (error) {
      read(pathToFile, "utf8", (e, data) =>
        e ? cb(data, true) : cb(data, false)
      );
    } else {
      cb(data, false);
    }
  });

  const cb = (output, isError) => {
    isError
      ? console.error("Operation failed\n")
      : console.log("\n" + output + "\n");
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  };
};

export const addFile = async (fileName) => {
  const dir = state.currentDir;
  let fileHandle;

  try {
    fileHandle = await open(join(dir, fileName), "wx");
  } catch {
    console.error("Operation failed");
  } finally {
    fileHandle.close();
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  }
};

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
