import { homedir } from "os";

const { argv, stdout, stdin } = process;
const args = argv.slice();

const start = async () => {
  let name;
  if (args.length > 2) {
    name = args.slice(2)[0].split("=")[1];
  }

  const byePhrase = `Thank you for using File Manager, ${
    name || "Dear Checker"
  }, goodbye!`;

  stdin.pipe(stdout);

  stdout.write(`Welcome to the File Manager, ${name || "Dear Checker"}!\n`);
  stdout.write(`You are currently in ${homedir()}\n\n`);

  stdin.on("data", (data) => {
    if (data.toString().trim() === ".exit") {
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
