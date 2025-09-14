"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { profile } from "console";
import SvgIcon from "@/components/Core/SvgIcon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  const [tosContent, setTosContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  
  useEffect(() => {
    fetch("/terms-of-service.md")
      .then((res) => res.text())
      .then((text) => setTosContent(text));

    fetch("/privacy-policy.md")
      .then((res) => res.text())
      .then((text) => setPrivacyContent(text));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setLoading(false);
      return;
    }

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
      router.push("/signin");
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
        <div className="hidden md:flex w-1/2 flex-col justify-between items-center p-6">
          <h1 className="ml-10 text-2xl font-semibold text-gray-900">
            eAMR Connect
          </h1>

          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-[400px] h-[400px] relative rounded-2xl overflow-hidden">
              <Image
                src="/Logo.svg"
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
          {/* <div className="flex justify-end space-x-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 transition"
            >
              <SvgIcon
                src={theme === "dark" ? "/Icon.svg" : "/Icon.svg"}
                size={24}
                className="p-2 rounded-full bg-gray-100 cursor-pointer"
              />
            </button>
            <button className="p-2 rounded-full bg-gray-100">
            <SvgIcon
              src="/Icon.svg"
              size={24}
              className="p-2 rounded-full bg-gray-100 cursor-pointer"
            />
            </button>
          </div> */}

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

                <div className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agree" className="text-gray-700">
                    I have read and agree to the{" "}
                    <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => setShowTosModal(true)}
                    >
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => setShowPrivacy(true)}
                    >
                      Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              {(showTosModal || showPrivacy) && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white w-96 p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[80vh]">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        {showTosModal ? "Terms of Service" : "Privacy Policy"}
                      </h3>
                      <div className="text-sm text-gray-700 space-y-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {showTosModal ? tosContent : privacyContent}
                        </ReactMarkdown>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => { setShowTosModal(false); setShowPrivacy(false); }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}


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
