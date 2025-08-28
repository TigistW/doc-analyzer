import { Console } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Incoming headers:", req.headers);
  const { conversationId } = req.query;
  const idStr = Array.isArray(conversationId) ? conversationId[0] : conversationId;
  const id = Number(idStr);


   
  // console.log("Fetching messages for conversation ID:", id);
  // console.log("Type of id:", typeof id);

  const authHeader = req.headers.authorization; // e.g., "Bearer <token>"
  // console.log("Authorization Header:", authHeader);
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const token = authHeader.split(" ")[1]; // get only the token part
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  // console.log("Token:", token);

  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" }); 
  

  try {
    const response = await fetch(`${BACKEND_URL}api/chat/conversation/${id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
        },
      }
    );

    const data = await response.json();
    // const data = { messages: [] } // temporary fix for undefined messages error
    return res.status(200).json(data);
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
}
