// pages/api/auth/me.ts
import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Fetch user profile`);

  if (req.method === "GET") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.warn("Authorization header missing");
        return res.status(401).json({ message: "Authorization header missing" });
      }

      console.log("Sending request to backend with token:", authHeader);

      const response = await fetch(`${BACKEND_URL}auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend returned error:", errorData);
        return res.status(response.status).json(errorData);
      }

      const data = await response.json();
      console.log("User profile fetched successfully:", data);
      return res.status(200).json(data);

    } catch (err: any) {
      console.error("Fetch user profile error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
