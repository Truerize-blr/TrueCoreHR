// import React, { useState } from 'react';
// import { ArrowLeft, Plus, X } from 'lucide-react';

// const AdminManagement = ({ onBack }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [admins, setAdmins] = useState([
//         { id: 1, name: 'John Doe', email: 'john@hireconnect.com', role: 'Super Admin' },
//         { id: 2, name: 'Jane Smith', email: 'jane@hireconnect.com', role: 'Admin' },
//     ]);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         role: '',
//         password: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newAdmin = {
//             id: Date.now(),
//             name: formData.name,
//             email: formData.email,
//             role: formData.role
//         };
//         setAdmins(prev => [...prev, newAdmin]);
//         setFormData({ name: '', email: '', role: '', password: '' });
//         setShowModal(false);
//     };

//     const getRoleClass = (role) => {
//         switch (role) {
//             case 'Super Admin': return 'role-super';
//             case 'Admin': return 'role-admin';
//             case 'Manager': return 'role-manager';
//             default: return 'role-admin';
//         }
//     };

//     return (
//         <div className="admin-management-container">
//             {/* Header */}
//             <div className="page-header">
//                 <h1>Admin Management</h1>
//                 <div className="header-actions">
//                     <button className="back-btn" onClick={onBack}>
//                         <ArrowLeft size={20} />
//                         Back
//                     </button>
//                     <button className="add-btn" onClick={() => setShowModal(true)}>
//                         <Plus size={20} />
//                         Add Admin
//                     </button>
//                 </div>
//             </div>

//             {/* Admin Table */}
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Admin Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {admins.map((admin) => (
//                             <tr key={admin.id}>
//                                 <td>{admin.name}</td>
//                                 <td>{admin.email}</td>
//                                 <td>
//                                     <span className={`role-badge ${getRoleClass(admin.role)}`}>
//                                         {admin.role}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {admins.length === 0 && (
//                     <div className="empty-state">
//                         <p>No admins found. Click "Add Admin" to create one.</p>
//                     </div>
//                 )}
//             </div>

//             {/* Modal */}
//             {showModal && (
//                 <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
//                     <div className="modal">
//                         <div className="modal-header">
//                             <h2>Add New Admin</h2>
//                             <button className="close-btn" onClick={() => setShowModal(false)}>
//                                 <X size={24} />
//                             </button>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label>Admin Name <span>*</span></label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Enter admin name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Email <span>*</span></label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Enter email address"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Admin Role <span>*</span></label>
//                                 <select
//                                     name="role"
//                                     value={formData.role}
//                                     onChange={handleChange}
//                                     required
//                                 >
//                                     <option value="">Select role</option>
//                                     <option value="Super Admin">Super Admin</option>
//                                     <option value="Admin">Admin</option>
//                                     <option value="Manager">Manager</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Password <span>*</span></label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     placeholder="Enter password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="cancel-modal-btn" onClick={() => setShowModal(false)}>
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="submit-modal-btn">
//                                     Add Admin
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminManagement;

import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";

// -------- API BASE URL (local + production ready) --------
const getApiBaseUrl = () => {
  const fromEnv =
    import.meta.env?.VITE_API_BASE_URL &&
    import.meta.env.VITE_API_BASE_URL.trim();

  if (fromEnv) return fromEnv;

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:8080";
  }

  // same-domain backend (reverse proxy) in production
  return "";
};

const API_BASE_URL = getApiBaseUrl();

const AdminManagement = ({ onBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ------- FETCH ADMINS FROM BACKEND -------
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setLoadError("");

      // adjust path if your backend route is different
      const endpoint = API_BASE_URL
        ? `${API_BASE_URL.replace(/\/+$/, "")}/api/admins`
        : "/api/admins";

      const token = localStorage.getItem("token");

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load admins (status ${res.status})`);
      }

      const data = await res.json();

      const list =
        (Array.isArray(data) && data) ||
        (Array.isArray(data.data) && data.data) ||
        (Array.isArray(data.content) && data.content) ||
        [];

      setAdmins(list);
    } catch (err) {
      console.error("Admins fetch error:", err);
      setLoadError(err.message || "Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ------- FORM HANDLERS -------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Admin name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.role) {
      newErrors.role = "Role is required.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setSubmitError("");

      // adjust path if backend differs, e.g. /api/admins/create
      const endpoint = API_BASE_URL
        ? `${API_BASE_URL.replace(/\/+$/, "")}/api/admins`
        : "/api/admins";

      const token = localStorage.getItem("token");

      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const success = res.ok || data?.success === true;

      if (!success) {
        const msg = data?.message || "Failed to create admin.";
        setSubmitError(msg);
        return;
      }

      // Prefer the admin object from backend; fallback to constructed one
      const createdAdmin =
        data?.data ||
        data?.admin || {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };

      setAdmins((prev) => [...prev, createdAdmin]);

      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
      });
      setErrors({});
      setShowModal(false);
    } catch (err) {
      console.error("Create admin error:", err);
      setSubmitError(err.message || "Something went wrong while creating admin");
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleClass = (role) => {
    switch (role) {
      case "Super Admin":
      case "SUPER_ADMIN":
        return "role-super";
      case "Admin":
      case "ADMIN":
        return "role-admin";
      case "Manager":
      case "MANAGER":
        return "role-manager";
      default:
        return "role-admin";
    }
  };

  return (
    <div className="admin-management-container">
      {/* Header */}
      <div className="page-header">
        <h1>Admin Management</h1>
        <div className="header-actions">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            Back
          </button>
          <button
            className="add-btn"
            onClick={() => {
              setShowModal(true);
              setSubmitError("");
              setErrors({});
            }}
          >
            <Plus size={20} />
            Add Admin
          </button>
        </div>
      </div>

      {/* Admin Table */}
      <div className="table-container">
        {loading ? (
          <div className="empty-state">
            <p>Loading admins...</p>
          </div>
        ) : loadError ? (
          <div className="empty-state">
            <p className="text-red-500 text-sm">
              {loadError} — please try again.
            </p>
          </div>
        ) : admins.length === 0 ? (
          <div className="empty-state">
            <p>No admins found. Click "Add Admin" to create one.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id || admin.adminId || admin.email}>
                  <td>{admin.name || admin.fullName || "-"}</td>
                  <td>{admin.email || "-"}</td>
                  <td>
                    <span
                      className={`role-badge ${getRoleClass(
                        admin.role || admin.position || ""
                      )}`}
                    >
                      {admin.role || admin.position || "Admin"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target === e.currentTarget && !submitting && setShowModal(false)
          }
        >
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Admin</h2>
              <button
                className="close-btn"
                onClick={() => !submitting && setShowModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Admin Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter admin name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <p className="field-error">{errors.name}</p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <p className="field-error">{errors.email}</p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Admin Role <span>*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ADMIN">Admin</option>
                  <option value="MANAGER">Manager</option>
                </select>
                {errors.role && (
                  <p className="field-error">{errors.role}</p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Password <span>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p className="field-error">{errors.password}</p>
                )}
              </div>

              {submitError && (
                <p className="field-error" style={{ marginTop: "4px" }}>
                  {submitError}
                </p>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-modal-btn"
                  onClick={() => !submitting && setShowModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-modal-btn"
                  disabled={submitting}
                >
                  {submitting ? "Adding..." : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
