// import React, { useState } from "react";
// import { UserPlus, Save } from "lucide-react";

// /* ---------------- API BASE ---------------- */

// const getApiBaseUrl = () => {
//   const env = import.meta.env?.VITE_API_BASE_URL?.trim();
//   if (env) return env;
//   if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
//     return "http://localhost:8080";
//   }
//   return "";
// };

// const API_BASE_URL = getApiBaseUrl();

// /* ---------------- INITIAL STATE ---------------- */

// const initialForm = {
//   employeeCode: "",
//   fullName: "",
//   email: "",
//   password: "",
//   role: "",
//   status: "ACTIVE",

//   department: "",
//   designation: "",
//   employmentType: "",
//   reportingManager: "",
//   workLocation: "",
//   joiningDate: "",
//   shiftType: "",

//   dob: "",
//   gender: "",
//   phone: "",
//   emergencyContact: "",
// };

// export default function AddEmployee({ onSubmit }) {
//   const [formData, setFormData] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   /* ---------------- STYLES ---------------- */

//   const inputBase =
//     "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm " +
//     "text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 " +
//     "focus:ring-blue-500 focus:border-blue-500";

//   const labelClass = "text-sm font-medium text-gray-700";
//   const sectionCard =
//     "bg-white rounded-xl border border-gray-200 shadow-sm p-6";
//   const errorText = "mt-1 text-xs text-red-500";

//   /* ---------------- VALIDATION ---------------- */

//   const validate = () => {
//     const e = {};

//     // Core access
//     if (!formData.employeeCode.trim())
//       e.employeeCode = "Employee ID is required";

//     if (!formData.fullName.trim())
//       e.fullName = "Full name is required";

//     if (!formData.email.trim()) {
//       e.email = "Company email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       e.email = "Enter a valid email address";
//     }

//     if (!formData.password || formData.password.length < 8)
//       e.password = "Password must be at least 8 characters";

//     if (!formData.role) e.role = "Role is required";

//     // Job details
//     if (!formData.department) e.department = "Department is required";
//     if (!formData.designation) e.designation = "Designation is required";
//     if (!formData.employmentType)
//       e.employmentType = "Employment type is required";
//     if (!formData.reportingManager)
//       e.reportingManager = "Reporting manager is required";
//     if (!formData.workLocation)
//       e.workLocation = "Work location is required";
//     if (!formData.joiningDate)
//       e.joiningDate = "Joining date is required";
//     if (!formData.shiftType)
//       e.shiftType = "Shift is required";

//     // Personal
//     if (!formData.dob) e.dob = "Date of birth is required";
//     if (!formData.gender) e.gender = "Gender is required";

//     if (!formData.phone.trim()) {
//       e.phone = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       e.phone = "Enter valid 10-digit mobile number";
//     }

//     if (
//       formData.emergencyContact &&
//       !/^\d{10}$/.test(formData.emergencyContact)
//     ) {
//       e.emergencyContact = "Enter valid 10-digit number";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* ---------------- HANDLERS ---------------- */

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//     if (errors[name]) {
//       setErrors((p) => ({ ...p, [name]: null }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       ...formData,
//       mobile: formData.phone,
//     };

//     try {
//       setSubmitting(true);
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${API_BASE_URL.replace(/\/+$/, "")}/api/auth/register`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data?.message || "Failed to create employee");
//         return;
//       }

//       alert("Employee created successfully");
//       onSubmit?.(data);
//       setFormData(initialForm);
//       setErrors({});
//     } catch {
//       alert("Server error. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const FieldError = ({ name }) =>
//     errors[name] ? <p className={errorText}>{errors[name]}</p> : null;

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-8 flex items-center gap-3">
//           <div className="rounded-xl bg-blue-600 p-3 text-white">
//             <UserPlus size={22} />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Add New Employee
//             </h1>
//             <p className="text-sm text-gray-500">
//               Admin-only employee onboarding
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Core Access */}
//           <div className={sectionCard}>
//             <h2 className="mb-4 text-lg font-semibold">Core Access & Identity</h2>
//             <div className="grid md:grid-cols-2 gap-5">
//               {[
//                 ["employeeCode", "Employee ID"],
//                 ["fullName", "Full Name"],
//                 ["email", "Company Email"],
//                 ["password", "Password", "password"],
//               ].map(([name, label, type = "text"]) => (
//                 <div key={name}>
//                   <label className={labelClass}>{label}</label>
//                   <input
//                     type={type}
//                     name={name}
//                     className={inputBase}
//                     value={formData[name]}
//                     onChange={handleChange}
//                   />
//                   <FieldError name={name} />
//                 </div>
//               ))}

//               <div>
//                 <label className={labelClass}>Role</label>
//                 <select
//                   name="role"
//                   className={inputBase}
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Role</option>
//                   <option value="ADMIN">Admin</option>
//                   <option value="MANAGER">Manager</option>
//                   <option value="EMPLOYEE">Employee</option>
//                 </select>
//                 <FieldError name="role" />
//               </div>
//             </div>
//           </div>

//           {/* Job Details */}
//           <div className={sectionCard}>
//             <h2 className="mb-4 text-lg font-semibold">Job & Organization</h2>
//             <div className="grid md:grid-cols-2 gap-5">
//               <div>
//                 <label className={labelClass}>Department</label>
//                 <select
//                   name="department"
//                   className={inputBase}
//                   value={formData.department}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Department</option>
//                   <option value="IT">IT</option>
//                   <option value="HR">HR</option>
//                   <option value="FINANCE">Finance</option>
//                   <option value="SALES">Sales</option>
//                   <option value="MARKETING">Marketing</option>
//                   <option value="OPERATIONS">Operations</option>
//                   <option value="ADMIN">Admin</option>
//                   <option value="SUPPORT">Support</option>
//                   <option value="MANAGEMENT">Management</option>
//                 </select>
//                 <FieldError name="department" />
//               </div>

//               {[
//                 ["designation", "Designation"],
//                 ["reportingManager", "Reporting Manager"],
//                 ["workLocation", "Work Location"],
//               ].map(([name, label]) => (
//                 <div key={name}>
//                   <label className={labelClass}>{label}</label>
//                   <input
//                     name={name}
//                     className={inputBase}
//                     value={formData[name]}
//                     onChange={handleChange}
//                   />
//                   <FieldError name={name} />
//                 </div>
//               ))}

//               <div>
//                 <label className={labelClass}>Employment Type</label>
//                 <select
//                   name="employmentType"
//                   className={inputBase}
//                   value={formData.employmentType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="FULL_TIME">Full-time</option>
//                   <option value="CONTRACT">Contract</option>
//                   <option value="INTERN">Intern</option>
//                 </select>
//                 <FieldError name="employmentType" />
//               </div>

//               <div>
//                 <label className={labelClass}>Joining Date</label>
//                 <input
//                   type="date"
//                   name="joiningDate"
//                   className={inputBase}
//                   value={formData.joiningDate}
//                   onChange={handleChange}
//                 />
//                 <FieldError name="joiningDate" />
//               </div>

//               <div>
//                 <label className={labelClass}>Shift</label>
//                 <select
//                   name="shiftType"
//                   className={inputBase}
//                   value={formData.shiftType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Shift</option>
//                   <option value="GENERAL">GENERAL (9–6)</option>
//                   <option value="MORNING">MORNING (6–3)</option>
//                   <option value="EVENING">EVENING (2–11)</option>
//                   <option value="NIGHT">NIGHT (9–6)</option>
//                   <option value="ROTATIONAL">ROTATIONAL</option>
//                   <option value="FLEXIBLE">FLEXIBLE</option>
//                   <option value="ON_CALL">ON CALL</option>
//                 </select>
//                 <FieldError name="shiftType" />
//               </div>
//             </div>
//           </div>

//           {/* Personal */}
//           <div className={sectionCard}>
//             <h2 className="mb-4 text-lg font-semibold">Basic Personal Info</h2>
//             <div className="grid md:grid-cols-2 gap-5">
//               <div>
//                 <label className={labelClass}>Date of Birth</label>
//                 <input
//                   type="date"
//                   name="dob"
//                   className={inputBase}
//                   value={formData.dob}
//                   onChange={handleChange}
//                 />
//                 <FieldError name="dob" />
//               </div>

//               <div>
//                 <label className={labelClass}>Gender</label>
//                 <select
//                   name="gender"
//                   className={inputBase}
//                   value={formData.gender}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="MALE">Male</option>
//                   <option value="FEMALE">Female</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//                 <FieldError name="gender" />
//               </div>

//               <div>
//                 <label className={labelClass}>Mobile Number</label>
//                 <input
//                   name="phone"
//                   className={inputBase}
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 <FieldError name="phone" />
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   Emergency Contact (Optional)
//                 </label>
//                 <input
//                   name="emergencyContact"
//                   className={inputBase}
//                   value={formData.emergencyContact}
//                   onChange={handleChange}
//                 />
//                 <FieldError name="emergencyContact" />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={submitting}
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white ${
//                 submitting
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               <Save size={18} />
//               {submitting ? "Creating..." : "Create Employee"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { UserPlus, Save } from "lucide-react";

/* ---------------- API BASE ---------------- */

const getApiBaseUrl = () => {
  const env = import.meta.env?.VITE_API_BASE_URL?.trim();
  if (env) return env;
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "http://localhost:8080";
  }
  return "";
};

const API_BASE_URL = getApiBaseUrl();

/* ---------------- INITIAL STATE ---------------- */

const initialForm = {
  employeeId: "",
  fullName: "",
  email: "",
  password: "",
  role: "EMPLOYEE",
  status: "ACTIVE",

  department: "",
  designation: "",
  employmentType: "",
  reportingManager: "",
  workLocation: "",
  joiningDate: "",
  shiftType: "",

  dob: "",
  gender: "",
  phone: "",
  emergencyContact: "",
};

export default function AddEmployee({ onSubmit }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- STYLES ---------------- */

  const inputBase =
    "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm " +
    "text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 " +
    "focus:ring-blue-500 focus:border-blue-500";

  const labelClass = "text-sm font-medium text-gray-700";
  const sectionCard =
    "bg-white rounded-xl border border-gray-200 shadow-sm p-6";
  const errorText = "mt-1 text-xs text-red-500";

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const e = {};

    if (!formData.employeeId.trim()) e.employeeId = "Employee ID is required";
    if (!formData.fullName.trim()) e.fullName = "Full name is required";

    if (!formData.email.trim()) {
      e.email = "Company email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Enter a valid email address";
    }

    if (!formData.password || formData.password.length < 8) {
      e.password = "Password must be at least 8 characters";
    }

    if (!formData.department) e.department = "Department is required";
    if (!formData.designation) e.designation = "Designation is required";
    if (!formData.employmentType)
      e.employmentType = "Employment type is required";
    if (!formData.reportingManager)
      e.reportingManager = "Reporting manager is required";
    if (!formData.workLocation)
      e.workLocation = "Work location is required";
    if (!formData.joiningDate)
      e.joiningDate = "Joining date is required";
    if (!formData.shiftType) e.shiftType = "Shift is required";
    if (!formData.role) e.role = "Role is required";

    if (!formData.dob) e.dob = "Date of birth is required";
    if (!formData.gender) e.gender = "Gender is required";

    if (!formData.phone.trim()) {
      e.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      e.phone = "Enter valid 10-digit mobile number";
    }

    if (
      formData.emergencyContact &&
      !/^\d{10}$/.test(formData.emergencyContact)
    ) {
      e.emergencyContact = "Enter valid 10-digit number";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      employeeId: formData.employeeId,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,

      mobile: formData.phone,
      emergencyContact: formData.emergencyContact,

      department: formData.department,
      designation: formData.designation,
      employmentType: formData.employmentType,
      reportingManager: formData.reportingManager,
      workLocation: formData.workLocation,
      joiningDate: formData.joiningDate,
      shiftType: formData.shiftType,

      dob: formData.dob,
      gender: formData.gender,

      role: formData.role,
      status: formData.status,
    };

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE_URL.replace(/\/+$/, "")}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Failed to create employee");
        return;
      }

      alert("Employee created successfully");
      onSubmit?.(data);
      setFormData(initialForm);
      setErrors({});
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const FieldError = ({ name }) =>
    errors[name] ? <p className={errorText}>{errors[name]}</p> : null;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3 text-white">
            <UserPlus size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Add New Employee
            </h1>
            <p className="text-sm text-gray-500">
              Admin-only employee onboarding
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Core Access */}
          <div className={sectionCard}>
            <h2 className="mb-4 text-lg font-semibold">Core Access & Identity</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                ["employeeId", "Employee ID"],
                ["fullName", "Full Name"],
                ["email", "Company Email"],
                ["password", "Password", "password"],
              ].map(([name, label, type = "text"]) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    required
                    type={type}
                    name={name}
                    className={inputBase}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  <FieldError name={name} />
                </div>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className={sectionCard}>
            <h2 className="mb-4 text-lg font-semibold">Job & Organization</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Department</label>
                <select
                  required
                  name="department"
                  className={inputBase}
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="FINANCE">Finance</option>
                  <option value="SALES">Sales</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="OPERATIONS">Operations</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPPORT">Support</option>
                  <option value="MANAGEMENT">Management</option>
                </select>
                <FieldError name="department" />
              </div>

              {[
                ["designation", "Designation"],
                ["reportingManager", "Reporting Manager"],
                ["workLocation", "Work Location"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    required
                    name={name}
                    className={inputBase}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  <FieldError name={name} />
                </div>
              ))}

              <div>
                <label className={labelClass}>Employment Type</label>
                <select
                  required
                  name="employmentType"
                  className={inputBase}
                  value={formData.employmentType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERN">Intern</option>
                </select>
                <FieldError name="employmentType" />
              </div>

              <div>
                <label className={labelClass}>Joining Date</label>
                <input
                  required
                  type="date"
                  name="joiningDate"
                  className={inputBase}
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
                <FieldError name="joiningDate" />
              </div>

              <div>
                <label className={labelClass}>Shift</label>
                <select
                  required
                  name="shiftType"
                  className={inputBase}
                  value={formData.shiftType}
                  onChange={handleChange}
                >
                  <option value="">Select Shift</option>
                  <option value="GENERAL">GENERAL (9–6)</option>
                  <option value="MORNING">MORNING (6–3)</option>
                  <option value="EVENING">EVENING (2–11)</option>
                  <option value="NIGHT">NIGHT (9–6)</option>
                  <option value="ROTATIONAL">ROTATIONAL</option>
                  <option value="FLEXIBLE">FLEXIBLE</option>
                  <option value="ON_CALL">ON CALL</option>
                </select>
                <FieldError name="shiftType" />
              </div>

              {/* ✅ ROLE DROPDOWN */}
              <div>
                <label className={labelClass}>Role</label>
                <select
                  required
                  name="role"
                  className={inputBase}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <FieldError name="role" />
              </div>
            </div>
          </div>

          {/* Personal */}
          <div className={sectionCard}>
            <h2 className="mb-4 text-lg font-semibold">Basic Personal Info</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input
                  required
                  type="date"
                  name="dob"
                  className={inputBase}
                  value={formData.dob}
                  onChange={handleChange}
                />
                <FieldError name="dob" />
              </div>

              <div>
                <label className={labelClass}>Gender</label>
                <select
                  required
                  name="gender"
                  className={inputBase}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                <FieldError name="gender" />
              </div>

              <div>
                <label className={labelClass}>Mobile Number</label>
                <input
                  required
                  name="phone"
                  className={inputBase}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <FieldError name="phone" />
              </div>

              <div>
                <label className={labelClass}>
                  Emergency Contact (Optional)
                </label>
                <input
                  name="emergencyContact"
                  className={inputBase}
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
                <FieldError name="emergencyContact" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white ${
                submitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Save size={18} />
              {submitting ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
