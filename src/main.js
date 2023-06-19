import { homedir } from "os";
import { getList } from "./scripts/getList.js";
import { state } from "./state/state.js";
import { goUp } from "./scripts/goUp.js";
import { getOs } from "./scripts/getOs.js";
import { goToDir } from "./scripts/goToDir.js";
import { readFile } from "./scripts/readFile.js";
import { addFile } from "./scripts/addFile.js";

const { argv, stdout, stdin } = process;
const args = argv.slice();

const start = async () => {
  let name;
  if (args.length > 2) {
    name = args.slice(2)[0].split("=")[1];
  }

  const byePhrase = `\nThank you for using File Manager, ${
    name || "Dear Checker"
  }, goodbye!`;

  stdin.pipe(stdout);

  stdout.write(`Welcome to the File Manager, ${name || "Dear Checker"}!\n`);

  const homeDir = homedir();
  state.currentDir = homeDir;
  stdout.write(`You are currently in ${homeDir}\n\n`);

  stdin.on("data", async (data) => {
    const operation = data.toString().split(" ")[0].trim();
    const details = data.toString().split(" ");

    switch (operation) {
      case "ls":
        await getList();
        break;
      case "up":
        await goUp();
        break;
      case "..":
        await goUp();
        break;
      case "os":
        await getOs(details[1].slice(2).trim());
        break;
      case "cd":
        await goToDir(details[1].trim());
        break;
      case "cat":
        await readFile(details[1].trim());
        break;
      case "add":
        await addFile(details[1].trim());
        break;
      case ".exit":
        stdout.write(byePhrase);
        process.exit();
    }
  });

  process.on("SIGINT", () => {
    stdout.write(byePhrase);
    process.exit();
  });
};

await start();
