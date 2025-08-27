import React, { memo } from "react";
import { Database, Star, Clock, Edit3 } from "lucide-react";

export type File = {
  id: number;
  filename: string;
  last_modified: string;
  source?:string;
};

type Props = {
  files: File[];
};

export default function FileTable({ files }: Props) {
  return (
  <div className="bg-gray-100 p-4 rounded-2xl shadow">
    <table className="w-full text-xs text-left">
      <thead>
        <tr className="text-gray-500 border-b">
          <th className="py-2 text-gray-500">File Name</th>
          <th className="py-2 text-gray-500">Date Added</th>
          <th className="py-2 text-gray-500">Actions</th>
        </tr>
      </thead>

      <tbody>
        {files.map((file) => (
        <tr key={file.id} className="border-b last:border-0">
          <td className="py-2 text-gray-500">{file.filename}</td>
          <td className="py-2 text-gray-500">{file.last_modified}</td>
          <td className="py-2 ">
          <button className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 transition">
            <Edit3 size={12} />
          </button>
        </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
    );
  }
