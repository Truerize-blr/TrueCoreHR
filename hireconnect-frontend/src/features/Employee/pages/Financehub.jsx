
// import React, { useEffect, useState } from "react";
// import { Download } from "lucide-react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function Payslip() {
//   const [payrolls, setPayrolls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = JSON.parse(localStorage.getItem("userId"));

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     fetch(`http://localhost:8080/api/payroll/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setPayrolls(data.data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [userId]);

//   if (!userId) return <p className="text-red-600 p-4">User ID missing in localStorage.</p>;
//   if (loading) return <p className="p-4">Loading payroll data...</p>;
//   if (payrolls.length === 0) return <p className="p-4 text-red-600">No payroll data found.</p>;

//   const money = (num) => "₹" + Number(num).toLocaleString("en-IN");
//   const moneyPDF = (num) => "Rs. " + Number(num).toLocaleString("en-IN");

//   // Convert number to words
//   const numberToWords = (num) => {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

//     if (num === 0) return 'Zero';

//     const crores = Math.floor(num / 10000000);
//     const lakhs = Math.floor((num % 10000000) / 100000);
//     const thousands = Math.floor((num % 100000) / 1000);
//     const hundreds = Math.floor((num % 1000) / 100);
//     const remainder = num % 100;

//     let words = '';

//     if (crores) words += numberToWords(crores) + ' Crore ';
//     if (lakhs) words += numberToWords(lakhs) + ' Lakh ';
//     if (thousands) words += numberToWords(thousands) + ' Thousand ';
//     if (hundreds) words += ones[hundreds] + ' Hundred ';

//     if (remainder > 0) {
//       if (remainder < 10) words += ones[remainder];
//       else if (remainder < 20) words += teens[remainder - 10];
//       else {
//         words += tens[Math.floor(remainder / 10)];
//         if (remainder % 10) words += ' ' + ones[remainder % 10];
//       }
//     }

//     return words.trim() + " Only";
//   };

//   const downloadPDF = (p) => {
//     const doc = new jsPDF("p", "pt", "a4");
//     const pageWidth = doc.internal.pageSize.width;

//     // Company Details
//     const company = {
//       name: "Truerize IQ Strategic Solutions Pvt Ltd",
//       address: 'Plot No. 40, 12th Main Road, Near HSR BDA Complex Bengaluru, Karnataka - 560102',
//       website: "www.truerize.com",
//       email: "info@truerize.com",
//       phone: "+91 080 41708341",
//       gst: "GST No :- 29AAMCT0994K1ZJ",
//       logo: "/assets/Logo_Truerize.png",
//     };

//     // Employee summary values from API
//     const employee = {
//       id: p.userId,
//       name: p.employeeName || "N/A",
//       joiningDate: p.joiningDate || "N/A",
//       payPeriod: p.payPeriod || `${p.payrollMonth}`,
//       payDate: p.payDate || p.payrollMonth,
//       month: p.payrollMonth,
//       source: p.source || "Payroll System",
//       basic: p.basicSalary,
//       hra: p.hra,
//       conveyance: p.conveyanceAllowance,
//       medical: p.medicalAllowance,
//       special: p.otherAllowances,
//       pf: p.pfEmployee,
//       deduction_IT: p.taxDeductions,
//       deduction_PF: p.pfEmployee,
//       deduction_PT: p.professionalTax,
//       deduction_Medical: 0,
//     };

//     const totalEarnings = employee.basic + employee.hra + employee.conveyance + employee.medical + employee.special + employee.pf;
//     const totalDeductions = employee.deduction_IT + employee.deduction_PF + employee.deduction_PT + employee.deduction_Medical;
//     const netSalary = totalEarnings - totalDeductions;

//     // Add Logo
//     const logo = new Image();
//     logo.src = company.logo;

//     logo.onload = () => {
//       doc.addImage(logo, "PNG", 40, 20, 80, 80);

//       // Company Name
//       doc.setFontSize(18);
//       doc.setFont("helvetica", "bold");
//       doc.setTextColor(0, 26, 91);
//       doc.text(company.name, 135, 50);

//       // Payslip Month
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "bold");
//       doc.setTextColor(0, 0, 0);
//       doc.text("Payslip For the Month", pageWidth - 140, 40);
//       doc.setFontSize(12);
//       doc.text(employee.month, pageWidth - 140, 55);

//       // Company Address
//       doc.setFontSize(8);
//       doc.setFont("helvetica", "normal");
//       const addressLines = doc.splitTextToSize(company.address, 500);
//       let yPos = 110;
//       addressLines.forEach(line => {
//         doc.text(line, 40, yPos);
//         yPos += 10;
//       });
//       doc.text(`${company.website} | ${company.email} | ${company.phone} | ${company.gst}`, 40, yPos);

//       // EMPLOYEE SUMMARY
//       const summaryStartY = yPos + 20;
//       doc.setFontSize(11);
//       doc.setFont("helvetica", "bold");
//       doc.text("EMPLOYEE SUMMARY", 40, summaryStartY);

//       let textY = summaryStartY + 15;
//       doc.setFontSize(9);
//       doc.setFont("helvetica", "normal");
//       doc.text("Employee Name", 70, textY);
//       doc.text(": " + employee.name, 200, textY);
//       textY += 15;
//       doc.text("Joining Date", 70, textY);
//       doc.text(": " + employee.joiningDate, 200, textY);
//       textY += 15;
//       doc.text("Pay Period", 70, textY);
//       doc.text(": " + employee.payPeriod, 200, textY);
//       textY += 15;
//       doc.text("Pay Date", 70, textY);
//       doc.text(": " + employee.payDate, 200, textY);

//       // Earnings Table
//       const tablesStartY = textY + 25;
//       doc.setFontSize(11);
//       doc.setFont("helvetica", "bold");
//       doc.text("EARNINGS", 40, tablesStartY);

//       autoTable(doc, {
//         startY: tablesStartY + 5,
//         margin: { left: 40, right: pageWidth / 2 + 10 },
//         head: [["", "AMOUNT"]],
//         body: [
//           ["Basic", moneyPDF(employee.basic)],
//           ["House Rent Allowance", moneyPDF(employee.hra)],
//           ["Conveyance", moneyPDF(employee.conveyance)],
//           ["Medical Allowance", moneyPDF(employee.medical)],
//           ["Special Allowance", moneyPDF(employee.special)],
//           ["Employer PF Contribution", moneyPDF(employee.pf)],
//           ["", ""],
//           ["Gross Earnings", moneyPDF(totalEarnings)],
//         ],
//         headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: "bold", fontSize: 9 },
//         styles: { fontSize: 9, cellPadding: 5 },
//         columnStyles: { 0: { cellWidth: 150 }, 1: { cellWidth: 80, halign: "right" } },
//         bodyStyles: { 7: { fontStyle: "bold" } },
//       });

//       // Deductions Table
//       doc.text("DEDUCTIONS", pageWidth / 2 + 20, tablesStartY);
//       autoTable(doc, {
//         startY: tablesStartY + 5,
//         margin: { left: pageWidth / 2 + 20, right: 40 },
//         head: [["", "AMOUNT"]],
//         body: [
//           ["Income Tax", moneyPDF(employee.deduction_IT)],
//           ["Provident Fund", moneyPDF(employee.deduction_PF)],
//           ["Medical Insurance", moneyPDF(employee.deduction_Medical)],
//           ["Profession Tax", moneyPDF(employee.deduction_PT)],
//           ["", ""],
//           ["", ""],
//           ["", ""],
//           ["Total Deductions", moneyPDF(totalDeductions)],
//         ],
//         headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: "bold", fontSize: 9 },
//         styles: { fontSize: 9, cellPadding: 5 },
//         columnStyles: { 0: { cellWidth: 150 }, 1: { cellWidth: 80, halign: "right" } },
//         bodyStyles: { 7: { fontStyle: "bold" } },
//       });

//       // Total Net Payable
//       const finalY = Math.max(doc.lastAutoTable.finalY, tablesStartY + 200) + 20;
//       doc.setFillColor(230, 255, 230);
//       doc.roundedRect(40, finalY, pageWidth - 80, 45, 5, 5, "F");
//       doc.setDrawColor(150, 200, 150);
//       doc.setLineWidth(1);
//       doc.roundedRect(40, finalY, pageWidth - 80, 45, 5, 5, "S");

//       doc.setFontSize(11);
//       doc.setFont("helvetica", "bold");
//       doc.text("TOTAL NET PAYABLE", 55, finalY + 20);
//       doc.text(moneyPDF(netSalary), pageWidth - 160, finalY + 20);
//       doc.setFontSize(9);
//       doc.setFont("helvetica", "normal");
//       doc.text("Gross Earnings - Total Deductions", 55, finalY + 35);

//       doc.text(`Amount In Words : ${numberToWords(netSalary)}`, 40, finalY + 60);

//       const footerY = doc.internal.pageSize.height - 30;
//       doc.setFontSize(8);
//       doc.setFont("helvetica", "italic");
//       doc.setTextColor(100, 100, 100);
//       doc.text("-- This is a system-generated document. --", pageWidth / 2, footerY, { align: "center" });

//       doc.save(`Payslip_${employee.name}_${employee.month}.pdf`);
//     };

//     logo.onerror = () => alert("Logo failed to load. Please check the logo path.");
//   };

//   return (
//     <div className="w-full p-6">
//       <h2 className="text-xl font-semibold text-[#011A8B] mb-4">Payslip</h2>

//       <div className="rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-[#F3F4FF] text-[#011A8B] text-sm font-semibold">
//             <tr>
//               <th className="px-4 py-3 text-left">Employee Name</th>
//               <th className="px-4 py-3 text-left">Month</th>
//               <th className="px-4 py-3 text-left">Source</th>
//               <th className="px-4 py-3 text-left">Net Salary</th>
//               <th className="px-4 py-3 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="text-sm text-gray-700">
//             {payrolls.map((p) => {
//               const netSalary = p.totalEarnings - p.totalDeductions;
//               return (
//                 <tr key={p.id} className="border-t hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">{p.employeeName || "N/A"}</td>
//                   <td className="px-4 py-3">{p.payrollMonth}</td>
//                   <td className="px-4 py-3">{p.source || "Payroll System"}</td>
//                   <td className="px-4 py-3 font-semibold">{money(netSalary)}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-4 items-center">
//                       <button
//                         onClick={() => downloadPDF(p)}
//                         className="hover:text-[#011A8B] transition"
//                         title="Download PDF"
//                       >
//                         <Download size={20} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function Payslip() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/payroll/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPayrolls(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (!userId)
    return <p className="text-red-600 p-4">User ID missing in localStorage.</p>;
  if (loading) return <p className="p-4">Loading payroll data...</p>;
  if (payrolls.length === 0)
    return <p className="p-4 text-red-600">No payroll data found.</p>;

  const money = (num) => "₹" + Number(num).toLocaleString("en-IN");
  const moneyPDF = (num) => "Rs." + Number(num).toFixed(2);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return "N/A";
    }
  };

  const numberToWords = (num) => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

    if (num === 0) return "Zero";

    const crores = Math.floor(num / 10000000);
    const lakhs = Math.floor((num % 10000000) / 100000);
    const thousands = Math.floor((num % 100000) / 1000);
    const hundreds = Math.floor((num % 1000) / 100);
    const remainder = num % 100;

    let words = "";

    if (crores) words += numberToWords(crores) + " Crore ";
    if (lakhs) words += numberToWords(lakhs) + " Lakh ";
    if (thousands) words += numberToWords(thousands) + " Thousand ";
    if (hundreds) words += ones[hundreds] + " Hundred ";

    if (remainder > 0) {
      if (remainder < 10) words += ones[remainder];
      else if (remainder < 20) words += teens[remainder - 10];
      else {
        words += tens[Math.floor(remainder / 10)];
        if (remainder % 10 > 0) words += " " + ones[remainder % 10];
      }
    }

    return words.trim() + " Only";
  };

  const getEmployeeName = (p) =>
    p.employeeName || p.employee?.name || p.userName || "N/A";

  const getEmployeeId = (p) =>
    p.employeeId || p.employee?.id || p.userId || "N/A";

  const downloadPDF = (p) => {
    if (typeof window.jspdf === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
        script2.onload = () => generatePDF(p);
        document.head.appendChild(script2);
      };
      document.head.appendChild(script);
    } else {
      generatePDF(p);
    }
  };

  const generatePDF = (p) => {
    const { jsPDF } = window.jspdf;
    const employeeName = getEmployeeName(p);
    const employeeId = getEmployeeId(p);

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.width;

    const company = {
      name: "Truerize IQ Strategic Solutions Pvt Ltd",
      address: "Plot No. 40, 12th Main Road, Near HSR BDA Complex Bengaluru, Karnataka - 560102",
      website: "www.truerize.com",
      email: "info@truerize.com",
      phone: "+91 080 41708341",
      gst: "GST No :- 29AAMCT0994K1ZJ",
      logo: "/assets/Logo_Truerize.png",
    };

    const employee = {
      id: employeeId,
      name: employeeName,
      payPeriod: p.payPeriod || p.payrollMonth,
      payDate: formatDate(p.payDate) || formatDate(p.payrollMonth),
      month: p.payrollMonth,
      basic: p.basicSalary || 0,
      hra: p.hra || 0,
      conveyance: p.conveyanceAllowance || 0,
      medical: p.medicalAllowance || 0,
      special: p.otherAllowances || 0,
      pf: p.pfEmployee || 0,
      deduction_IT: p.taxDeductions || 0,
      deduction_PF: p.pfEmployee || 0,
      deduction_PT: p.professionalTax || 0,
      deduction_Medical: p.medicalInsurance || 269,
      lop: p.lossOfPay || 0,
    };

    const paidDays = p.paidDays || 30;
    const lopDays = p.lopDays || 0;

    const grossEarnings =
      employee.basic +
      employee.hra +
      employee.conveyance +
      employee.medical +
      employee.special;

    const totalDeductions =
      employee.deduction_IT +
      employee.deduction_PF +
      employee.deduction_PT +
      employee.deduction_Medical +
      employee.lop;

    const netSalary = grossEarnings - totalDeductions;
    const netWords = `Indian Rupee ${numberToWords(Math.floor(netSalary))}`;

    const logo = new Image();
    logo.src = company.logo;

    logo.onload = () => {
      // Logo
      doc.addImage(logo, "PNG", 40, 20, 80, 80);

      // Company name (next to logo)
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 26, 91);
      doc.text(company.name, 140, 45);

      // Payslip For the Month - TOP RIGHT
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Payslip For the Month", pageWidth - 40, 40, { align: "right" });
      doc.setFontSize(11);
      doc.text(employee.month, pageWidth - 40, 55, { align: "right" });

      // Address block
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(company.address, 40, 110);
      doc.setFontSize(7);
      doc.text(`${company.website} | ${company.email} | ${company.phone} | ${company.gst}`, 40, 125);

      // Employee info with Paid Days and LOP Days
      let yPos = 155;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      // Left column
      doc.text("Employee Name", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(employee.name, 145, yPos);

      // Right column
      doc.text("Paid Days", pageWidth - 180, yPos);
      doc.text(":", pageWidth - 100, yPos);
      doc.text(String(paidDays), pageWidth - 85, yPos);
      yPos += 15;

      doc.text("Employee ID", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(String(employee.id), 145, yPos);

      doc.text("LOP Days", pageWidth - 180, yPos);
      doc.text(":", pageWidth - 100, yPos);
      doc.text(String(lopDays), pageWidth - 85, yPos);
      yPos += 15;

      doc.text("Pay Period", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(employee.payPeriod, 145, yPos);
      yPos += 15;

      doc.text("Pay Date", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(employee.payDate, 145, yPos);

      // Tables
      const tableStartY = yPos + 30;

      // EARNINGS TABLE
      doc.autoTable({
        startY: tableStartY,
        margin: { left: 40, right: pageWidth / 2 + 10 },
        head: [["EARNINGS", "AMOUNT"]],
        body: [
          ["Basic", moneyPDF(employee.basic)],
          ["House Rent Allowance", moneyPDF(employee.hra)],
          ["Conveyance", moneyPDF(employee.conveyance)],
          ["Medical Allowan", moneyPDF(employee.medical)],
          ["Special Allowance", moneyPDF(employee.special)],
          ["", ""],
          ["Gross Earnings", moneyPDF(grossEarnings)],
        ],
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: { fontSize: 8 },
        theme: "grid",
      });

      // DEDUCTIONS TABLE
      doc.autoTable({
        startY: tableStartY,
        margin: { left: pageWidth / 2 + 20, right: 40 },
        head: [["DEDUCTIONS", "AMOUNT"]],
        body: [
          ["Income Tax", moneyPDF(employee.deduction_IT)],
          ["Provident Fund", moneyPDF(employee.deduction_PF)],
          ["Medical Insurance", moneyPDF(employee.deduction_Medical)],
          ["Profession Tax", moneyPDF(employee.deduction_PT)],
          ["Loss of Pay", moneyPDF(employee.lop)],
          ["", ""],
          ["Total Deductions", moneyPDF(totalDeductions)],
        ],
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: { fontSize: 8 },
        theme: "grid",
      });

      const finalY = doc.lastAutoTable.finalY + 30;

      // EMPLOYEE SUMMARY
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("EMPLOYEE SUMMARY", 40, finalY);

      doc.setFontSize(9);
      doc.text("TOTAL NET PAYABLE", 40, finalY + 20);
      doc.text(moneyPDF(netSalary), pageWidth - 40, finalY + 20, { align: "right" });

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Gross Earnings - Total Deductions", 40, finalY + 35);

      // Amount in words
      doc.setFontSize(8);
      doc.text(`Amount In Words : ${netWords}`, 40, finalY + 55);

      // Total Net Pay
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Total Net Pay", 40, finalY + 75);
      doc.text(moneyPDF(netSalary), pageWidth - 40, finalY + 75, { align: "right" });

      // Footer
      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.text("-- This is a system-generated document. --", pageWidth / 2, finalY + 100, { align: "center" });

      // Company footer
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Truerize IQ Strategic", 40, finalY + 130);
      doc.text("Solutions Pvt Ltd", 40, finalY + 145);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(company.address, 40, finalY + 160);
      
      doc.setFontSize(7);
      doc.text(`${company.website} | ${company.email} | ${company.phone} | ${company.gst}`, 40, finalY + 175);

      doc.save(`Payslip_${employee.name}_${employee.month}.pdf`);
    };

    logo.onerror = () => {
      // Generate PDF without logo if it fails to load
      console.warn('Logo failed to load');
      
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 26, 91);
      doc.text(company.name, 40, 45);

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Payslip For the Month", pageWidth - 40, 40, { align: "right" });
      doc.setFontSize(11);
      doc.text(employee.month, pageWidth - 40, 55, { align: "right" });

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(company.address, 40, 80);
      doc.setFontSize(7);
      doc.text(`${company.website} | ${company.email} | ${company.phone} | ${company.gst}`, 40, 95);

      let yPos = 125;
      doc.setFontSize(9);

      doc.text("Employee Name", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(employee.name, 145, yPos);
      doc.text("Paid Days", pageWidth - 180, yPos);
      doc.text(":", pageWidth - 100, yPos);
      doc.text(String(paidDays), pageWidth - 85, yPos);
      yPos += 15;

      doc.text("Employee ID", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(String(employee.id), 145, yPos);
      doc.text("LOP Days", pageWidth - 180, yPos);
      doc.text(":", pageWidth - 100, yPos);
      doc.text(String(lopDays), pageWidth - 85, yPos);
      yPos += 15;

      doc.text("Pay Period", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(employee.payPeriod, 145, yPos);
      yPos += 15;

      doc.text("Pay Date", 40, yPos);
      doc.text(":", 130, yPos);
      doc.text(employee.payDate, 145, yPos);

      const tableStartY = yPos + 30;

      doc.autoTable({
        startY: tableStartY,
        margin: { left: 40, right: pageWidth / 2 + 10 },
        head: [["EARNINGS", "AMOUNT"]],
        body: [
          ["Basic", moneyPDF(employee.basic)],
          ["House Rent Allowance", moneyPDF(employee.hra)],
          ["Conveyance", moneyPDF(employee.conveyance)],
          ["Medical Allowan", moneyPDF(employee.medical)],
          ["Special Allowance", moneyPDF(employee.special)],
          ["", ""],
          ["Gross Earnings", moneyPDF(grossEarnings)],
        ],
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: { fontSize: 8 },
        theme: "grid",
      });

      doc.autoTable({
        startY: tableStartY,
        margin: { left: pageWidth / 2 + 20, right: 40 },
        head: [["DEDUCTIONS", "AMOUNT"]],
        body: [
          ["Income Tax", moneyPDF(employee.deduction_IT)],
          ["Provident Fund", moneyPDF(employee.deduction_PF)],
          ["Medical Insurance", moneyPDF(employee.deduction_Medical)],
          ["Profession Tax", moneyPDF(employee.deduction_PT)],
          ["Loss of Pay", moneyPDF(employee.lop)],
          ["", ""],
          ["Total Deductions", moneyPDF(totalDeductions)],
        ],
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: { fontSize: 8 },
        theme: "grid",
      });

      const finalY = doc.lastAutoTable.finalY + 30;

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("EMPLOYEE SUMMARY", 40, finalY);

      doc.setFontSize(9);
      doc.text("TOTAL NET PAYABLE", 40, finalY + 20);
      doc.text(moneyPDF(netSalary), pageWidth - 40, finalY + 20, { align: "right" });

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Gross Earnings - Total Deductions", 40, finalY + 35);

      doc.setFontSize(8);
      doc.text(`Amount In Words : ${netWords}`, 40, finalY + 55);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Total Net Pay", 40, finalY + 75);
      doc.text(moneyPDF(netSalary), pageWidth - 40, finalY + 75, { align: "right" });

      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.text("-- This is a system-generated document. --", pageWidth / 2, finalY + 100, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Truerize IQ Strategic", 40, finalY + 130);
      doc.text("Solutions Pvt Ltd", 40, finalY + 145);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(company.address, 40, finalY + 160);
      
      doc.setFontSize(7);
      doc.text(`${company.website} | ${company.email} | ${company.phone} | ${company.gst}`, 40, finalY + 175);

      doc.save(`Payslip_${employee.name}_${employee.month}.pdf`);
    };
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold text-[#011A8B] mb-4">Payslip</h2>

      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-[#F3F4FF] text-[#011A8B] text-sm font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Employee Name</th>
              <th className="px-4 py-3 text-left">Employee ID</th>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Net Salary</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {payrolls.map((p) => {
              const netSalary = (p.totalEarnings || 0) - (p.totalDeductions || 0);

              return (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{getEmployeeName(p)}</td>
                  <td className="px-4 py-3">{getEmployeeId(p)}</td>
                  <td className="px-4 py-3">{p.payrollMonth}</td>
                  <td className="px-4 py-3">{p.source || "Payroll System"}</td>
                  <td className="px-4 py-3 font-semibold">{money(netSalary)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => downloadPDF(p)}
                      className="hover:text-[#011A8B] transition"
                    >
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
