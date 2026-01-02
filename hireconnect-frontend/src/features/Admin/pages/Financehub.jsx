// import React from "react";
// import {
//   Plus,
//   RefreshCw,
//   ClipboardList,
//   DollarSign,
//   BarChart3,
//   IndianRupee,
//   FileText,
//   Receipt,
//   Banknote,
//   Shield,
//   ScrollText,
//   Settings,
//   TrendingUp,
//   ArrowLeft,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const primaryBlue = "#00008B";

// const FinanceHub = ({ onBack }) => {
//   const navigate = useNavigate();

//   const quickActions = [
//     {
//       id: "manual-payroll",
//       title: "Manual Payroll",
//       description: "Select employee → Input details → Save",
//       icon: <Plus size={18} />,
//     },
//     {
//       id: "auto-generate",
//       title: "Auto Generate",
//       description: "Auto-calculates payroll using attendance",
//       icon: <RefreshCw size={18} />,
//     },
//     {
//       id: "tax-review",
//       title: "Tax Review",
//       description: "View pending declarations",
//       icon: <ClipboardList size={18} />,
//     },
//     {
//       id: "reimbursements-quick",
//       title: "Reimbursements",
//       description: "View pending claims",
//       icon: <DollarSign size={18} />,
//     },
//   ];

//   const featureCards = [
//     {
//       id: "overview",
//       title: "Overview",
//       description: "Stats, graphs, employee count, payroll trends",
//       icon: <BarChart3 size={28} />,
//     },
//     {
//       id: "payroll-management",
//       title: "Payroll Management",
//       description: "Manual + Auto payroll generation",
//       icon: <IndianRupee size={28} />,
//     },
//     {
//       id: "payslip-management",
//       title: "Payslip Management",
//       description: "Generate & download payslips",
//       icon: <FileText size={28} />,
//     },
//     {
//       id: "tax-management",
//       title: "Tax Management",
//       description: "Review & approve declarations",
//       icon: <Receipt size={28} />,
//     },
//     {
//       id: "reimbursements",
//       title: "Reimbursements",
//       description: "Approve / reject reimbursement claims",
//       icon: <Banknote size={28} />,
//     },
//     {
//       id: "compliance",
//       title: "Compliance",
//       description: "PF, TDS, PT monthly reports",
//       icon: <Shield size={28} />,
//     },
//     {
//       id: "audit-logs",
//       title: "Audit & Logs",
//       description: "Track payroll actions",
//       icon: <ScrollText size={28} />,
//     },
//     {
//       id: "settings",
//       title: "Settings",
//       description: "Templates & pay cycle settings",
//       icon: <Settings size={28} />,
//     },
//     {
//       id: "manual-entry",
//       title: "Manual Entry",
//       description: "Individual salary entry system",
//       icon: <TrendingUp size={28} />,
//     },
//   ];

//   const handleFeatureClick = (id) => {
//     if (id === "overview") {
//       navigate("/admin/financeoverview");
//     } else if (id === "payroll-management") {
//       navigate("/admin/payrollmanagement");
//     } else if (id === "manual-entry") {
//       navigate("/admin/manualentry");
//     } else {
//       // Placeholder for other modules you’ll wire later
//       console.log("Feature clicked:", id);
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 md:px-6 py-4">
//       {/* Header */}
//       <div
//         className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"
//         style={{ backgroundColor: primaryBlue }}
//       >
//         <div>
//           <h1 className="text-xl md:text-2xl font-bold text-white">
//             Finance Hub
//           </h1>

//           <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
//             Central place to manage payroll, taxes, and compliance.
//           </p>
//         </div>

//         {onBack && (
//           <button
//             onClick={onBack}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
//                        bg-white hover:bg-gray-50 shadow-sm"
//             style={{ borderColor: primaryBlue, color: primaryBlue }}
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <section className="mb-8">
//         <div className="flex items-center justify-between mb-3">
//           <h2
//             className="text-sm font-semibold uppercase tracking-wide"
//             style={{ color: primaryBlue }}
//           >
//             Quick Actions
//           </h2>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//           {quickActions.map((action) => (
//             <button
//               key={action.id}
//               type="button"
//               className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 px-4 py-3
//                          shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
//               // you can add onClick here when you decide routes for quick actions
//             >
//               <div
//                 className="flex items-center justify-center h-10 w-10 rounded-xl"
//                 style={{ backgroundColor: "#e6ecff", color: primaryBlue }}
//               >
//                 {action.icon}
//               </div>
//               <div>
//                 <h3
//                   className="text-sm font-semibold"
//                   style={{ color: primaryBlue }}
//                 >
//                   {action.title}
//                 </h3>
//                 <p className="text-xs text-gray-500">{action.description}</p>
//               </div>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Feature Grid */}
//       <section>
//         <div className="flex items-center justify-between mb-3">
//           <h2
//             className="text-sm font-semibold uppercase tracking-wide"
//             style={{ color: primaryBlue }}
//           >
//             Finance Modules
//           </h2>
//         </div>

//         <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//           {featureCards.map((card) => (
//             <button
//               key={card.id}
//               type="button"
//               onClick={() => handleFeatureClick(card.id)}
//               className="group relative flex flex-col justify-between rounded-2xl bg-white border border-gray-200
//                          p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
//             >
//               <div className="flex items-start justify-between gap-3 mb-4">
//                 <div>
//                   <h3
//                     className="text-base font-semibold mb-1 group-hover:underline"
//                     style={{ color: primaryBlue }}
//                   >
//                     {card.title}
//                   </h3>
//                   <p className="text-xs text-gray-500 max-w-xs">
//                     {card.description}
//                   </p>
//                 </div>
//                 <div
//                   className="flex items-center justify-center h-11 w-11 rounded-xl group-hover:scale-105 transition-transform"
//                   style={{ backgroundColor: "#e6ecff", color: primaryBlue }}
//                 >
//                   {card.icon}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between mt-2">
//                 <span className="text-xs font-medium text-gray-400">
//                   Click to open
//                 </span>
//                 <span
//                   className="text-xs font-semibold px-3 py-1 rounded-full bg-opacity-10 border"
//                   style={{
//                     backgroundColor: "rgba(0,0,139,0.04)",
//                     color: primaryBlue,
//                     borderColor: primaryBlue,
//                   }}
//                 >
//                   Manage
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FinanceHub;




import React, { useState } from "react";
import {
  Plus,
  RefreshCw,
  ClipboardList,
  DollarSign,
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

import FinanceOverview from "./FinanceOverview";
import PayrollManagement from "./PayrollManagement";
import ManualEntry from "./ManualEntry";
import { useNavigate } from "react-router-dom";

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
      icon: <DollarSign size={18} />,
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
    if (id === "overview") {
      navigate("/admin/financeoverview");
    } else if (id === "payroll-management") {
      navigate("/admin/payrollmanagement");
    } else if (id === "manual-entry") {
      navigate("/admin/manualentry");
    } else {
      console.log("Feature clicked:", id);
    }
  };

  const handleBackToHub = () => {
    setCurrentView("hub");
  };

  // Keep these in case you still use local views anywhere
  if (currentView === "overview") {
    return <FinanceOverview onBack={handleBackToHub} />;
  }
  if (currentView === "payroll-management") {
    return <PayrollManagement onBack={handleBackToHub} />;
  }
  if (currentView === "manual-entry") {
    return <ManualEntry onBack={handleBackToHub} />;
  }

  const primaryBlue = "#00008B";

  return (
    <div className="min-h-screen px-4 md:px-6 py-4">
      {/* Header */}
    <div
        className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"
        style={{ backgroundColor: primaryBlue }}
      >
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                       bg-white hover:bg-gray-50 shadow-sm"
            style={{ borderColor: primaryBlue, color: primaryBlue }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: primaryBlue }}
          >
            Quick Actions
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 px-4 py-3
                         shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
            >
              <div
                className="flex items-center justify-center h-10 w-10 rounded-xl"
                style={{ backgroundColor: "#e6ecff", color: primaryBlue }}
              >
                {action.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: primaryBlue }}>
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
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: primaryBlue }}
          >
            Finance Modules
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleFeatureClick(card.id)}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-gray-200
                         p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3
                    className="text-base font-semibold mb-1 group-hover:underline"
                    style={{ color: primaryBlue }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    {card.description}
                  </p>
                </div>
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-xl group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: "#e6ecff", color: primaryBlue }}
                >
                  {card.icon}
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium text-gray-400">
                  Click to open
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-opacity-10"
                  style={{
                    backgroundColor: primaryBlue,
                    color: primaryBlue,
                    borderColor: primaryBlue,
                  }}
                >
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