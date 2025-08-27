
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgIcon from "../Core/SvgIcon";
import { useUser } from "@/context/UserContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useUser();

  const linkClasses = (href: string) =>
    `flex items-center space-x-3 px-3 py-2 rounded-lg relative ${
      pathname === href
        ? "bg-[#E6FAF5] text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-72 bg-[#F3F3F3] m-6 rounded-xl flex flex-col justify-between py-6 px-4">
      {/* Nav links */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
        <Link href="/admin/dashboard-page" className={linkClasses("/admin/dashboard-page")}>
          <SvgIcon src="/Icon.svg" size={18} />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/data-management-page" className={linkClasses("/admin/data-management-page")}>
          <SvgIcon src="/Icon.svg" size={18} />
          <span>Data Management</span>
        </Link>
        <Link href="/admin/user-management-page" className={linkClasses("/admin/user-management-page")}>
          <SvgIcon src="/Icon.svg" size={18} />
          <span>User Management</span>
        </Link>
      </div>

      {/* Bottom user card */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src={user?.profile_picture || "/Group.png"}
            alt="User Avatar"
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-500 text-sm">
              {user ? `${user.first_name} ${user.last_name}` : "Guest User"}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* <Link
          href="/profile"
          className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
        >
          <div className="flex items-center space-x-2">
            <SvgIcon src="/Icon.svg" size={18} />
            <span>My Profile</span>
          </div>
          <span className="text-gray-400">›</span>
        </Link> */}

        <button
          onClick={logout}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-500"
        >
          <SvgIcon src="/Icon.svg" size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

