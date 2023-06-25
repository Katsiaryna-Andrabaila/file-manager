import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { state } from "../state/state.js";

const { stdout } = process;

export const zlib = async (pathToFile, isCompress) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile);

    const gzip = isCompress ? createBrotliCompress() : createBrotliDecompress();
    const input = createReadStream(path);
    const output = createWriteStream(
      isCompress ? `${path}.br` : path.slice(0, path.indexOf(".br"))
    );

    input.pipe(gzip).pipe(output);
    stdout.write(
      `File was successfully ${isCompress ? "compressed" : "decompressed"}\n\n`
    );
  } catch {
    console.error("Operation failed\n");
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
