// // 'use client';

// // import React, { useMemo, useState } from 'react';
// // import {
// //   Bell,
// //   CheckCircle2,
// //   AlertTriangle,
// //   CalendarDays,
// //   Clock,
// //   Info,
// // } from 'lucide-react';

// // const INITIAL_NOTIFICATIONS = [
// //   {
// //     id: 1,
// //     title: 'Leave request approved',
// //     message: 'Your leave request from 12 Nov 2025 to 14 Nov 2025 has been approved by your manager.',
// //     category: 'Leave',
// //     type: 'success',
// //     createdAt: '2025-11-10T09:15:00',
// //     read: false,
// //   },
// //   {
// //     id: 2,
// //     title: 'Attendance reminder',
// //     message: 'You have not marked your attendance for today. Please regularize before 6:00 PM.',
// //     category: 'Attendance',
// //     type: 'warning',
// //     createdAt: '2025-11-12T10:05:00',
// //     read: false,
// //   },
// //   {
// //     id: 3,
// //     title: 'Salary credited',
// //     message: 'Your salary for October 2025 has been credited to your registered bank account.',
// //     category: 'Payroll',
// //     type: 'info',
// //     createdAt: '2025-11-01T14:30:00',
// //     read: true,
// //   },
// //   {
// //     id: 4,
// //     title: 'New HR policy update',
// //     message: 'Please review the updated Work From Home & Leave policy in the Policies section.',
// //     category: 'HR',
// //     type: 'info',
// //     createdAt: '2025-10-28T16:45:00',
// //     read: true,
// //   },
// //   {
// //     id: 5,
// //     title: 'Upcoming holiday',
// //     message: 'Office will remain closed on 01 Dec 2025 on account of company declared holiday.',
// //     category: 'Holiday',
// //     type: 'info',
// //     createdAt: '2025-11-05T11:00:00',
// //     read: false,
// //   },
// // ];

// // const typeAccent = (type) => {
// //   if (type === 'success') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
// //   if (type === 'warning') return 'bg-amber-100 text-amber-700 border-amber-200';
// //   if (type === 'error') return 'bg-red-100 text-red-700 border-red-200';
// //   return 'bg-blue-100 text-blue-700 border-blue-200';
// // };

// // const typeDot = (type) => {
// //   if (type === 'success') return 'bg-emerald-500';
// //   if (type === 'warning') return 'bg-amber-500';
// //   if (type === 'error') return 'bg-red-500';
// //   return 'bg-blue-500';
// // };

// // const formatDateTime = (value) => {
// //   try {
// //     const d = new Date(value);
// //     return d.toLocaleString(undefined, {
// //       day: '2-digit',
// //       month: 'short',
// //       hour: '2-digit',
// //       minute: '2-digit',
// //     });
// //   } catch {
// //     return value;
// //   }
// // };

// // export default function EmployeeNotifications() {
// //   const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
// //   const [activeFilter, setActiveFilter] = useState('all'); // all | unread | leave | attendance | payroll | hr | system
// //   const [expandedId, setExpandedId] = useState(null);

// //   const unreadCount = useMemo(
// //     () => notifications.filter((n) => !n.read).length,
// //     [notifications],
// //   );

// //   const filtered = useMemo(() => {
// //     return notifications.filter((n) => {
// //       if (activeFilter === 'all') return true;
// //       if (activeFilter === 'unread') return !n.read;
// //       if (activeFilter === 'leave') return n.category.toLowerCase() === 'leave';
// //       if (activeFilter === 'attendance') return n.category.toLowerCase() === 'attendance';
// //       if (activeFilter === 'payroll') return n.category.toLowerCase() === 'payroll';
// //       if (activeFilter === 'hr') return n.category.toLowerCase() === 'hr';
// //       if (activeFilter === 'holiday') return n.category.toLowerCase() === 'holiday';
// //       return true;
// //     });
// //   }, [notifications, activeFilter]);

// //   const markAllRead = () => {
// //     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
// //   };

// //   const toggleRead = (id) => {
// //     setNotifications((prev) =>
// //       prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
// //     );
// //   };

// //   const clearAll = () => {
// //     setNotifications([]);
// //   };

// //   return (
// //     <div className="w-full min-h-screen bg-[#F5F7FF]">
// //       <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
// //           <div className="flex items-center gap-3">
// //             <div className="relative">
// //               <div className="absolute inset-0 rounded-2xl bg-[#011A8B]/15 blur-md" />
// //               <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#011A8B] shadow-md">
// //                 <Bell className="h-6 w-6 text-white" />
// //               </div>
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-semibold text-[#011A8B] md:text-3xl">
// //                 Notifications
// //               </h1>
// //               <p className="text-sm text-gray-600">
// //                 Stay updated with approvals, policy updates, and system alerts.
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap items-center gap-2 text-xs">
// //             <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#F3F4FF] px-3 py-1.5 text-xs text-[#011A8B]">
// //               <span className="relative flex h-2 w-2">
// //                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#011A8B]/40" />
// //                 <span className="relative inline-flex h-2 w-2 rounded-full bg-[#011A8B]" />
// //               </span>
// //               {unreadCount > 0
// //                 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
// //                 : 'You are all caught up'}
// //             </div>
// //             <button
// //               onClick={markAllRead}
// //               className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
// //             >
// //               Mark all as read
// //             </button>
// //             <button
// //               onClick={clearAll}
// //               className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50"
// //             >
// //               Clear all
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filter pills */}
// //         <div className="flex flex-wrap gap-2 text-xs font-medium">
// //           {[
// //             { key: 'all', label: 'All' },
// //             { key: 'unread', label: 'Unread' },
// //             { key: 'leave', label: 'Leave' },
// //             { key: 'attendance', label: 'Attendance' },
// //             { key: 'payroll', label: 'Payroll' },
// //             { key: 'holiday', label: 'Holiday' },
// //             { key: 'hr', label: 'HR & Policy' },
// //           ].map((tab) => (
// //             <button
// //               key={tab.key}
// //               onClick={() => setActiveFilter(tab.key)}
// //               className={`rounded-full px-4 py-1.5 transition ${
// //                 activeFilter === tab.key
// //                   ? 'bg-[#011A8B] text-white shadow-sm'
// //                   : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
// //               }`}
// //             >
// //               {tab.label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Info strip */}
// //         <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-600 shadow-sm">
// //           <Info className="h-4 w-4 text-[#011A8B]" />
// //           <span>
// //             Notifications are automatically generated from your leave, attendance, payroll,
// //             and HR actions in the portal.
// //           </span>
// //         </div>

// //         {/* Notification list */}
// //         <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
// //           {filtered.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
// //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E5FF]">
// //                 <CheckCircle2 className="h-5 w-5 text-[#011A8B]" />
// //               </div>
// //               <p className="text-sm font-medium text-gray-800">
// //                 No notifications to show
// //               </p>
// //               <p className="text-xs text-gray-500">
// //                 New notifications will appear here whenever there is an update.
// //               </p>
// //             </div>
// //           ) : (
// //             <ul className="divide-y divide-gray-100">
// //               {filtered.map((n) => (
// //                 <li
// //                   key={n.id}
// //                   className={`px-4 py-4 sm:px-6 ${
// //                     !n.read ? 'bg-[#F9FAFF]' : 'bg-white'
// //                   }`}
// //                 >
// //                   <div className="flex items-start justify-between gap-3">
// //                     <button
// //                       type="button"
// //                       onClick={() =>
// //                         setExpandedId((prev) => (prev === n.id ? null : n.id))
// //                       }
// //                       className="flex flex-1 items-start gap-3 text-left"
// //                     >
// //                       <div
// //                         className={`mt-1 h-2.5 w-2.5 rounded-full ${typeDot(
// //                           n.type,
// //                         )}`}
// //                       />
// //                       <div className="flex-1">
// //                         <div className="flex flex-wrap items-center gap-2">
// //                           <span
// //                             className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${typeAccent(
// //                               n.type,
// //                             )}`}
// //                           >
// //                             {n.type === 'success' && (
// //                               <CheckCircle2 className="h-3 w-3" />
// //                             )}
// //                             {n.type === 'warning' && (
// //                               <AlertTriangle className="h-3 w-3" />
// //                             )}
// //                             {n.type === 'info' && (
// //                               <Info className="h-3 w-3" />
// //                             )}
// //                             {n.type === 'error' && (
// //                               <AlertTriangle className="h-3 w-3" />
// //                             )}
// //                             {n.category}
// //                           </span>
// //                           {!n.read && (
// //                             <span className="rounded-full bg-[#011A8B] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
// //                               New
// //                             </span>
// //                           )}
// //                         </div>
// //                         <h3
// //                           className={`mt-2 text-sm ${
// //                             n.read
// //                               ? 'font-medium text-gray-900'
// //                               : 'font-semibold text-gray-900'
// //                           }`}
// //                         >
// //                           {n.title}
// //                         </h3>
// //                         <p className="mt-1 text-xs text-gray-600 line-clamp-2 sm:line-clamp-1">
// //                           {n.message}
// //                         </p>
// //                         {expandedId === n.id && (
// //                           <p className="mt-2 text-xs text-gray-600">
// //                             {n.message}
// //                           </p>
// //                         )}
// //                         <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
// //                           <span className="inline-flex items-center gap-1">
// //                             <Clock className="h-3 w-3" />
// //                             {formatDateTime(n.createdAt)}
// //                           </span>
// //                           {n.category === 'Holiday' && (
// //                             <span className="inline-flex items-center gap-1">
// //                               <CalendarDays className="h-3 w-3" />
// //                               Upcoming holiday
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </button>

// //                     <div className="flex flex-col items-end gap-2 text-[11px]">
// //                       <button
// //                         type="button"
// //                         onClick={() => toggleRead(n.id)}
// //                         className="rounded-full border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-700 hover:bg-gray-50"
// //                       >
// //                         {n.read ? 'Mark as unread' : 'Mark as read'}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useMemo, useState, useEffect } from 'react';

// const API_BASE_URL = "http://localhost:8080";
// const cleanBase = API_BASE_URL.replace(/\/+$/, "");

// // Custom SVG Icons
// const Bell = () => (
//   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//   </svg>
// );

// const CheckCircle2 = () => (
//   <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const AlertTriangle = () => (
//   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//   </svg>
// );

// const CalendarDays = () => (
//   <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//   </svg>
// );

// const Clock = () => (
//   <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const Info = () => (
//   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const typeAccent = (type) => {
//   if (type === 'success')
//     return 'bg-emerald-100 text-emerald-700 border-emerald-200';
//   if (type === 'warning')
//     return 'bg-amber-100 text-amber-700 border-amber-200';
//   if (type === 'error') return 'bg-red-100 text-red-700 border-red-200';
//   return 'bg-blue-100 text-blue-700 border-blue-200';
// };

// const typeDot = (type) => {
//   if (type === 'success') return 'bg-emerald-500';
//   if (type === 'warning') return 'bg-amber-500';
//   if (type === 'error') return 'bg-red-500';
//   return 'bg-blue-500';
// };

// const formatDateTime = (value) => {
//   try {
//     const d = new Date(value);
//     return d.toLocaleString(undefined, {
//       day: '2-digit',
//       month: 'short',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   } catch {
//     return value;
//   }
// };

// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch {
//     return dateString;
//   }
// };

// const formatMonthYear = (dateString) => {
//   if (!dateString) return '';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'long',
//       year: 'numeric',
//     });
//   } catch {
//     return dateString;
//   }
// };

// export default function EmployeeNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [expandedId, setExpandedId] = useState(null);

//   const safeUrl = (path) => {
//     const cleanPath = path.replace(/^\/+/, '');
//     return cleanBase ? `${cleanBase}/${cleanPath}` : `/${cleanPath}`;
//   };

//   // Fetch user details by ID
//   const fetchUserById = async (userId, token) => {
//     if (!userId) return null;
//     try {
//       const response = await fetch(safeUrl(`/api/users/${userId}`), {
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });
//       if (response.ok) {
//         const json = await response.json();
//         return json.data || null;
//       }
//     } catch (err) {
//       console.warn('Failed to fetch user:', userId, err);
//     }
//     return null;
//   };

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setLoading(true);

//       try {
//         const token = localStorage.getItem('token');
//         const commonHeaders = {
//           'Content-Type': 'application/json',
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         };

//         const allNotifications = [];
//         const userCache = {};

//         // Fetch Leave Notifications
//         try {
//           const leavesResponse = await fetch(safeUrl('/api/leaves/my-leaves'), {
//             headers: commonHeaders,
//           });

//           if (leavesResponse.ok) {
//             const leavesJson = await leavesResponse.json();
//             const leaves = leavesJson.data || [];

//             // Fetch reviewer names for leaves
//             const reviewerIds = [...new Set(leaves.map(l => l.reviewedBy).filter(Boolean))];
//             await Promise.all(
//               reviewerIds.map(async (id) => {
//                 if (!userCache[id]) {
//                   const user = await fetchUserById(id, token);
//                   if (user) {
//                     userCache[id] = user.fullName || user.name || user.firstName || 'Manager';
//                   }
//                 }
//               })
//             );

//             // Convert leaves to notifications
//             leaves.forEach((leave) => {
//               const status = (leave.status || '').toUpperCase();

//               if (status === 'APPROVED') {
//                 const reviewerName = leave.reviewedBy ? (userCache[leave.reviewedBy] || 'your manager') : 'your manager';

//                 allNotifications.push({
//                   id: `leave-${leave.id}`,
//                   title: 'Leave request approved',
//                   message: `Your leave request from ${formatDate(leave.startDate)} to ${formatDate(leave.endDate)} has been approved by ${reviewerName}.`,
//                   category: 'Leave',
//                   type: 'success',
//                   createdAt: leave.reviewedAt || leave.createdAt,
//                   read: false,
//                 });
//               } else if (status === 'REJECTED') {
//                 const reviewerName = leave.reviewedBy ? (userCache[leave.reviewedBy] || 'your manager') : 'your manager';

//                 allNotifications.push({
//                   id: `leave-${leave.id}`,
//                   title: 'Leave request rejected',
//                   message: `Your leave request from ${formatDate(leave.startDate)} to ${formatDate(leave.endDate)} has been rejected by ${reviewerName}.`,
//                   category: 'Leave',
//                   type: 'error',
//                   createdAt: leave.reviewedAt || leave.createdAt,
//                   read: false,
//                 });
//               }
//             });
//           }
//         } catch (err) {
//           console.warn('Failed to fetch leaves:', err);
//         }

//         // Fetch Payroll Notifications
//         try {
//           const payrollResponse = await fetch(safeUrl('/api/payroll/my-payroll'), {
//             headers: commonHeaders,
//           });

//           if (payrollResponse.ok) {
//             const payrollJson = await payrollResponse.json();
//             const payrolls = payrollJson.data || [];

//             // Convert payrolls to notifications
//             payrolls.forEach((payroll) => {
//               const status = (payroll.status || '').toUpperCase();

//               if (status === 'PAID' || status === 'CREDITED') {
//                 allNotifications.push({
//                   id: `payroll-${payroll.id}`,
//                   title: 'Salary credited',
//                   message: `Your salary for ${formatMonthYear(payroll.paymentDate || payroll.createdAt)} has been credited to your bank account.`,
//                   category: 'Payroll',
//                   type: 'info',
//                   createdAt: payroll.paymentDate || payroll.createdAt,
//                   read: false,
//                 });
//               }
//             });
//           }
//         } catch (err) {
//           console.warn('Failed to fetch payroll:', err);
//         }

//         // Add sample notifications for other categories if no data
//         if (allNotifications.length === 0) {
//           allNotifications.push({
//             id: 1,
//             title: 'Welcome to Notifications',
//             message: 'You will receive updates about leaves, payroll, attendance, and more here.',
//             category: 'HR',
//             type: 'info',
//             createdAt: new Date().toISOString(),
//             read: false,
//           });
//         }

//         // Sort notifications by date (newest first)
//         allNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         setNotifications(allNotifications);
//       } catch (err) {
//         console.error('Error fetching notifications:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const unreadCount = useMemo(
//     () => notifications.filter((n) => !n.read).length,
//     [notifications],
//   );

//   const filtered = useMemo(() => {
//     return notifications.filter((n) => {
//       if (activeFilter === 'all') return true;
//       if (activeFilter === 'unread') return !n.read;
//       return n.category.toLowerCase() === activeFilter;
//     });
//   }, [notifications, activeFilter]);

//   const markAllRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   };

//   const toggleRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
//     );
//   };

//   const clearAll = () => {
//     setNotifications([]);
//   };

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen bg-[#F5F7FF] flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading notifications...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#F5F7FF]">
//       <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">

//         {/* HERO HEADER */}
//         <div className="w-full bg-[#011A8B] text-white rounded-3xl px-8 py-6 mb-2 shadow-md">
//           <h1 className="text-3xl font-semibold mb-2">Notifications</h1>
//           <p className="text-sm text-blue-100 max-w-xl">
//             Stay updated with approvals, attendance alerts, payroll updates,
//             policy announcements, and important system messages.
//           </p>
//         </div>

//         {/* Top Status Bar */}
//         <div className="flex flex-wrap items-center justify-between">
//           <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#F3F4FF] px-3 py-1.5 text-xs text-[#011A8B]">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#011A8B]/40"></span>
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-[#011A8B]"></span>
//             </span>
//             {unreadCount > 0
//               ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
//               : 'You are all caught up'}
//           </div>

//           <div className="flex gap-2 text-xs">
//             <button
//               onClick={markAllRead}
//               className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
//             >
//               Mark all as read
//             </button>
//             <button
//               onClick={clearAll}
//               className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50"
//             >
//               Clear all
//             </button>
//           </div>
//         </div>

//         {/* Filter Pills */}
//         <div className="flex flex-wrap gap-2 text-xs font-medium">
//           {[
//             { key: 'all', label: 'All' },
//             { key: 'unread', label: 'Unread' },
//             { key: 'leave', label: 'Leave' },
//             { key: 'attendance', label: 'Attendance' },
//             { key: 'payroll', label: 'Payroll' },
//             { key: 'holiday', label: 'Holiday' },
//             { key: 'hr', label: 'HR & Policy' },
//           ].map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveFilter(tab.key)}
//               className={`rounded-full px-4 py-1.5 transition ${activeFilter === tab.key
//                 ? 'bg-[#011A8B] text-white shadow-sm'
//                 : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
//                 }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Info strip */}
//         <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-600 shadow-sm">
//           <Info />
//           Notifications are automatically generated from HR, attendance,
//           payroll, and system events.
//         </div>

//         {/* Notification List */}
//         <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
//           {filtered.length === 0 ? (
//             <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
//               <CheckCircle2 />
//               <p className="text-sm font-medium text-gray-800">
//                 No notifications to show
//               </p>
//               <p className="text-xs text-gray-500">
//                 New updates will appear here whenever available.
//               </p>
//             </div>
//           ) : (
//             <ul className="divide-y divide-gray-100">
//               {filtered.map((n) => (
//                 <li
//                   key={n.id}
//                   className={`px-4 py-4 sm:px-6 ${!n.read ? 'bg-[#F9FAFF]' : 'bg-white'
//                     }`}
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <button
//                       onClick={() =>
//                         setExpandedId((prev) => (prev === n.id ? null : n.id))
//                       }
//                       className="flex flex-1 items-start gap-3 text-left"
//                     >
//                       <span
//                         className={`mt-1 h-2.5 w-2.5 rounded-full ${typeDot(
//                           n.type,
//                         )}`}
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span
//                             className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${typeAccent(
//                               n.type,
//                             )}`}
//                           >
//                             {n.category}
//                           </span>
//                           {!n.read && (
//                             <span className="rounded-full bg-[#011A8B] px-2 py-0.5 text-[10px] font-semibold text-white">
//                               NEW
//                             </span>
//                           )}
//                         </div>

//                         <h3
//                           className={`mt-2 text-sm ${n.read
//                             ? 'font-medium text-gray-900'
//                             : 'font-semibold text-gray-900'
//                             }`}
//                         >
//                           {n.title}
//                         </h3>

//                         <p className="mt-1 text-xs text-gray-600 line-clamp-2">
//                           {n.message}
//                         </p>

//                         {expandedId === n.id && (
//                           <p className="mt-2 text-xs text-gray-600">
//                             {n.message}
//                           </p>
//                         )}

//                         <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
//                           <span className="inline-flex items-center gap-1">
//                             <Clock />
//                             {formatDateTime(n.createdAt)}
//                           </span>

//                           {n.category === 'Holiday' && (
//                             <span className="inline-flex items-center gap-1">
//                               <CalendarDays />
//                               Upcoming holiday
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </button>

//                     <button
//                       onClick={() => toggleRead(n.id)}
//                       className="rounded-full border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-700 hover:bg-gray-50"
//                     >
//                       {n.read ? 'Mark unread' : 'Mark read'}
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  Info,
  CheckCheck,
  Trash2,
  X,
  Pin,
  Download,
  Eye,
  FileText
} from 'lucide-react';

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ HttpOnly cookie auth
});


export default function EmployeeNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState('all');

  // ---------- LOAD DATA ----------
  // Auto-clear errors
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

const fetchNotifications = useCallback(async () => {
  setLoading(true);
  try {
    const res = await api.get("/api/employee/notifications");
    const data = res.data || [];

const sorted = [...data].sort((a, b) => {
  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
  if (a.read !== b.read) return a.read ? 1 : -1;
  if (a.reqAck !== b.reqAck && !a.isAcknowledged)
    return a.reqAck ? -1 : 1;
  return new Date(b.createdAt) - new Date(a.createdAt);
});

    setNotifications(sorted);
  } catch (err) {
    console.error("Fetch failed:", err);
    setError("Could not load latest notifications.");
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchNotifications();
}, [fetchNotifications]);




  // ---------- ACTIONS ----------
  
  const markAsRead = async (id) => {
    // Optimistic Update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
  await api.put(`/api/employee/notifications/${id}/read`);


    } catch (err) {
      console.error("Mark read failed", err);
    }
  };

  const markAllRead = async () => {
    if (!notifications.some(n => !n.read)) return; 

    const prevNotifications = [...notifications];
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    try {
await api.put("/api/employee/notifications/read-all");
    } catch (err) {
      console.error("Mark all read failed", err);
      setError("Failed to mark all as read on server.");
      setNotifications(prevNotifications);
    }
  };

  const handleAcknowledge = async (id, e) => {
    e.stopPropagation();
    
    // Optimistic Update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isAcknowledged: true, read: true } : n));

    try {
await api.put(`/api/employee/notifications/${id}/acknowledge`);


    } catch (err) {
      console.error(err);
      setError("Failed to submit acknowledgement.");
    }
  };

  const handleDownload = async (n, e) => {
    e.stopPropagation();
    if (n.attachmentUrl) {
       window.open(n.attachmentUrl, '_blank');
    } else {
       alert("Downloading attachment: " + n.attachmentName);
    }
  };

  const deleteNotification = async (id, e) => {
    e.stopPropagation(); 
    if (!confirm("Remove this notification?")) return;

    const prevNotifications = [...notifications];
    setNotifications(prev => prev.filter(n => n.id !== id));

    try {
await api.delete(`/api/employee/notifications/${id}`);

    } catch (err) {
      console.error("Delete failed", err);
      setError("Could not remove notification.");
      setNotifications(prevNotifications);
    }
  };

  // ---------- COMPUTED DATA ----------
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);
  
  const actionRequiredCount = useMemo(() => 
    notifications.filter(n => n.reqAck && !n.isAcknowledged).length, 
  [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'unread') return !n.read;
      if (activeFilter === 'action') return n.reqAck && !n.isAcknowledged;
      return true;
    });
  }, [notifications, activeFilter]);

  // ---------- UI HELPERS ----------
  const getIcon = (priority) => {
    if (priority === 'HIGH') return <AlertTriangle className="w-5 h-5 text-red-600" />;
    if (priority === 'LOW') return <Info className="w-5 h-5 text-slate-500" />;
    return <Bell className="w-5 h-5 text-blue-600" />;
  };

  const getPriorityBorder = (priority, read) => {
    if (read) return 'border-slate-200';
    if (priority === 'HIGH') return 'border-l-4 border-l-red-500 border-y-slate-100 border-r-slate-100';
    return 'border-l-4 border-l-blue-600 border-y-slate-100 border-r-slate-100';
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC] font-sans text-slate-800">
      
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-900">My Notifications</h1>
            <p className="text-slate-500 text-sm">
              Manage alerts, policy updates, and compliance acknowledgements.
            </p>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Unread */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unread</p>
              <h3 className="text-2xl font-bold text-slate-800">{unreadCount}</h3>
            </div>
          </div>

          {/* Card 2: Action Required */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Required</p>
              <h3 className="text-2xl font-bold text-slate-800">{actionRequiredCount}</h3>
            </div>
          </div>

          {/* Card 3: Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Quick Filter</span>
              <button onClick={markAllRead} className="text-xs text-blue-600 font-semibold hover:underline">Mark all read</button>
            </div>
            <div className="flex gap-2">
              {['all', 'unread', 'action'].map(filter => (
                 <button
                   key={filter}
                   onClick={() => setActiveFilter(filter)}
                   className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all capitalize ${
                     activeFilter === filter 
                     ? 'bg-blue-900 text-white border-blue-900' 
                     : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                   }`}
                 >
                   {filter}
                 </button>
              ))}
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
               <AlertTriangle className="w-4 h-4" /> {error}
            </span>
            <button onClick={() => setError("")}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-700 ml-1">
            Recent Alerts
            {loading && <span className="ml-2 font-normal text-slate-400">Loading...</span>}
          </h2>

          {!loading && filteredNotifications.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
               <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                 <CheckCircle className="w-6 h-6 text-slate-300" />
               </div>
               <p className="text-slate-500 font-medium">No notifications found.</p>
            </div>
          )}

          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.read && markAsRead(n.id)}
              className={`group flex flex-col md:flex-row gap-5 p-5 bg-white rounded-2xl border shadow-sm transition-all duration-200 ${getPriorityBorder(n.priority, n.read)} hover:shadow-md cursor-pointer`}
            >
              {/* Left: Icon & Main Content */}
              <div className="flex flex-1 gap-5 overflow-hidden">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${!n.read ? 'bg-slate-100' : 'bg-slate-50'}`}>
                  {getIcon(n.priority)}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                   {/* Title Row */}
                   <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-base ${!n.read ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
                        {n.title}
                      </h3>
                      {n.isPinned && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                      )}
                      {!n.read && (
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold">New</span>
                      )}
                      {n.reqAck && !n.isAcknowledged && (
                         <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold border border-purple-200">
                           Action Required
                         </span>
                      )}
                   </div>
                   
                   {/* Message Body - preserves whitespace/lines */}
                   <p className="text-sm text-slate-500 whitespace-pre-wrap leading-relaxed max-w-3xl">
                     {n.message}
                   </p>

                   {/* Attachment Block */}
                   {n.attachmentName && (
                     <div 
                        onClick={(e) => handleDownload(n, e)}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg w-fit mt-2 hover:bg-slate-100 transition-colors group/file"
                     >
                       <div className="p-2 bg-white rounded border border-slate-200">
                         <FileText className="w-4 h-4 text-red-500" />
                       </div>
                       <div>
                         <p className="text-xs font-bold text-slate-700">{n.attachmentName}</p>
                         <p className="text-[10px] text-slate-400">Click to download</p>
                       </div>
                       <Download className="w-4 h-4 text-slate-400 group-hover/file:text-blue-600 ml-2" />
                     </div>
                   )}
                </div>
              </div>

              {/* Right: Actions & Meta */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 md:min-w-[180px]">
                 
                 {/* Timestamp */}
                 <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-slate-300">
                      {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    {/* Expiry Warning */}
                    {n.expiresAt && new Date(n.expiresAt) < new Date(Date.now() + 86400000) && (
                      <span className="flex items-center justify-end gap-1 text-[10px] text-amber-600 mt-1 font-medium">
                         <Clock className="w-3 h-3" /> Expires Soon
                      </span>
                    )}
                 </div>

                 <div className="flex items-center gap-2">
                   <button
                      onClick={(e) => deleteNotification(n.id, e)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>

                   {/* Conditional Action Button */}
                   {n.reqAck && !n.isAcknowledged ? (
                      <button
                        onClick={(e) => handleAcknowledge(n.id, e)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <Eye className="w-3 h-3" /> Acknowledge
                      </button>
                   ) : !n.read ? (
                     <button 
                       onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                       className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                     >
                       <CheckCheck className="w-3 h-3" /> Mark Read
                     </button>
                   ) : (
                     <div className="flex items-center gap-1 text-slate-300 text-xs font-medium px-2">
                       {n.isAcknowledged ? (
                         <><CheckCircle className="w-3 h-3 text-purple-400" /> Ack'd</>
                       ) : (
                         <><CheckCircle className="w-3 h-3" /> Read</>
                       )}
                     </div>
                   )}
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}