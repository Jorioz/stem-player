import ytdl from "ytdl-core";

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
        JSON.stringify({ message: "Video exceeds 5 minutes" }),
        {
          status: 400,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Processing..." }), {
        status: 200,
      });
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
