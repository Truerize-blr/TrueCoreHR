import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle,
  Clock,
  PlusCircle,
  Settings,
  Activity,
  Server,
  ArrowRightCircle,
  Gift,
  Sparkles,
  RefreshCw,
  Search,
  Edit3,
  Trash2,
  X,
  Save,
  AlertTriangle,
  Check,
} from "lucide-react";

/* -------------------- Configuration -------------------- */
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 500;

const getApiBaseUrl = () => {
  const fromEnv = import.meta.env?.VITE_API_BASE_URL?.trim();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:8080";
    }
  }
  return "";
};
const API_BASE_URL = getApiBaseUrl();

/* -------------------- Component -------------------- */
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [userRole] = useState(() => {
    try {
      const rawRole =
        localStorage.getItem("role") ||
        localStorage.getItem("position") ||
        "";
      const stored = rawRole.trim().toUpperCase();
      return stored || null;
    } catch {
      return null;
    }
  });

  // ✅ ADMIN MANAGEMENT STATES
  const [showAdminManagement, setShowAdminManagement] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(false);
  const [adminsError, setAdminsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ EDIT STATES
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    isAdmin: false,
  });
  const [editLoading, setEditLoading] = useState(false);

  // ✅ DELETE STATES
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Existing states (summary, attendance, events)
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    presentToday: 0,
    pendingApprovals: 0,
  });
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const [todayAttendance, setTodayAttendance] = useState({
    present: 0,
    absent: 0,
    onLeave: 0,
    lateCheckIns: 0,
    lastUpdated: null,
  });
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState(null);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  // helpers
  const safeApiUrl = (path) => {
    const base = (API_BASE_URL || "").replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
  };

  const getAuthHeader = () => {
    const raw = localStorage.getItem("token") || "";
    if (!raw) return null;
    if (/^Bearer\s+/i.test(raw)) return raw;
    return `Bearer ${raw}`;
  };

  const classifyError = (err) => {
    if (!err) return { kind: "unknown", message: "Unknown error" };

    if (err.status) {
      const status = Number(err.status);
      if (status === 401 || status === 403) {
        return { kind: "auth", status, message: err.message || "Unauthorized" };
      }
      if (status >= 400 && status < 500) {
        return { kind: "client", status, message: err.message || "Client error" };
      }
      if (status >= 500) {
        return { kind: "server", status, message: err.message || "Server error" };
      }
    }

    if (err.name === "AbortError") {
      return { kind: "timeout", message: "Request timed out" };
    }

    return { kind: "network", message: err.message || String(err) };
  };

  const fetchWithTimeoutAndRetry = async (endpoint, options = {}, retries = MAX_RETRIES) => {
    let attempt = 0;
    let lastError = null;

    while (attempt <= retries) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

      try {
        console.log(`[http] attempt #${attempt + 1} -> ${endpoint}`);
        const res = await fetch(endpoint, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeout);

        const rawText = await res.text().catch(() => "");
        if (!res.ok) {
          const err = new Error(`HTTP ${res.status}: ${rawText ? rawText.slice(0, 300) : res.statusText}`);
          err.status = res.status;
          err.body = rawText;
          throw err;
        }
        if (!rawText) return null;
        try {
          return JSON.parse(rawText);
        } catch (parseErr) {
          console.warn("JSON parse failed:", parseErr);
          return { rawText };
        }
      } catch (err) {
        clearTimeout(timeout);
        lastError = err;
        const classification = classifyError(err);
        console.warn(`[http] attempt #${attempt + 1} failed:`, classification);

        const shouldRetry =
          classification.kind === "timeout" ||
          classification.kind === "network" ||
          classification.kind === "server";

        attempt += 1;
        if (!shouldRetry || attempt > retries) {
          throw lastError;
        }

        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
        await new Promise((r) => setTimeout(r, delay));
      }
    }

    throw lastError || new Error("Failed after retries");
  };

  const fetchJsonFromCandidates = async (candidates = [], authHeader = null) => {
    let lastErr = null;
    for (const p of candidates) {
      const endpoint = safeApiUrl(p);
      try {
        const data = await fetchWithTimeoutAndRetry(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(authHeader ? { Authorization: authHeader } : {}),
          },
        });
        return data;
      } catch (err) {
        lastErr = err;
        console.warn(`[api] candidate failed ${endpoint}:`, classifyError(err));
      }
    }
    throw lastErr || new Error("No endpoints succeeded");
  };

  // ✅ ADMIN OPERATIONS
  const fetchAdmins = useCallback(async () => {
    setAdminsLoading(true);
    setAdminsError(null);

    const candidates = ["/api/admin/attendance/admins"];

    try {
      const result = await fetchJsonFromCandidates(candidates, getAuthHeader());
      const adminList = Array.isArray(result?.data) ? result.data : [];
      setAdmins(adminList);
      console.log("[api] admins loaded:", adminList.length, "admins");
    } catch (err) {
      const classified = classifyError(err);
      console.error("[api] admins failed:", classified);
      setAdminsError(`Failed to load admins (${classified.status || classified.kind}) — please try again.`);
    } finally {
      setAdminsLoading(false);
    }
  }, []);

  // ✅ DELETE ADMIN
  const handleDeleteAdmin = async (adminId) => {
    if (!confirm(`Are you sure you want to delete this admin?\nThis action cannot be undone.`)) return;

    setDeletingAdmin(adminId);
    setDeleteLoading(true);

    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetchWithTimeoutAndRetry(safeApiUrl(`/api/admin/attendance/admins/${adminId}`), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      await fetchAdmins();
      alert("✅ Admin deleted successfully!");
    } catch (err) {
      const classified = classifyError(err);
      alert(`❌ Failed to delete admin: ${classified.message}`);
    } finally {
      setDeleteLoading(false);
      setDeletingAdmin(null);
    }
  };

  // ✅ EDIT ADMIN - Load form
  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin.id);
    setEditForm({
      fullName: admin.fullName || "",
      email: admin.email || "",
      phone: admin.phone || "",
      department: admin.department || "",
      position: admin.position || "",
      isAdmin: admin.isAdmin || false,
    });
  };

  // ✅ CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setEditForm({
      fullName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      isAdmin: false,
    });
  };

  // ✅ UPDATE ADMIN
  const handleUpdateAdmin = async () => {
    if (!editForm.fullName.trim() || !editForm.email.trim()) {
      alert("❌ Name and email are required!");
      return;
    }

    setEditLoading(true);

    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetchWithTimeoutAndRetry(safeApiUrl(`/api/admin/attendance/admins/${editingAdmin}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      await fetchAdmins();
      handleCancelEdit();
      alert("✅ Admin updated successfully!");
    } catch (err) {
      const classified = classifyError(err);
      alert(`❌ Failed to update admin: ${classified.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  // Filter admins
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Existing fetch functions
  const fetchDashboardStats = useCallback(async () => {
    setSummaryLoading(true);
    setAttendanceLoading(true);
    setSummaryError(null);
    setAttendanceError(null);

    const candidates = [
      "/api/admin/attendance/dashboard-stats",
      "/api/admin/dashboard-stats",
      "/api/admin/dashboard/stats",
      "/api/dashboard/attendance/stats",
      "/api/dashboard/stats",
      "/api/admin/attendance/stats",
    ];

    try {
      const result = await fetchJsonFromCandidates(candidates, getAuthHeader());
      const payload = (result && (result.data || result.payload || result)) || {};

      const totalEmployees =
        payload.totalEmployees ??
        payload.employeeCount ??
        payload.total ??
        payload.employees ??
        0;
      const presentToday =
        payload.presentToday ??
        payload.todayPresent ??
        payload.presentCount ??
        payload.present ??
        0;
      const pendingApprovals =
        payload.pendingApprovals ??
        payload.pendingRequests ??
        payload.pendingCount ??
        0;

      const present =
        payload.present ??
        payload.presentCount ??
        payload.todayPresent ??
        payload.presentToday ??
        0;
      const absent = payload.absent ?? payload.absentCount ?? 0;
      const onLeave = payload.onLeave ?? payload.leaveCount ?? payload.leave ?? 0;
      const lateCheckIns = payload.lateCheckIns ?? payload.lateCount ?? payload.late ?? 0;
      const lastUpdated =
        payload.lastUpdated ?? payload.lastSynced ?? payload.updatedAt ?? null;

      setSummary({
        totalEmployees,
        presentToday,
        pendingApprovals,
      });

      setTodayAttendance({
        present,
        absent,
        onLeave,
        lateCheckIns,
        lastUpdated,
      });

      console.log("[api] dashboard payload:", payload);
    } catch (err) {
      const classified = classifyError(err);
      console.error("[api] dashboard failed:", classified);
      switch (classified.kind) {
        case "auth":
          setSummaryError("Not authorized. Please login again.");
          setAttendanceError("Not authorized. Please login again.");
          break;
        case "client":
          setSummaryError("Requested data not found or invalid.");
          setAttendanceError("Requested data not found or invalid.");
          break;
        case "server":
          setSummaryError("Server error while loading summary. Try again later.");
          setAttendanceError("Server error while loading attendance. Try again later.");
          break;
        case "timeout":
          setSummaryError("Request timed out. Check your connection and retry.");
          setAttendanceError("Request timed out. Check your connection and retry.");
          break;
        case "network":
        default:
          setSummaryError("Network error. Check your connection and retry.");
          setAttendanceError("Network error. Check your connection and retry.");
          break;
      }
    } finally {
      setSummaryLoading(false);
      setAttendanceLoading(false);
    }
  }, []);

  const fetchUpcomingEvents = useCallback(async () => {
    setEventsLoading(true);
    setEventsError(null);
    const candidates = [
      "/api/admin/dashboard/upcoming-events",
      "/api/admin/dashboard/events/upcoming",
      "/api/dashboard/upcoming-events",
      "/api/events/upcoming",
    ];

    try {
      const result = await fetchJsonFromCandidates(candidates, getAuthHeader());
      const list =
        (Array.isArray(result) && result) ||
        (Array.isArray(result?.data) && result.data) ||
        (Array.isArray(result?.content) && result.content) ||
        [];
      setEvents(list);
    } catch (err) {
      const classified = classifyError(err);
      console.error("[api] upcoming events failed:", classified);
      switch (classified.kind) {
        case "auth":
          setEventsError("Not authorized. Please login again.");
          break;
        case "client":
          setEventsError("Events not found.");
          break;
        case "server":
          setEventsError("Server error while loading events. Try again later.");
          break;
        case "timeout":
          setEventsError("Request timed out. Check your connection and retry.");
          break;
        default:
          setEventsError("Network error. Check your connection and retry.");
          break;
      }
    } finally {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
    fetchUpcomingEvents();
  }, [fetchDashboardStats, fetchUpcomingEvents]);

  /* -------------------- UI helpers -------------------- */
  const formatDate = (value) => {
    if (!value) return "-";
    try {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return value;
      return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
    } catch {
      return value;
    }
  };

  const birthdayEvents = events.filter(
    (e) => (e.type || e.eventType || "").toUpperCase() === "BIRTHDAY"
  );
  const anniversaryEvents = events.filter(
    (e) => (e.type || e.eventType || "").toUpperCase() === "ANNIVERSARY"
  );

  /* -------------------- navigation -------------------- */
  const handleAddEmployeeClick = () => navigate("/admin/add-employee");
  const handleAdminManagementClick = () => {
    setShowAdminManagement(true);
    fetchAdmins();
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="min-h-screen px-4 md:px-6 py-4 bg-[#F9FAFF]">
      {/* ✅ ADMIN MANAGEMENT MODAL */}
      {showAdminManagement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500 rounded-2xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Admin Management</h2>
                  <p className="text-sm text-gray-500">Configure admin roles and access</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAdminManagement(false);
                  handleCancelEdit();
                }}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* ✅ EDIT FORM */}
            {editingAdmin && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <div className="max-w-2xl bg-white rounded-2xl p-6 shadow-lg border">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                    <Edit3 className="h-5 w-5 text-blue-600" />
                    Edit Admin Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      placeholder="Full Name *"
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="Email *"
                      type="email"
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      value={editForm.department}
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                      placeholder="Department"
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      value={editForm.position}
                      onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                      placeholder="Position/Role"
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                    />
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                          type="checkbox"
                          checked={editForm.isAdmin}
                          onChange={(e) => setEditForm({ ...editForm, isAdmin: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Admin Privileges</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleUpdateAdmin}
                      disabled={editLoading || !editForm.fullName.trim() || !editForm.email.trim()}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 font-semibold disabled:opacity-50 flex items-center gap-2 justify-center"
                    >
                      {editLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={editLoading}
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 font-medium disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Search & Controls */}
            {!editingAdmin && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search admins by name or email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    onClick={fetchAdmins}
                    disabled={adminsLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                  >
                    <RefreshCw className={`h-4 w-4 ${adminsLoading ? "animate-spin" : ""}`} />
                    {adminsLoading ? "Loading..." : "Refresh"}
                  </button>
                </div>
              </div>
            )}

            {/* Error */}
            {adminsError && (
              <div className="p-6 bg-red-50 border-b border-red-200">
                <div className="flex items-center gap-3 text-sm text-red-800">
                  <div className="p-2 bg-red-100 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  {adminsError}
                  <button
                    onClick={fetchAdmins}
                    className="ml-auto px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto p-6">
              {adminsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading admins...</p>
                  </div>
                </div>
              ) : filteredAdmins.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-500 mb-2">
                    {searchTerm ? "No matching admins found" : "No admins found"}
                  </p>
                  <p className="text-gray-400">
                    {searchTerm ? "Try adjusting your search terms." : "Admins will appear here."}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Last Login
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredAdmins.map((admin) => (
                          <tr key={admin.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                  {admin.fullName?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {admin.fullName || "N/A"}
                                  </div>
                                  <div className="text-xs text-gray-500">ID: {admin.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.email || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  admin.role === "ADMIN"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {admin.role || admin.isAdmin ? "ADMIN" : "USER"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {admin.department || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  admin.status === "ACTIVE"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {admin.status || "N/A"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {admin.lastLoginAt
                                ? new Date(admin.lastLoginAt).toLocaleDateString()
                                : "Never"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleEditAdmin(admin)}
                                disabled={editLoading || deleteLoading}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 disabled:opacity-50 transition-all"
                                title="Edit Admin"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(admin.id)}
                                disabled={deleteLoading && deletingAdmin === admin.id}
                                className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-all"
                                title="Delete Admin"
                              >
                                {deleteLoading && deletingAdmin === admin.id ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            {/* Stats */}
        {!adminsLoading && !adminsError && !editingAdmin && (
          <div className="p-6 border-t border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{admins.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Active Admins</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {admins.filter((a) => a.status === "ACTIVE").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Showing</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredAdmins.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )}

  {/* ORIGINAL DASHBOARD CONTENT */}
  {/* Header */}
  <div
    className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 shadow-sm"
    style={{ backgroundColor: "#00008B" }}
  >
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-white">Admin Dashboard</h1>
      <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-xl">
        Overview of employees, attendance, and HR actions
      </p>
    </div>

    <div className="flex gap-4 text-xs md:text-sm text-blue-100">
      <div className="flex flex-col items-end">
        {userRole && (
          <span className="px-2 py-1 rounded-full bg-blue-900/60 text-[11px] border border-blue-300/40">
            Logged in as: {userRole}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => fetchDashboardStats()}
          className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-white text-xs hover:bg-white/20"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Stats
        </button>

        <button
          onClick={() => fetchUpcomingEvents()}
          className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-white text-xs hover:bg-white/20"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Events
        </button>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="space-y-6">
    {/* Stats Row */}
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Employees */}
      <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
        <div>
          <p className="text-xs font-medium text-slate-500">Total Employees</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summaryLoading ? "..." : summary.totalEmployees ?? 0}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Across all departments</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Users className="h-6 w-6 text-[#011A8B]" />
        </div>
      </div>

      {/* Present Today */}
      <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
        <div>
          <p className="text-xs font-medium text-slate-500">Present Today</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {attendanceLoading ? "..." : todayAttendance.present ?? summary.presentToday ?? 0}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Checked-in employees</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
          <CheckCircle className="h-6 w-6 text-emerald-600" />
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm">
        <div>
          <p className="text-xs font-medium text-slate-500">Pending Approvals</p>
          <p className="mt-2 text-2xl font-bold text-amber-500">
            {summaryLoading ? "..." : summary.pendingApprovals ?? 0}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Leaves & requests in queue</p>
          {summaryError && (
            <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-[12px] text-red-700">
              <div>{summaryError}</div>
              <div className="mt-1">
                <button
                  onClick={() => fetchDashboardStats()}
                  className="underline text-[11px]"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
          <Clock className="h-6 w-6 text-amber-500" />
        </div>
      </div>
    </div>

    {/* Action Cards */}
    <div className="grid gap-4 md:grid-cols-2">
      <button
        onClick={handleAddEmployeeClick}
        className="group flex items-center gap-4 rounded-2xl bg-white border px-5 py-4 shadow-sm hover:shadow-md"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
          <PlusCircle className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-semibold text-gray-900">Add New Employee</h3>
          <p className="text-xs text-slate-500">Create a new employee profile.</p>
        </div>
      </button>

      <button
        onClick={handleAdminManagementClick}
        className="group flex items-center gap-4 rounded-2xl bg-white border px-5 py-4 shadow-sm hover:shadow-md"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50">
          <Settings className="h-6 w-6 text-pink-600" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-semibold text-gray-900">Admin Management</h3>
          <p className="text-xs text-slate-500">Configure admin roles and access.</p>
        </div>
      </button>
    </div>

    {/* Bottom Row: Attendance + Events */}
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Attendance */}
      <div className="lg:col-span-2 rounded-2xl bg-white border px-5 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
            <Activity className="h-4 w-4 text-emerald-500" />
            Today's Attendance Summary
          </h3>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            {todayAttendance.lastUpdated && (
              <span>Last updated: {formatDate(todayAttendance.lastUpdated)}</span>
            )}
            <button
              onClick={() => fetchDashboardStats()}
              className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200 text-slate-700"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {attendanceLoading ? (
          <p className="text-xs text-slate-500">Loading today's attendance...</p>
        ) : attendanceError ? (
          <div className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
            <div>{attendanceError}</div>
            <div className="mt-2">
              <button
                onClick={() => fetchDashboardStats()}
                className="underline text-[12px]"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-4 text-xs md:text-sm">
            <div className="rounded-2xl bg-emerald-50 border px-4 py-3">
              <p className="text-[11px] font-medium text-emerald-700">Present</p>
              <p className="mt-1 text-xl font-semibold text-emerald-700">
                {todayAttendance.present ?? "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 border px-4 py-3">
              <p className="text-[11px] font-medium text-red-700">Absent</p>
              <p className="mt-1 text-xl font-semibold text-red-700">
                {todayAttendance.absent ?? "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 border px-4 py-3">
              <p className="text-[11px] font-medium text-sky-700">On Leave</p>
              <p className="mt-1 text-xl font-semibold text-sky-700">
                {todayAttendance.onLeave ?? "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 border px-4 py-3">
              <p className="text-[11px] font-medium text-amber-700">Late Check-ins</p>
              <p className="mt-1 text-xl font-semibold text-amber-700">
                {todayAttendance.lateCheckIns ?? "-"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Events Column */}
      <div className="space-y-4">
        {/* Birthdays */}
        <div className="rounded-2xl bg-white border px-5 py-4 shadow-sm">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-gray-900">
            <Gift className="h-4 w-4 text-pink-500" />
            Upcoming Birthdays
          </h3>

          {eventsLoading ? (
            <p className="text-xs text-slate-500">Loading upcoming birthdays...</p>
          ) : eventsError ? (
            <div className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
              <div>{eventsError}</div>
              <div className="mt-2">
                <button
                  onClick={() => fetchUpcomingEvents()}
                  className="underline text-[12px]"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : birthdayEvents.length === 0 ? (
            <p className="text-xs text-slate-500">
              No upcoming birthdays in the next few days.
            </p>
          ) : (
            <div className="space-y-2 text-[13px] text-slate-700">
              {birthdayEvents.slice(0, 4).map((e) => (
                <div
                  key={e.id || `${e.name}-${e.date}-birthday`}
                  className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {e.name || e.employeeName || "-"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {e.department || e.team || "—"}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border">
                    {formatDate(e.date || e.eventDate)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Anniversaries */}
        <div className="rounded-2xl bg-white border px-5 py-4 shadow-sm">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-gray-900">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Work Anniversaries
          </h3>

          {eventsLoading ? (
            <p className="text-xs text-slate-500">Loading anniversaries...</p>
          ) : eventsError ? (
            <></>
          ) : anniversaryEvents.length === 0 ? (
            <p className="text-xs text-slate-500">
              No upcoming anniversaries in the next few days.
            </p>
          ) : (
            <div className="space-y-2 text-[13px] text-slate-700">
              {anniversaryEvents.slice(0, 4).map((e) => (
                <div
                  key={e.id || `${e.name}-${e.date}-anniversary`}
                  className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {e.name || e.employeeName || "-"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {e.yearsCompleted
                        ? `${e.yearsCompleted}+ years`
                        : e.department || e.team || "—"}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border">
                    {formatDate(e.date || e.eventDate)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="rounded-2xl bg-white border px-5 py-4 shadow-sm">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-gray-900">
            <Server className="h-4 w-4 text-sky-600" />
            Quick Links
          </h3>

          <div className="space-y-2 text-[13px]">
            <button
              onClick={handleAddEmployeeClick}
              className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 text-slate-700"
            >
              <span className="font-medium">Add employee via form</span>
              <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
            </button>

            <button
              onClick={handleAdminManagementClick}
              className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 text-slate-700"
            >
              <span className="font-medium">Manage admin roles</span>
              <ArrowRightCircle className="h-4 w-4 text-[#011A8B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

