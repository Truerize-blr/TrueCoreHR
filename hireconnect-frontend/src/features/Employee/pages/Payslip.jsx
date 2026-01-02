import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  const moneyPDF = (num) => "Rs. " + Number(num).toLocaleString("en-IN");

  // 🔥 UPDATED: Use employeeId and employeeName from enriched DTO
  const getEmployeeName = (p) => p.employeeName || p.userName || "N/A";
  const getEmployeeId = (p) => p.employeeId || "N/A";
  const getJoiningDate = (p) => {
    if (p.joiningDate) {
      try {
        return new Date(p.joiningDate).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      } catch {
        return "N/A";
      }
    }
    return "N/A";
  };

  const downloadPDF = (p) => {
    const employeeName = getEmployeeName(p);
    const employeeId = getEmployeeId(p);
    const joiningDate = getJoiningDate(p);

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.width;

    const company = {
      name: "Truerize IQ Strategic Solutions Pvt Ltd",
      address:
        "Plot No. 40, 12th Main Road, Near HSR BDA Complex Bengaluru, Karnataka - 560102",
      website: "www.truerize.com",
      email: "info@truerize.com",
      phone: "+91 080 41708341",
      gst: "GST No :- 29AAMCT0994K1ZJ",
      logo: "/assets/Logo_Truerize.png",
    };

    const employee = {
      id: employeeId,
      name: employeeName,
      joiningDate: joiningDate,
      payPeriod: p.payPeriod || p.payrollMonth,
      payDate: p.payDate || p.payrollMonth,
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
      deduction_Medical: 0,
    };

    const totalEarnings =
      employee.basic +
      employee.hra +
      employee.conveyance +
      employee.medical +
      employee.special +
      employee.pf;

    const totalDeductions =
      employee.deduction_IT +
      employee.deduction_PF +
      employee.deduction_PT +
      employee.deduction_Medical;

    const netSalary = totalEarnings - totalDeductions;

    const logo = new Image();
    logo.src = company.logo;

    logo.onload = () => {
      doc.addImage(logo, "PNG", 40, 20, 80, 80);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 26, 91);
      doc.text(company.name, 135, 50);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Payslip For the Month", pageWidth - 140, 40);
      doc.setFontSize(12);
      doc.text(employee.month, pageWidth - 140, 55);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      let yPos = 110;
      const addressLines = doc.splitTextToSize(company.address, 500);
      addressLines.forEach((line) => {
        doc.text(line, 40, yPos);
        yPos += 10;
      });
      doc.text(
        `${company.website} | ${company.email} | ${company.phone} | ${company.gst}`,
        40,
        yPos
      );

      const summaryStartY = yPos + 20;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("EMPLOYEE SUMMARY", 40, summaryStartY);

      let textY = summaryStartY + 15;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Employee Name", 70, textY);
      doc.text(": " + employee.name, 200, textY);
      textY += 15;
      doc.text("Employee ID", 70, textY);
      doc.text(": " + employee.id, 200, textY);

      textY += 15;
      doc.text("Joining Date", 70, textY);
      doc.text(": " + employee.joiningDate, 200, textY);

      textY += 15;
      doc.text("Pay Period", 70, textY);
      doc.text(": " + employee.payPeriod, 200, textY);

      textY += 15;
      doc.text("Pay Date", 70, textY);
      doc.text(": " + employee.payDate, 200, textY);

      const tablesStartY = textY + 25;

      autoTable(doc, {
        startY: tablesStartY + 5,
        margin: { left: 40, right: pageWidth / 2 + 10 },
        head: [["", "AMOUNT"]],
        body: [
          ["Basic", moneyPDF(employee.basic)],
          ["House Rent Allowance", moneyPDF(employee.hra)],
          ["Conveyance", moneyPDF(employee.conveyance)],
          ["Medical Allowance", moneyPDF(employee.medical)],
          ["Special Allowance", moneyPDF(employee.special)],
          ["Employer PF Contribution", moneyPDF(employee.pf)],
          ["", ""],
          ["Gross Earnings", moneyPDF(totalEarnings)],
        ],
      });

      autoTable(doc, {
        startY: tablesStartY + 5,
        margin: { left: pageWidth / 2 + 20, right: 40 },
        head: [["", "AMOUNT"]],
        body: [
          ["Income Tax", moneyPDF(employee.deduction_IT)],
          ["Provident Fund", moneyPDF(employee.deduction_PF)],
          ["Medical Insurance", moneyPDF(employee.deduction_Medical)],
          ["Profession Tax", moneyPDF(employee.deduction_PT)],
          ["", ""],
          ["", ""],
          ["", ""],
          ["Total Deductions", moneyPDF(totalDeductions)],
        ],
      });

      const finalY = Math.max(doc.lastAutoTable.finalY, tablesStartY + 200) + 20;

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("TOTAL NET PAYABLE", 55, finalY + 20);
      doc.text(moneyPDF(netSalary), pageWidth - 160, finalY + 20);

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