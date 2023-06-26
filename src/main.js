import { homedir } from "os";
import { getList } from "./operations/getList.js";
import { state } from "./state/state.js";
import { goUp } from "./operations/goUp.js";
import { getOs } from "./operations/getOs.js";
import { goToDir } from "./operations/goToDir.js";
import { read, add, rename, copy, remove } from "./operations/files.js";
import { getHash } from "./operations/getHash.js";
import { zlib } from "./operations/zlib.js";
import { COLORS, ERRORS, REG_EXP } from "./constants/constants.js";
import { getByePhrase } from "./utils/getByePhrase.js";

const { argv, stdout, stdin } = process;
const args = argv.slice();

const start = async () => {
  let name;
  if (args.length > 2) {
    name = args.slice(2)[0].split("=")[1];
  }

  stdout.write(`Welcome to the File Manager, ${name || "Dear Checker"}!\n`);

  const homeDir = homedir();
  state.currentDir = homeDir;
  stdout.write(`You are currently in ${homeDir}\n\n> `);

  stdin.on("data", async (data) => {
    const operation = data.toString().split(" ")[0].trim();
    const details = data.toString().match(REG_EXP);

    switch (operation) {
      case "ls":
        await getList();
        break;
      case "up":
        await goUp();
        break;
      case "os":
        await getOs(details[1]);
        break;
      case "cd":
        await goToDir(details[1]);
        break;
      case "cat":
        await read(details[1]);
        break;
      case "add":
        await add(details[1]);
        break;
      case "rn":
        await rename(details[1], details[2]);
        break;
      case "cp":
        await copy(details[1], details[2], true);
        break;
      case "mv":
        await copy(details[1], details[2], false);
        break;
      case "rm":
        await remove(details[1]);
        break;
      case "hash":
        await getHash(details[1]);
        break;
      case "compress":
        await zlib(details[1], details[2], true);
        break;
      case "decompress":
        await zlib(details[1], details[2], false);
        break;
      case ".exit":
        stdout.write(getByePhrase(name));
        process.exit();
      default:
        console.error(COLORS.red, ERRORS.input);
        stdout.write(`You are currently in ${state.currentDir}\n\n> `);
    }
  });

  process.on("SIGINT", () => {
    stdout.write(getByePhrase(name));
    process.exit();
  });
};

await start();
