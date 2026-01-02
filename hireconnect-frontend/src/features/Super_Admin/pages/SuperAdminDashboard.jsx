// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Users,
//   CheckCircle,
//   Clock,
//   PlusCircle,
//   Settings,
//   Building2,
//   Activity,
//   ShieldCheck,
//   Server,
//   ArrowRightCircle,
//   Layers,
// } from "lucide-react";

// // -------- API BASE URL (local + real-time ready) --------
// const getApiBaseUrl = () => {
//   const fromEnv =
//     import.meta.env?.VITE_API_BASE_URL &&
//     import.meta.env.VITE_API_BASE_URL.trim();

//   if (fromEnv) return fromEnv;

//   if (
//     window.location.hostname === "localhost" ||
//     window.location.hostname === "127.0.0.1"
//   ) {
//     return "http://localhost:8080";
//   }

//   // same-domain backend (reverse proxy) in production
//   return "";
// };

// const API_BASE_URL = getApiBaseUrl();

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   // ------- ROLE (ADMIN / SUPER_ADMIN) -------
//   const [userRole, setUserRole] = useState(null);
//   const isSuperAdmin = userRole === "SUPER_ADMIN";

//   // -------------------- SERVICES STATE --------------------
//   const [showServicesPanel, setShowServicesPanel] = useState(false);
//   const [activeServiceTab, setActiveServiceTab] = useState(null);

//   const [demoRequests, setDemoRequests] = useState([]);
//   const [demoLoading, setDemoLoading] = useState(false);
//   const [demoError, setDemoError] = useState("");

//   const [registeredCompanies, setRegisteredCompanies] = useState([]);
//   const [companiesLoading, setCompaniesLoading] = useState(false);
//   const [companiesError, setCompaniesError] = useState("");

//   // -------------------- FETCH HELPERS --------------------
//   const fetchDemoRequests = async () => {
//     try {
//       setDemoLoading(true);
//       setDemoError("");

//       const endpoint = API_BASE_URL
//         ? `${API_BASE_URL.replace(/\/+$/, "")}/api/company/companies`
//         : "/api/company/companies";

//       const token = localStorage.getItem("token");

//       const res = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       if (!res.ok) {
//         throw new Error(
//           `Failed to load demo requests (status ${res.status})`
//         );
//       }

//       const data = await res.json();

//       const list =
//         (Array.isArray(data) && data) ||
//         (Array.isArray(data.data) && data.data) ||
//         (Array.isArray(data.content) && data.content) ||
//         [];

//       setDemoRequests(list);
//     } catch (err) {
//       console.error("Demo requests fetch error:", err);
//       setDemoError(err.message || "Failed to load demo requests");
//     } finally {
//       setDemoLoading(false);
//     }
//   };

//   const fetchRegisteredCompanies = async () => {
//     try {
//       setCompaniesLoading(true);
//       setCompaniesError("");

//       const endpoint = API_BASE_URL
//         ? `${API_BASE_URL.replace(/\/+$/, "")}/api/company/register/companies`
//         : "/api/company/register/companies";

//       const token = localStorage.getItem("token");

//       const res = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       if (!res.ok) {
//         throw new Error(
//           `Failed to load registered companies (status ${res.status})`
//         );
//       }
//       const data = await res.json();

//       const list =
//         (Array.isArray(data) && data) ||
//         (Array.isArray(data.data) && data.data) ||
//         (Array.isArray(data.content) && data.content) ||
//         [];

//       setRegisteredCompanies(list);
//     } catch (err) {
//       console.error("Registered companies fetch error:", err);
//       setCompaniesError(err.message || "Failed to load registered companies");
//     } finally {
//       setCompaniesLoading(false);
//     }
//   };

//   // -------------------- EFFECT: ROLE + INITIAL DATA --------------------
//   useEffect(() => {
//     try {
//       const stored =
//         (localStorage.getItem("role") || localStorage.getItem("position") || "")
//           .trim()
//           .toUpperCase();
//       setUserRole(stored || null);
//     } catch (err) {
//       console.error("Error reading role from storage:", err);
//     }

//     // load registered companies so stat cards show real data
//     fetchRegisteredCompanies();
//   }, []);

//   // -------------------- NAV HANDLERS --------------------
//   const handleAddEmployeeClick = () => navigate("/admin/add-employee");
//   const handleAdminManagementClick = () => navigate("/admin/management");
//   const handleCompanyManagementClick = () => navigate("/admin/company");

//   // -------------------- SERVICES HANDLERS --------------------
//   const handleServicesClick = () => {
//     if (!isSuperAdmin) return; // safety
//     setShowServicesPanel(true);

//     if (!activeServiceTab) {
//       setActiveServiceTab("demo");
//       fetchDemoRequests();
//     }
//   };

//   const handleDemoTabClick = () => {
//     setActiveServiceTab("demo");
//     if (!demoRequests.length && !demoLoading) {
//       fetchDemoRequests();
//     }
//   };

//   const handleCompaniesTabClick = () => {
//     setActiveServiceTab("companies");
//     if (!registeredCompanies.length && !companiesLoading) {
//       fetchRegisteredCompanies();
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 md:px-6 py-4 bg-[#F9FAFF]">
//       {/* HEADER */}
//       <div
//         className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 shadow-sm"
//         style={{ backgroundColor: "#00008B" }}
//       >
//         <div>
//           <h1 className="text-xl md:text-2xl font-bold text-white">
//             Admin Dashboard
//           </h1>
//           <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
//             Get a quick overview of companies and access key admin actions from
//             a single place.
//           </p>
//         </div>

//         <div className="flex gap-4 text-xs md:text-sm text-blue-100">
//           <div className="flex flex-col items-end">
//             {userRole && (
//               <span className="px-2 py-1 rounded-full bg-blue-900/60 text-[11px] border border-blue-300/40">
//                 Logged in as: {userRole}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="space-y-6">
//         {/* Stat cards */}
//         <div className="grid gap-4 md:grid-cols-3">
//           {/* Total Companies */}
//           <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
//             <div>
//               <p className="text-xs font-medium text-slate-500">
//                 Total Companies
//               </p>
//               <p className="mt-2 text-2xl font-bold text-slate-900">
//                 {registeredCompanies.length || 0}
//               </p>
//               <p className="mt-1 text-[11px] text-slate-400">
//                 Across all regions
//               </p>
//             </div>
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
//               <Users className="h-6 w-6 text-[#011A8B]" />
//             </div>
//           </div>

//           {/* Active Companies */}
//           <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
//             <div>
//               <p className="text-xs font-medium text-slate-500">
//                 Active Companies
//               </p>
//               <p className="mt-2 text-2xl font-bold text-emerald-600">
//                 {registeredCompanies.length
//                   ? registeredCompanies.filter(
//                       (c) => (c.status || "").toLowerCase() === "active"
//                     ).length
//                   : 0}
//               </p>
//               <p className="mt-1 text-[11px] text-slate-400">
//                 Billing & users active
//               </p>
//             </div>
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
//               <CheckCircle className="h-6 w-6 text-emerald-600" />
//             </div>
//           </div>

//           {/* Pending Approval (still static placeholder; can be wired later) */}
//           <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
//             <div>
//               <p className="text-xs font-medium text-slate-500">
//                 Pending Approval
//               </p>
//               <p className="mt-2 text-2xl font-bold text-amber-500">0</p>
//               <p className="mt-1 text-[11px] text-slate-400">
//                 Company requests in queue
//               </p>
//             </div>
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
//               <Clock className="h-6 w-6 text-amber-500" />
//             </div>
//           </div>
//         </div>

//         {/* Action cards */}
//         <div className="grid gap-4 md:grid-cols-4">
//           {/* Add New Employee */}
//           <button
//             type="button"
//             onClick={handleAddEmployeeClick}
//             className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
//           >
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 group-hover:bg-emerald-100">
//               <PlusCircle className="h-6 w-6 text-emerald-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-slate-900">
//                 Add New Employee
//               </h3>
//               <p className="mt-1 text-xs text-slate-500">
//                 Create a new employee profile with basic details.
//               </p>
//             </div>
//           </button>

//           {/* Admin Management */}
//           <button
//             type="button"
//             onClick={handleAdminManagementClick}
//             className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
//           >
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 group-hover:bg-pink-100">
//               <Settings className="h-6 w-6 text-pink-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-slate-900">
//                 Admin Management
//               </h3>
//               <p className="mt-1 text-xs text-slate-500">
//                 Configure admin accounts, roles and access levels.
//               </p>
//             </div>
//           </button>

//           {/* Company Management – ONLY SUPER_ADMIN */}
//           {isSuperAdmin && (
//             <button
//               type="button"
//               onClick={handleCompanyManagementClick}
//               className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 group-hover:bg-sky-100">
//                 <Building2 className="h-6 w-6 text-sky-600" />
//               </div>
//               <div>
//                 <h3 className="text-sm font-semibold text-slate-900">
//                   Company Management
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Manage company profiles, branches and core details.
//                 </p>
//               </div>
//             </button>
//           )}

//           {/* Services – ONLY SUPER_ADMIN */}
//           {isSuperAdmin && (
//             <button
//               type="button"
//               onClick={handleServicesClick}
//               className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 group-hover:bg-indigo-100">
//                 <Layers className="h-6 w-6 text-indigo-600" />
//               </div>
//               <div>
//                 <h3 className="text-sm font-semibold text-slate-900">
//                   Services
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-500">
//                   View demo requests and registered companies.
//                 </p>
//               </div>
//             </button>
//           )}
//         </div>

//         {/* SERVICES PANEL – ONLY SUPER_ADMIN */}
//         {isSuperAdmin && showServicesPanel && (
//           <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
//             <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
//               <h3 className="text-sm font-semibold text-slate-900">
//                 Services
//               </h3>

//               {/* Tabs */}
//               <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-xs">
//                 <button
//                   type="button"
//                   onClick={handleDemoTabClick}
//                   className={`px-3 py-1.5 rounded-full transition ${
//                     activeServiceTab === "demo"
//                       ? "bg-white text-[#011A8B] shadow-sm border border-slate-200"
//                       : "text-slate-600"
//                   }`}
//                 >
//                   Demo Requests
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCompaniesTabClick}
//                   className={`px-3 py-1.5 rounded-full transition ${
//                     activeServiceTab === "companies"
//                       ? "bg-white text-[#011A8B] shadow-sm border border-slate-200"
//                       : "text-slate-600"
//                   }`}
//                 >
//                   Registered Companies
//                 </button>
//               </div>
//             </div>

//             {/* DEMO REQUESTS TABLE */}
//             {activeServiceTab === "demo" && (
//               <div className="mt-2">
//                 {demoLoading ? (
//                   <p className="text-xs text-slate-500">
//                     Loading demo requests...
//                   </p>
//                 ) : demoError ? (
//                   <p className="text-xs text-red-500">{demoError}</p>
//                 ) : demoRequests.length === 0 ? (
//                   <p className="text-xs text-slate-500">
//                     No demo requests found.
//                   </p>
//                 ) : (
//                   <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#F9FAFF]">
//                     <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
//                       <thead className="bg-[#EEF0FF]">
//                         <tr>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Full Name
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Company Email
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Phone Number
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Company Name
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Designation
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-100">
//                         {demoRequests.map((req, idx) => (
//                           <tr key={idx} className="bg-white hover:bg-gray-50">
//                             <td className="px-4 py-3 text-gray-800">
//                               {req.fullName || req.name || "-"}
//                             </td>
//                             <td className="px-4 py-3 text-gray-800">
//                               {req.companyEmail ||
//                                 req.workEmail ||
//                                 req.email ||
//                                 "-"}
//                             </td>
//                             <td className="px-4 py-3 text-gray-800">
//                               {req.phoneNumber || req.phone || "-"}
//                             </td>
//                             <td className="px-4 py-3 text-gray-800">
//                               {req.companyName || "-"}
//                             </td>
//                             <td className="px-4 py-3 text-gray-800">
//                               {req.designation ||
//                                 req.role ||
//                                 req.yourRole ||
//                                 "-"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* REGISTERED COMPANIES TABLE */}
//             {activeServiceTab === "companies" && (
//               <div className="mt-2">
//                 {companiesLoading ? (
//                   <p className="text-xs text-slate-500">
//                     Loading registered companies...
//                   </p>
//                 ) : companiesError ? (
//                   <p className="text-xs text-red-500">{companiesError}</p>
//                 ) : registeredCompanies.length === 0 ? (
//                   <p className="text-xs text-slate-500">
//                     No registered companies found.
//                   </p>
//                 ) : (
//                   <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#F9FAFF]">
//                     <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
//                       <thead className="bg-[#EEF0FF]">
//                         <tr>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             ID
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Company Name
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Company Email
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Company Key
//                           </th>
//                           <th className="px-4 py-3 font-semibold text-gray-700">
//                             Status
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody className="divide-y divide-gray-100">
//                         {registeredCompanies.map((c, idx) => (
//                           <tr key={idx} className="bg-white hover:bg-gray-50">
//                             <td className="px-4 py-3 text-gray-800">
//                               {c.id || "-"}
//                             </td>

//                             <td className="px-4 py-3 text-gray-800">
//                               {c.companyName || "-"}
//                             </td>

//                             <td className="px-4 py-3 text-gray-800">
//                               {c.companyEmail || "-"}
//                             </td>

//                             <td className="px-4 py-3 text-gray-800">
//                               {c.companyKey || "-"}
//                             </td>

//                             <td className="px-4 py-3 text-gray-800">
//                               {c.status || "Active"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Bottom row */}
//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* Recent activity */}
//           <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
//                 <Activity className="h-4 w-4 text-emerald-500" />
//                 Recent Activity
//               </h3>
//               <button className="text-[11px] text-[#011A8B] hover:underline">
//                 View all
//               </button>
//             </div>

//             <div className="space-y-3 text-xs text-slate-700">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="font-medium text-slate-900">
//                     New company "Truerize Tech" added
//                   </p>
//                   <p className="text-[11px] text-slate-500">
//                     Admin • 12 mins ago
//                   </p>
//                 </div>
//                 <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
//                   Company
//                 </span>
//               </div>

//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="font-medium text-slate-900">
//                     5 employees imported via CSV
//                   </p>
//                   <p className="text-[11px] text-slate-500">
//                     System • 34 mins ago
//                   </p>
//                 </div>
//                 <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
//                   Employees
//                 </span>
//               </div>

//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="font-medium text-slate-900">
//                     Role change: HR Manager → Admin
//                   </p>
//                   <p className="text-[11px] text-slate-500">
//                     You • 2 hours ago
//                   </p>
//                 </div>
//                 <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
//                   Access
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Right column: health + quick links */}
//           <div className="space-y-4">
//             {/* System health */}
//             <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
//               <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
//                 <ShieldCheck className="h-4 w-4 text-emerald-500" />
//                 System Health
//               </h3>

//               <div className="space-y-2 text-[11px] text-slate-700">
//                 <div className="flex items-center justify-between">
//                   <span>API Status</span>
//                   <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
//                     Operational
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span>Background Jobs</span>
//                   <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
//                     Running
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span>Storage Usage</span>
//                   <span className="text-slate-700">62% used</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span>Last Backup</span>
//                   <span className="text-slate-700">Today, 04:15 AM</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quick links */}
//             <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
//               <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
//                 <Server className="h-4 w-4 text-sky-600" />
//                 Quick Links
//               </h3>

//               <div className="space-y-2 text-[13px] text-slate-700">
//                 <button
//                   onClick={handleAddEmployeeClick}
//                   className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition"
//                 >
//                   <span>Add employee via form</span>
//                   <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
//                 </button>

//                 {/* View all companies – ONLY SUPER_ADMIN */}
//                 {isSuperAdmin && (
//                   <button
//                     onClick={handleCompanyManagementClick}
//                     className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition"
//                   >
//                     <span>View all companies</span>
//                     <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
//                   </button>
//                 )}

//                 <button
//                   onClick={handleAdminManagementClick}
//                   className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition"
//                 >
//                   <span>Manage admin roles</span>
//                   <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle,
  Clock,
  PlusCircle,
  Settings,
  Building2,
  Activity,
  ShieldCheck,
  Server,
  ArrowRightCircle,
  Layers,
} from "lucide-react";

// -------- API BASE URL (local + real-time ready) --------
const getApiBaseUrl = () => {
  const fromEnv =
    import.meta.env?.VITE_API_BASE_URL &&
    import.meta.env.VITE_API_BASE_URL.trim();

  if (fromEnv) return fromEnv;

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:8080";
  }

  // same-domain backend (reverse proxy) in production
  return "";
};

const API_BASE_URL = getApiBaseUrl();

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  // ------- ROLE (JUST FOR DISPLAY) -------
  const [userRole, setUserRole] = useState(null);

  // -------------------- SERVICES STATE --------------------
  const [showServicesPanel, setShowServicesPanel] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState(null);

  const [demoRequests, setDemoRequests] = useState([]);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState("");

  const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companiesError, setCompaniesError] = useState("");

  // -------------------- FETCH HELPERS --------------------
  const fetchDemoRequests = async () => {
    try {
      setDemoLoading(true);
      setDemoError("");

      const endpoint = API_BASE_URL
        ? `${API_BASE_URL.replace(/\/+$/, "")}/api/company/companies`
        : "/api/company/companies";

      const token = localStorage.getItem("token");

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to load demo requests (status ${res.status})`
        );
      }

      const data = await res.json();

      const list =
        (Array.isArray(data) && data) ||
        (Array.isArray(data.data) && data.data) ||
        (Array.isArray(data.content) && data.content) ||
        [];

      setDemoRequests(list);
    } catch (err) {
      console.error("Demo requests fetch error:", err);
      setDemoError(err.message || "Failed to load demo requests");
    } finally {
      setDemoLoading(false);
    }
  };

  const fetchRegisteredCompanies = async () => {
    try {
      setCompaniesLoading(true);
      setCompaniesError("");

      const endpoint = API_BASE_URL
        ? `${API_BASE_URL.replace(/\/+$/, "")}/api/company/register/companies`
        : "/api/company/register/companies";

      const token = localStorage.getItem("token");

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to load registered companies (status ${res.status})`
        );
      }
      const data = await res.json();

      const list =
        (Array.isArray(data) && data) ||
        (Array.isArray(data.data) && data.data) ||
        (Array.isArray(data.content) && data.content) ||
        [];

      setRegisteredCompanies(list);
    } catch (err) {
      console.error("Registered companies fetch error:", err);
      setCompaniesError(err.message || "Failed to load registered companies");
    } finally {
      setCompaniesLoading(false);
    }
  };

  // -------------------- EFFECT: ROLE + INITIAL DATA --------------------
  useEffect(() => {
    try {
      const stored =
        (localStorage.getItem("role") || localStorage.getItem("position") || "")
          .trim()
          .toUpperCase();
      setUserRole(stored || null);
    } catch (err) {
      console.error("Error reading role from storage:", err);
    }

    // load registered companies so stat cards show real data
    fetchRegisteredCompanies();
  }, []);

  // -------------------- NAV HANDLERS --------------------
  const handleAddEmployeeClick = () => navigate("/admin/add-employee");
  const handleAdminManagementClick = () => navigate("/admin/management");
  const handleCompanyManagementClick = () => navigate("/admin/company");

  // -------------------- SERVICES HANDLERS --------------------
  const handleServicesClick = () => {
    setShowServicesPanel(true);

    if (!activeServiceTab) {
      setActiveServiceTab("demo");
      fetchDemoRequests();
    }
  };

  const handleDemoTabClick = () => {
    setActiveServiceTab("demo");
    if (!demoRequests.length && !demoLoading) {
      fetchDemoRequests();
    }
  };

  const handleCompaniesTabClick = () => {
    setActiveServiceTab("companies");
    if (!registeredCompanies.length && !companiesLoading) {
      fetchRegisteredCompanies();
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-4 bg-[#F9FAFF]">
      {/* HEADER */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 shadow-sm"
        style={{ backgroundColor: "#00008B" }}
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Super Admin Dashboard
          </h1>
          <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
            Get a quick overview of companies and access key super admin
            actions from a single place.
          </p>
        </div>

        <div className="flex gap-4 text-xs md:text-sm text-blue-100">
          <div className="flex flex-col items-end">
            {userRole && (
              <span className="px-2 py-1 rounded-full bg-blue-900/60 text-[11px] border border-blue-300/40">
                Logged in as: {userRole}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Total Companies */}
          <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Companies
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {registeredCompanies.length || 0}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Across all regions
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <Users className="h-6 w-6 text-[#011A8B]" />
            </div>
          </div>

          {/* Active Companies */}
          <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Active Companies
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {registeredCompanies.length
                  ? registeredCompanies.filter(
                      (c) => (c.status || "").toLowerCase() === "active"
                    ).length
                  : 0}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Billing & users active
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>

          {/* Pending Approval (placeholder) */}
          <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Pending Approval
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-500">0</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Company requests in queue
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Add New Employee */}
          <button
            type="button"
            onClick={handleAddEmployeeClick}
            className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 group-hover:bg-emerald-100">
              <PlusCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Add New Employee
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Create a new employee profile with basic details.
              </p>
            </div>
          </button>

          {/* Admin Management */}
          <button
            type="button"
            onClick={handleAdminManagementClick}
            className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 group-hover:bg-pink-100">
              <Settings className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Admin Management
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Configure admin accounts, roles and access levels.
              </p>
            </div>
          </button>

          {/* Company Management – ALWAYS VISIBLE */}
          <button
            type="button"
            onClick={handleCompanyManagementClick}
            className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 group-hover:bg-sky-100">
              <Building2 className="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Company Management
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Manage company profiles, branches and core details.
              </p>
            </div>
          </button>

          {/* Services – ALWAYS VISIBLE */}
          <button
            type="button"
            onClick={handleServicesClick}
            className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left shadow-sm hover:shadow-md hover:border-[#011A8B]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 group-hover:bg-indigo-100">
              <Layers className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Services
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                View demo requests and registered companies.
              </p>
            </div>
          </button>
        </div>

        {/* SERVICES PANEL – ALWAYS AVAILABLE */}
        {showServicesPanel && (
          <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Services
              </h3>

              {/* Tabs */}
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-xs">
                <button
                  type="button"
                  onClick={handleDemoTabClick}
                  className={`px-3 py-1.5 rounded-full transition ${
                    activeServiceTab === "demo"
                      ? "bg-white text-[#011A8B] shadow-sm border border-slate-200"
                      : "text-slate-600"
                  }`}
                >
                  Demo Requests
                </button>
                <button
                  type="button"
                  onClick={handleCompaniesTabClick}
                  className={`px-3 py-1.5 rounded-full transition ${
                    activeServiceTab === "companies"
                      ? "bg-white text-[#011A8B] shadow-sm border border-slate-200"
                      : "text-slate-600"
                  }`}
                >
                  Registered Companies
                </button>
              </div>
            </div>

            {/* DEMO REQUESTS TABLE */}
            {activeServiceTab === "demo" && (
              <div className="mt-2">
                {demoLoading ? (
                  <p className="text-xs text-slate-500">
                    Loading demo requests...
                  </p>
                ) : demoError ? (
                  <p className="text-xs text-red-500">{demoError}</p>
                ) : demoRequests.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No demo requests found.
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#F9FAFF]">
                    <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
                      <thead className="bg-[#EEF0FF]">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Full Name
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Company Email
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Phone Number
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Company Name
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Designation
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {demoRequests.map((req, idx) => (
                          <tr key={idx} className="bg-white hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">
                              {req.fullName || req.name || "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {req.companyEmail ||
                                req.workEmail ||
                                req.email ||
                                "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {req.phoneNumber || req.phone || "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {req.companyName || "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {req.designation ||
                                req.role ||
                                req.yourRole ||
                                "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* REGISTERED COMPANIES TABLE */}
            {activeServiceTab === "companies" && (
              <div className="mt-2">
                {companiesLoading ? (
                  <p className="text-xs text-slate-500">
                    Loading registered companies...
                  </p>
                ) : companiesError ? (
                  <p className="text-xs text-red-500">{companiesError}</p>
                ) : registeredCompanies.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No registered companies found.
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#F9FAFF]">
                    <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
                      <thead className="bg-[#EEF0FF]">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            ID
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Company Name
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Company Email
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Company Key
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {registeredCompanies.map((c, idx) => (
                          <tr key={idx} className="bg-white hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">
                              {c.id || "-"}
                            </td>

                            <td className="px-4 py-3 text-gray-800">
                              {c.companyName || "-"}
                            </td>

                            <td className="px-4 py-3 text-gray-800">
                              {c.companyEmail || "-"}
                            </td>

                            <td className="px-4 py-3 text-gray-800">
                              {c.companyKey || "-"}
                            </td>

                            <td className="px-4 py-3 text-gray-800">
                              {c.status || "Active"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent activity */}
          <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                Recent Activity
              </h3>
              <button className="text-[11px] text-[#011A8B] hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    New company "Truerize Tech" added
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Admin • 12 mins ago
                  </p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Company
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    5 employees imported via CSV
                  </p>
                  <p className="text-[11px] text-slate-500">
                    System • 34 mins ago
                  </p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                  Employees
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    Role change: HR Manager → Admin
                  </p>
                  <p className="text-[11px] text-slate-500">
                    You • 2 hours ago
                  </p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                  Access
                </span>
              </div>
            </div>
          </div>

          {/* Right column: health + quick links */}
          <div className="space-y-4">
            {/* System health */}
            <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                System Health
              </h3>

              <div className="space-y-2 text-[11px] text-slate-700">
                <div className="flex items-center justify-between">
                  <span>API Status</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Background Jobs</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Running
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Storage Usage</span>
                  <span className="text-slate-700">62% used</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Backup</span>
                  <span className="text-slate-700">Today, 04:15 AM</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
                <Server className="h-4 w-4 text-sky-600" />
                Quick Links
              </h3>

              <div className="space-y-2 text-[13px] text-slate-700">
                <button
                  onClick={handleAddEmployeeClick}
                  className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition"
                >
                  <span>Add employee via form</span>
                  <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
                </button>

                {/* View all companies – ALWAYS VISIBLE */}
                <button
                  onClick={handleCompanyManagementClick}
                  className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition"
                >
                  <span>View all companies</span>
                  <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
                </button>

                <button
                  onClick={handleAdminManagementClick}
                  className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition"
                >
                  <span>Manage admin roles</span>
                  <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

