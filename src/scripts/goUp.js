import { state } from "../state/state.js";
import path from "path";

const { chdir, stdout } = process;

export const goUp = async () => {
  const dir = state.currentDir;
  const targetDir = path.dirname(dir);

  chdir(targetDir);

  state.currentDir = targetDir;

  stdout.write(`You are currently in ${state.currentDir}\n\n`);
};
