// pages/api/dashboard/stats.ts
import type { NextApiRequest, NextApiResponse } from "next";

export type ChartResponse = {
  line_chart: { labels: string[]; data: number[] };
  bar_chart: { labels: string[]; data: number[] };
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChartResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    // Fetch stats from backend API (replace with your actual endpoint)
    const response = await fetch(`${process.env.BACKEND_URL}api/dashboard/chart_stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend error: ${text}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Error fetching dashboard stats:", err.message);
    return res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}
