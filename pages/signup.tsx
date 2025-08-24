"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMoon, FaRegSun } from "@tabler/icons-react";
import { FiSettings } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { profile } from "console";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, profilePicture: null }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setSuccess("Account created successfully!");
      router.push("/chat/new");
      localStorage.setItem("user", JSON.stringify(data));
    //   window.location.href = "/signin"; // redirect after signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors">
      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden md:flex w-1/2 flex-col justify-between p-6">
          <h1 className="ml-10 text-2xl font-semibold text-gray-900">
            eAMR Connect
          </h1>

          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-[550px] h-[650px] relative rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/Group.png"
                alt="Illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            © 2025 eAMR Connect. All Rights Reserved.
          </p>
        </div>

        {/* Right side */}
        <div className="flex w-full md:w-1/2 flex-col justify-between px-8 py-6">
          {/* Top Right Icons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 transition"
            >
              {theme === "dark" ? (
                <FaRegSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <button className="p-2 rounded-full bg-gray-100">
              <FiSettings className="text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-sm">
              <h2 className="text-center text-xl font-semibold mb-6 text-gray-900">
                Sign Up
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-1/2 px-4 py-3 border rounded-md bg-gray-100 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-1/2 px-4 py-3 border rounded-md bg-gray-100 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mt-2">{success}</p>
              )}

              <div className="text-left mt-4">
                <Link
                  href="/signin"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>


          <div className="flex justify-center space-x-6 text-xs text-gray-500 mt-4">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              License
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
