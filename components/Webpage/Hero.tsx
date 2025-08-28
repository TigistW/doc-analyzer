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
            <span className="text-lg font-semibold text-gray-800">eAMR Connect</span>
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
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text */}
        <div className="space-y-6">
          <p className="text-blue-600 font-medium">Your Journey to Exploration Begins Here</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Multimodal Intelligence for Antimicrobial Resistance
          </h1>
          <p className="text-gray-600 max-w-lg">
            Unifying human, animal, and environmental data using advanced retrieval-augmented generation.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: '300+', label: 'Resources Included' },
              { value: '2+', label: 'Total Models' },
              { value: '10+', label: 'Active Users' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              href="/signin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
              Try today
              <SvgIcon src="/Icon.svg" size={16} />
            </a>
          </div>
        </div>

        {/* Right Side (Optional Image/Illustration) */}
        <div className="hidden md:block">
          <img
            src="/Logo.svg"
            alt="Hero Illustration"
            className="px-6 mr-12 w-full h-auto rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}
