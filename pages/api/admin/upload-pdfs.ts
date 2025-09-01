import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch"; // make sure installed: npm i node-fetch

export const config = { api: { bodyParser: false } };

const BACKEND_URL = process.env.BACKEND_URL || "http://196.190.220.63:8000/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse incoming form-data
    const uploadedFiles: File[] = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: true, keepExtensions: true });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        const fileArray: File[] = Array.isArray(files.files)
        ? files.files.filter((f): f is File => !!f)
        : files.files
            ? [files.files]
            : [];
        resolve(fileArray);
      });
    });

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Forward all files to FastAPI backend
    const formData = new FormData();
    uploadedFiles.forEach(file => {
      formData.append("files", fs.createReadStream(file.filepath), file.originalFilename || `uploaded-${Date.now()}.pdf`);
    });

    const backendResponse = await fetch(`${BACKEND_URL}api/upload-pdfs`, {
      method: "POST",
      headers: { ...formData.getHeaders(), Authorization: `Bearer ${token}` }, // important!
      body: formData as any,
    });

    const data = await backendResponse.json();
    return res.status(backendResponse.status).json(data);
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
}
