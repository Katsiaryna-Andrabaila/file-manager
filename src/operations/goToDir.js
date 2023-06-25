import { ERRORS, COLORS } from "../constants/constants.js";
import { state } from "../state/state.js";
import { resolve } from "path";

const { chdir, stdout } = process;

export const goToDir = async (targetPath) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, targetPath.trim());
    chdir(path);
    state.currentDir = path;
  } catch {
    console.error(COLORS.red, !targetPath ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${state.currentDir}\n\n> `);
  }
};
