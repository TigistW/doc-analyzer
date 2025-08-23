import { NextResponse } from "next/server";

const chatMessages: Record<string, { role: "user" | "assistant"; content: string }[]> = {
  "1": [
    { role: "user", content: "Explain AMR resistance in simple terms" },
    { role: "assistant", content: "AMR (antimicrobial resistance) means bacteria, viruses, or fungi evolve so medicines no longer work effectively." },
  ],
  "2": [
    { role: "user", content: "What is web accessibility?" },
    { role: "assistant", content: "Web accessibility means designing websites usable by people with disabilities, such as screen reader support." },
  ],
  "3": [
    { role: "user", content: "What is machine learning?" },
    { role: "assistant", content: "Machine learning is when computers learn from data instead of being explicitly programmed." },
  ],
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const messages = chatMessages[id] || [];
  return NextResponse.json(messages);
}
