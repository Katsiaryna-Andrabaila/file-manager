import { state } from "../state/state.js";
import os from "os";

const { stdout } = process;

export const getOs = async (detail) => {
  try {
    switch (detail) {
      case "EOL":
        console.log(JSON.stringify(os.EOL) + "\n");
        break;
      case "cpus":
        console.log(os.cpus());
        break;
      case "homedir":
        console.log(os.homedir() + "\n");
        break;
      case "username":
        console.log(os.userInfo().username + "\n");
        break;
      case "architecture":
        console.log(os.arch + "\n");
        break;
      default:
        console.error("Operation failed\n");
    }

    stdout.write(`You are currently in ${state.currentDir}\n\n`);
  } catch (e) {
    console.error(e);
  }
};
