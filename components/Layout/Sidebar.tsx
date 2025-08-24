"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // path depends on your structure
import SvgIcon from "../Core/SvgIcon";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `flex items-center space-x-3 px-3 py-2 rounded-lg relative ${
      pathname === href
        ? "bg-[#E6FAF5] text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-72 bg-[#F3F3F3] m-6 rounded-xl flex flex-col justify-between py-6 px-4">
      {/* ---- Top Section ---- */}
      <div>
        {/* Logo */}
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-extrabold text-[#1D1D3A]">
            <span className="text-blue-600">eAMR Connect</span>
          </h1>
        </div>

        {/* Navigation container */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
          {/* Dashboard */}
          <Link href="/admin/dashboard-page" className={linkClasses("/admin/dashboard-page")}>
            {pathname === "/admin/dashboard-page" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></span>
            )}
            <SvgIcon src="/Icon.svg" size={18} />
            <span>Dashboard</span>
          </Link>

          {/* Data Management */}
          <Link href="/admin/data-management-page" className={linkClasses("/admin/data-management-page")}>
            {pathname === "/admin/data-management-page" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></span>
            )}
            <SvgIcon src="/Icon.svg" size={18} />
            <span>Data Management</span>
          </Link>

          {/* User Management */}
          <Link href="/admin/user-management-page" className={linkClasses("/admin/user-management-page")}>
            {pathname === "/admin/user-management-page" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></span>
            )}
            <SvgIcon src="/Icon.svg" size={18} />
            <span>User Management</span>
          </Link>
        </div>
      </div>

      {/* ---- Bottom Profile Card ---- */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col space-y-3">
        {/* Avatar + Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-bold text-white">JD</span>
          </div>
          <div>
            <p className="font-semibold  text-gray-500 text-sm">Tigist W.</p>
            <p className="text-xs text-gray-500">TigistW@gmail.com</p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* My Profile */}
        <Link
          href="/profile"
          className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
        >
          <div className="flex items-center space-x-2">
            <SvgIcon src="/Icon.svg" size={18} />
            <span>My Profile</span>
          </div>
          <span className="text-gray-400">›</span>
        </Link>

        {/* Log Out */}
        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-500">
          <SvgIcon src="/Icon.svg" size={18} /> 
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
