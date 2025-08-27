
"use client";
import { useState } from "react";
import SvgIcon from "../Core/SvgIcon";
import { useUser } from "@/context/UserContext"; // <-- import your context

export default function Topbar() {
  const [dark, setDark] = useState(false);
  const { user } = useUser();

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      <h1 className="text-2xl text-black font-semibold mt-4">
        Welcome Back, {user ? user.first_name : "Guest"}
      </h1>

      <div className="flex items-center space-x-4 rounded-full bg-gray-100 p-2">

        <button
          onClick={() => setDark(!dark)}
          className="w-10 h-10 pl-2 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
        >
          <SvgIcon src="/Icon.svg" size={22} />
        </button>

        {/* User avatar */}
        {user?.profile_picture ? (
          <img
            src={user.profile_picture}
            alt={user.first_name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        )}
      </div>
    </header>
  );
}
