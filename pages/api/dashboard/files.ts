import type { NextApiRequest, NextApiResponse } from "next";

export type TableFile = {
  filename: string;
  last_modified: string;
  source?: string;
};

export type FileApiResponse = {
  total: number;
  skip: number;
  limit: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  sort_by?: string;
  order?: string;
  files: TableFile[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FileApiResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing authorization header" });
  const token = authHeader.split(" ")[1];

  try {
    // Forward all query params
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();

    const response = await fetch(`${process.env.BACKEND_URL}api/dashboard/files?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`FastAPI error: ${text}`);
    }

    const data: FileApiResponse = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Error fetching files:", err.message);
    return res.status(500).json({ error: "Failed to fetch files" });
  }
}
