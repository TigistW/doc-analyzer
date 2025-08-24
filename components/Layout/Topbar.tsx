"use client";
import { useEffect, useState } from "react";
import SvgIcon from "../Core/SvgIcon";

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

      <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-2">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-10 h-10 pl-2 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
        >
          {dark ? (
            <SvgIcon src="/Icon.svg" size={22} />
          ) : (
            <SvgIcon src="/Icon.svg" size={22} />
          )}
        </button>

        {/* Notifications */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
          <SvgIcon src="/Icon.svg" size={22} />
        </button>

        {/* User avatar */}
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.firstname}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        )}
      </div>
    </header>
  );
}
