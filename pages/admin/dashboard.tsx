"use client";

import { useUser } from "@/context/UserContext";
import FileTable, { File as TableFile } from "@/components/Admin/FileTable";
import StatusBadgeCard from "@/components/Admin/StatusBadgeCard";
import { Database, Star, Clock } from "lucide-react";
import StatsCard from "@/components/Admin/StatsCard";
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
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

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

interface DashboardStats {
  vectorDbStatus: string;
  avgRetrievalTime: number;
  avgRating: number;
}

export default function Dashboard() {
  const { user } = useUser();
  const [lineData, setLineData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [barData, setBarData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [recentFiles, setRecentFiles] = useState<TableFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = 
        await fetch(`/api/dashboard/chart_stats`,
           { headers: { Authorization: `Bearer ${token}` } });

        const data = await res.json();
        setLineData(data.line_chart);
        setBarData(data.bar_chart);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    const fetchRecentFiles = async () => {
      setLoadingFiles(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("/api/dashboard/recent_files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch recent files");

        const data = await res.json();
        // Map filenames to TableFile format
       // Map objects to include id for FileTable
        const files = data.files.map((f: any, idx: number) => ({
          id: idx + 1,
          filename: f.filename,
          last_modified: f.last_modified,
        }));
        setRecentFiles(files);
      } catch (err) {
        console.error(err);
        setRecentFiles([]);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchStats();
    fetchRecentFiles();
  }, []);

  if (!user) {
    return <p className="p-6 text-gray-500">Loading user data...</p>;
  }

  if (user.role !== "admin") {
    return <p className="p-6 text-red-500">You do not have access to this page.</p>;
  }
  
  const stats: DashboardStats = { vectorDbStatus: "Healthy", avgRetrievalTime: 2.3, avgRating: 3.9 };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f3f4f6" } },
    },
  };

  return (
    <div className="p-6 space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-2">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Total Queries</h3>
            <div className="h-36">
              <Line data={{ labels: lineData.labels, datasets: [{ label: "Total Queries", data: lineData.data, borderColor: "#3b82f6", backgroundColor: "rgba(59,130,246,0.2)", fill: true }] }} options={{ ...chartOptions, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Total Users</h3>
            <div className="h-36">
              <Bar data={{ labels: barData.labels, datasets: [{ label: "All Time Users", data: barData.data, backgroundColor: "#60a5fa" }] }} options={{ ...chartOptions, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Right Column - Small Stats & Files */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <StatusBadgeCard
                title="Vector DB"
                value=""
                icon={<Database size={16} />}
                status={stats.vectorDbStatus}
              />
              <StatusBadgeCard title="Average Rating" value={stats.avgRating.toString()} icon={<Star size={16} />} />
            </div>

            <div className="flex flex-col gap-2">
              <StatsCard
                title="Average Retrieval Time"
                value={`${stats.avgRetrievalTime} sec`}
                icon={<Clock size={24} />}
                trend="up"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <div className="px-4 py-2 bg-gray-300 rounded-xl">
              <h3 className="font-semibold">Recent Files</h3>
            </div>
            {loadingFiles ? (
              <p className="p-4 text-gray-500">Loading files...</p>
            ) : (
              <FileTable files={recentFiles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
