import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import util from "util";
const exec = util.promisify(require("child_process").exec);

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
  const filePath = "spleeter/input/custom.mp3";
  // Delete old contents if any:
  const customDir = "custom";
  fs.readdirSync(customDir).forEach((file) => {
    const fileToRemove = path.join(customDir, file);
    fs.unlinkSync(fileToRemove);
  });
  //download audio:
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
      const inputFolder = await readdir("spleeter/input");
      const customDirectory = await readdir("custom");

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
          const fileToRemove = path.join("custom", file);
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
    const { stdout, stderr } = await exec(`python spleeter/main.py`);
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  } catch (error) {
    console.error(`exec error: ${error}`);
  } finally {
    updateProcessingStatus(false);
  }
}
