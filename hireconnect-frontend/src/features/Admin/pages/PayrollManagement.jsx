// import React, { useState, useEffect } from "react";
// import {
//   Eye,
//   Edit,
//   Search,
//   ChevronDown,
//   ArrowLeft,
//   RefreshCw,
//   Plus,
//   FileText,
// } from "lucide-react";

// const PayrollManagement = ({ onBack }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [selectedMonth, setSelectedMonth] = useState("All Months");
//   const [selectedDepartment, setSelectedDepartment] =
//     useState("All Departments");
//   const [selectedBranch, setSelectedBranch] = useState("All Branches");

//   // 🌟 BACKEND DATA
//   const [payrollRecords, setPayrollRecords] = useState([]);

//   // Helper to normalize any backend shape into an array
//   const normalizeRecords = (data) => {
//     return (
//       data?.data || // { data: [] }
//       data?.payrolls || // { payrolls: [] }
//       data?.records || // { records: [] }
//       data?.list || // { list: [] }
//       data || [] // straight array []
//     );
//   };

//   // ⭐ LOAD DATA AUTOMATICALLY WHEN PAGE OPENS
//   useEffect(() => {
//     let cancelled = false;

//     const loadInitialPayroll = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/api/payroll");
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();

//         if (cancelled) return;

//         const records = normalizeRecords(data);
//         setPayrollRecords(records);
//       } catch (error) {
//         if (!cancelled) {
//           console.error("Fetch error:", error);
//         }
//       }
//     };

//     loadInitialPayroll();

//     return () => {
//       cancelled = true;
//     };
//   }, []); // runs once on mount

//   // ⭐ Separate reload function for buttons (not used by effect)
//   const reloadPayrollRecords = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/payroll");
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       const records = normalizeRecords(data);
//       setPayrollRecords(records);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   const handleGenerateAutoPayroll = async () => {
//     await reloadPayrollRecords();
//   };

//   const handleManualEntry = async () => {
//     await reloadPayrollRecords();
//   };

//   const handleExport = () => {
//     alert("Exporting payroll records...");
//   };

//   const handleBackToDashboard = () => {
//     if (onBack) onBack();
//   };

//   return (
//     <div className="w-full h-full bg-[#F9FAFF] p-6">
//       {/* Back Button */}
//       <button
//         onClick={handleBackToDashboard}
//         className="mb-4 flex items-center gap-2 text-sm font-medium text-[#011A8B] hover:underline"
//       >
//         <ArrowLeft size={18} />
//         <span>Back to Finance Dashboard</span>
//       </button>

//       {/* Header */}
//       <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#011A8B]">
//             Payroll Management
//           </h1>
//           <p className="text-sm text-gray-500">
//             Create, edit, and view payrolls
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <button
//             onClick={handleGenerateAutoPayroll}
//             className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
//           >
//             <RefreshCw size={18} />
//             <span>Generate Auto Payroll</span>
//           </button>

//           <button
//             onClick={handleManualEntry}
//             className="inline-flex items-center gap-2 rounded-xl bg-[#011A8B] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#020f5d]"
//           >
//             <Plus size={18} />
//             <span>Manual Entry</span>
//           </button>

//           <button
//             onClick={handleExport}
//             className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
//           >
//             <FileText size={18} />
//             <span>Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Filters Section */}
//       <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:p-6">
//         <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           {/* Search */}
//           <div className="relative w-full md:max-w-md">
//             <Search
//               className="pointer-events-none absolute left-3 top-2.5 text-gray-400"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search by employee name or ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full rounded-xl border border-gray-200 bg-[#F9FAFF] py-2.5 pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#011A8B] focus:outline-none focus:ring-1 focus:ring-[#011A8B]"
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
//           {/* Status */}
//           <div className="relative">
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full appearance-none rounded-xl border border-gray-200 bg-[#F9FAFF] py-2.5 pl-3 pr-9 text-sm text-gray-700 focus:border-[#011A8B] focus:outline-none focus:ring-1 focus:ring-[#011A8B]"
//             >
//               <option>All Status</option>
//               <option>Pending</option>
//               <option>Approved</option>
//               <option>Paid</option>
//             </select>
//             <ChevronDown
//               className="pointer-events-none absolute right-3 top-2.5 text-gray-400"
//               size={18}
//             />
//           </div>

//           {/* Month */}
//           <div className="relative">
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="w-full appearance-none rounded-xl border border-gray-200 bg-[#F9FAFF] py-2.5 pl-3 pr-9 text-sm text-gray-700 focus:border-[#011A8B] focus:outline-none focus:ring-1 focus:ring-[#011A8B]"
//             >
//               <option>All Months</option>
//               <option>January 2025</option>
//               <option>February 2025</option>
//               <option>March 2025</option>
//               <option>April 2025</option>
//               <option>May 2025</option>
//               <option>June 2025</option>
//               <option>July 2025</option>
//               <option>August 2025</option>
//               <option>September 2025</option>
//               <option>October 2025</option>
//               <option>November 2025</option>
//               <option>December 2025</option>
//             </select>
//             <ChevronDown
//               className="pointer-events-none absolute right-3 top-2.5 text-gray-400"
//               size={18}
//             />
//           </div>

//           {/* Department */}
//           <div className="relative">
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="w-full appearance-none rounded-xl border border-gray-200 bg-[#F9FAFF] py-2.5 pl-3 pr-9 text-sm text-gray-700 focus:border-[#011A8B] focus:outline-none focus:ring-1 focus:ring-[#011A8B]"
//             >
//               <option>All Departments</option>
//               <option>Engineering</option>
//               <option>Sales</option>
//               <option>Marketing</option>
//             </select>
//             <ChevronDown
//               className="pointer-events-none absolute right-3 top-2.5 text-gray-400"
//               size={18}
//             />
//           </div>

//           {/* Branch */}
//           <div className="relative">
//             <select
//               value={selectedBranch}
//               onChange={(e) => setSelectedBranch(e.target.value)}
//               className="w-full appearance-none rounded-xl border border-gray-200 bg-[#F9FAFF] py-2.5 pl-3 pr-9 text-sm text-gray-700 focus:border-[#011A8B] focus:outline-none focus:ring-1 focus:ring-[#011A8B]"
//             >
//               <option>All Branches</option>
//               <option>Main Branch</option>
//               <option>Branch 1</option>
//               <option>Branch 2</option>
//             </select>
//             <ChevronDown
//               className="pointer-events-none absolute right-3 top-2.5 text-gray-400"
//               size={18}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Records Section */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-base font-semibold text-[#011A8B]">
//             Payroll Records ({payrollRecords.length})
//           </h2>
//         </div>

//         <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#F9FAFF]">
//           <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
//             <thead className="bg-[#EEF0FF]">
//               <tr>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Employee
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Month
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Source
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Basic Salary
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Total Earnings
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Deductions
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Net Salary
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   LOP Days
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {payrollRecords.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="10"
//                     className="px-4 py-8 text-center text-sm text-gray-500"
//                   >
//                     No records found
//                   </td>
//                 </tr>
//               ) : (
//                 payrollRecords.map((record, index) => (
//                   <tr key={index} className="bg-white hover:bg-gray-50">
//                     <td className="px-4 py-3 align-top">
//                       <div className="flex flex-col">
//                         <span className="text-sm font-semibold text-gray-900">
//                           {record.userName}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           ID: {record.userId}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.payrollMonth}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.autoGenerated ? "Auto" : "Manual"}
//                     </td>

//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       ₹{(record.basicSalary || 0).toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       ₹{(record.totalEarnings || 0).toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       ₹{(record.totalDeductions || 0).toLocaleString("en-IN")}
//                     </td>

//                     <td className="px-4 py-3 text-sm font-semibold text-emerald-700">
//                       ₹{(record.netSalary || 0).toLocaleString("en-IN")}
//                     </td>

//                     <td className="px-4 py-3">
//                       <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
//                         Pending
//                       </span>
//                     </td>

//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.lopDays}
//                     </td>

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100">
//                           <Eye size={16} />
//                         </button>
//                         <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100">
//                           <Edit size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PayrollManagement;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Eye,
  Edit,
  Search,
  ArrowLeft,
  RefreshCw,
  Plus,
  FileText,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const getApiBaseUrl = () => {
  try {
    if (
      typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_API_BASE_URL
    ) {
      return import.meta.env.VITE_API_BASE_URL;
    }
  } catch {
    // ignore
  }

  if (typeof window !== "undefined" && window.__API_BASE_URL__) {
    return window.__API_BASE_URL__;
  }

  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost") {
      return "http://localhost:8080";
    }
    return `${window.location.protocol}//${window.location.host}`;
  }

  return "";
};

const PayrollManagement = ({ onBack }) => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  // 🌟 BACKEND DATA
  const [payrollRecords, setPayrollRecords] = useState([]);

  const buildAuthHeader = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }, []);

  // ✅ FIXED: Robust fetch with proper error handling
  const fetchPayrollRecords = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");

      const baseUrl = getApiBaseUrl();
      const authHeader = buildAuthHeader();

      console.log("📡 Fetching from:", `${baseUrl}/api/payroll`);
      
      const res = await fetch(`${baseUrl}/api/payroll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        credentials: "include",
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.message || `Failed to load payroll (${res.status})`
        );
      }

      const data = await res.json();
      console.log("✅ Raw data:", data);

      // ✅ Handle ALL possible backend response shapes
      let records = [];
      if (Array.isArray(data)) {
        records = data;
      } else if (Array.isArray(data.data)) {
        records = data.data;
      } else if (Array.isArray(data.payrolls)) {
        records = data.payrolls;
      } else if (Array.isArray(data.records)) {
        records = data.records;
      } else if (data.content && Array.isArray(data.content)) {
        records = data.content;
      }

      // ✅ Normalize numeric fields (backend might send strings)
      const normalizedRecords = records.map(record => ({
        ...record,
        userId: record.userId || record.user_id,
        userName: record.userName || record.username || record.user_name || record.name || "Unknown",
        employeeId: record.employeeId || record.employee_id || `EMP-${record.userId}`,
        employeeName: record.employeeName || record.employee_name || record.userName || "Unknown",
        joiningDate: record.joiningDate || record.joining_date,
        basicSalary: Number(record.basicSalary || record.basic_salary || 0),
        totalEarnings: Number(record.totalEarnings || record.total_earnings || 0),
        totalDeductions: Number(record.totalDeductions || record.total_deductions || 0),
        netSalary: Number(record.netSalary || record.net_salary || 0),
        lopDays: Number(record.lopDays || record.lop_days || 0),
        payrollMonth: record.payrollMonth || record.payroll_month,
        autoGenerated: Boolean(record.autoGenerated || record.auto_generated || false),
        source: record.source || (record.autoGenerated ? "Auto Generated" : "Manual Entry"),
      }));

      console.log("📊 Normalized records:", normalizedRecords.length);
      setPayrollRecords(normalizedRecords);
      
    } catch (error) {
      console.error("❌ Fetch payroll error:", error);
      setLoadError(error.message || "Failed to load payroll records.");
    } finally {
      setLoading(false);
    }
  }, [buildAuthHeader]);

  // ✅ Load data on mount
  useEffect(() => {
    fetchPayrollRecords();
  }, [fetchPayrollRecords]);

  // ✅ Client-side filtering (until backend supports query params)
  const filteredRecords = useMemo(() => {
    return payrollRecords.filter(record => {
      const matchesSearch = !searchTerm || 
        record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.employeeId?.toString().includes(searchTerm) ||
        record.userId?.toString().includes(searchTerm);

      const matchesStatus = selectedStatus === "All Status" || 
        (selectedStatus === "Pending" && !record.status) ||
        record.status === selectedStatus;

      const matchesMonth = selectedMonth === "All Months" || 
        record.payrollMonth?.includes(selectedMonth.split(' ')[0]);

      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [payrollRecords, searchTerm, selectedStatus, selectedMonth]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch {
      return dateStr;
    }
  };

  const formatJoiningDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      "Pending": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
      "Approved": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      "Paid": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      "PENDING": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
      "APPROVED": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      "PAID": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    };
    const config = statusMap[status] || statusMap["Pending"];
    return `inline-flex rounded-full ${config.bg} ${config.text} px-3 py-1 text-xs font-medium border ${config.border}`;
  };

  const handleManualEntry = () => {
    navigate("/admin/manual-payroll-entry");
  };

  const handleViewDetails = (record) => {
    console.log("View details:", record);
    // Create a detailed view alert
    const details = `
Employee: ${record.employeeName} (${record.employeeId})
Joining Date: ${formatJoiningDate(record.joiningDate)}
Month: ${formatDate(record.payrollMonth)}
Basic Salary: ₹${record.basicSalary?.toLocaleString("en-IN")}
Total Earnings: ₹${record.totalEarnings?.toLocaleString("en-IN")}
Total Deductions: ₹${record.totalDeductions?.toLocaleString("en-IN")}
Net Salary: ₹${record.netSalary?.toLocaleString("en-IN")}
LOP Days: ${record.lopDays || 0}
Status: ${record.status || "Pending"}
Source: ${record.source}
    `.trim();
    alert(details);
  };

  const handleEdit = (record) => {
    console.log("Edit record:", record);
    alert(`Edit functionality for ${record.employeeName} will be implemented soon.`);
  };

  return (
    <div className="w-full h-full bg-[#F9FAFF] p-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-[#011A8B] hover:underline"
      >
        <ArrowLeft size={18} />
        <span>Back to Finance Dashboard</span>
      </button>

      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#011A8B]">
            Payroll Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage all payroll records ({filteredRecords.length} shown)
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={fetchPayrollRecords}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>

          <button
            onClick={handleManualEntry}
            className="inline-flex items-center gap-2 rounded-xl bg-[#011A8B] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#020f5d]"
          >
            <Plus size={18} />
            <span>Manual Entry</span>
          </button>

          <button
            onClick={() => alert("Export feature coming soon...")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <FileText size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#F9FAFF] py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#011A8B] focus:outline-none focus:ring-2 focus:ring-[#011A8B]/20"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-gray-200 bg-[#F9FAFF] px-4 py-2.5 text-sm text-gray-700 focus:border-[#011A8B] focus:outline-none focus:ring-2 focus:ring-[#011A8B]/20"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Paid</option>
            </select>
            
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-xl border border-gray-200 bg-[#F9FAFF] px-4 py-2.5 text-sm text-gray-700 focus:border-[#011A8B] focus:outline-none focus:ring-2 focus:ring-[#011A8B]/20"
            >
              <option>All Months</option>
              <option>January 2025</option>
              <option>February 2025</option>
              <option>March 2025</option>
              <option>December 2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#011A8B]">
            Payroll Records ({filteredRecords.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#EEF0FF] to-[#E0E7FF]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total Earnings
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  LOP Days
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#011A8B]" />
                    <p className="mt-2 text-sm text-gray-500">Loading payroll records...</p>
                  </td>
                </tr>
              ) : loadError ? (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-red-600">{loadError}</p>
                    <button
                      onClick={fetchPayrollRecords}
                      className="mt-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm font-medium text-gray-900">No payroll records found</p>
                    <p className="text-sm text-gray-500">
                      {searchTerm ? "Try adjusting your search" : "No records match your filters"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record, index) => (
                  <tr key={record.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {record.employeeName || record.userName || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-mono text-gray-700">
                        {record.employeeId}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700">
                        {formatJoiningDate(record.joiningDate)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {formatDate(record.payrollMonth)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.autoGenerated 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {record.autoGenerated ? "Auto" : "Manual"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm font-mono text-gray-900">
                        ₹{record.basicSalary?.toLocaleString("en-IN") || "0"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm font-mono text-gray-900">
                        ₹{record.totalEarnings?.toLocaleString("en-IN") || "0"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm font-mono text-gray-900">
                        ₹{record.totalDeductions?.toLocaleString("en-IN") || "0"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm font-bold text-emerald-600">
                        ₹{record.netSalary?.toLocaleString("en-IN") || "0"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={getStatusBadge(record.status || "Pending")}>
                        {record.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-sm text-gray-900">{record.lopDays || 0}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(record)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(record)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;