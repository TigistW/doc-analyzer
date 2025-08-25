import type { NextApiRequest, NextApiResponse } from "next";

type Conversation = {
  id: number;
  title: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  messages: any[];
};

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "") || "http://196.190.220.63:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Conversation[] | { error: string }>
) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const response = await fetch(`${BACKEND_URL}/api/chat/convos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.detail || "Failed to fetch conversations" });
    }

    const data: Conversation[] = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
