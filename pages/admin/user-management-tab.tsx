import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import StatsCard from "@/components/Admin/StatsCard";
import FileTable, { File as TableFile } from "@/components/Admin/FileTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Users, Clock, FileText, Database} from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export type User = {
  id: number;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  queries: string;
  status: "Active" | "Inactive";
};

type Props = {
  users: User[];
};
export default function UserManagementTable({ users }: Props) {

  const stats = {
    totalQueries: "50.8K",
    allTimeUsers: "23.6K",
    totalDataEntries: "756",
    avgResponseTime: "9 sec",
    vectorDbStatus: "Healthy",
    avgRetrievalTime: "2.3 sec",
    avgRating: "3.9",
  };

  const testFiles: TableFile[] = [
    { id: 1, name: "Report V1.0.pdf", dateAdded: "2025-08-21" },
    { id: 2, name: "Analysis_Results.csv", dateAdded: "2025-08-20" },
    { id: 3, name: "UserLogs.json", dateAdded: "2025-08-18" },
    { id: 4, name: "Nandy Gom.json", dateAdded: "2025-08-18" }
  ];

  return (
    <div className="p-3 space-y-6">
      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Queries" value={stats.totalQueries} icon={<FileText />} trend="up" />
        <StatsCard title="All Time Users" value={stats.allTimeUsers} icon={<Users />} trend="down" />
        <StatsCard title="Total Data Entries" value={stats.totalDataEntries} icon={<Database />} trend="up" />
        <StatsCard title="Avg Response Time" value={stats.avgResponseTime} icon={<Clock />} trend="up" />
      </div>
       <div className="bg-white p-4 rounded-2xl shadow mt-4 overflow-x-auto">
        <h3 className="font-semibold mb-2">All Users</h3>
        <table className="w-full text-sm text-left border-collapse">
        <thead>
        <tr className="text-gray-500 border-b">
        <th className="py-2">Name</th>
        <th className="py-2">Phone</th>
        <th className="py-2">Location</th>
        <th className="py-2">No of Queries</th>
        <th className="py-2">Status</th>
        <th className="py-2 text-right">Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-2 flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-500">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </td>
              <td className="py-2 text-gray-500">{user.phone}</td>
              <td className="py-2 text-gray-500">{user.location}</td>
              <td className="py-2 text-gray-500">{user.queries}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-2 flex justify-end gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit3 size={14} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}
