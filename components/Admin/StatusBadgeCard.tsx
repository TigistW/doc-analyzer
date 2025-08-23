import React, { memo } from "react";
import { Database, Star } from "lucide-react";

type StatusBadgeCardProps = {
  title: string;
  value?: string | number;
  icon?: React.ReactNode;
  status?: string;
};

const StatusBadgeCard: React.FC<StatusBadgeCardProps> = ({ title, value, icon, status }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-xl shadow flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {icon && <div className="text-black"><>{icon}</></div>}
        <h3 className="text-black text-sm font-medium">{title}</h3>
      </div>

      {status && (
        <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {status}
        </span>
      )}
      {value !== undefined && !status && (
        <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {value}
        </span>
      )}
    </div>
  );
};

export default memo(StatusBadgeCard);