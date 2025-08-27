// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // path depends on your structure
// import SvgIcon from "../Core/SvgIcon";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
//   email?: string;
// }

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   // Check authentication + fetch user
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     console.log("Token:", token); // Debugging line
//     if (!token) {
//       router.push("/signin");
//     } else {
//       setIsAuthenticated(true);

//     fetch("/api/auth/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => setUser({
//         id: data.id,
//         name: `${data.first_name} ${data.last_name?.charAt(0) || ''}.`,
//         avatar: data.profile_picture || "/Group.png",
//         email: data.email
//       }))
//       .catch(err => {
//         console.error("Profile fetch error:", err);
//         setUser({id:12, name: "Guest User", avatar: "/Group.png" });
//       });

//   }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refresh_token"); // in case you're storing refresh tokens too
//     setIsAuthenticated(false);
//     router.push("/signin");
//   };

//   const linkClasses = (href: string) =>
//     `flex items-center space-x-3 px-3 py-2 rounded-lg relative ${
//       pathname === href
//         ? "bg-[#E6FAF5] text-blue-600 font-semibold"
//         : "text-gray-600 hover:bg-gray-100"
//     }`;


//   return (
//     <aside className="w-72 bg-[#F3F3F3] m-6 rounded-xl flex flex-col justify-between py-6 px-4">
//       {/* ---- Top Section ---- */}
//       <div>
//         {/* Logo */}
//         <div className="px-4 mb-6">
//           <h1 className="text-2xl font-extrabold text-[#1D1D3A]">
//             <span className="text-blue-600">eAMR Connect</span>
//           </h1>
//         </div>

//         {/* Navigation container */}
//         <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
//           {/* Dashboard */}
//           <Link href="/admin/dashboard-page" className={linkClasses("/admin/dashboard-page")}>
//             {pathname === "/admin/dashboard-page" && (
//               <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></span>
//             )}
//             <SvgIcon src="/Icon.svg" size={18} />
//             <span>Dashboard</span>
//           </Link>

//           {/* Data Management */}
//           <Link href="/admin/data-management-page" className={linkClasses("/admin/data-management-page")}>
//             {pathname === "/admin/data-management-page" && (
//               <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></span>
//             )}
//             <SvgIcon src="/Icon.svg" size={18} />
//             <span>Data Management</span>
//           </Link>

//           {/* User Management */}
//           <Link href="/admin/user-management-page" className={linkClasses("/admin/user-management-page")}>
//             {pathname === "/admin/user-management-page" && (
//               <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md"></span>
//             )}
//             <SvgIcon src="/Icon.svg" size={18} />
//             <span>User Management</span>
//           </Link>
//         </div>
//       </div>

//       {/* ---- Bottom Profile Card ---- */}
//       <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col space-y-3">
//         {/* Avatar + Name */}
//         <div className="flex items-center space-x-3">
//           <img
//               src={user?.avatar || "/Group.png"}
//               alt="User Avatar"
//               className="w-6 h-6 rounded-full object-cover"
//             />
//           <div>
//             <p className="font-semibold  text-gray-500 text-sm">{user?.name}</p>
//             <p className="text-xs text-gray-500">{user?.email}</p>

//           </div>
//         </div>

//         <hr className="border-gray-200" />

//         {/* My Profile */}
//         <Link
//           href="/profile"
//           className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
//         >
//           <div className="flex items-center space-x-2">
//             <SvgIcon src="/Icon.svg" size={18} />
//             <span>My Profile</span>
//           </div>
//           <span className="text-gray-400">›</span>
//         </Link>

//         {/* Log Out */}
//         <button 
//         onClick={handleLogout}
//         className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-500">
//         <SvgIcon src="/Icon.svg" size={18} /> 
//         <span>Log Out</span>
          
//         </button>
//       </div>
//     </aside>
//   );
// }

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

