// import React from "react";

// export default function TaxDeclaration() {
//   return (
//     <div className="section-box">
//       <h2>Tax Declarations</h2>

//       <table className="fin-table">
//         <thead>
//           <tr>
//             <th>Financial Year</th>
//             <th>Total Income</th>
//             <th>Taxable Income</th>
//             <th>Tax Payable</th>
//             <th>Status</th>
//             <th>Submitted</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td>2025-2026</td>
//             <td>—</td>
//             <td>—</td>
//             <td>—</td>
//             <td>Pending</td>
//             <td>No</td>
//             <td>—</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from "react";

export default function TaxDeclaration() {
  return (
    <div className="w-full">
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-[#011A8B] mb-4">
        Tax Declarations
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="min-w-full">
          
          {/* Table Header */}
          <thead className="bg-[#F3F4FF] text-[#011A8B] text-sm font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Financial Year</th>
              <th className="px-4 py-3 text-left">Total Income</th>
              <th className="px-4 py-3 text-left">Taxable Income</th>
              <th className="px-4 py-3 text-left">Tax Payable</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-sm text-gray-700">
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3">2025-2026</td>
              <td className="px-4 py-3 text-gray-400">—</td>
              <td className="px-4 py-3 text-gray-400">—</td>
              <td className="px-4 py-3 text-gray-400">—</td>
              <td className="px-4 py-3 text-yellow-600 font-medium">Pending</td>
              <td className="px-4 py-3 text-gray-500">No</td>
              <td className="px-4 py-3 text-gray-400">—</td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  );
}
