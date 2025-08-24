import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { google_token } = req.body;
      if (!google_token) {
        return res.status(400).json({ message: "Google token is required" });
      }

      // Forward the request to your backend
      const response = await fetch(`${BACKEND_URL}auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ google_token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      // Return the backend response to frontend
      return res.status(200).json(data);
    } catch (err: any) {
      console.error("Google login API error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
