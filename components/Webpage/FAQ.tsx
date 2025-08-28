"use client";
import { useState } from "react";
import SvgIcon from "../Core/SvgIcon";

const faqs = [
  {
    question: "What is antimicrobial resistance (AMR)?",
    answer:
      "AMR occurs when bacteria, viruses, fungi, or parasites evolve to resist the effects of medications designed to kill them. This makes infections harder to treat, leading to longer illnesses, higher medical costs, and increased mortality.",
  },
  { question: "Why is AMR a concern in Ethiopia?", answer: "In Ethiopia, factors such as overuse of antibiotics, limited access to diagnostic tests, and poor infection control in healthcare and agriculture contribute to the rise of resistant bacteria. Addressing AMR is crucial to protect public health and ensure effective treatments remain available." },
  { question: "Which bacteria are most commonly resistant?", answer: "Some of the most concerning resistant bacteria include Escherichia coli, Staphylococcus aureus (including MRSA), Salmonella species, and Klebsiella pneumoniae. These bacteria can cause urinary tract infections, bloodstream infections, and foodborne illnesses, making them a significant health threat when resistance develops." },
  { question: "How does antimicrobial resistance develop?", answer: "Resistance develops when microbes are exposed to antimicrobials inappropriately, such as using antibiotics without a prescription, not completing the prescribed course, or using antibiotics in livestock feed. These practices allow some microbes to survive and multiply, spreading resistance to others." },
  { question: "Can I contribute or submit data to your platform?", answer: "Yes. We encourage researchers and healthcare institutions to share published studies, datasets, and reports. Contributions help us maintain a comprehensive resource for AMR surveillance and research." },
];

// Define SVG sources for icons
const ICON_SRC = "/Icon.svg";
const ARROW_SRC = "/Icon.svg"; // replace with a different SVG if needed later

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div className="flex flex-col items-start text-left">
          {/* Logo */}
          <div className="w-16 h-16 text-blue-600 flex items-center justify-center mb-4">
            <SvgIcon src={ICON_SRC} size={64} />
          </div>

          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Asked question
          </h2>
          <p className="text-gray-600 mb-6">
            If the question is not available on our FAQ section, feel free to
            contact us personally, we will resolve your respective doubts.
          </p>

          <a href="#contactus">
          <button className="flex text-gray-800 items-center bg-gray-100 hover:bg-gray-300 px-5 py-2 rounded-lg text-sm font-medium">
            Ask Question
            <span className="ml-2">
              <SvgIcon src={ARROW_SRC} size={16} />
            </span>
          </button>
        </a>
        </div>

        {/* Right Column (Accordion FAQ) */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center font-medium text-left text-gray-800"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.question}
                <span className="text-xl text-black font-bold">
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
