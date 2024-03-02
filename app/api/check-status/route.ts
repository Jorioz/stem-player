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
export function updateProcessingStatus(value: boolean) {
  isProcessing = value;
  console.log("Processing status updated to: ", isProcessing);
}

export function getProcessingStatus() {
  return isProcessing;
}
