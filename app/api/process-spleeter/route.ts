import fs from "fs";
import util from "util";
import path from "path";

const readdir = util.promisify(fs.readdir);

export async function processWithSpleeter() {
  console.log("Starting Spleeter Process:");

  try {
    const inputFolder = await readdir("./public/spleeter/input");
    const customDirectory = await readdir("./public/custom");

    if (inputFolder.length === 0) {
      console.log("No MP3 found. Was the download successful?");
      return;
    } else {
      console.log("MP3 Found. Proceeding...");
    }

    if (customDirectory.length > 0) {
      console.log("Custom directory was not emptied, clearing now...");
      customDirectory.forEach((file) => {
        const fileToRemove = path.join("./public/custom", file);
        fs.unlinkSync(fileToRemove);
      });
    } else {
      console.log("Custom directory is empty. Proceeding...");
    }
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
  }
}
