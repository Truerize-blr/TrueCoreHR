import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8080";
const cleanBase = API_BASE_URL.replace(/\/+$/, "");

// Simple SVG Icons
const Icons = {
    Calendar: () => (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    Clock: () => (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    ArrowLeft: () => (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    ),
    Plus: () => (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    ),
    Filter: () => (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
    ),
    X: () => (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    CheckCircle: ({ className = "h-3 w-3" }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    XCircle: ({ className = "h-3 w-3" }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    AlertCircle: ({ className = "h-3 w-3" }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

export default function EmployeeLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        leaveType: "CASUAL",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const safeUrl = (path) => {
        const cleanPath = path.replace(/^\/+/, "");
        return cleanBase ? `${cleanBase}/${cleanPath}` : `/${cleanPath}`;
    };

    const handleBackToDashboard = () => {
        window.location.href = "/employee/dashboard";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "--";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const getStatusBadge = (status) => {
        const statusUpper = (status || "").toUpperCase();
        if (statusUpper === "APPROVED") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EAF9F1] text-[#19724A] border border-[#B8EBD1] text-xs font-medium">
                    <Icons.CheckCircle />
                    Approved
                </span>
            );
        }
        if (statusUpper === "REJECTED") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFECEF] text-[#C2273D] border border-[#FFC1CD] text-xs font-medium">
                    <Icons.XCircle />
                    Rejected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF5E6] text-[#C96A13] border border-[#FFE0B8] text-xs font-medium">
                <Icons.AlertCircle />
                Pending
            </span>
        );
    };

    const fetchLeaves = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const endpoint = safeUrl("/api/leaves/my-leaves");

            const response = await fetch(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (response.ok) {
                const json = await response.json();
                setLeaves(json.data || []);
            } else {
                setError("Failed to fetch leaves");
            }
        } catch (err) {
            console.error("Error fetching leaves:", err);
            setError("Error loading leave data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleApplyLeave = async () => {
        if (!formData.startDate || !formData.endDate || !formData.reason) {
            setError("Please fill in all required fields");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            const endpoint = safeUrl("/api/leaves/apply");

            const payload = {
                leaveType: formData.leaveType,
                startDate: formData.startDate,
                endDate: formData.endDate,
                reason: formData.reason,
            };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setShowApplyForm(false);
                setFormData({
                    leaveType: "CASUAL",
                    startDate: "",
                    endDate: "",
                    reason: "",
                });
                setError("");
                fetchLeaves();
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to apply leave");
            }
        } catch (err) {
            console.error("Error applying leave:", err);
            setError("Error submitting leave application");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredLeaves = leaves.filter((leave) => {
        if (filterStatus === "ALL") return true;
        return (leave.status || "").toUpperCase() === filterStatus;
    });

    const approvedCount = leaves.filter(
        (l) => (l.status || "").toUpperCase() === "APPROVED"
    ).length;
    const pendingCount = leaves.filter(
        (l) => (l.status || "").toUpperCase() === "PENDING"
    ).length;
    const rejectedCount = leaves.filter(
        (l) => (l.status || "").toUpperCase() === "REJECTED"
    ).length;
    const availableLeaves = Math.max(0, 24 - approvedCount);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F9FAFF] flex items-center justify-center">
                <div className="text-lg text-gray-600">Loading leaves...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFF] px-4 md:px-6 py-4">
            <div
                className="rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 shadow-sm"
                style={{ backgroundColor: "#00008B" }}
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBackToDashboard}
                        className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        <Icons.ArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">
                            Leave History
                        </h1>
                        <p className="text-xs md:text-sm text-blue-100 mt-1">
                            {availableLeaves} of 24 leaves remaining
                        </p>
                    </div>
                </div>


            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Total Leaves</span>
                            <Icons.Calendar />
                        </div>
                        <p className="text-2xl font-bold text-[#0B2A6F]">{leaves.length}</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Approved</span>
                            <Icons.CheckCircle className="h-4 w-4 text-[#19724A]" />
                        </div>
                        <p className="text-2xl font-bold text-[#19724A]">{approvedCount}</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Pending</span>
                            <Icons.Clock />
                        </div>
                        <p className="text-2xl font-bold text-[#C96A13]">{pendingCount}</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Available</span>
                            <Icons.Calendar />
                        </div>
                        <p className="text-2xl font-bold text-[#2952CC]">{availableLeaves}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Icons.Filter />
                        <span className="text-sm font-medium text-gray-700 mr-2">
                            Filter by status:
                        </span>
                        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterStatus === status
                                    ? "bg-[#2952CC] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-[#0B2A6F]">
                            Leave History
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            {filteredLeaves.length} {filteredLeaves.length === 1 ? "record" : "records"} found
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Reason
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Start Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        End Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Days
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredLeaves.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-4 py-8 text-center text-sm text-gray-500"
                                        >
                                            No leave records found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeaves.map((leave) => (
                                        <tr
                                            key={leave.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                #{leave.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-block px-2 py-1 bg-[#E3EBFF] text-[#2952CC] rounded text-xs font-medium">
                                                    {leave.leaveType || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                                {leave.reason || "--"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {formatDate(leave.startDate)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {formatDate(leave.endDate)}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                                {leave.totalDays || "--"}
                                            </td>
                                            <td className="px-4 py-3">{getStatusBadge(leave.status)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
}