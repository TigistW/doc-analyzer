
// components/Hero.tsx
import Link from "next/link";
import SvgIcon from "../Core/SvgIcon";

export default function Hero() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/Logo.svg" alt="eAMR Connect" className="h-12 w-12" />
            <span className="text-lg font-semibold text-gray-800">
              eAMR Connect
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link
              href="/signin"
              className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Left Content (2/3) */}
        <div className="space-y-8 md:col-span-2">
          {/* Intro */}
          <div className="space-y-6">
            <p className="text-blue-600 font-medium">
              Your Journey to Exploration Begins Here
            </p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Multimodal Intelligence for Antimicrobial Resistance
            </h1>
            <p className="text-gray-600 max-w-xl">
              Unifying human, animal, and environmental data using advanced
              retrieval-augmented generation.
            </p>
          </div>

          {/* Problem & Solution cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f9f5f5] rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-600 mb-3">Problem</h3>
              <p className="text-gray-700 leading-relaxed">
                Antimicrobial resistance (AMR) is a global threat. Insights are
                scattered across domains and formats, slowing timely response.
              </p>
            </div>

            <div className="bg-[#f9f5f5] rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-600 mb-3">Solution</h3>
              <p className="text-gray-700 leading-relaxed">
                eAMR Connect unifies text, images, and tables from diverse
                sources, retrieving and generating contextual answers across the
                One Health triad.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
              Try the Demo
              <SvgIcon src="/Icon.svg" size={16} />
            </a>
          </div>
        </div>

        {/* Right Content (1/3) */}
        <div className="flex flex-col items-center md:items-end space-y-8">
          
          {/* Image */}
          <img
            src="/Logo.svg"
            alt="Hero Illustration"
            className="w-2/3 max-w-xs rounded-lg"
          />
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {[
              { value: "300+", label: "Resources Included" },
              { value: "2+", label: "Total Models" },
              { value: "10+", label: "Active Users" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 p-4 rounded-lg shadow-sm text-center"
              >
                <p className="text-2xl font-bold text-blue-600">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
