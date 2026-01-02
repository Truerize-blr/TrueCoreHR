
// import React, { useState } from "react";
// import {
//   BookOpen,
//   FileText,
//   Clock,
//   AlertTriangle,
//   CheckCircle,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";

// // Local Card components (Tailwind-based)
// const Card = ({ children, className = "" }) => (
//   <div className={`rounded-2xl bg-white ${className}`.trim()}>{children}</div>
// );

// const CardHeader = ({ children, className = "" }) => (
//   <div className={`px-6 py-3 ${className}`.trim()}>{children}</div>
// );

// const CardTitle = ({ children, className = "" }) => (
//   <div className={className}>{children}</div>
// );

// const CardContent = ({ children, className = "" }) => (
//   <div className={`px-6 py-4 ${className}`.trim()}>{children}</div>
// );

// // Local Badge component (Tailwind-based)
// const Badge = ({ children, className = "" }) => {
//   return (
//     <span
//       className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${className}`}
//     >
//       {children}
//     </span>
//   );
// };

// export default function LeavePolicyPage() {
//   const [showLeavePolicy, setShowLeavePolicy] = useState(false);
//   const [showAttendancePolicy, setShowAttendancePolicy] = useState(false);
//   const [showInductionHandout, setShowInductionHandout] = useState(false);
//   const [showSexualHarassment, setShowSexualHarassment] = useState(false);

//   const monthlyLeaves = [
//     { month: "January", leaves: 1.5 },
//     { month: "February", leaves: 1.5 },
//     { month: "March", leaves: 2 },
//     { month: "April", leaves: 1.5 },
//     { month: "May", leaves: 1.5 },
//     { month: "June", leaves: 2 },
//     { month: "July", leaves: 1.5 },
//     { month: "August", leaves: 1.5 },
//     { month: "September", leaves: 2 },
//     { month: "October", leaves: 1.5 },
//     { month: "November", leaves: 1.5 },
//     { month: "December", leaves: 2 },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-[#F5F7FF]">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
//         {/* Header / Hero */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="absolute inset-0 rounded-2xl bg-[#011A8B]/10 blur-md" />
//               <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#011A8B] shadow-md">
//                 <svg
//                   className="h-8 w-8 text-white"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//                   <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//                 </svg>
//               </div>
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-semibold text-[#011A8B]">
//                 Office Policy
//               </h1>
//               <p className="text-sm text-gray-600">
//                 Truerize IQ Strategic Solutions Pvt Ltd
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
//               <div className="text-lg font-semibold text-[#011A8B]">20</div>
//               <div className="text-xs text-gray-500">Annual Leaves</div>
//             </div>
//             <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
//               <div className="text-lg font-semibold text-[#011A8B]">4</div>
//               <div className="text-xs text-gray-500">Policy Sections</div>
//             </div>
//             <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
//               <div className="text-lg font-semibold text-[#011A8B]">24/7</div>
//               <div className="text-xs text-gray-500">HR Support</div>
//             </div>
//             <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
//               <div className="text-lg font-semibold text-[#011A8B]">100%</div>
//               <div className="text-xs text-gray-500">Compliance</div>
//             </div>
//           </div>
//         </div>

//         {/* Intro card */}
//         <Card className="border border-gray-200 shadow-sm">
//           <CardContent className="p-6 space-y-6">
//             <p className="text-sm text-gray-700 max-w-3xl">
//               This page outlines key policies applicable to employees at Truerize IQ
//               Strategic Solutions Pvt Ltd. Please review each section to understand
//               your entitlements and responsibilities.
//             </p>

//             {/* Policy selectors */}
//             <div>
//               <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#011A8B]">
//                 <BookOpen className="h-5 w-5" />
//                 Explore Policies
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Leave Policy */}
//                 <button
//                   type="button"
//                   onClick={() => setShowLeavePolicy((v) => !v)}
//                   className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#011A8B] text-white">
//                       <FileText className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">
//                         Leave Policy
//                       </div>
//                       <div className="text-xs text-gray-500">Click to open</div>
//                     </div>
//                   </div>
//                   <span className="text-gray-400 group-hover:text-[#011A8B]">
//                     {showLeavePolicy ? (
//                       <ChevronDown className="h-5 w-5" />
//                     ) : (
//                       <ChevronRight className="h-5 w-5" />
//                     )}
//                   </span>
//                 </button>

//                 {/* Attendance Policy */}
//                 <button
//                   type="button"
//                   onClick={() => setShowAttendancePolicy((v) => !v)}
//                   className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316] text-white">
//                       <Clock className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">
//                         Attendance Policy
//                       </div>
//                       <div className="text-xs text-gray-500">Click to open</div>
//                     </div>
//                   </div>
//                   <span className="text-gray-400 group-hover:text-[#011A8B]">
//                     {showAttendancePolicy ? (
//                       <ChevronDown className="h-5 w-5" />
//                     ) : (
//                       <ChevronRight className="h-5 w-5" />
//                     )}
//                   </span>
//                 </button>

//                 {/* Induction Handout */}
//                 <button
//                   type="button"
//                   onClick={() => setShowInductionHandout((v) => !v)}
//                   className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#059669] text-white">
//                       <BookOpen className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">
//                         Induction Handout
//                       </div>
//                       <div className="text-xs text-gray-500">Click to open</div>
//                     </div>
//                   </div>
//                   <span className="text-gray-400 group-hover:text-[#011A8B]">
//                     {showInductionHandout ? (
//                       <ChevronDown className="h-5 w-5" />
//                     ) : (
//                       <ChevronRight className="h-5 w-5" />
//                     )}
//                   </span>
//                 </button>

//                 {/* Sexual Harassment */}
//                 <button
//                   type="button"
//                   onClick={() => setShowSexualHarassment((v) => !v)}
//                   className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DC2626] text-white">
//                       <AlertTriangle className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">
//                         Sexual Harassment
//                       </div>
//                       <div className="text-xs text-gray-500">Click to open</div>
//                     </div>
//                   </div>
//                   <span className="text-gray-400 group-hover:text-[#011A8B]">
//                     {showSexualHarassment ? (
//                       <ChevronDown className="h-5 w-5" />
//                     ) : (
//                       <ChevronRight className="h-5 w-5" />
//                     )}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Leave Policy Content */}
//         {showLeavePolicy && (
//           <div className="space-y-6">
//             {/* Eligibility */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Eligibility
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <ul className="space-y-3 text-sm text-gray-700">
//                   <li className="flex items-start gap-2">
//                     <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#B91C1C]" />
//                     <span>
//                       An employee is not eligible for any leave during the probation
//                       period.
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#B91C1C]" />
//                     <span>
//                       Any leave availed during the probation period will be treated
//                       as Leave Without Pay (LWP).
//                     </span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             {/* Total Leaves */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#15803D]">
//                   <CheckCircle className="h-5 w-5" />
//                   Total Leaves
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-6">
//                 <p className="text-sm text-gray-700">
//                   All employees are eligible for{" "}
//                   <span className="font-semibold text-gray-900">
//                     20 leaves in a calendar year
//                   </span>
//                   . The year is divided into four quarters, and employees receive 5
//                   leaves at the end of each quarter.
//                 </p>
//                 <div className="max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="bg-[#F9FAFB]">
//                         <th className="border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-900">
//                           Month
//                         </th>
//                         <th className="border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-900">
//                           Number of Leaves
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {monthlyLeaves.map((item, index) => (
//                         <tr
//                           key={index}
//                           className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
//                         >
//                           <td className="px-4 py-2.5 font-medium text-gray-900">
//                             {item.month}
//                           </td>
//                           <td className="px-4 py-2.5">
//                             <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700">
//                               {item.leaves} days
//                             </Badge>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Pro-rata Calculation */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#2563EB]">
//                   <Clock className="h-5 w-5" />
//                   Pro-rata Calculation After Probation
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4 text-sm text-gray-700">
//                 <p>
//                   If an employee completes probation after a quarter has started,
//                   leave will be calculated on a pro-rata basis using:
//                 </p>
//                 <div className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-4">
//                   <code className="text-xs font-mono text-gray-800">
//                     Number of days between confirmation date and end of quarter ×
//                     Eligible leaves for the quarter / Number of days in the quarter
//                   </code>
//                 </div>
//                 <p>Result is rounded down and credited monthly.</p>
//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Illustrations
//                   </h4>
//                   <ul className="space-y-1">
//                     <li>• Probation completed on 15-Jan: Eligible for 4 leaves</li>
//                     <li>• Probation completed on 10-Feb: Eligible for 2.5 leaves</li>
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Leave Encashment */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#7C3AED]">
//                   <FileText className="h-5 w-5" />
//                   Leave Encashment
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>• Unused leaves are encashed at the end of each quarter.</p>
//                 <p>• Encashment is at 100% of gross salary.</p>
//                 <p>• No carry forward or borrowing between quarters.</p>
//               </CardContent>
//             </Card>

//             {/* Training Sessions */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#D97706]">
//                   <BookOpen className="h-5 w-5" />
//                   Training Sessions and Induction
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700">
//                 <p>
//                   If the company schedules a training session on Saturday, attendance
//                   is mandatory. One day&apos;s salary will be deducted for
//                   non-attendance.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Leave Approval Process */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#0F766E]">
//                   <CheckCircle className="h-5 w-5" />
//                   Leave Approval Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700">
//                 <ol className="list-decimal list-inside space-y-2">
//                   <li>Fill out the Leave Form (with HR).</li>
//                   <li>Get approval from your Manager.</li>
//                   <li>Submit the form to HR.</li>
//                   <li>
//                     Leave without approval is treated as LWP, even with leave
//                     balance.
//                   </li>
//                 </ol>
//               </CardContent>
//             </Card>

//             {/* Medical Emergency */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Leave Due to Medical Emergency
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-3 text-sm text-gray-700">
//                 <p>If leave exceeds two days due to illness or emergency:</p>
//                 <ul className="space-y-2">
//                   <li>• Inform Team Lead on the first day of leave.</li>
//                   <li>
//                     • Submit doctor certificate, reports, prescriptions, and bills
//                     within 3 working days.
//                   </li>
//                   <li>
//                     • Original documents must be submitted to HR upon resuming.
//                   </li>
//                   <li>
//                     • Forged / unapproved documents may lead to disciplinary action.
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             {/* Unauthorized Leave */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Unauthorized Leave
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>
//                   • Absence without approval for more than 15 days can result in
//                   termination.
//                 </p>
//                 <p>
//                   • Repeated unauthorized leave may also lead to termination even if
//                   shorter than 15 days.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Compensatory Leave */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#4F46E5]">
//                   <Clock className="h-5 w-5" />
//                   Compensatory Leave (Saturday Work)
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700">
//                 Employees can compensate for weekday leave by working on a Saturday,
//                 with prior approval from Manager and HR.
//               </CardContent>
//             </Card>

//             {/* Pro-rata at Exit */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#EA580C]">
//                   <FileText className="h-5 w-5" />
//                   Pro-rata Leave at Exit
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4 text-sm text-gray-700">
//                 <p>
//                   If an employee leaves before quarter end, leave is encashed on a
//                   pro-rata basis:
//                 </p>
//                 <div className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-4">
//                   <code className="text-xs font-mono text-gray-800">
//                     Number of days completed in quarter × Eligible leaves for the
//                     quarter / Number of days in the quarter
//                   </code>
//                 </div>
//                 <p>Rounded down and encashed at exit.</p>
//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Illustrations
//                   </h4>
//                   <ul className="space-y-1">
//                     <li>• LWD – 25 March: Eligible for 1.5 leaves for March</li>
//                     <li>• LWD – 8 December: No leave eligibility for December</li>
//                     <li>• LWD – 15 September: Eligible for 1 leave for September</li>
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Approved By */}
//             <Card className="border border-gray-200 bg-gradient-to-br from-white to-[#F3F4FF] shadow-sm">
//               <CardContent className="p-8 text-center">
//                 <Badge className="mb-4 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Approved
//                 </Badge>
//                 <h3 className="text-base font-semibold text-gray-900">
//                   G. Naga Anusha
//                 </h3>
//                 <p className="text-xs text-gray-600">
//                   Managing Director (Operations & Finance)
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   Truerize IQ Strategic Solutions Pvt Ltd
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Attendance Policy Content */}
//         {showAttendancePolicy && (
//           <div className="space-y-6">
//             {/* Meaning Of Attendance */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#2563EB]">
//                   <Clock className="h-5 w-5" />
//                   Meaning Of Attendance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4 text-sm text-gray-700">
//                 <p>
//                   Attendance is measured as the productive number of hours delivered
//                   by an employee in the company. Mere physical presence without
//                   performance will not be counted as attendance.
//                 </p>
//                 <p>
//                   The following points help employees understand how attendance is
//                   evaluated.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Development Department */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#15803D]">
//                   <CheckCircle className="h-5 w-5" />
//                   Attendance – Development Department
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-5 text-sm text-gray-700">
//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Odesk / Elance – 9 Hours of Daily Billed Work
//                   </h4>
//                   <p className="mb-3">
//                     Developers are expected to complete 45 hours of billed work per
//                     week (excluding lunch). If 45 hours are not completed, Saturday
//                     becomes a working day without overtime.
//                   </p>
//                   <ul className="space-y-3">
//                     <li>
//                       <span className="font-semibold text-gray-900">a)</span> If the
//                       project is not completed by deadline, developers must work
//                       weekends to meet client commitments. Failure to do so may
//                       result in Saturday being treated as leave and the week&apos;s
//                       performance as nil.
//                     </li>
//                     <li>
//                       <span className="font-semibold text-gray-900">b)</span> If 45
//                       hours are not logged by Friday, Saturday work is mandatory
//                       without overtime.
//                     </li>
//                     <li>
//                       <span className="font-semibold text-gray-900">c)</span> Leave
//                       on weekdays reduces the 45-hour expectation by 9 hours per
//                       leave day. Saturday work can compensate, subject to email
//                       approval from Manager & HR.
//                     </li>
//                     <li>
//                       <span className="font-semibold text-gray-900">d)</span> One
//                       Saturday per month is mandatory for all. That week should
//                       total 54 working hours. Missing this Saturday can lead to
//                       deduction of 4 days salary.
//                     </li>
//                   </ul>
//                 </div>

//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Daily Commits on GIT
//                   </h4>
//                   <p className="mb-3">
//                     Two daily commits on GIT are mandatory and form a part of
//                     attendance.
//                   </p>
//                   <ul className="space-y-3">
//                     <li>
//                       <span className="font-semibold text-gray-900">a)</span> If
//                       working on one project, commits must be at 12:30 PM and 6:30
//                       PM. Two commits at the end of the day are not valid and such
//                       days may be treated as absent.
//                     </li>
//                     <li>
//                       <span className="font-semibold text-gray-900">b)</span> If
//                       working on multiple projects, commits should be done at the
//                       end of each project or after 4 hours, whichever is earlier.
//                     </li>
//                   </ul>
//                 </div>

//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Ace Management & Daily Reports
//                   </h4>
//                   <p className="mb-2">
//                     Developers must use Ace Project Management for logging work.
//                   </p>
//                   <ul className="space-y-3">
//                     <li>
//                       <span className="font-semibold text-gray-900">a)</span> Tasks
//                       must be logged accurately using the time clock. Edited
//                       timesheets are not accepted. Absence of Timelogs is treated as
//                       absence from work.
//                     </li>
//                     <li>
//                       <span className="font-semibold text-gray-900">b)</span> Change
//                       requests from clients must be updated on Ace Forum on the same
//                       day they are received.
//                     </li>
//                   </ul>
//                   <p className="mt-3">
//                     These points collectively define attendance in the development
//                     department.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Marketing Department */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#7C3AED]">
//                   <FileText className="h-5 w-5" />
//                   Attendance – Marketing Department
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4 text-sm text-gray-700">
//                 <p>
//                   Marketing attendance is linked to targets. Productive attendance
//                   is based on client handling and target completion.
//                 </p>
//                 <p>
//                   Shift timings and punctuality are mandatory and form part of
//                   evaluation.
//                 </p>
//                 <ul className="space-y-3">
//                   <li>
//                     <span className="font-semibold text-gray-900">a)</span> One
//                     Saturday mandatory per month, with total 54 hours that week.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">b)</span> Targets
//                     must be met as per marketing policy for incentives.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">c)</span> Client
//                     communication is the primary responsibility of the marketing
//                     team.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">d)</span> If
//                     weekly activation ratios or minimum bids are not met, weekend
//                     work is required, without overtime.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">e)</span> Leave on
//                     a weekday reduces the 45-hour requirement by 9 hours. Saturday
//                     can compensate, subject to Manager & HR approval.
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             {/* Working days for salary */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#D97706]">
//                   <BookOpen className="h-5 w-5" />
//                   Working Days for Salary Calculation
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4 text-sm text-gray-700">
//                 <p>
//                   Since one Saturday is mandatory, working days for salary are:
//                 </p>
//                 <p>
//                   <span className="font-semibold">
//                     Number of working days in the month + 1 (Saturday)
//                   </span>{" "}
//                   = Total working days
//                 </p>
//                 <div className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-4">
//                   <code className="text-xs font-mono text-gray-800">
//                     Monthly salary / Total working days = Per day salary
//                   </code>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* General Attendance Rules */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#0F766E]">
//                   <CheckCircle className="h-5 w-5" />
//                   General Attendance Rules
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-5 text-sm text-gray-700">
//                 <p>
//                   Different departments have assigned shifts. Late punch-ins result
//                   in short leave:
//                 </p>
//                 <ul className="space-y-2">
//                   <li>
//                     <span className="font-semibold text-gray-900">1)</span> 8:00 AM
//                     – 5:30 PM (Morning Shift – Marketing)
//                     <br />
//                     Punch after 9:00 AM – 2 hours short leave.
//                     <br />
//                     Punch after 9:30 AM – 4 hours short leave.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">2)</span> 9:00 AM
//                     – 6:30 PM (General Shift – All)
//                     <br />
//                     Punch after 9:30 AM – 2 hours short leave.
//                     <br />
//                     Punch after 10:00 AM – 4 hours short leave.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">3)</span> 12:30 PM
//                     – 9:30 PM (Afternoon – Marketing)
//                     <br />
//                     Punch after 1:00 PM – 2 hours short leave.
//                     <br />
//                     Punch after 1:30 PM – 4 hours short leave.
//                   </li>
//                   <li>
//                     <span className="font-semibold text-gray-900">4)</span> 3:00 PM
//                     – 1:00 AM (Night – Dev & Marketing)
//                     <br />
//                     Punch after 3:30 PM – 2 hours short leave.
//                     <br />
//                     Punch after 4:00 PM – 4 hours short leave.
//                   </li>
//                 </ul>

//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     a) 10-Hour Shift
//                   </h4>
//                   <ul className="space-y-1">
//                     <li>• Two breaks of 30 minutes (dinner + leisure).</li>
//                     <li>• Leisure games/snacks may be provided.</li>
//                   </ul>
//                 </div>

//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     b) 9.5-Hour Shift
//                   </h4>
//                   <ul className="space-y-1">
//                     <li>• One 30-minute dinner break.</li>
//                     <li>• Snacks may be provided.</li>
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Approved By */}
//             <Card className="border border-gray-200 bg-gradient-to-br from-white to-[#F3F4FF] shadow-sm">
//               <CardContent className="p-8 text-center">
//                 <Badge className="mb-4 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Approved
//                 </Badge>
//                 <h3 className="text-base font-semibold text-gray-900">
//                   G. Naga Anusha
//                 </h3>
//                 <p className="text-xs text-gray-600">
//                   Managing Director (Operations & Finance)
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   Truerize IQ Strategic Solutions Pvt Ltd
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Induction Handout Content */}
//         {showInductionHandout && (
//           <div className="space-y-6">
//             {/* Leave Policy */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#011A8B]">
//                   <FileText className="h-5 w-5" />
//                   Leave Policy
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>1. Leave calendar is from January to December.</p>
//                 <p>2. Employees get 1 day leave per month (12 annually).</p>
//                 <p>3. Max 3 days leave per quarter on pro-rata basis.</p>
//                 <p>
//                   4. Joining on or before 10th of month gives eligibility for that
//                   month&apos;s leave. Unavailed leaves are neither carried forward
//                   nor encashed.
//                 </p>
//                 <p>
//                   5. For leave, mail TRUERIZE HR Team for balance & eligibility, get
//                   approval from Project/Reporting Manager and forward to HR.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Payments */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#15803D]">
//                   <CheckCircle className="h-5 w-5" />
//                   Payments
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4 text-sm text-gray-700">
//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Salary Process
//                   </h4>
//                   <ul className="space-y-1">
//                     <li>
//                       1. After onboarding, mail HR for timesheet format
//                       (hr.team@truerize.com).
//                     </li>
//                     <li>
//                       2. Send approved timesheet to timesheet@truerize.com on or
//                       before 2nd of next month, 5:00 PM.
//                     </li>
//                     <li>
//                       3. If received before cut-off, salary credit on/before 10th.
//                     </li>
//                     <li>
//                       4. Timesheets after 3rd – salary credit on/before 15th.
//                     </li>
//                     <li>
//                       5. Timesheets after cut-off – processed mid of next month.
//                     </li>
//                     <li>
//                       6. Joinees after 25th get first salary with next month as
//                       arrear.
//                     </li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold text-gray-900">
//                     Shift Allowances
//                   </h4>
//                   <p>
//                     Shift allowance is applicable with project manager approval and
//                     paid once client releases payment.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* BGV & Docs */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#011A8B]">
//                   <BookOpen className="h-5 w-5" />
//                   BGV & Document Submission
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>
//                   1. Employees must submit ID, education, employment documents at
//                   joining.
//                 </p>
//                 <p>
//                   2. Background verification is done prior to reporting at client
//                   location.
//                 </p>
//                 <p>
//                   3. After onboarding, share contact, client mail ID, employee ID,
//                   project name, and manager details with hr.team@truerize.com
//                 </p>
//                 <p>4. Salary is withheld until BGV clearance.</p>
//                 <p>5. First payroll date is 45 days from joining.</p>
//               </CardContent>
//             </Card>

//             {/* Appraisal */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
//                   <Clock className="h-5 w-5" />
//                   Appraisal Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>
//                   1. Eligible after 1 year from DOJ, based on performance.
//                 </p>
//                 <p>
//                   2. HR sends Performance Review Form to Reporting Manager for
//                   inputs.
//                 </p>
//                 <p>
//                   3. Employee gets it filled/evaluated and forwards to HR with
//                   Manager in loop.
//                 </p>
//                 <p>4. Final increments depend on performance.</p>
//               </CardContent>
//             </Card>

//             {/* Medical Insurance */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Medical Insurance Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>
//                   1. All employees are covered under Group Mediclaim (₹2,00,000) and
//                   Group Personal Accident (₹5,00,000) from date of joining.
//                 </p>
//                 <p>
//                   2. Softcopy of mediclaim cards is shared to personal email (no
//                   hard copy).
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Joining & Separation */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Joining & Separation Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>1. Standard notice period is 30 days.</p>
//                 <p>
//                   2. In project closure/others, notice period is as decided by the
//                   company case to case.
//                 </p>
//                 <p>
//                   3. For performance / misconduct, termination can be immediate per
//                   client decision.
//                 </p>
//                 <p>
//                   4. Reporting to client location depends on resource availability.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* F&F Settlement */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#011A8B]">
//                   <FileText className="h-5 w-5" />
//                   Full & Final Settlement
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-2">
//                 <p>
//                   1. Employees must complete exit formalities and share clearance
//                   certificate with HR on last working day.
//                 </p>
//                 <p>
//                   2. Approved timesheet must be forwarded to
//                   timesheet@truerize.com.
//                 </p>
//                 <p>
//                   3. Last month salary is treated as F&F and processed after 60
//                   days between 20th–25th.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Penalty Clause */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Penalty Clause
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700">
//                 If an employee remains absent without intimation for more than 3
//                 working days, they may be treated as absconding. TRUERIZE reserves
//                 the right to update records (including NSR) and initiate legal
//                 action to recover penalties levied by clients.
//               </CardContent>
//             </Card>

//             {/* Escalation Matrix */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
//                   <Clock className="h-5 w-5" />
//                   Escalation Matrix
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700">
//                 For salary / timesheet issues, mail{" "}
//                 <span className="font-medium">hr.team@truerize.com</span>
//               </CardContent>
//             </Card>

//             {/* Salary Deductions */}
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#15803D]">
//                   <CheckCircle className="h-5 w-5" />
//                   Salary Deductions
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-1">
//                 <p>1. Medical Insurance & Professional Tax are deducted monthly.</p>
//                 <p>2. Income Tax is deducted as per Indian tax laws.</p>
//               </CardContent>
//             </Card>

//             {/* Declaration */}
//             <Card className="border border-gray-200 bg-gradient-to-br from-white to-[#F3F4FF] shadow-sm">
//               <CardContent className="p-6 space-y-6 text-sm text-gray-700">
//                 <p>
//                   I hereby declare that I have read all the above information and
//                   agree to abide by the disciplinary actions.
//                 </p>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="mb-1 block text-xs font-medium text-gray-700">
//                       Name:
//                     </label>
//                     <div className="border-b border-gray-300 pb-1" />
//                   </div>
//                   <div>
//                     <label className="mb-1 block text-xs font-medium text-gray-700">
//                       Signature:
//                     </label>
//                     <div className="border-b border-gray-300 pb-1" />
//                   </div>
//                 </div>
//                 <div className="mt-4 text-center">
//                   <Badge className="mb-2 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
//                     <CheckCircle className="h-4 w-4 mr-1" />
//                     Approved
//                   </Badge>
//                   <h3 className="text-sm font-semibold text-gray-900">
//                     G. Naga Anusha
//                   </h3>
//                   <p className="text-xs text-gray-600">
//                     Managing Director (Operations & Finance)
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     Truerize IQ Strategic Solutions Pvt Ltd
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Sexual Harassment Content */}
//         {showSexualHarassment && (
//           <div className="space-y-6">
//             <Card className="border border-gray-200 bg-white shadow-sm">
//               <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
//                 <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
//                   <AlertTriangle className="h-5 w-5" />
//                   Sexual Harassment
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 text-sm text-gray-700 space-y-4">
//                 <p>
//                   The Sexual Harassment of Women at Workplace (Prevention,
//                   Prohibition and Redressal) Act, 2013 provides protection to women
//                   against sexual harassment at workplace in India and lays down the
//                   mechanism for complaints.
//                 </p>
//                 <p>Sexual harassment includes the following unwelcome acts:</p>
//                 <ul className="ml-5 list-disc space-y-1">
//                   <li>Physical contact and advances</li>
//                   <li>Demand or request for sexual favours</li>
//                   <li>Sexually coloured remarks</li>
//                   <li>Showing pornography</li>
//                   <li>
//                     Any other unwelcome physical, verbal, or non-verbal conduct of
//                     sexual nature
//                   </li>
//                 </ul>
//                 <p>
//                   Every organization must constitute an Internal Committee to handle
//                   complaints.
//                 </p>
//                 <p>During the inquiry, the employer may:</p>
//                 <ul className="ml-5 list-disc space-y-1">
//                   <li>Transfer the complainant or respondent</li>
//                   <li>Grant up to 3 months leave to complainant</li>
//                   <li>
//                     Restrict respondent from reporting on complainant&apos;s
//                     performance
//                   </li>
//                 </ul>
//                 <p>
//                   Inquiry must be completed within 90 days. If allegations are
//                   proved, actions may include:
//                 </p>
//                 <ul className="ml-5 list-disc space-y-1">
//                   <li>Written apology or warning</li>
//                   <li>Reprimand / censure</li>
//                   <li>Withholding promotion or increment</li>
//                   <li>Termination from service</li>
//                   <li>Counselling or community service</li>
//                 </ul>

//                 <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
//                   <p className="mb-4">
//                     I acknowledge that I have read and understood the above note
//                     regarding the Act and the mechanism for handling complaints of
//                     sexual harassment. I further acknowledge that I may approach
//                     appropriate forums under law for any harassment not covered by
//                     the Act.
//                   </p>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-gray-700">
//                         Date:
//                       </label>
//                       <div className="border-b border-gray-300 pb-1" />
//                     </div>
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-gray-700">
//                         Place:
//                       </label>
//                       <div className="border-b border-gray-300 pb-1" />
//                     </div>
//                   </div>
//                   <div className="space-y-4 mb-4">
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-gray-700">
//                         Name:
//                       </label>
//                       <div className="border-b border-gray-300 pb-1" />
//                     </div>
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-gray-700">
//                         Signature:
//                       </label>
//                       <div className="border-b border-gray-300 pb-1" />
//                     </div>
//                   </div>
//                   <div className="mt-2 text-center">
//                     <Badge className="mb-2 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
//                       <CheckCircle className="h-4 w-4 mr-1" />
//                       Approved
//                     </Badge>
//                     <h3 className="text-sm font-semibold text-gray-900">
//                       G. Naga Anusha
//                     </h3>
//                     <p className="text-xs text-gray-600">
//                       Managing Director (Operations & Finance)
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Truerize IQ Strategic Solutions Pvt Ltd
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// Policy.jsx

import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// Local Card components (Tailwind-based)
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white ${className}`.trim()}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-3 ${className}`.trim()}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`.trim()}>{children}</div>
);

// Local Badge component (Tailwind-based)
const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${className}`}
    >
      {children}
    </span>
  );
};

export default function LeavePolicyPage() {
  // only one active section at a time: "leave" | "attendance" | "induction" | "sexual" | null
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const monthlyLeaves = [
    { month: "January", leaves: 1.5 },
    { month: "February", leaves: 1.5 },
    { month: "March", leaves: 2 },
    { month: "April", leaves: 1.5 },
    { month: "May", leaves: 1.5 },
    { month: "June", leaves: 2 },
    { month: "July", leaves: 1.5 },
    { month: "August", leaves: 1.5 },
    { month: "September", leaves: 2 },
    { month: "October", leaves: 1.5 },
    { month: "November", leaves: 1.5 },
    { month: "December", leaves: 2 },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F7FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#011A8B]/10 blur-md" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#011A8B] shadow-md">
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#011A8B]">
                Office Policy
              </h1>
              <p className="text-sm text-gray-600">
                Truerize IQ Strategic Solutions Pvt Ltd
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
              <div className="text-lg font-semibold text-[#011A8B]">20</div>
              <div className="text-xs text-gray-500">Annual Leaves</div>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
              <div className="text-lg font-semibold text-[#011A8B]">4</div>
              <div className="text-xs text-gray-500">Policy Sections</div>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
              <div className="text-lg font-semibold text-[#011A8B]">24/7</div>
              <div className="text-xs text-gray-500">HR Support</div>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
              <div className="text-lg font-semibold text-[#011A8B]">100%</div>
              <div className="text-xs text-gray-500">Compliance</div>
            </div>
          </div>
        </div>

        {/* Intro card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <p className="text-sm text-gray-700 max-w-3xl">
              This page outlines key policies applicable to employees at Truerize IQ
              Strategic Solutions Pvt Ltd. Please review each section to understand
              your entitlements and responsibilities.
            </p>

            {/* Policy selectors */}
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#011A8B]">
                <BookOpen className="h-5 w-5" />
                Explore Policies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leave Policy */}
                <button
                  type="button"
                  onClick={() => toggleSection("leave")}
                  className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#011A8B] text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Leave Policy
                      </div>
                      <div className="text-xs text-gray-500">Click to open</div>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#011A8B]">
                    {activeSection === "leave" ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {/* Attendance Policy */}
                <button
                  type="button"
                  onClick={() => toggleSection("attendance")}
                  className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316] text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Attendance Policy
                      </div>
                      <div className="text-xs text-gray-500">Click to open</div>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#011A8B]">
                    {activeSection === "attendance" ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {/* Induction Handout */}
                <button
                  type="button"
                  onClick={() => toggleSection("induction")}
                  className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#059669] text-white">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Induction Handout
                      </div>
                      <div className="text-xs text-gray-500">Click to open</div>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#011A8B]">
                    {activeSection === "induction" ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {/* Sexual Harassment */}
                <button
                  type="button"
                  onClick={() => toggleSection("sexual")}
                  className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#011A8B]/40 hover:bg-[#F3F4FF]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DC2626] text-white">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Sexual Harassment
                      </div>
                      <div className="text-xs text-gray-500">Click to open</div>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#011A8B]">
                    {activeSection === "sexual" ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave Policy Content */}
        {activeSection === "leave" && (
          <div className="space-y-6">
            {/* Eligibility */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#B91C1C]" />
                    <span>
                      An employee is not eligible for any leave during the probation
                      period.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#B91C1C]" />
                    <span>
                      Any leave availed during the probation period will be treated
                      as Leave Without Pay (LWP).
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Total Leaves */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#15803D]">
                  <CheckCircle className="h-5 w-5" />
                  Total Leaves
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <p className="text-sm text-gray-700">
                  All employees are eligible for{" "}
                  <span className="font-semibold text-gray-900">
                    20 leaves in a calendar year
                  </span>
                  . The year is divided into four quarters, and employees receive 5
                  leaves at the end of each quarter.
                </p>
                <div className="max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F9FAFB]">
                        <th className="border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-900">
                          Month
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-900">
                          Number of Leaves
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyLeaves.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                        >
                          <td className="px-4 py-2.5 font-medium text-gray-900">
                            {item.month}
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700">
                              {item.leaves} days
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pro-rata Calculation */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#2563EB]">
                  <Clock className="h-5 w-5" />
                  Pro-rata Calculation After Probation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <p>
                  If an employee completes probation after a quarter has started,
                  leave will be calculated on a pro-rata basis using:
                </p>
                <div className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-4">
                  <code className="text-xs font-mono text-gray-800">
                    Number of days between confirmation date and end of quarter ×
                    Eligible leaves for the quarter / Number of days in the quarter
                  </code>
                </div>
                <p>Result is rounded down and credited monthly.</p>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Illustrations
                  </h4>
                  <ul className="space-y-1">
                    <li>• Probation completed on 15-Jan: Eligible for 4 leaves</li>
                    <li>• Probation completed on 10-Feb: Eligible for 2.5 leaves</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Leave Encashment */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#7C3AED]">
                  <FileText className="h-5 w-5" />
                  Leave Encashment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>• Unused leaves are encashed at the end of each quarter.</p>
                <p>• Encashment is at 100% of gross salary.</p>
                <p>• No carry forward or borrowing between quarters.</p>
              </CardContent>
            </Card>

            {/* Training Sessions */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#D97706]">
                  <BookOpen className="h-5 w-5" />
                  Training Sessions and Induction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700">
                <p>
                  If the company schedules a training session on Saturday, attendance
                  is mandatory. One day&apos;s salary will be deducted for
                  non-attendance.
                </p>
              </CardContent>
            </Card>

            {/* Leave Approval Process */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#0F766E]">
                  <CheckCircle className="h-5 w-5" />
                  Leave Approval Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Fill out the Leave Form (with HR).</li>
                  <li>Get approval from your Manager.</li>
                  <li>Submit the form to HR.</li>
                  <li>
                    Leave without approval is treated as LWP, even with leave
                    balance.
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Medical Emergency */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Leave Due to Medical Emergency
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3 text-sm text-gray-700">
                <p>If leave exceeds two days due to illness or emergency:</p>
                <ul className="space-y-2">
                  <li>• Inform Team Lead on the first day of leave.</li>
                  <li>
                    • Submit doctor certificate, reports, prescriptions, and bills
                    within 3 working days.
                  </li>
                  <li>
                    • Original documents must be submitted to HR upon resuming.
                  </li>
                  <li>
                    • Forged / unapproved documents may lead to disciplinary action.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Unauthorized Leave */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Unauthorized Leave
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>
                  • Absence without approval for more than 15 days can result in
                  termination.
                </p>
                <p>
                  • Repeated unauthorized leave may also lead to termination even if
                  shorter than 15 days.
                </p>
              </CardContent>
            </Card>

            {/* Compensatory Leave */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#4F46E5]">
                  <Clock className="h-5 w-5" />
                  Compensatory Leave (Saturday Work)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700">
                Employees can compensate for weekday leave by working on a Saturday,
                with prior approval from Manager and HR.
              </CardContent>
            </Card>

            {/* Pro-rata at Exit */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#EA580C]">
                  <FileText className="h-5 w-5" />
                  Pro-rata Leave at Exit
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <p>
                  If an employee leaves before quarter end, leave is encashed on a
                  pro-rata basis:
                </p>
                <div className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-4">
                  <code className="text-xs font-mono text-gray-800">
                    Number of days completed in quarter × Eligible leaves for the
                    quarter / Number of days in the quarter
                  </code>
                </div>
                <p>Rounded down and encashed at exit.</p>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Illustrations
                  </h4>
                  <ul className="space-y-1">
                    <li>• LWD – 25 March: Eligible for 1.5 leaves for March</li>
                    <li>• LWD – 8 December: No leave eligibility for December</li>
                    <li>• LWD – 15 September: Eligible for 1 leave for September</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Approved By */}
            <Card className="border border-gray-200 bg-gradient-to-br from-white to-[#F3F4FF] shadow-sm">
              <CardContent className="p-8 text-center">
                <Badge className="mb-4 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approved
                </Badge>
                <h3 className="text-base font-semibold text-gray-900">
                  G. Naga Anusha
                </h3>
                <p className="text-xs text-gray-600">
                  Managing Director (Operations & Finance)
                </p>
                <p className="text-xs text-gray-600">
                  Truerize IQ Strategic Solutions Pvt Ltd
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Policy Content */}
        {activeSection === "attendance" && (
          <div className="space-y-6">
            {/* Meaning Of Attendance */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#2563EB]">
                  <Clock className="h-5 w-5" />
                  Meaning Of Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <p>
                  Attendance is measured as the productive number of hours delivered
                  by an employee in the company. Mere physical presence without
                  performance will not be counted as attendance.
                </p>
                <p>
                  The following points help employees understand how attendance is
                  evaluated.
                </p>
              </CardContent>
            </Card>

            {/* Development Department */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#15803D]">
                  <CheckCircle className="h-5 w-5" />
                  Attendance – Development Department
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-sm text-gray-700">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Odesk / Elance – 9 Hours of Daily Billed Work
                  </h4>
                  <p className="mb-3">
                    Developers are expected to complete 45 hours of billed work per
                    week (excluding lunch). If 45 hours are not completed, Saturday
                    becomes a working day without overtime.
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <span className="font-semibold text-gray-900">a)</span> If the
                      project is not completed by deadline, developers must work
                      weekends to meet client commitments. Failure to do so may
                      result in Saturday being treated as leave and the week&apos;s
                      performance as nil.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">b)</span> If 45
                      hours are not logged by Friday, Saturday work is mandatory
                      without overtime.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">c)</span> Leave
                      on weekdays reduces the 45-hour expectation by 9 hours per
                      leave day. Saturday work can compensate, subject to email
                      approval from Manager & HR.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">d)</span> One
                      Saturday per month is mandatory for all. That week should
                      total 54 working hours. Missing this Saturday can lead to
                      deduction of 4 days salary.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Daily Commits on GIT
                  </h4>
                  <p className="mb-3">
                    Two daily commits on GIT are mandatory and form a part of
                    attendance.
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <span className="font-semibold text-gray-900">a)</span> If
                      working on one project, commits must be at 12:30 PM and 6:30
                      PM. Two commits at the end of the day are not valid and such
                      days may be treated as absent.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">b)</span> If
                      working on multiple projects, commits should be done at the
                      end of each project or after 4 hours, whichever is earlier.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Ace Management & Daily Reports
                  </h4>
                  <p className="mb-2">
                    Developers must use Ace Project Management for logging work.
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <span className="font-semibold text-gray-900">a)</span> Tasks
                      must be logged accurately using the time clock. Edited
                      timesheets are not accepted. Absence of Timelogs is treated as
                      absence from work.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">b)</span> Change
                      requests from clients must be updated on Ace Forum on the same
                      day they are received.
                    </li>
                  </ul>
                  <p className="mt-3">
                    These points collectively define attendance in the development
                    department.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Department */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#7C3AED]">
                  <FileText className="h-5 w-5" />
                  Attendance – Marketing Department
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <p>
                  Marketing attendance is linked to targets. Productive attendance
                  is based on client handling and target completion.
                </p>
                <p>
                  Shift timings and punctuality are mandatory and form part of
                  evaluation.
                </p>
                <ul className="space-y-3">
                  <li>
                    <span className="font-semibold text-gray-900">a)</span> One
                    Saturday mandatory per month, with total 54 hours that week.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">b)</span> Targets
                    must be met as per marketing policy for incentives.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">c)</span> Client
                    communication is the primary responsibility of the marketing
                    team.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">d)</span> If
                    weekly activation ratios or minimum bids are not met, weekend
                    work is required, without overtime.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">e)</span> Leave on
                    a weekday reduces the 45-hour requirement by 9 hours. Saturday
                    can compensate, subject to Manager & HR approval.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Working days for salary */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#D97706]">
                  <BookOpen className="h-5 w-5" />
                  Working Days for Salary Calculation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <p>
                  Since one Saturday is mandatory, working days for salary are:
                </p>
                <p>
                  <span className="font-semibold">
                    Number of working days in the month + 1 (Saturday)
                  </span>{" "}
                  = Total working days
                </p>
                <div className="rounded-lg border border-gray-200 bg-[#F9FAFB] p-4">
                  <code className="text-xs font-mono text-gray-800">
                    Monthly salary / Total working days = Per day salary
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* General Attendance Rules */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#0F766E]">
                  <CheckCircle className="h-5 w-5" />
                  General Attendance Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-sm text-gray-700">
                <p>
                  Different departments have assigned shifts. Late punch-ins result
                  in short leave:
                </p>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold text-gray-900">1)</span> 8:00 AM
                    – 5:30 PM (Morning Shift – Marketing)
                    <br />
                    Punch after 9:00 AM – 2 hours short leave.
                    <br />
                    Punch after 9:30 AM – 4 hours short leave.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">2)</span> 9:00 AM
                    – 6:30 PM (General Shift – All)
                    <br />
                    Punch after 9:30 AM – 2 hours short leave.
                    <br />
                    Punch after 10:00 AM – 4 hours short leave.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">3)</span> 12:30 PM
                    – 9:30 PM (Afternoon – Marketing)
                    <br />
                    Punch after 1:00 PM – 2 hours short leave.
                    <br />
                    Punch after 1:30 PM – 4 hours short leave.
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">4)</span> 3:00 PM
                    – 1:00 AM (Night – Dev & Marketing)
                    <br />
                    Punch after 3:30 PM – 2 hours short leave.
                    <br />
                    Punch after 4:00 PM – 4 hours short leave.
                  </li>
                </ul>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    a) 10-Hour Shift
                  </h4>
                  <ul className="space-y-1">
                    <li>• Two breaks of 30 minutes (dinner + leisure).</li>
                    <li>• Leisure games/snacks may be provided.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    b) 9.5-Hour Shift
                  </h4>
                  <ul className="space-y-1">
                    <li>• One 30-minute dinner break.</li>
                    <li>• Snacks may be provided.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Approved By */}
            <Card className="border border-gray-200 bg-gradient-to-br from-white to-[#F3F4FF] shadow-sm">
              <CardContent className="p-8 text-center">
                <Badge className="mb-4 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approved
                </Badge>
                <h3 className="text-base font-semibold text-gray-900">
                  G. Naga Anusha
                </h3>
                <p className="text-xs text-gray-600">
                  Managing Director (Operations & Finance)
                </p>
                <p className="text-xs text-gray-600">
                  Truerize IQ Strategic Solutions Pvt Ltd
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Induction Handout Content */}
        {activeSection === "induction" && (
          <div className="space-y-6">
            {/* Leave Policy */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#011A8B]">
                  <FileText className="h-5 w-5" />
                  Leave Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>1. Leave calendar is from January to December.</p>
                <p>2. Employees get 1 day leave per month (12 annually).</p>
                <p>3. Max 3 days leave per quarter on pro-rata basis.</p>
                <p>
                  4. Joining on or before 10th of month gives eligibility for that
                  month&apos;s leave. Unavailed leaves are neither carried forward
                  nor encashed.
                </p>
                <p>
                  5. For leave, mail TRUERIZE HR Team for balance & eligibility, get
                  approval from Project/Reporting Manager and forward to HR.
                </p>
              </CardContent>
            </Card>

            {/* Payments */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#15803D]">
                  <CheckCircle className="h-5 w-5" />
                  Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Salary Process
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      1. After onboarding, mail HR for timesheet format
                      (hr.team@truerize.com).
                    </li>
                    <li>
                      2. Send approved timesheet to timesheet@truerize.com on or
                      before 2nd of next month, 5:00 PM.
                    </li>
                    <li>
                      3. If received before cut-off, salary credit on/before 10th.
                    </li>
                    <li>
                      4. Timesheets after 3rd – salary credit on/before 15th.
                    </li>
                    <li>
                      5. Timesheets after cut-off – processed mid of next month.
                    </li>
                    <li>
                      6. Joinees after 25th get first salary with next month as
                      arrear.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">
                    Shift Allowances
                  </h4>
                  <p>
                    Shift allowance is applicable with project manager approval and
                    paid once client releases payment.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* BGV & Docs */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#011A8B]">
                  <BookOpen className="h-5 w-5" />
                  BGV & Document Submission
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>
                  1. Employees must submit ID, education, employment documents at
                  joining.
                </p>
                <p>
                  2. Background verification is done prior to reporting at client
                  location.
                </p>
                <p>
                  3. After onboarding, share contact, client mail ID, employee ID,
                  project name, and manager details with hr.team@truerize.com
                </p>
                <p>4. Salary is withheld until BGV clearance.</p>
                <p>5. First payroll date is 45 days from joining.</p>
              </CardContent>
            </Card>

            {/* Appraisal */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                  <Clock className="h-5 w-5" />
                  Appraisal Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>
                  1. Eligible after 1 year from DOJ, based on performance.
                </p>
                <p>
                  2. HR sends Performance Review Form to Reporting Manager for
                  inputs.
                </p>
                <p>
                  3. Employee gets it filled/evaluated and forwards to HR with
                  Manager in loop.
                </p>
                <p>4. Final increments depend on performance.</p>
              </CardContent>
            </Card>

            {/* Medical Insurance */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Medical Insurance Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>
                  1. All employees are covered under Group Mediclaim (₹2,00,000) and
                  Group Personal Accident (₹5,00,000) from date of joining.
                </p>
                <p>
                  2. Softcopy of mediclaim cards is shared to personal email (no
                  hard copy).
                </p>
              </CardContent>
            </Card>

            {/* Joining & Separation */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Joining & Separation Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>1. Standard notice period is 30 days.</p>
                <p>
                  2. In project closure/others, notice period is as decided by the
                  company case to case.
                </p>
                <p>
                  3. For performance / misconduct, termination can be immediate per
                  client decision.
                </p>
                <p>
                  4. Reporting to client location depends on resource availability.
                </p>
              </CardContent>
            </Card>

            {/* F&F Settlement */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#011A8B]">
                  <FileText className="h-5 w-5" />
                  Full & Final Settlement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-2">
                <p>
                  1. Employees must complete exit formalities and share clearance
                  certificate with HR on last working day.
                </p>
                <p>
                  2. Approved timesheet must be forwarded to
                  timesheet@truerize.com.
                </p>
                <p>
                  3. Last month salary is treated as F&F and processed after 60
                  days between 20th–25th.
                </p>
              </CardContent>
            </Card>

            {/* Penalty Clause */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Penalty Clause
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700">
                If an employee remains absent without intimation for more than 3
                working days, they may be treated as absconding. TRUERIZE reserves
                the right to update records (including NSR) and initiate legal
                action to recover penalties levied by clients.
              </CardContent>
            </Card>

            {/* Escalation Matrix */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                  <Clock className="h-5 w-5" />
                  Escalation Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700">
                For salary / timesheet issues, mail{" "}
                <span className="font-medium">hr.team@truerize.com</span>
              </CardContent>
            </Card>

            {/* Salary Deductions */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#15803D]">
                  <CheckCircle className="h-5 w-5" />
                  Salary Deductions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-1">
                <p>1. Medical Insurance & Professional Tax are deducted monthly.</p>
                <p>2. Income Tax is deducted as per Indian tax laws.</p>
              </CardContent>
            </Card>

            {/* Declaration */}
            <Card className="border border-gray-200 bg-gradient-to-br from-white to-[#F3F4FF] shadow-sm">
              <CardContent className="p-6 space-y-6 text-sm text-gray-700">
                <p>
                  I hereby declare that I have read all the above information and
                  agree to abide by the disciplinary actions.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Name:
                    </label>
                    <div className="border-b border-gray-300 pb-1" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Signature:
                    </label>
                    <div className="border-b border-gray-300 pb-1" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Badge className="mb-2 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approved
                  </Badge>
                  <h3 className="text-sm font-semibold text-gray-900">
                    G. Naga Anusha
                  </h3>
                  <p className="text-xs text-gray-600">
                    Managing Director (Operations & Finance)
                  </p>
                  <p className="text-xs text-gray-600">
                    Truerize IQ Strategic Solutions Pvt Ltd
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sexual Harassment Content */}
        {activeSection === "sexual" && (
          <div className="space-y-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-[#F3F4FF] border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#B91C1C]">
                  <AlertTriangle className="h-5 w-5" />
                  Sexual Harassment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm text-gray-700 space-y-4">
                <p>
                  The Sexual Harassment of Women at Workplace (Prevention,
                  Prohibition and Redressal) Act, 2013 provides protection to women
                  against sexual harassment at workplace in India and lays down the
                  mechanism for complaints.
                </p>
                <p>Sexual harassment includes the following unwelcome acts:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>Physical contact and advances</li>
                  <li>Demand or request for sexual favours</li>
                  <li>Sexually coloured remarks</li>
                  <li>Showing pornography</li>
                  <li>
                    Any other unwelcome physical, verbal, or non-verbal conduct of
                    sexual nature
                  </li>
                </ul>
                <p>
                  Every organization must constitute an Internal Committee to handle
                  complaints.
                </p>
                <p>During the inquiry, the employer may:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>Transfer the complainant or respondent</li>
                  <li>Grant up to 3 months leave to complainant</li>
                  <li>
                    Restrict respondent from reporting on complainant&apos;s
                    performance
                  </li>
                </ul>
                <p>
                  Inquiry must be completed within 90 days. If allegations are
                  proved, actions may include:
                </p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>Written apology or warning</li>
                  <li>Reprimand / censure</li>
                  <li>Withholding promotion or increment</li>
                  <li>Termination from service</li>
                  <li>Counselling or community service</li>
                </ul>

                <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
                  <p className="mb-4">
                    I acknowledge that I have read and understood the above note
                    regarding the Act and the mechanism for handling complaints of
                    sexual harassment. I further acknowledge that I may approach
                    appropriate forums under law for any harassment not covered by
                    the Act.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        Date:
                      </label>
                      <div className="border-b border-gray-300 pb-1" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        Place:
                      </label>
                      <div className="border-b border-gray-300 pb-1" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        Name:
                      </label>
                      <div className="border-b border-gray-300 pb-1" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        Signature:
                      </label>
                      <div className="border-b border-gray-300 pb-1" />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <Badge className="mb-2 inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 text-emerald-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approved
                    </Badge>
                    <h3 className="text-sm font-semibold text-gray-900">
                      G. Naga Anusha
                    </h3>
                    <p className="text-xs text-gray-600">
                      Managing Director (Operations & Finance)
                    </p>
                    <p className="text-xs text-gray-600">
                      Truerize IQ Strategic Solutions Pvt Ltd
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
