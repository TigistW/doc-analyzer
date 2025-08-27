"use client";
import StatsCard from "@/components/Admin/StatsCard";
import { Users, Clock, FileText, Database } from "lucide-react";

interface Props {
  stats: {
    totalQueries: string;
    allTimeUsers: string;
    totalDataEntries: string;
    avgResponseTime: string;
  };
}

export default function StatusHeader({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mr-6 ml-6">
      <StatsCard title="Total Queries" value={stats.totalQueries} icon={<FileText />} trend="up" />
      <StatsCard title="All Time Users" value={stats.allTimeUsers} icon={<Users />} trend="down" />
      <StatsCard title="Total Data Entries" value={stats.totalDataEntries} icon={<Database />} trend="up" />
      <StatsCard title="Avg Response Time" value={stats.avgResponseTime} icon={<Clock />} trend="up" />
    </div>
  );
}
