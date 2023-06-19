import { state } from "../state/state.js";
import { access, constants } from "fs";
import { join } from "path";

const { chdir, stdout } = process;

export const goToDir = async (targetPath) => {
  const dir = state.currentDir;

  access(join(dir, targetPath), constants.F_OK, (error) => {
    if (error) {
      access(targetPath, constants.F_OK, (e) => {
        e ? cb(targetPath, true) : cb(targetPath, false);
      });
    } else {
      cb(join(dir, targetPath), false);
    }
  });

  const cb = (filePath, isError) => {
    if (!isError) {
      chdir(filePath);
      state.currentDir = filePath;
    } else {
      console.error("Operation failed\n");
    }
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  };
};
