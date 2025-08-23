"use client";
import { useRouter } from "next/navigation"; 
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useTheme } from "next-themes";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    setSuccess("Login successful!");
    
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    //Redirect based on role
    if (data.role === "admin") {
      router.push("/admin/dashboard-page");
    } else {
      router.push("/chat/new");
    }
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
            <h1 className="ml-10 text-2xl font-semibold text-gray-900 dark:text-black">
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

          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 eAMR Connect. All Rights Reserved.
          </p>
        </div>

        {/* Right side */}
        <div className="flex w-full md:w-1/2 flex-col justify-between px-8 py-6">
          {/* Top Right Icons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <FaRegSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <FiSettings className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-sm">
              <h2 className="text-center text-xl font-semibold mb-6 text-gray-900 dark:text-black">
                Log in
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100 dark:bg-gray-100 text-sm text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-md bg-gray-100 dark:bg-gray-100 text-sm text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mt-2">{success}</p>
              )}

              {/* Links */}
              <div className="flex justify-between text-sm text-gray-500 dark:text-blue-500 mt-3">
                <Link href="/signup" className="hover:underline">
                  Sign Up
                </Link>
                <a href="#" className="hover:underline">
                  Forgot Password
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                <span className="mx-2 text-sm text-gray-400">or</span>
                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              </div>

              {/* Google login */}
              {/* ✅ Google Login Button */}
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const token = credentialResponse.credential;

          // Send Google token to backend
          const res = await fetch("http://196.190.220.63:8000/auth/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ google_token: token }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Google login failed");

          // Save tokens
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          // Redirect based on role
          if (data.role === "admin") {
            router.push("/admin/dashboard-page");
          } else {
            router.push("/chat/new");
          }
        } catch (err: any) {
          setError(err.message);
        }
      }}
      onError={() => setError("Google login failed")}
    />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400 mt-6">
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
