//ManageEmployees

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export default function ManageEmployees() {
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });

  const primaryBlue = "#00008B";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // -------- Helpers to normalize API response --------

  const normalizeEmployee = (e) => ({
    id: e.id ?? e.empId ?? e.employeeId ?? e.userId ?? "",
    name: e.name ?? e.fullName ?? e.employeeName ?? e.username ?? "",
    email: e.email ?? e.mailId ?? "",
    role: e.role ?? e.roleName ?? e.designation ?? "",
  });

  const extractEmployeeList = (data) => {
    // Log once to verify shape in browser console
    console.log("Employees API raw response:", data);

    if (!data) return [];

    // If backend returns a plain list
    if (Array.isArray(data)) {
      return data.map(normalizeEmployee);
    }

    // Common Spring / custom wrappers
    if (Array.isArray(data.content)) {
      return data.content.map(normalizeEmployee);
    }
    if (Array.isArray(data.data)) {
      return data.data.map(normalizeEmployee);
    }
    if (Array.isArray(data.users)) {
      return data.users.map(normalizeEmployee);
    }
    if (Array.isArray(data.employees)) {
      return data.employees.map(normalizeEmployee);
    }

    // Fallback: not a list
    return [];
  };

  // ========== API ==========

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${API_BASE_URL}/api/admin/attendance/users`
      );

      const list = extractEmployeeList(res.data);
      setEmployees(list);
    } catch (err) {
      console.error("Error fetching employees", err);
      setError("Failed to load employees");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshSingleEmployee = async (empId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/attendance/users/${empId}`
      );
      const [updated] = extractEmployeeList(res.data);
      if (!updated) return;

      setEmployees((prev) =>
        prev.map((e) => (e.id === empId ? updated : e))
      );
    } catch (err) {
      console.error("Error refreshing employee", err);
      alert("Failed to refresh employee");
    }
  };

  const updateEmployee = async (payload) => {
    await axios.put(
      `${API_BASE_URL}/api/admin/attendance/users/${payload.id}`,
      payload
    );
  };

  const deleteEmployeeApi = async (empId) => {
    await axios.delete(
      `${API_BASE_URL}/api/admin/attendance/users/${empId}`
    );
  };

  // ========== EFFECTS ==========

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ========== FILTERING ==========

  const filtered = employees.filter((emp) => {
    const s = search.trim().toLowerCase();
    if (!s) return true;

    const searchMatch =
      emp.id?.toString().toLowerCase().includes(s) ||
      emp.name?.toLowerCase().includes(s) ||
      emp.email?.toLowerCase().includes(s) ||
      emp.role?.toLowerCase().includes(s);

    return !!searchMatch;
  });

  // View Modal
  const handleView = (emp) => {
    setCurrentEmployee(emp);
    setShowViewModal(true);
  };

  // Edit Modal
  const handleEdit = (emp) => {
    setCurrentEmployee(emp);
    setEditForm({
      id: emp.id,
      name: emp.name || "",
      email: emp.email || "",
      role: emp.role || "",
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateEmployee(editForm);

      setEmployees((prev) =>
        prev.map((emp) => (emp.id === currentEmployee.id ? editForm : emp))
      );

      setShowEditModal(false);
      setCurrentEmployee(null);
    } catch (err) {
      console.error("Error updating employee", err);
      alert("Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  // Refresh
  const handleRefresh = (emp) => {
    refreshSingleEmployee(emp.id);
  };

  // Delete
  const handleDelete = async (emp) => {
    if (!window.confirm(`Delete ${emp.name}?`)) return;
    try {
      await deleteEmployeeApi(emp.id);
      setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
    } catch (err) {
      console.error("Error deleting employee", err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-4">
      {/* Header */}
      <div
        className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"
        style={{ backgroundColor: primaryBlue }}
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Employee Management
          </h1>
          <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
            Manage employee records, update details, and perform all actions
            from one place.
          </p>
        </div>
        <button
          onClick={fetchEmployees}
          className="text-xs px-3 py-2 rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/20"
        >
          Refresh List
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by ID, name, email, role..."
          className="w-full md:w-1/2 px-4 py-2 border border-[#000080] rounded-lg
                     text-[#000080] placeholder-gray-400
                     focus:ring-2 focus:ring-[#000080] outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 mb-2">
          {error}
        </p>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#000080] text-white">
            <tr>
              <th className="py-3 px-4 w-1/6 text-left">Employee ID</th>
              <th className="py-3 px-4 w-1/3 text-left">Employee</th>
              <th className="py-3 px-4 w-1/3 text-left">Email</th>
              <th className="py-3 px-4 w-1/6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 px-4 text-center text-sm text-gray-500"
                >
                  Loading employees...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 px-4 text-center text-sm text-gray-500"
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              filtered.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* EMPLOYEE ID */}
                  <td className="py-4 px-4 text-[#000080] font-semibold">
                    {emp.id}
                  </td>

                  {/* EMPLOYEE NAME + ROLE */}
                  <td className="py-4 px-4">
                    <p className="text-[#000080] font-semibold">
                      {emp.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {emp.role}
                    </p>
                  </td>

                  {/* EMAIL */}
                  <td className="py-4 px-4 text-[#000080] font-medium">
                    {emp.email}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="py-4 px-4 flex justify-center gap-3">
                    {/* View */}
                    <button
                      onClick={() => handleView(emp)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      👁️
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(emp)}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      ✏️
                    </button>

                    {/* Refresh */}
                    <button
                      onClick={() => handleRefresh(emp)}
                      className="p-2 bg-[#000080]/10 text-[#000080] rounded-lg hover:bg-[#000080]/20"
                    >
                      🔄
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(emp)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- VIEW MODAL ---------- */}
      {showViewModal && currentEmployee && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-lg border-t-4 border-[#000080]">
            <h2 className="text-xl font-bold text-[#000080] mb-4">
              Employee Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Employee ID:</strong> {currentEmployee.id}
              </p>
              <p>
                <strong>Name:</strong> {currentEmployee.name}
              </p>
              <p>
                <strong>Email:</strong> {currentEmployee.email}
              </p>
              <p>
                <strong>Role:</strong> {currentEmployee.role}
              </p>
            </div>

            <button
              onClick={() => setShowViewModal(false)}
              className="mt-6 w-full py-2 bg-[#000080] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------- EDIT MODAL ---------- */}
      {showEditModal && currentEmployee && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#000080]">
                Edit Employee
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="space-y-5">
              {/* Employee ID (read-only) */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">
                  Employee ID:
                </label>
                <input
                  type="text"
                  value={editForm.id}
                  readOnly
                  className="w-full rounded-2xl bg-gray-100 text-gray-700 px-4 py-3 border-none outline-none"
                />
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">
                  Name:
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full rounded-2xl bg-[#020617] text-white px-4 py-3 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">
                  Email:
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full rounded-2xl bg-[#020617] text-white px-4 py-3 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Role */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">
                  Role:
                </label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({ ...editForm, role: e.target.value })
                  }
                  className="w-full rounded-2xl bg-[#020617] text-white px-4 py-3 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full max-w-sm py-3 rounded-2xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-sm tracking-wide shadow-md disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {/* Cancel */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}