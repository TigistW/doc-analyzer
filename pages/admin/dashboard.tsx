import StatsCard from "@/components/Admin/StatsCard";
import StatusBadgeCard from "@/components/Admin/StatusBadgeCard";
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
import { Line, Bar } from "react-chartjs-2";
import { Users, Clock, FileText, Database, Activity, Star } from "lucide-react";

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

export default function Dashboard() {
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

  // Line Chart (Total Queries Trend)
  const lineData = {
    labels: ["Aug 1", "Aug 5", "Aug 10", "Aug 15", "Aug 20", "Aug 25", "Aug 30"],
    datasets: [
      {
        label: "Total Queries",
        data: [20, 40, 60, 30, 80, 50, 70],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Bar Chart (All Time Users)
  const barData = {
    labels: ["Aug 1", "Aug 5", "Aug 10", "Aug 15", "Aug 20", "Aug 25", "Aug 30"],
    datasets: [
      {
        label: "All Time Users",
        data: [50, 70, 90, 40, 100, 80, 60],
        backgroundColor: "#60a5fa",
      },
    ],
  };

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
    <div className="p-3 space-y-2">
      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Queries" value={stats.totalQueries} icon={<FileText />} trend="up" />
        <StatsCard title="All Time Users" value={stats.allTimeUsers} icon={<Users />} trend="down" />
        <StatsCard title="Total Data Entries" value={stats.totalDataEntries} icon={<Database />} trend="up" />
        <StatsCard title="Avg Response Time" value={stats.avgResponseTime} icon={<Clock />} trend="up" />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1  bg-white rounded-xl lg:grid-cols-4 gap-6">
        {/* Left column (charts stacked) */}
        <div className="lg:col-span-2 space-y-6 mt-6 ml-6">
            {/* Line Chart */}
            <div className="bg-white p-4 rounded-2xl shadow">
                <h3 className="font-semibold mb-2">Total Queries</h3>
                <div className="h-36"> {/* control height */}
                <Line data={lineData} options={{ ...chartOptions, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-2xl shadow">
                <h3 className="font-semibold mb-2">Total Users</h3>
                <div className="h-36"> {/* control height */}
                <Bar data={barData} options={{ ...chartOptions, maintainAspectRatio: false }} />
                </div>
            </div>
        </div>


        

    {/* Right Content */}
        <div className="lg:col-span-2 space-y-6 mt-6 mr-6">
            {/* Small Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column - StatusBadgeCards */}
            <div className="flex flex-col gap-2">
                <StatusBadgeCard title="Vector DB" value="" icon={<Database size={16} />} status="Healthy" />
                <StatusBadgeCard title="Average Rating" value="3.9" icon={<Star size={16} />} />
            </div>

            {/* Right Column - StatsCard */}
            <div>
                <StatsCard title="Average Retrieval Time" value="2.3 sec" icon={<Clock size={16} />} trend="up" />
            </div>
            </div>

            {/* Recent Files */}
            <div className="bg-white rounded-xl shadow gap-2">
            <div className="px-4 py-2 bg-gray-300 rounded-xl">
                <h3 className="font-semibold">Recent Files</h3>
            </div>
            <FileTable files={testFiles} />
            </div>
        </div>
      </div>
    </div>
  );
}
