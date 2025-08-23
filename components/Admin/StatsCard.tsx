import React, { memo } from "react";
import clsx from "clsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  status?: "Healthy" | "Unhealthy" | string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, status }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-2xl shadow flex flex-col gap-3 w-full hover:shadow-md transition-shadow">
      {/* Title & Icon */}
      <div className="flex items-center gap-2">
    {icon && <div className="text-gray-800"><>{icon}</></div>}
    <h3 className="text-gray-800 text-sm truncate">{title}</h3>
    </div>

      {/* Value + Trend */}
      <div className="flex items-center gap-2">
        <span className="text-xl text-black font-bold">{value}</span>
        {trend && (
          <span
            className={clsx(
              "flex items-center text-sm font-medium",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-gray-500"
            )}
          >
            {trend === "up" && <ArrowUpRight size={16} />}
            {trend === "down" && <ArrowDownRight size={16} />}
            {trend === "neutral" && "—"}
          </span>
        )}
      </div>

      {/* Optional Status Badge */}
      {status && (
        <span
          className={clsx(
            "text-xs px-2 py-1 rounded-full w-fit",
            status === "Healthy" && "bg-green-100 text-green-600",
            status === "Unhealthy" && "bg-red-100 text-red-600",
            status !== "Healthy" && status !== "Unhealthy" && "bg-gray-100 text-gray-600"
          )}
        >
          {status}
        </span>
      )}
    </div>
  );
};

export default memo(StatsCard);
