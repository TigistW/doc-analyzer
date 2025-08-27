"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useStats } from "@/context/StatsContext";
import StatusHeader from "../Admin/StatusHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { stats, loading } = useStats(); 

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* Show StatusHeader only when stats are loaded */}
        {!loading && stats && <StatusHeader stats={stats} />}

        {/* Page-specific content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
