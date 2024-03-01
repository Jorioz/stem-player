import fs from "fs";
import util from "util";
import path from "path";
import { exec } from "child_process";

const readdir = util.promisify(fs.readdir);

export async function processWithSpleeter() {
  console.log("Starting Spleeter Process:");

  let attempts = 0;
  while (attempts < 3) {
    try {
      const inputFolder = await readdir("./public/spleeter/input");
      const customDirectory = await readdir("./public/custom");

      if (inputFolder.length === 0) {
        console.log("No MP3 found. Was the download successful?");
        attempts++;
      } else {
        console.log("MP3 Found. Proceeding...");
        break;
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

  if (attempts === 3) {
    console.log("MP3 not found after 3 attempts. Exiting script.");
    return;
  }

  console.log("Running Spleeter Python Script...");
  // Begin Spleeter Python Script:
  exec(`python ./public/spleeter/main.py`);
}
