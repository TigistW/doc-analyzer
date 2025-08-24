import React from "react";
const Features: React.FC = () => {
  const features = [
    {
      icon: "📚",
      title: "Multimodal Retrieval",
      desc: "Fetches relevant text, images, and data tables from the knowledge added in the system.",
    },
    {
      icon: "🌐",
      title: "Perspective-Aware Generation",
      desc: "Answers consider human, animal, and environmental angles.",
    },
    {
      icon: "⚡",
      title: "Real-Time Processing",
      desc: "Generates answers with up-to-date context of the current state.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-left mb-12">
          {/* Logo placeholder */}
          <div className="w-16 h-16 text-blue-600 flex items-center justify-center mr-4">
            {/* Replace with actual SVG/logo */}
            <img src="/Logo.svg" alt="eAMR Connect" className="h-20 w-20" />
          </div>
          <div className="text-left">
            <p className="text-gray-600 mb-1">Learn, Connect, and Innovate</p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              Key Features
            </h2>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-200 p-6 rounded-xl shadow-sm">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl bg-white shadow-sm text-left"
            >
              <h3 className="font-bold text-blue-600 mb-2 flex items-center">
                <span className="mr-2">{f.icon}</span> {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
