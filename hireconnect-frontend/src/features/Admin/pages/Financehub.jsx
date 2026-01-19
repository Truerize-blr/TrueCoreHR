import React, { useState } from "react";
import {
  Plus,
  RefreshCw,
  ClipboardList,
  BarChart3,
  IndianRupee,
  FileText,
  Receipt,
  Banknote,
  Shield,
  ScrollText,
  Settings,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FinanceOverview from "./FinanceOverview";
import PayrollManagement from "./PayrollManagement";
import ManualEntry from "./ManualEntry";

const FinanceHub = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("hub");
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "manual-payroll",
      title: "Manual Payroll",
      description: "Select employee → Input details → Save",
      icon: <Plus size={18} />,
    },
    {
      id: "auto-generate",
      title: "Auto Generate",
      description: "Auto-calculates payroll using attendance",
      icon: <RefreshCw size={18} />,
    },
    {
      id: "tax-review",
      title: "Tax Review",
      description: "View pending declarations",
      icon: <ClipboardList size={18} />,
    },
    {
      id: "reimbursements-quick",
      title: "Reimbursements",
      description: "View pending claims",
      icon: <IndianRupee size={18} />, // ₹ replaced here
    },
  ];

  const featureCards = [
    {
      id: "overview",
      title: "Overview",
      description: "Stats, graphs, employee count, payroll trends",
      icon: <BarChart3 size={28} />,
    },
    {
      id: "payroll-management",
      title: "Payroll Management",
      description: "Manual + Auto payroll generation",
      icon: <IndianRupee size={28} />,
    },
    {
      id: "payslip-management",
      title: "Payslip Management",
      description: "Generate & download payslips",
      icon: <FileText size={28} />,
    },
    {
      id: "tax-management",
      title: "Tax Management",
      description: "Review & approve declarations",
      icon: <Receipt size={28} />,
    },
    {
      id: "reimbursements",
      title: "Reimbursements",
      description: "Approve / reject reimbursement claims",
      icon: <Banknote size={28} />,
    },
    {
      id: "compliance",
      title: "Compliance",
      description: "PF, TDS, PT monthly reports",
      icon: <Shield size={28} />,
    },
    {
      id: "audit-logs",
      title: "Audit & Logs",
      description: "Track payroll actions",
      icon: <ScrollText size={28} />,
    },
    {
      id: "settings",
      title: "Settings",
      description: "Templates & pay cycle settings",
      icon: <Settings size={28} />,
    },
    {
      id: "manual-entry",
      title: "Manual Entry",
      description: "Individual salary entry system",
      icon: <TrendingUp size={28} />,
    },
  ];

  const handleFeatureClick = (id) => {
    if (id === "overview") navigate("/admin/financeoverview");
    else if (id === "payroll-management") navigate("/admin/payrollmanagement");
    else if (id === "manual-entry") navigate("/admin/manualentry");
    else console.log("Feature clicked:", id);
  };

  if (currentView === "overview")
    return <FinanceOverview onBack={() => setCurrentView("hub")} />;
  if (currentView === "payroll-management")
    return <PayrollManagement onBack={() => setCurrentView("hub")} />;
  if (currentView === "manual-entry")
    return <ManualEntry onBack={() => setCurrentView("hub")} />;

  return (
    <div className="min-h-screen px-4 md:px-6 py-4">
      {/* Header */}
      <div className="rounded-2xl bg-blue-900 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Finance Hub
          </h1>
          <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
            Central place to manage payroll, taxes, and compliance.
          </p>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white text-blue-900 border border-blue-900 text-sm font-medium
                       hover:bg-blue-50 shadow-sm"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-900 mb-3">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 px-4 py-3
                         shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-100 text-blue-900">
                {action.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-900 mb-3">
          Finance Modules
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleFeatureClick(card.id)}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-gray-200
                         p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-semibold mb-1 text-blue-900 group-hover:underline">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    {card.description}
                  </p>
                </div>
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-blue-100 text-blue-900
                                group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <span className="text-xs font-semibold px-3 py-1 rounded-full
                                 bg-blue-100 text-blue-600 border border-blue-600">
                  Manage
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FinanceHub;
