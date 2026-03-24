"use client";

import { Download } from "lucide-react";

export default function AdminDashboard() {
  const handleDownloadCSV = () => {
    // Navigate straight to the API route, which forces a file download
    window.open('/api/export', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 flex flex-col items-center p-12 space-y-6">
        
        <h1 className="text-3xl font-bold text-[#115e59] mb-4">Admin Dashboard</h1>
        
        <p className="text-center text-gray-600">
          Download all submitted Job Notification Form data across all applicants as a single CSV file. 
          You can open this via Microsoft Excel or Google Sheets.
        </p>

        <button 
          onClick={handleDownloadCSV}
          className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold bg-[#115e59] text-white hover:bg-teal-800 shadow-md transition-transform active:scale-95 text-lg mt-8"
        >
          <Download size={24} />
          Download Submissions (CSV)
        </button>
        
      </div>
    </div>
  );
}
