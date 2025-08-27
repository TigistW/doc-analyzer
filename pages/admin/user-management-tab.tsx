// "use client";

// import { useEffect, useState } from "react";
// // import UserManagementTable, { User } from "@/components/Admin/UserManagementTable";

// export interface User {
//   id: string; 
//   first_name: string;
//   last_name: string;
//   email: string;
//   role: string;
//   status: boolean;
//   message_count?: number;
  
// }
// export default function UserManagementTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(0);
//   const [limit, setLimit] = useState(10);
//   const [sortBy, setSortBy] = useState("first_name");
//   const [order, setOrder] = useState<"asc" | "desc">("asc");
//   const [total, setTotal] = useState(0);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("access_token");
//       const params = new URLSearchParams();
//       params.append("skip", (page * limit).toString());
//       params.append("limit", limit.toString());
//       if (search) params.append("search", search);
//       if (sortBy) params.append("sort_by", sortBy);
//       if (order) params.append("order", order);

//       const res = await fetch(`/api/dashboard/users?${params.toString()}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("Failed to fetch users");

//       const data = await res.json();
//       setUsers(data.users || data); // handle backend response format
//       setTotal(data.total || data.length);
//     } catch (err) {
//       console.error(err);
//       setUsers([]);
//       setTotal(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, limit, search, sortBy, order]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">User Management</h2>

//       {/* Filters */}
//       <div className="flex gap-2 flex-wrap mb-4">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && setPage(0)}
//           className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//         />
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//         >
//           <option value="first_name">First Name</option>
//           <option value="last_name">Last Name</option>
//           <option value="email">Email</option>
//         </select>

//         <select
//           value={order}
//           onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
//           className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       {/* Users Table */}
//       {loading ? (
//         <p className="text-gray-500 p-4">Loading users...</p>
//       ) : (
//         <UserManagementTable/>
//       )}

//       {/* Pagination */}
//       <div className="flex gap-2 mt-4 justify-center items-center">
//         <button
//           disabled={page === 0}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 bg-blue-400 text-white rounded-2xl shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition-colors duration-200"
//         >
//           Prev
//         </button>

//         <span className="px-3 py-2 text-gray-900 font-medium">
//           Page {page + 1} of {Math.ceil(total / limit)}
//         </span>

//         <button
//           disabled={(page + 1) * limit >= total}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 bg-blue-400 text-white rounded-2xl shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition-colors duration-200"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export interface User {
  id: string; 
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: boolean;
  message_count?: number;
}

export default function UserManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(7);
  const [sortBy, setSortBy] = useState("first_name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const params = new URLSearchParams();
      params.append("skip", (page * limit).toString());
      params.append("limit", limit.toString());
      if (search) params.append("search", search);
      // if (sortBy) params.append("sort_by", sortBy);
      // if (order) params.append("order", order);

      const res = await fetch(`/api/dashboard/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data.users || data); 
      setTotal(data.total || data.length);
    } catch (err) {
      console.error(err);
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search]);

  return (
    <div className="p-4">

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setPage(0)}
          className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        {/* <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}
      </div>

      {/* Users Table */}
      {loading ? (
        <p className="text-gray-500 p-4">Loading users...</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded-2xl shadow mt-4 overflow-x-auto">
          {/* <h3 className="font-semibold mb-2">All Users</h3> */}
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">No of Queries</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No users available
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50 text-sm text-gray-600">
                    <td className="py-2">{user.first_name} {user.last_name}</td>
                    <td className="py-2 text-blue-500">{user.email}</td>
                    <td className="py-2 text-green-900">{user.role}</td>
                    <td className="py-2 text-red-600 font-bold">{user.message_count ?? 0}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.status ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}>
                        {user.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-4 justify-center items-center">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-blue-400 text-white rounded-2xl shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition-colors duration-200"
        >
          Prev
        </button>

        <span className="px-3 py-2 text-gray-900 font-medium">
          Page {page + 1} of {Math.ceil(total / limit)}
        </span>

        <button
          disabled={(page + 1) * limit >= total}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-400 text-white rounded-2xl shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
