import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let backendResponse;
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing authorization header" });
    const token = authHeader.split(" ")[1];

    if (req.method === "GET") {
      backendResponse = await fetch(`${BACKEND_URL}api/keywords/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (req.method === "POST") {
      backendResponse = await fetch(`${BACKEND_URL}api/keywords/add_keyword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
      });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      const intId = parseInt(id as string, 10); // now it's a number
        console.log("Parsed ID:", intId, "Type:", typeof intId);
        if (isNaN(intId)) {
        return res.status(400).json({ error: "Invalid ID" });
        }
            
      backendResponse = await fetch(`${BACKEND_URL}api/keywords/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (!backendResponse) {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const data = await backendResponse.json();
    return res.status(backendResponse.status).json(data);
  } catch (error: any) {
    console.error("API proxy error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
