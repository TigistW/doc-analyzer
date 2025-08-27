// pages/api/dashboard/recent-files.ts
import type { NextApiRequest, NextApiResponse } from "next";

export type TableFile = {
  filename: string;
  last_modified: string;
};

export type RecentFilesApiResponse = {
  files: TableFile[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecentFilesApiResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing authorization header" });
  const token = authHeader.split(" ")[1];

  try {
    const response = await fetch(`${process.env.BACKEND_URL}api/dashboard/recent_files`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`FastAPI error: ${text}`);
    }

    const data: RecentFilesApiResponse = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Error fetching recent files:", err.message);
    return res.status(500).json({ error: "Failed to fetch recent files" });
  }
}
