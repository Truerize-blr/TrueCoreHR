import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  IndianRupee,
  Calendar,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bell,
  BarChart,
  Laptop,
} from "lucide-react";

/* ICON MAP */
const iconMap = {
  grid: LayoutGrid,
  users: Users,
  rupee: IndianRupee,
  calendar: Calendar,
  file: FileText,
  help: HelpCircle,
  bell: Bell,
  barChart: BarChart,
  laptop: Laptop,
};

/* MENU ITEMS */
const MENU_ITEMS = [
  { id: "home", label: "Admin Home", icon: "grid", path: "/admin", exact: true },
  { id: "employees", label: "Manage Employees", icon: "users", path: "/admin/employees" },
  { id: "performanceDashboard", label: "Performance Dashboard", icon: "barChart", path: "/admin/performanceDashboard" },
  { id: "finance", label: "Finance Hub", icon: "rupee", path: "/admin/finance" },
  { id: "attendance", label: "Attendance", icon: "calendar", path: "/admin/attendance" },
  { id: "documents", label: "Documents", icon: "file", path: "/admin/documents" },
  { id: "support", label: "Support", icon: "help", path: "/admin/support" },
  { id: "notifications", label: "Notifications", icon: "bell", path: "/admin/notifications" },
  { id: "assets", label: "Assets", icon: "laptop", path: "/admin/assets" },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item) => {
    const p = pathname.toLowerCase();
    const base = item.path.toLowerCase();

    if (item.id === "home") {
      return p === "/admin" || p.includes("/admin/dashboard");
    }
    return item.exact ? p === base : p.startsWith(base);
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-white shadow-md flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center px-4 py-4">
        <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-2"}`}>
          <img
            src="/assets/HRMS_Logo_bg.png"
            alt="Logo"
            className="h-14 w-14 object-contain"
          />

          {!collapsed && (
            <span className="text-[25px] font-black leading-none text-[#001A7D]">
              TrueCore<span className="text-[#3B82F6]">HR</span>
            </span>
          )}
        </div>
      </div>

      {/* COLLAPSE BUTTON */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute top-[70%] -right-3 bg-[#011A8B] text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto mt-3 px-2">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            const active = isActive(item);

            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    active
                      ? "bg-[#011A8B] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#EEF2FF] hover:text-[#011A8B]"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
