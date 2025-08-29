// /pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Define the response type
type ChatResponse = {
  reply: string;
};
const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  console.log("TOKEN:", req.headers);
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message, conversationId, selectedModel } = req.body;
    const convIdStr = Array.isArray(conversationId) ? conversationId[0] : conversationId;
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ reply: "Unauthorized" });
    const convId = Number(convIdStr);
    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Invalid message" });
    }
    // --- Model → Endpoint mapping ---
    // console.log("Selected Model:", selectedModel);
    const modelEndpoints: Record<string, string> = {
      gemini: `${BACKEND_URL}api/pipeline/gemini`,
      openai: `${BACKEND_URL}api/pipeline/openai`,
      llama: `${BACKEND_URL}api/pipeline/gemini`,
     
    };

    // Pick endpoint or fallback
    const endpoint = modelEndpoints[selectedModel] || modelEndpoints["gemini"];
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message,
        n_result: 15
      }),
    });
    const data = await response.json();
    const assistantReply = data.summary;

    // --- Save user message to backend ---
    await fetch(`${BACKEND_URL}api/chat/conversation/${convId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversation_id: convId,
        role: "user",
        content: message,
      }),
    });

    // --- Save assistant reply to backend ---
    await fetch(`${BACKEND_URL}api/chat/conversation/${convId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversation_id: convId,
        role: "model",
        content: assistantReply,
      }),
    });
    
    // Mock assistant reply (for testing without OpenAI)
    // const assistantReply = `You said: "${message}". Here's my response.`;

    return res.status(200).json({ reply: assistantReply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: "Something went wrong" });
  }
}
