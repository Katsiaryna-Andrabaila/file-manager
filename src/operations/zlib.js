import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { resolve, join, basename } from "path";
import { createReadStream, createWriteStream } from "fs";
import { state } from "../state/state.js";
import { ERRORS, COLORS } from "../constants/constants.js";

const { stdout } = process;

export const zlib = async (pathToFile, pathToDestination, isCompress) => {
  const dir = state.currentDir;

  try {
    const path = resolve(dir, pathToFile.trim());
    const targetPath = resolve(dir, pathToDestination.trim());

    const gzip = isCompress ? createBrotliCompress() : createBrotliDecompress();
    const input = createReadStream(path);
    const output = createWriteStream(
      isCompress
        ? join(targetPath, `${basename(path)}.br`)
        : join(
            targetPath,
            basename(path).slice(0, basename(path).indexOf(".br"))
          )
    );

    input.pipe(gzip).pipe(output);
    console.log(
      COLORS.green,
      `File was successfully ${isCompress ? "compressed" : "decompressed"}\n`
    );
  } catch {
    console.error(
      COLORS.red,
      !pathToFile || !pathToDestination ? ERRORS.input : ERRORS.operation
    );
  } finally {
    stdout.write(`You are currently in ${dir}\n\n> `);
  }
};
