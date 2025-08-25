import type { NextApiRequest, NextApiResponse } from "next";

type ConversationOut = {
  id: number;
  title: string;
  created_at?: string;
  updated_at?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversationOut | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { title, first_message , user_id} = req.body;

    const response = await fetch("http://196.190.220.63:8000/api/chat/new-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, user_id }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
