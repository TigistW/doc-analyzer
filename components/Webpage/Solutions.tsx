import React from "react";

const Solutions: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      {/* Full-width background wrapper */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-left">
          <span className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full mb-4">
            Unlock the Power of
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600">
            eAMR Connect Solutions
          </h2>
        </div>
      </div>

      {/* Problem & Solution cards */}
      <div className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="bg-[#f9f5f5] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-600 mb-3">Problem</h3>
            <p className="text-gray-700 leading-relaxed">
              Antimicrobial resistance (AMR) is a global threat. Insights are
              scattered across domains and formats, slowing timely response.
            </p>
          </div>

          {/* Solution */}
          <div className="bg-[#f9f5f5] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-600 mb-3">Solution</h3>
            <p className="text-gray-700 leading-relaxed">
              eAMR Connect unifies text, images, and tables from diverse
              sources, retrieving and generating contextual answers across the
              One Health triad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
