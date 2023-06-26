import { ERRORS, COLORS } from "../constants/constants.js";
import { state } from "../state/state.js";
import os from "os";

const { stdout } = process;

export const getOs = async (detail) => {
  if (!detail) {
    console.error(COLORS.red, ERRORS.input);
  } else {
    switch (detail.slice(2).trim()) {
      case "EOL":
        console.log(COLORS.green, JSON.stringify(os.EOL) + "\n");
        break;
      case "cpus":
        console.log(COLORS.green, `\nOVERALL AMOUNT: ${os.cpus().length}`);
        console.table(
          os.cpus().map((el) => ({
            model: el.model,
            clock_rate: `${(el.speed / 1000).toFixed(2)} GHz`,
          }))
        );
        break;
      case "homedir":
        console.log(COLORS.green, os.homedir() + "\n");
        break;
      case "username":
        console.log(COLORS.green, os.userInfo().username + "\n");
        break;
      case "architecture":
        console.log(COLORS.green, os.arch + "\n");
        break;
      default:
        console.error(COLORS.red, ERRORS.input);
    }
  }

  stdout.write(`You are currently in ${state.currentDir}\n\n> `);
};
