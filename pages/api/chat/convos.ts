import type { NextApiRequest, NextApiResponse } from "next";

type Chat = {
  id: string;
  title: string;
};

const mockChats: Chat[] = [
  { id: "1", title: "How to write an.." },
  { id: "2", title: "Web accessibility" },
  { id: "3", title: "Design inspiration" },
  { id: "4", title: "What is machine l." },
  { id: "5", title: "How to write an..." },
  { id: "6", title: "Web accessibility" },
  { id: "7", title: "Design inspiration" },
  { id: "8", title: "What is machine.." },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Chat[]>
) {
  res.status(200).json(mockChats);
}
