import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "What is AI?",
    answer:
      "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.",
  },
  { question: "How can I ....?", answer: "Sample answer for how can I." },
  { question: "Are your ....?", answer: "Sample answer for are your." },
  { question: "Can I ....?", answer: "Sample answer for can I." },
  { question: "How does...?", answer: "Sample answer for how does." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div className="flex flex-col items-start text-left">
          {/* Logo placeholder */}
            <div className="w-16 h-16 text-blue-600 flex items-center justify-center mb-4">
                <img src="/Icon.svg" alt="eAMR Connect" className="h-20 w-20" /></div>
                
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Asked question
          </h2>
          <p className="text-gray-600 mb-6">
            If the question is not available on our FAQ section, feel free to
            contact us personally, we will resolve your respective doubts.
          </p>
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg text-sm font-medium">
            Ask Question <ArrowUpRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Right Column (Accordion FAQ) */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center font-medium text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.question}
                <span className="text-xl font-bold">
                  {openIndex === i ? "–" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
