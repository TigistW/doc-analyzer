"use client";

import { useState, useEffect,useRef } from "react";

interface Keyword {
  id: string;
  term: string;
}

interface PDF {
  id: string;
  name: string;
  uploadedAt: string;
}

export default function ScraperManagementTab() {
  // Keyword state
    const [keywords, setKeywords] = useState<Keyword[]>([]);
    const [newKeyword, setNewKeyword] = useState("");
    const [showAddKeywordModal, setShowAddKeywordModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // PDFs state
    const [pdfs, setPdfs] = useState<PDF[]>([]);
    // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // Handle file selection (append new files)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return; // stop if no files
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    };

    // Remove a file from the list
    const handleRemoveFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };
    // Upload files
    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setUploading(true);       // start loading
        setUploadSuccess(false);
        
        const token = localStorage.getItem("token");
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]); // must match FastAPI 'files'
        }
        try {
        const response = await fetch("/api/admin/upload-pdfs", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        });

        const data = await response.json();
        console.log("Upload result:", data);

        // Clear selected files only after successful upload
        if (response.ok) {
      setSelectedFiles([]); // clear state
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // reset input
        setUploadSuccess(true); // show success message
      setTimeout(() => setUploadSuccess(false), 3000);
      }
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
  finally{
    setUploading(false); // stop loading
  }
};
  

    
    // Define fetchKeywords before useEffect
    const fetchKeywords = async () => {
        try {
        const res = await fetch("/api/admin/keywords", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
        });
        const data = await res.json();
        setKeywords(data || []);
        } catch (err) {
        console.error("Failed to fetch keywords", err);
        setKeywords([]);
        }
    };


  useEffect(() => {
    fetchKeywords();
  }, []);

    // Add keyword
    const handleAddKeyword = async () => {
        if (!newKeyword.trim()) return;

        try {
            const res = await fetch("/api/admin/keywords", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({ term: newKeyword }),
            });

            if (!res.ok) throw new Error("Failed to add keyword");

            setNewKeyword("");
            setShowAddKeywordModal(false);
            fetchKeywords(); // Refresh list
        } catch (err) {
            console.error(err);
    }
    };

  // Delete keyword
  const handleDeleteKeyword = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/keywords/?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            });

            if (!res.ok) throw new Error("Failed to delete keyword");

            // Refresh keywords
            fetchKeywords();
        } catch (err) {
            console.error(err);
        }
};


  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Multi-PDF Upload */}
        <div className="lg:w-2/3 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md rounded-2xl p-6 border border-blue-200">
  <h2 className="text-xl text-blue-700 font-semibold mb-4 flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-blue-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
    Upload PDFs
  </h2>

{/* Drag & Drop Zone */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-white hover:bg-blue-100 transition"
      >
        <svg
          className="w-10 h-10 text-blue-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 0h4a2 2 0 002-2v-5a2 2 0 00-2-2h-4V4m0 12H7a2 2 0 01-2-2v-5a2 2 0 012-2h4"
          />
        </svg>
        <span className="text-blue-600 font-medium">Click to upload</span>
        <span className="text-xs text-gray-500">or drag & drop PDFs here</span>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          ref = {fileInputRef}
          className="hidden"
        />
      </label>

 {/* Show selected files with remove option */}
      {selectedFiles.length > 0 && (
        <ul className="mt-3 text-sm text-gray-700 space-y-2">
          {selectedFiles.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-lg"
            >
              <span>📄 {file.name}</span>
              <button
                onClick={() => handleRemoveFile(idx)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}

  {/* Upload button */}
     <button
        disabled={selectedFiles.length === 0 || uploading}
        onClick={handleUpload}
        className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow transition"
        >
        {uploading ? "Uploading..." : "Upload Now"}
        {uploading && (
        <svg className="animate-spin h-5 w-5 inline-block ml-2 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        )}

        </button>
        {uploadSuccess && (
  <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-lg text-sm">
    File Uploaded successfully!
  </div>
)}
</div>


{/* Right Column: Keywords + Last Week PDFs */}
<div className="lg:w-1/3 flex flex-col gap-6">
  {/* Keyword Management */}
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md rounded-2xl p-6 border border-blue-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg text-blue-700  flex items-center gap-2">
       
        
      </h2>
      <button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
        onClick={() => setShowAddKeywordModal(true)}
      >
        + Add
      </button>
    </div>

    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-blue-100">
          <th className="p-2 text-left text-blue-700">Keyword</th>
          <th className="p-2 text-blue-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {keywords.length > 0 ? (
            keywords.map((k) => (
            <tr key={k.id} className="border-b hover:bg-blue-50">
                <td className="text-gray-600 p-2 text-sm">{k.term}</td>
                <td className="text-gray-600 p-2 text-center">
                <button
                    className="px-2 py-1 bg-red-400 text-white rounded-lg"
                    onClick={() => handleDeleteKeyword(k.id)}
                >
                    Delete
                </button>
                </td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan={2} className="p-4 text-gray-500 text-center">
                No keywords found
            </td>
            </tr>
        )}
        </tbody>

    </table>
  </div>
    </div>
    </div>


    
    {showAddKeywordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl w-96 border border-blue-200 shadow-lg">
      <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Keyword
      </h3>
      <input
        type="text"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        className="w-full border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-2 rounded-lg mb-4"
        placeholder="Enter keyword"
      />
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          onClick={() => setShowAddKeywordModal(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          onClick={handleAddKeyword}
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
