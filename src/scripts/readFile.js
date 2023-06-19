import { state } from "../state/state.js";
import { readFile as read } from "fs";
import { join } from "path";

const { stdout } = process;

export const readFile = async (pathToFile) => {
  const dir = state.currentDir;

  read(join(dir, pathToFile), "utf8", (error, data) => {
    if (error) {
      read(pathToFile, "utf8", (e, data) => {
        if (e) console.error("Operation failed\n");
        console.log("\n" + data + "\n");
        stdout.write(`You are currently in ${state.currentDir}\n\n`);
      });
    } else {
      console.log("\n" + data + "\n");
    }
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  });
};
