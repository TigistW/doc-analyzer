"use client";

import { useEffect, useState } from "react";
import FileTable, { File as TableFile } from "@/components/Admin/FileTable";

interface BackendResponse {
  total: number;
  skip: number;
  limit: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  sort_by?: string;
  order?: string;
  files: TableFile[];
}

export default function DataManagement() {
  const [files, setFiles] = useState<TableFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination & search state
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("last_modified"); // backend default
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const fetchFiles = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const params = new URLSearchParams();
      params.append("skip", (page * limit).toString());
      params.append("limit", limit.toString());
      if (search) params.append("search", search);
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);
      if (sortBy) params.append("sort_by", sortBy);
      if (order) params.append("order", order);

      const res = await fetch(`/api/dashboard/files?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error("Failed to fetch files");

      const data: BackendResponse = await res.json();

      // Generate temporary id for the table
      const filesWithId = data.files.map((file, index) => ({
      ...file,               // spread first
      id: index + page * limit, // then overwrite / assign new id
    }));


      setFiles(filesWithId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [page, limit,sortBy, order]);

  if (loading) {
  return (
    <div className="p-6 space-y-4">
      {/* Spinner */}
      <div className="flex justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading text */}
      <p className="text-center text-gray-500 font-medium">Loading files...</p>

      {/* Table skeleton */}
      <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex px-4 py-3 border-b border-gray-200 animate-pulse">
            <div className="w-12 h-4 bg-gray-300 rounded mr-4"></div>
            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded ml-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}


  return (
    <div className="p-4 space-y-2">
      {/* <h2 className="text-lg font-bold mb-4">Data Management</h2> */}

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPage(0); // Reset to first page
              fetchFiles(); // Trigger fetch manually
            }
          }}
          className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="filename" className="px-2 py-1 hover:bg-gray-100">
            Filename
          </option>
          <option value="last_modified" className="px-2 py-1 hover:bg-gray-100">
            Date Modified
          </option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="px-4 py-2 border rounded-2xl shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="asc" className="px-2 py-1 hover:bg-gray-100">
            Ascending
          </option>
          <option value="desc" className="px-2 py-1 hover:bg-gray-100">
            Descending
          </option>
        </select>

      </div>

      <FileTable files={files} />

      {/* Pagination controls */}
      <div className="flex gap-2 mt-4 justify-center items-center">
        <button
          className="px-4 py-2 bg-blue-400 text-white rounded-2xl shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition-colors duration-200"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-3 py-2 text-gray-900 font-medium">
          Page {page + 1}
        </span>

        <button
          className="px-4 py-2 bg-blue-400 text-white rounded-2xl shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 transition-colors duration-200"
          disabled={files.length < limit}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}
