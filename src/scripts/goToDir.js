import { state } from "../state/state.js";
import { access, constants } from "fs";
import { join } from "path";

const { chdir, stdout } = process;

export const goToDir = async (targetPath) => {
  const dir = state.currentDir;

  access(join(dir, targetPath), constants.F_OK, (error) => {
    if (error) {
      access(targetPath, constants.F_OK, (e) => {
        if (e) console.error("Operation failed\n");
        chdir(targetPath);
        state.currentDir = targetPath;
        stdout.write(`You are currently in ${state.currentDir}\n\n`);
      });
      return;
    }
    chdir(join(dir, targetPath));
    state.currentDir = join(dir, targetPath);
    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  });
};
