import type { NextApiRequest, NextApiResponse } from "next";
const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { conversationId, newTitle } = req.body;
  const idStr = Array.isArray(conversationId) ? conversationId[0] : conversationId;
  const id = Number(idStr);

  if (!id || !newTitle) {
    return res.status(400).json({ error: "conversationId and title are required" });
  }
  console.log("Updating title for conversation ID:", id);
  console.log("New title:", newTitle);
  console.log("Type of id:", typeof id);
  console.log("Type of newTitle:", typeof newTitle);
  const authHeader = req.headers.authorization
  console.log("Authorization Header:", authHeader);
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });
  const token = authHeader.split(" ")[1]; // get only the token part
  if (!token) return res.status(401).json({ error: "Invalid token format" });
  console.log("Token:", token);

  try {
    // Call FastAPI backend
    const fastApiRes = await fetch(
      `${BACKEND_URL}api/chat/conversation/${id}/title`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // pass token if using auth
        },
        body: JSON.stringify({ title: newTitle }),
      }
    );

    if (!fastApiRes.ok) {
      const error = await fastApiRes.json();
      return res.status(fastApiRes.status).json({ error });
    }

    const data = await fastApiRes.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating conversation title:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
