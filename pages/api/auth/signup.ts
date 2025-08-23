// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
      if (!BACKEND_URL) {
        throw new Error("Backend URL is not defined in env");
      }

      // Send request to backend
      const response = await fetch(`${BACKEND_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          profile_picture: profilePicture || null
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(201).json(data);
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
