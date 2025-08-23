// /pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Define the response type
type ChatResponse = {
  reply: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Invalid message" });
    }

    // --- Here is where you call your AI model ---
    // For example: with OpenAI API
    
    const response = await fetch("http://196.190.220.63:8000/api/pipeline/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message,
        n_result: 5
      }),
    });
    const data = await response.json();
    const assistantReply = data.summary;
    
    // Mock assistant reply (for testing without OpenAI)
    // const assistantReply = `You said: "${message}". Here's my response.`;

    return res.status(200).json({ reply: assistantReply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: "Something went wrong" });
  }
}
