import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { state } from "../state/state.js";
import { ERRORS, COLORS } from "../constants/constants.js";

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
    console.log(
      COLORS.green,
      `File was successfully ${isCompress ? "compressed" : "decompressed"}\n`
    );
  } catch {
    console.error(COLORS.red, !fileName ? ERRORS.input : ERRORS.operation);
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
