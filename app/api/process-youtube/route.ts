import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import { processWithSpleeter } from "../process-spleeter/route";

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
      await downloadVideo(link);
      // call spleeter process:
      processWithSpleeter();
      return new Response(
        JSON.stringify({
          message: "Video downloaded successfully",
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
  const filePath = "./public/spleeter/input/custom.mp3";
  // Delete old contents if any:
  const customDir = "./public/custom";
  fs.readdirSync(customDir).forEach((file) => {
    const fileToRemove = path.join(customDir, file);
    fs.unlinkSync(fileToRemove);
  });
  //download audio:
  await ytdl
    .downloadFromInfo(info, { format: audioFormat })
    .pipe(fs.createWriteStream(filePath));
}
