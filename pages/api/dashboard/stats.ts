// pages/api/dashboard/stats.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    // Call your FastAPI backend
    const response = await fetch(`${process.env.BACKEND_URL}api/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Dashboard API error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
