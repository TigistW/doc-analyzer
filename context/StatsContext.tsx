// context/StatsContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

interface DashboardStats {
  totalQueries: string;
  allTimeUsers: string;
  totalDataEntries: string;
  avgResponseTime: string;
}

interface StatsContextType {
  stats: DashboardStats | null;
  loading: boolean;
}

const StatsContext = createContext<StatsContextType>({
  stats: null,
  loading: true,
});

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data: DashboardStats = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <StatsContext.Provider value={{ stats, loading }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
