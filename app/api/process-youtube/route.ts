import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import util from "util";
import { exec, spawn } from "child_process";
const execPromise = util.promisify(exec);

const readdir = util.promisify(fs.readdir);

let isProcessing = false;

export async function GET(req: Request, res: Response) {
  console.log("Current processing status: ", isProcessing);
  if (isProcessing) {
    return new Response(JSON.stringify({ message: "Processing" }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "Idle" }), {
      status: 200,
    });
  }
}

async function updateProcessingStatus(value: boolean) {
  isProcessing = value;
  console.log("Processing status updated to: ", isProcessing);
}

export async function POST(req: Request) {
  const body = await req.json();
  const link = body.link;
  if (!verifyLink(link)) {
    return new Response(JSON.stringify({ message: "Invalid link" }), {
      status: 400,
    });
  } else {
    if (await checkLength(link)) {
      return new Response(
        JSON.stringify({
          message: "Video exceeds 5 minutes. Try another link.",
        }),
        {
          status: 400,
        }
      );
    } else {
      // Start download video to specified path, with filename custom.mp3
      const info = await downloadVideo(link);
      // call spleeter process:
      await processWithSpleeter();
      return new Response(
        JSON.stringify({
          message: "Video downloaded successfully",
          title: info.videoDetails.title,
          uploader: info.videoDetails.author.name,
          thumbnail: info.videoDetails.thumbnails[0].url,
        }),
        {
          status: 200,
        }
      );
    }
  }
}

async function verifyLink(link: string): Promise<boolean> {
  return ytdl.validateURL(link);
}

async function checkLength(link: string): Promise<boolean> {
  const info = await ytdl.getInfo(link);
  const length = Number(info.videoDetails.lengthSeconds);
  return length > 300;
}

async function downloadVideo(link: string) {
  const info = await ytdl.getInfo(link);
  const audioFormat = ytdl.chooseFormat(info.formats, {
    quality: "highestaudio",
  });

  // Path where yt video downloads to:
  const filePath = path.join("/tmp/input", "custom.mp3");
  // Path to the custom output directory:
  const customDir = "/tmp/output";

  // Create the custom output directory if it doesn't exist
  if (!fs.existsSync(customDir)) {
    fs.mkdirSync(customDir, { recursive: true });
  } else {
    // If the directory exists, remove its contents
    fs.readdirSync(customDir).forEach((file) => {
      const fileToRemove = path.join(customDir, file);
      fs.unlinkSync(fileToRemove);
    });
  }

  // Create the input directory if it doesn't exist
  const inputDir = "/tmp/input";
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }

  // Download audio:
  await ytdl
    .downloadFromInfo(info, { format: audioFormat })
    .pipe(fs.createWriteStream(filePath));

  return info;
}

async function processWithSpleeter() {
  console.log("Starting Spleeter Process:");
  let attempts = 0;
  while (attempts < 3) {
    try {
      const inputFolder = await fs.promises.readdir("/tmp/input");
      const customDirectory = await fs.promises.readdir("/tmp/output");
      if (inputFolder.length === 0) {
        console.log("No MP3 found. Was the download successful?");
        attempts++;
      } else {
        console.log("MP3 Found. Proceeding...");
        break;
      }

      if (customDirectory.length > 0) {
        console.log("Output directory was not emptied, clearing now...");
        customDirectory.forEach((file) => {
          const fileToRemove = path.join("/tmp/output", file);
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

  try {
    console.log("Running Spleeter Python Script...");
    updateProcessingStatus(true);

    const rootPath = process.cwd();
    const pythonProcess = spawn("python", [
      path.join(rootPath, "main.py"),
      "/tmp/input",
      "/tmp/output",
    ]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      updateProcessingStatus(false);
    });
  } catch (error) {
    console.error(`exec error: ${error}`);
    updateProcessingStatus(false);
  }
}
