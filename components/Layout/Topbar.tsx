"use client";
import { FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

interface User {
  firstname: string;
  profilePicture?: string;
}

export default function Topbar() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      <h1 className="text-2xl text-black font-semibold mt-4">
        Welcome Back, {user?.firstname || "Guest"}
      </h1>

      <div className="flex items-center space-x-2 rounded-full bg-gray-100 dark:bg-gray-100 p-2">
        {/* Dark mode toggle */}
        <button
        onClick={() => setDark(!dark)}
        className="w-10 h-10 pl-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 bg-gray-100 dark:bg-gray-300 transition"
        >
        {dark ? <FiSun /> : <FiMoon />}
        </button>
       {/* User avatar */}
            {user?.profilePicture ? (
            <img
                src={user.profilePicture}
                alt={user.firstname}
                className="w-10 h-10 rounded-full object-cover"
            />
            ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-300 transition-colors duration-200"></div>
            )}
      </div>
    </header>
  );
}
