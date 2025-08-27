import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing authorization header" });
  const token = authHeader.split(" ")[1];

  try {
    // Forward all query parameters to the backend
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();

    const response = await fetch(`${process.env.BACKEND_URL}api/users/users_with_message?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend error: ${text}`);
    }

    // Just forward the backend JSON directly
    const data = await response.json();
    res.status(200).json(data);

  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
