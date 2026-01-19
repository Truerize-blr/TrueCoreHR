// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// // /* HomePage */
// // import HomePage from "../features/Home/pages/HomePage.jsx";
// // import RecruitmentPage from "../features/Home/pages/Recruitment.jsx";
// // import PayrollPage from "../features/Home/pages/Payroll.jsx";
// // import AttendancePage from "../features/Home/pages/Attendance.jsx";
// // import PerformancePage from "../features/Home/pages/Performance.jsx";
// // import BookDemo from "../features/Home/pages/BookDemo.jsx";

// // /* Login */
// // import LoginPage from "../LoginPage.jsx";

// // /* Admin Layout */
// // import AdminLayout from "../features/Admin/Layouts/AdminLayout.jsx";

// // /* Super Admin Layout */
// // import SuperAdminLayout from "../features/Super_Admin/Layout/SuperAdminLayout.jsx";



// // /*Super Admin Pages */
// // import SuperAdminDashboard from "../features/Super_Admin/pages/SuperAdminDashboard.jsx";


// // /* Admin Pages */
// // import AdminDashboard from "../features/Admin/pages/AdminDashboard.jsx";
// // import AdminManagement from "../features/Admin/pages/AdminManagement.jsx";
// // import CompanyManagement from "../features/Admin/pages/CompanyManagement.jsx";
// // import AddEmployee from "../features/Admin/pages/AddEmployee.jsx";
// // import ManageEmployees from "../features/Admin/pages/ManageEmployees.jsx";
// // import Financehub from "../features/Admin/pages/Financehub.jsx";
// // import FinanceOverview from "../features/Admin/pages/FinanceOverview.jsx";
// // import LeaveManagement from "../features/Admin/pages/LeaveManagement.jsx";
// // import ManualEntry from "../features/Admin/pages/ManualEntry.jsx";
// // import PayrollManagement from "../features/Admin/pages/PayrollManagement.jsx";
// // import Support from "../features/Admin/pages/Support.jsx";
// // import Attendance from "../features/Admin/pages/Attendance.jsx";
// // import AdminDocuments from "../features/Admin/pages/Documents.jsx";

// // /* Employee Layout */
// // import EmployeeLayout from "../features/Employee/Layouts/EmployeeLayout.jsx";

// // /* Employee Pages */
// // import EmployeeDashboard from "../features/Employee/pages/EmployeeDashboard.jsx";
// // import EmpAttendance from "../features/Employee/pages/Attendance.jsx";
// // import FinancehubEmp from "../features/Employee/pages/Financehub.jsx";
// // import Payslip from "../features/Employee/pages/Payslip.jsx";
// // import Policy from "../features/Employee/pages/Policy.jsx";
// // import Reimbursements from "../features/Employee/pages/Reimbursements.jsx";
// // import SupportEmp from "../features/Employee/pages/Support.jsx";
// // import TaxDeclaration from "../features/Employee/pages/TaxDeclaration.jsx";
// // import Notifications from "../features/Employee/pages/Notifications.jsx";
// // import EmpDocuments from "../features/Employee/pages/Documents.jsx";

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Website */}
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/solutions/recruitment" element={<RecruitmentPage />} />
// //         <Route path="/solutions/payroll" element={<PayrollPage />} />
// //         <Route path="/solutions/attendance" element={<AttendancePage />} />
// //         <Route path="/solutions/performance" element={<PerformancePage />} />
// //         <Route path="/solutions/bookdemo" element={<BookDemo />} />

// //         {/* Login */}
// //         <Route path="/login" element={<LoginPage />} />


// //         {/* Super Admin Layout */}
// //         <Route path="/Super_Admin" element={<SuperAdminLayout />}>
// //         {/* When user opens /admin → redirect to /admin/dashboard */}
// //         <Route index element={<Navigate to="dashboard" replace />} />



// //           {/* Super Admin routes */}
// //           <Route path="/dashboard" element={<SuperAdminDashboard />} />


// //           {/* Admin routes */}
// //           <Route path="dashboard" element={<AdminDashboard />} />
// //           <Route path="management" element={<AdminManagement />} />
// //           <Route path="company" element={<CompanyManagement />} />
// //           <Route path="add-employee" element={<AddEmployee />} />
// //           <Route path="employees" element={<ManageEmployees />} />
// //           <Route path="finance" element={<Financehub />} />
// //           <Route path="finance-overview" element={<FinanceOverview />} />
// //           <Route path="leave-management" element={<LeaveManagement />} />
// //           <Route path="manualentry" element={<ManualEntry />} />
// //           <Route path="payroll-management" element={<PayrollManagement />} />
// //           <Route path="support" element={<Support />} />
// //           <Route path="attendance" element={<Attendance />} />
// //           <Route path="documents" element={<AdminDocuments />} />
// //         </Route>

// //         {/* Employee Layout */}
// //     <Route path="/employee" element={<EmployeeLayout />}>
// //   {/* When user opens /employee → redirect to /employee/dashboard */}
// //   <Route index element={<Navigate to="dashboard" replace />} />


// //           {/* Employee routes */}
// //           <Route path="dashboard" element={<EmployeeDashboard />} />
// //           <Route path="attendance" element={<EmpAttendance />} />
// //           <Route path="finance" element={<FinancehubEmp />} />
// //           <Route path="payslip" element={<Payslip />} />
// //           <Route path="policy" element={<Policy />} />
// //           <Route path="reimbursements" element={<Reimbursements />} />
// //           <Route path="support" element={<SupportEmp />} />
// //           <Route path="tax-declaration" element={<TaxDeclaration />} />
// //           <Route path="notifications" element={<Notifications/>} />
// //           <Route path="documents" element={<EmpDocuments/>} />
// //         </Route>
// //       </Routes>
// //     </Router>
// //   );
// // }

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* HomePage */
// import HomePage from "../features/Home/pages/HomePage.jsx";
// import RecruitmentPage from "../features/Home/pages/Recruitment.jsx";
// import PayrollPage from "../features/Home/pages/Payroll.jsx";
// import AttendancePage from "../features/Home/pages/Attendance.jsx";
// import PerformancePage from "../features/Home/pages/Performance.jsx";
// import BookDemo from "../features/Home/pages/BookDemo.jsx";


// /* Login */
// import LoginPage from "../LoginPage.jsx";

// /* Admin Layout */
// import AdminLayout from "../features/Admin/Layouts/AdminLayout.jsx";

// /* Super Admin Layout */
// import SuperAdminLayout from "../features/Super_Admin/Layout/SuperAdminLayout.jsx";

// /* Super Admin Pages */
// import SuperAdminDashboard from "../features/Super_Admin/pages/SuperAdminDashboard.jsx";

// /* Admin Pages */
// import AdminDashboard from "../features/Admin/pages/AdminDashboard.jsx";
// import AdminManagement from "../features/Admin/pages/AdminManagement.jsx";
// import CompanyManagement from "../features/Admin/pages/CompanyManagement.jsx";
// import AddEmployee from "../features/Admin/pages/AddEmployee.jsx";
// import ManageEmployees from "../features/Admin/pages/ManageEmployees.jsx";
// import Financehub from "../features/Admin/pages/Financehub.jsx";
// import FinanceOverview from "../features/Admin/pages/FinanceOverview.jsx";
// import LeaveManagement from "../features/Admin/pages/LeaveManagement.jsx";
// import ManualEntry from "../features/Admin/pages/ManualEntry.jsx";
// import PayrollManagement from "../features/Admin/pages/PayrollManagement.jsx";
// import Support from "../features/Admin/pages/Support.jsx";
// import Attendance from "../features/Admin/pages/Attendance.jsx";
// import AdminDocuments from "../features/Admin/pages/Documents.jsx";
// import HierarchyTree from "../features/Admin/pages/HierarchyTree.jsx";
// import Assets from "../features/Admin/pages/Assets.jsx"



// /* Employee Layout */
// import EmployeeLayout from "../features/Employee/Layouts/EmployeeLayout.jsx";

// /* Employee Pages */
// import EmployeeDashboard from "../features/Employee/pages/EmployeeDashboard.jsx";
// import EmpAttendance from "../features/Employee/pages/Attendance.jsx";
// import FinancehubEmp from "../features/Employee/pages/Financehub.jsx";
// import Payslip from "../features/Employee/pages/Payslip.jsx";
// import Policy from "../features/Employee/pages/Policy.jsx";
// import Reimbursements from "../features/Employee/pages/Reimbursements.jsx";
// import SupportEmp from "../features/Employee/pages/Support.jsx";
// import TaxDeclaration from "../features/Employee/pages/TaxDeclaration.jsx";
// import Notifications from "../features/Employee/pages/Notifications.jsx";
// import EmpDocuments from "../features/Employee/pages/Documents.jsx";
// import EmployeeLeaveManagement from "../features/Employee/pages/EmployeeLeaveManagement.jsx";
// import AdminNotifications from "../features/Admin/pages/Noifications.jsx";
// import PerformanceDashboard from "../features/Admin/pages/PerformanceDashboard.jsx";  // ADD THIS
// import EmployeeAssets from "../features/Employee/pages/EmployeeAssets.jsx";


// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Website */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/solutions/recruitment" element={<RecruitmentPage />} />
//         <Route path="/solutions/payroll" element={<PayrollPage />} />
//         <Route path="/solutions/attendance" element={<AttendancePage />} />
//         <Route path="/solutions/performance" element={<PerformancePage />} />
//         <Route path="/solutions/bookdemo" element={<BookDemo />} />

//         {/* Login */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Super Admin Layout (use a distinct base path) */}
//         <Route path="/super-admin" element={<SuperAdminLayout />}>
//           <Route index element={<Navigate to="dashboard" replace />} />
//           {/* nested routes must be relative (no leading slash) */}
//           <Route path="dashboard" element={<SuperAdminDashboard />} />
//           {/* add more super-admin routes here if needed */}
//         </Route>

//         {/* Admin Layout */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="dashboard" replace />} />

//           {/* Admin routes (relative paths) */}
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="management" element={<AdminManagement />} />
//           <Route path="company" element={<CompanyManagement />} />
//           <Route path="add-employee" element={<AddEmployee />} />
//           <Route path="employees" element={<ManageEmployees />} />
//           <Route path="finance" element={<Financehub />} />
//           <Route path="finance-overview" element={<FinanceOverview />} />
//           <Route path="leave-management" element={<LeaveManagement />} />
//           <Route path="manualentry" element={<ManualEntry />} />
//           <Route path="payroll-management" element={<PayrollManagement />} />
//           <Route path="support" element={<Support />} />
//           <Route path="attendance" element={<Attendance />} />
//           <Route path="documents" element={<AdminDocuments />} />
//           <Route path="notifications" element={<AdminNotifications />} />
//           <Route path="performance" element={<PerformanceDashboard />} />
//           <Route path="Assets" element={<Assets />} />
//           <Route path="hierarchy" element={<HierarchyTree />} />
//         </Route>

//         {/* Employee Layout */}
//         <Route path="/employee" element={<EmployeeLayout />}>
//           <Route index element={<Navigate to="dashboard" replace />} />
//           <Route path="dashboard" element={<EmployeeDashboard />} />
//           <Route path="attendance" element={<EmpAttendance />} />
//           <Route path="finance" element={<FinancehubEmp />} />
//           <Route path="payslip" element={<Payslip />} />
//           <Route path="policy" element={<Policy />} />
//           <Route path="reimbursements" element={<Reimbursements />} />
//           <Route path="support" element={<SupportEmp />} />
//           <Route path="tax-declaration" element={<TaxDeclaration />} />
//           <Route path="notifications" element={<Notifications />} />
//           <Route path="documents" element={<EmpDocuments />} />
//           <Route path="leaves" element={<EmployeeLeaveManagement />} />
//           <Route path="assets" element={<EmployeeAssets />} />

          
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===================== PUBLIC PAGES ===================== */
import HomePage from "../features/Home/pages/HomePage.jsx";
import RecruitmentPage from "../features/Home/pages/Recruitment.jsx";
import PayrollPage from "../features/Home/pages/Payroll.jsx";
import AttendancePage from "../features/Home/pages/Attendance.jsx";
import PerformancePage from "../features/Home/pages/Performance.jsx";
import BookDemo from "../features/Home/pages/BookDemo.jsx";
import LoginPage from "../LoginPage.jsx";

/* ===================== LAYOUTS ===================== */
import SuperAdminLayout from "../features/Super_Admin/Layout/SuperAdminLayout.jsx";
import AdminLayout from "../features/Admin/Layouts/AdminLayout.jsx";
import EmployeeLayout from "../features/Employee/Layouts/EmployeeLayout.jsx";

/* ===================== SUPER ADMIN ===================== */
import SuperAdminDashboard from "../features/Super_Admin/pages/SuperAdminDashboard.jsx";

/* ===================== ADMIN PAGES ===================== */
import AdminDashboard from "../features/Admin/pages/AdminDashboard.jsx";
import AdminManagement from "../features/Admin/pages/AdminManagement.jsx";
import CompanyManagement from "../features/Admin/pages/CompanyManagement.jsx";
import AddEmployee from "../features/Admin/pages/AddEmployee.jsx";
import ManageEmployees from "../features/Admin/pages/ManageEmployees.jsx";
import Financehub from "../features/Admin/pages/Financehub.jsx";
import FinanceOverview from "../features/Admin/pages/FinanceOverview.jsx";
import LeaveManagement from "../features/Admin/pages/LeaveManagement.jsx";
import ManualEntry from "../features/Admin/pages/ManualEntry.jsx";
import PayrollManagement from "../features/Admin/pages/PayrollManagement.jsx";
import Attendance from "../features/Admin/pages/Attendance.jsx";
import Support from "../features/Admin/pages/Support.jsx";
import AdminDocuments from "../features/Admin/pages/Documents.jsx";
import AdminNotifications from "../features/Admin/pages/Noifications.jsx";
import PerformanceDashboard from "../features/Admin/pages/PerformanceDashboard.jsx";
import Assets from "../features/Admin/pages/Assets.jsx";
import HierarchyTree from "../features/Admin/pages/HierarchyTree.jsx";

/* ===================== EMPLOYEE PAGES ===================== */
import EmployeeDashboard from "../features/Employee/pages/EmployeeDashboard.jsx";
import EmpAttendance from "../features/Employee/pages/Attendance.jsx";
import FinancehubEmp from "../features/Employee/pages/Financehub.jsx";
import Payslip from "../features/Employee/pages/Payslip.jsx";
import Policy from "../features/Employee/pages/Policy.jsx";
import Reimbursements from "../features/Employee/pages/Reimbursements.jsx";
import SupportEmp from "../features/Employee/pages/Support.jsx";
import TaxDeclaration from "../features/Employee/pages/TaxDeclaration.jsx";
import Notifications from "../features/Employee/pages/Notifications.jsx";
import EmpDocuments from "../features/Employee/pages/Documents.jsx";
import EmployeeLeaveManagement from "../features/Employee/pages/EmployeeLeaveManagement.jsx";
import EmployeeAssets from "../features/Employee/pages/EmployeeAssets.jsx";
import EmployeePerformanceDashboard from "../features/Employee/pages/EmployeePerformanceDashboard.jsx";

/* ===================== APP ===================== */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions/recruitment" element={<RecruitmentPage />} />
        <Route path="/solutions/payroll" element={<PayrollPage />} />
        <Route path="/solutions/attendance" element={<AttendancePage />} />
        <Route path="/solutions/performance" element={<PerformancePage />} />
        <Route path="/solutions/bookdemo" element={<BookDemo />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ========== SUPER ADMIN ========== */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
        </Route>

        {/* ========== ADMIN ========== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="management" element={<AdminManagement />} />
          <Route path="company" element={<CompanyManagement />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees" element={<ManageEmployees />} />
          <Route path="finance" element={<Financehub />} />
          <Route path="finance-overview" element={<FinanceOverview />} />
          <Route path="leave-management" element={<LeaveManagement />} />
          <Route path="manualentry" element={<ManualEntry />} />
          <Route path="payroll-management" element={<PayrollManagement />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="support" element={<Support />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="performance" element={<PerformanceDashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="hierarchy" element={<HierarchyTree />} />
        </Route>

        {/* ========== EMPLOYEE ========== */}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="attendance" element={<EmpAttendance />} />
          <Route path="finance" element={<FinancehubEmp />} />
          <Route path="payslip" element={<Payslip />} />
          <Route path="policy" element={<Policy />} />
          <Route path="reimbursements" element={<Reimbursements />} />
          <Route path="support" element={<SupportEmp />} />
          <Route path="tax-declaration" element={<TaxDeclaration />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="documents" element={<EmpDocuments />} />
          <Route path="leaves" element={<EmployeeLeaveManagement />} />
          <Route path="assets" element={<EmployeeAssets />} />
          <Route path="performance" element={<EmployeePerformanceDashboard />} />
        </Route>

        {/* ========== FALLBACK ========== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
