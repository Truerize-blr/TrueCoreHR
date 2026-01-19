import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  CheckCircle,
  Clock,
  Activity,
  Calendar,
  BarChart3,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8080/api";

export default function EmployeePerformanceDashboard() {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      fetchPerformanceData();
    }
  }, [currentUser]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setCurrentUser(result.data);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to load user information");
    }
  };

const fetchPerformance = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/performance/${currentUser.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch performance data');
    }
    
    if (result.success) {
      setPerformanceData(result.data);
    } else {
      setError(result.message);
    }
  } catch (err) {
    console.error("Error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your performance data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            Unable to Load Data
          </h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchPerformanceData}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!performanceData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No Performance Data Available
          </h2>
          <p className="text-gray-600">
            Your performance data will appear here once your manager assigns scores.
          </p>
        </div>
      </div>
    );
  }

  const {
    employeeId,
    name,
    department,
    position,
    currentScore,
    status,
    tasksCompleted,
    totalTasks,
    attendance,
    productivity,
    qualityScore,
    punctuality,
    validated,
    lastUpdated,
    monthlyScores = [],
    feedback = [],
  } = performanceData;

  const taskCompletionRate = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Needs Improvement":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
            <p className="text-gray-600 mt-1">
              Track your performance metrics and growth
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Employee ID</p>
            <p className="text-lg font-semibold text-gray-900">{employeeId}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-xl font-bold text-gray-900">{name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="text-lg font-semibold text-gray-900">{department}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Status</p>
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(
                status
              )}`}
            >
              {validated ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ScoreCard
          icon={Target}
          label="Overall Score"
          value={currentScore}
          color="blue"
          showTrend={currentScore >= 80}
        />
        <ScoreCard
          icon={CheckCircle}
          label="Task Completion"
          value={`${tasksCompleted}/${totalTasks}`}
          subValue={`${taskCompletionRate.toFixed(0)}%`}
          color="green"
          showTrend={taskCompletionRate >= 80}
        />
        <ScoreCard
          icon={Calendar}
          label="Attendance"
          value={`${attendance}%`}
          color="purple"
          showTrend={attendance >= 90}
        />
        <ScoreCard
          icon={Activity}
          label="Productivity"
          value={`${productivity}%`}
          color="orange"
          showTrend={productivity >= 85}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Performance Trend (Last 6 Months)
          </h3>
          <LineChart data={monthlyScores.slice(-6)} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Skills Assessment
          </h3>
          <RadarChart
            data={[
              { label: "Productivity", value: productivity || 0 },
              { label: "Quality", value: qualityScore || 0 },
              { label: "Punctuality", value: punctuality || 0 },
              { label: "Attendance", value: attendance || 0 },
              { label: "Tasks", value: taskCompletionRate },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" />
            Performance Breakdown
          </h3>
          <div className="space-y-4">
            <MetricBar label="Productivity" value={productivity} color="purple" />
            <MetricBar label="Quality Score" value={qualityScore} color="blue" />
            <MetricBar label="Punctuality" value={punctuality} color="green" />
            <MetricBar label="Attendance" value={attendance} color="yellow" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Feedback
          </h3>
          {feedback && feedback.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {feedback.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <span className="text-xs text-gray-600">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.comment}</p>
                  <p className="text-xs text-gray-600 mt-2">- {item.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No feedback available yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Validation Status
            </h3>
            <p className="text-gray-600">
              {validated
                ? "Your performance has been validated by your manager"
                : "Performance validation is pending"}
            </p>
          </div>
          <div>
            {validated ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-8 h-8" />
                <span className="font-semibold">Validated</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-600">
                <Clock className="w-8 h-8" />
                <span className="font-semibold">Pending</span>
              </div>
            )}
          </div>
        </div>
        {lastUpdated && (
          <p className="text-sm text-gray-600 mt-4">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ icon: Icon, label, value, subValue, color, showTrend }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg border-2 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {showTrend && <TrendingUp className="w-5 h-5 text-green-500" />}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subValue && <p className="text-sm text-gray-600 mt-1">{subValue}</p>}
    </div>
  );
}

function MetricBar({ label, value, color }) {
  const colorClasses = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function LineChart({ data }) {
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const maxValue = Math.max(...data, 100);
  const chartHeight = 200;
  const chartWidth = 100;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-48">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
        />
        {data.map((value, i) => {
          const x = (i / (data.length - 1)) * chartWidth;
          const y = chartHeight - (value / maxValue) * chartHeight;
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {monthLabels.slice(-data.length).map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function RadarChart({ data }) {
  const centerX = 150;
  const centerY = 150;
  const radius = 120;
  const levels = 5;

  const angleStep = (2 * Math.PI) / data.length;

  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (item.value / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 300 300" className="w-full h-64">
      {[...Array(levels)].map((_, i) => {
        const r = radius * ((i + 1) / levels);
        const pts = data.map((_, j) => {
          const angle = j * angleStep - Math.PI / 2;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          return `${x},${y}`;
        }).join(" ");
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {data.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={points}
        fill="#8b5cf6"
        fillOpacity="0.3"
        stroke="#8b5cf6"
        strokeWidth="2"
      />

      {data.map((item, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + (radius + 20) * Math.cos(angle);
        const y = centerY + (radius + 20) * Math.sin(angle);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            className="text-xs fill-gray-700"
          >
            {item.label}
          </text>
        );
      })}
    </svg>
  );
}


// import React, { useState, useEffect } from "react";
// import {
//   TrendingUp,
//   TrendingDown,
//   Award,
//   Target,
//   CheckCircle,
//   Clock,
//   Activity,
//   Calendar,
//   BarChart3,
//   AlertCircle,
//   RefreshCw,
//   Users,
//   Trophy,
//   Medal,
// } from "lucide-react";

// const API_BASE_URL = "http://localhost:8080/api";

// export default function EmployeePerformanceDashboard() {
//   const [performanceData, setPerformanceData] = useState(null);
//   const [allPerformances, setAllPerformances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [myRank, setMyRank] = useState(null);

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (currentUser?.id) {
//       fetchPerformanceData();
//       fetchAllPerformances();
//     }
//   }, [currentUser]);

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/me`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const result = await response.json();
//       if (result.success) {
//         setCurrentUser(result.data);
//       } else {
//         setError("Failed to fetch user data");
//       }
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       setError("Failed to load user information");
//     }
//   };

//   const fetchPerformanceData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${API_BASE_URL}/performance/employee/${currentUser.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const result = await response.json();
      
//       if (result.success) {
//         setPerformanceData(result.data);
//         setError(null);
//       } else {
//         setError(result.message || "Failed to fetch performance data");
//       }
//     } catch (err) {
//       console.error("Error fetching performance:", err);
//       setError("Failed to load performance data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllPerformances = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/performance/all`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const result = await response.json();
      
//       if (result.success) {
//         // Sort by score descending
//         const sorted = [...result.data].sort((a, b) => b.currentScore - a.currentScore);
//         setAllPerformances(sorted);
        
//         // Find current user's rank
//         const rank = sorted.findIndex(p => p.userId === currentUser.id) + 1;
//         setMyRank(rank || null);
//       }
//     } catch (err) {
//       console.error("Error fetching all performances:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your performance data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
//             Unable to Load Data
//           </h2>
//           <p className="text-gray-600 text-center mb-4">{error}</p>
//           <button
//             onClick={fetchPerformanceData}
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!performanceData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
//           <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-900 mb-2">
//             No Performance Data Available
//           </h2>
//           <p className="text-gray-600">
//             Your performance data will appear here once your manager assigns scores.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const {
//     employeeId,
//     name,
//     department,
//     position,
//     currentScore,
//     status,
//     tasksCompleted,
//     totalTasks,
//     attendance,
//     productivity,
//     qualityScore,
//     punctuality,
//     validated,
//     lastUpdated,
//     monthlyScores = [],
//     feedback = [],
//   } = performanceData;

//   const taskCompletionRate = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Excellent":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "Good":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "Average":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "Needs Improvement":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getRankIcon = (rank) => {
//     if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
//     if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
//     if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
//     return <Award className="w-6 h-6 text-blue-600" />;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mb-6">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
//             <p className="text-gray-600 mt-1">
//               Track your performance metrics and growth
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-600">Employee ID</p>
//             <p className="text-lg font-semibold text-gray-900">{employeeId}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-600">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div>
//             <p className="text-sm text-gray-600">Name</p>
//             <p className="text-xl font-bold text-gray-900">{name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Department</p>
//             <p className="text-lg font-semibold text-gray-900">{department}</p>
//             <p className="text-sm text-gray-600">{position}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600 mb-2">Current Status</p>
//             <span
//               className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(
//                 status
//               )}`}
//             >
//               {validated ? (
//                 <CheckCircle className="w-4 h-4" />
//               ) : (
//                 <Clock className="w-4 h-4" />
//               )}
//               {status}
//             </span>
//           </div>
//           {myRank && (
//             <div>
//               <p className="text-sm text-gray-600 mb-2">My Rank</p>
//               <div className="flex items-center gap-2">
//                 {getRankIcon(myRank)}
//                 <span className={`text-2xl font-bold ${
//                   myRank === 1 ? 'text-yellow-500' : 
//                   myRank === 2 ? 'text-gray-400' : 
//                   myRank === 3 ? 'text-orange-600' : 'text-blue-600'
//                 }`}>
//                   #{myRank}
//                 </span>
//                 <span className="text-sm text-gray-600">of {allPerformances.length}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <ScoreCard
//           icon={Target}
//           label="Overall Score"
//           value={currentScore}
//           color="blue"
//           showTrend={currentScore >= 80}
//         />
//         <ScoreCard
//           icon={CheckCircle}
//           label="Task Completion"
//           value={`${tasksCompleted}/${totalTasks}`}
//           subValue={`${taskCompletionRate.toFixed(0)}%`}
//           color="green"
//           showTrend={taskCompletionRate >= 80}
//         />
//         <ScoreCard
//           icon={Calendar}
//           label="Attendance"
//           value={`${attendance}%`}
//           color="purple"
//           showTrend={attendance >= 90}
//         />
//         <ScoreCard
//           icon={Activity}
//           label="Productivity"
//           value={`${productivity}%`}
//           color="orange"
//           showTrend={productivity >= 85}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-blue-600" />
//             Performance Trend (Last 6 Months)
//           </h3>
//           <LineChart data={monthlyScores.slice(-6)} />
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <BarChart3 className="w-5 h-5 text-purple-600" />
//             Skills Assessment
//           </h3>
//           <RadarChart
//             data={[
//               { label: "Productivity", value: productivity || 0 },
//               { label: "Quality", value: qualityScore || 0 },
//               { label: "Punctuality", value: punctuality || 0 },
//               { label: "Attendance", value: attendance || 0 },
//               { label: "Tasks", value: taskCompletionRate },
//             ]}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <Award className="w-5 h-5 text-green-600" />
//             Performance Breakdown
//           </h3>
//           <div className="space-y-4">
//             <MetricBar label="Productivity" value={productivity} color="purple" />
//             <MetricBar label="Quality Score" value={qualityScore} color="blue" />
//             <MetricBar label="Punctuality" value={punctuality} color="green" />
//             <MetricBar label="Attendance" value={attendance} color="yellow" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Recent Feedback
//           </h3>
//           {feedback && feedback.length > 0 ? (
//             <div className="space-y-3 max-h-64 overflow-y-auto">
//               {feedback.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-50 rounded-lg p-4 border border-gray-200"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <p className="font-medium text-gray-900">{item.title}</p>
//                     <span className="text-xs text-gray-600">{item.date}</span>
//                   </div>
//                   <p className="text-sm text-gray-700">{item.comment}</p>
//                   <p className="text-xs text-gray-600 mt-2">- {item.author}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No feedback available yet</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Leaderboard Section */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Users className="w-5 h-5 text-purple-600" />
//           Company Leaderboard (Top Performers)
//         </h3>
//         <div className="overflow-x-auto">
// <table className="w-full">
// <thead className="bg-gray-50">
// <tr>
// <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rank</th>
// <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Employee</th>
// <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Department</th>
// <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Score</th>
// <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
// </tr>
// </thead>
// <tbody className="divide-y divide-gray-200">
// {allPerformances.map((perf, index) => {
// const isCurrentUser = perf.userId === currentUser.id;
// return (
// <tr
// key={perf.id}
// className={${isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}}
// >
// <td className="px-4 py-3 whitespace-nowrap">
// <div className="flex items-center gap-2">
// {index < 3 ? (
// <span className={font-bold text-lg ${                             index === 0 ? 'text-yellow-500' :                              index === 1 ? 'text-gray-400' : 'text-orange-600'                           }}>
// #{index + 1}
// </span>
// ) : (
// <span className="font-semibold text-gray-500">#{index + 1}</span>
// )}
// </div>
// </td>
// <td className="px-4 py-3 whitespace-nowrap">
// <div className="flex items-center gap-2">
// <div>
// <div className={font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}}>
// {perf.name} {isCurrentUser && <span className="text-xs text-blue-600">(You)</span>}
// </div>
// <div className="text-sm text-gray-600">{perf.employeeId}</div>
// </div>
// </div>
// </td>
// <td className="px-4 py-3 whitespace-nowrap">
// <div className="text-sm text-gray-900">{perf.department}</div>
// <div className="text-xs text-gray-600">{perf.position}</div>
// </td>
// <td className="px-4 py-3 whitespace-nowrap">
// <div className="flex items-center gap-2">
// <span className={text-lg font-bold ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}}>
// {perf.currentScore}
// </span>
// {perf.currentScore >= 90 && <TrendingUp className="w-4 h-4 text-green-600" />}
// </div>
// </td>
// <td className="px-4 py-3 whitespace-nowrap">
// <span className={px-3 py-1 inline-flex text-xs font-semibold rounded-full ${                         perf.status === "Excellent" ? "bg-green-100 text-green-800" :                         perf.status === "Good" ? "bg-blue-100 text-blue-800" :                         perf.status === "Average" ? "bg-yellow-100 text-yellow-800" :                         "bg-red-100 text-red-800"                       }}>
// {perf.status}
// </span>
// </td>
// </tr>
// );
// })}
// </tbody>
// </table>
// </div>
// </div>
// <div className="bg-white rounded-lg shadow p-6">
//     <div className="flex items-center justify-between flex-wrap gap-4">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           Validation Status
//         </h3>
//         <p className="text-gray-600">
//           {validated
//             ? "Your performance has been validated by your manager"
//             : "Performance validation is pending"}
//         </p>
//       </div>
//       <div>
//         {validated ? (
//           <div className="flex items-center gap-2 text-green-600">
//             <CheckCircle className="w-8 h-8" />
//             <span className="font-semibold">Validated</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 text-yellow-600">
//             <Clock className="w-8 h-8" />
//             <span className="font-semibold">Pending</span>
//           </div>
//         )}
//       </div>
//     </div>
//     {lastUpdated && (
//       <p className="text-sm text-gray-600 mt-4">
//         Last updated: {new Date(lastUpdated).toLocaleString()}
//       </p>
//     )}
//   </div>
// </div>
// );
// }
// function ScoreCard({ icon: Icon, label, value, subValue, color, showTrend }) {
// const colorClasses = {
// blue: "bg-blue-50 text-blue-600 border-blue-200",
// green: "bg-green-50 text-green-600 border-green-200",
// purple: "bg-purple-50 text-purple-600 border-purple-200",
// orange: "bg-orange-50 text-orange-600 border-orange-200",
// };
// return (
// <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition">
// <div className="flex items-center justify-between mb-4">
// <div className={p-3 rounded-lg border-2 ${colorClasses[color]}}>
// <Icon className="w-6 h-6" />
// </div>
// {showTrend && <TrendingUp className="w-5 h-5 text-green-500" />}
// </div>
// <p className="text-sm text-gray-600 mb-1">{label}</p>
// <p className="text-3xl font-bold text-gray-900">{value}</p>
// {subValue && <p className="text-sm text-gray-600 mt-1">{subValue}</p>}
// </div>
// );
// }
// function MetricBar({ label, value, color }) {
// const colorClasses = {
// purple: "bg-purple-500",
// blue: "bg-blue-500",
// green: "bg-green-500",
// yellow: "bg-yellow-500",
// };
// return (
// <div>
// <div className="flex justify-between text-sm mb-2">
// <span className="font-medium text-gray-700">{label}</span>
// <span className="font-semibold text-gray-900">{value}%</span>
// </div>
// <div className="w-full bg-gray-200 rounded-full h-3">
// <div
// className={h-3 rounded-full ${colorClasses[color]} transition-all duration-500}
// style={{ width: ${value}% }}
// />
// </div>
// </div>
// );
// }
// function LineChart({ data }) {
// const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
// const maxValue = Math.max(...data, 100);
// const chartHeight = 200;
// const chartWidth = 100;
// const points = data.map((value, i) => {
// const x = (i / (data.length - 1)) * chartWidth;
// const y = chartHeight - (value / maxValue) * chartHeight;
// return ${x},${y};
// }).join(" ");
// return (
// <div className="relative">
// <svg viewBox={0 0 ${chartWidth} ${chartHeight}} className="w-full h-48">
// <polyline
//        fill="none"
//        stroke="#3b82f6"
//        strokeWidth="2"
//        points={points}
//      />
// {data.map((value, i) => {
// const x = (i / (data.length - 1)) * chartWidth;
// const y = chartHeight - (value / maxValue) * chartHeight;
// return (
// <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />
// );
// })}
// </svg>
// <div className="flex justify-between mt-2 text-xs text-gray-600">
// {monthLabels.slice(-data.length).map((label, i) => (
// <span key={i}>{label}</span>
// ))}
// </div>
// </div>
// );
// }
// function RadarChart({ data }) {
// const centerX = 150;
// const centerY = 150;
// const radius = 120;
// const levels = 5;
// const angleStep = (2 * Math.PI) / data.length;
// const points = data.map((item, i) => {
// const angle = i * angleStep - Math.PI / 2;
// const r = (item.value / 100) * radius;
// const x = centerX + r * Math.cos(angle);
// const y = centerY + r * Math.sin(angle);
// return ${x},${y};
// }).join(" ");
// return (
//     <svg viewBox="0 0 300 300" className="w-full h-64">
//       {[...Array(levels)].map((_, i) => {
//         const r = radius * ((i + 1) / levels);
//         const pts = data.map((_, j) => {
//           const angle = j * angleStep - Math.PI / 2;
//           const x = centerX + r * Math.cos(angle);
//           const y = centerY + r * Math.sin(angle);
//           return `x,{x},
// x,{y}`;
//         }).join(" ");
//         return (
//           <polygon
//             key={i}
//             points={pts}
//             fill="none"
//             stroke="#e5e7eb"
//             strokeWidth="1"
//           />
//         );
//       })}
//         {data.map((_, i) => {
//     const angle = i * angleStep - Math.PI / 2;
//     const x = centerX + radius * Math.cos(angle);
//     const y = centerY + radius * Math.sin(angle);
//     return (
//       <line
//         key={i}
//         x1={centerX}
//         y1={centerY}
//         x2={x}
//         y2={y}
//         stroke="#e5e7eb"
//         strokeWidth="1"
//       />
//     );
//   })}

//   <polygon
//     points={points}
//     fill="#8b5cf6"
//     fillOpacity="0.3"
//     stroke="#8b5cf6"
//     strokeWidth="2"
//   />

//   {data.map((item, i) => {
//     const angle = i * angleStep - Math.PI / 2;
//     const x = centerX + (radius + 20) * Math.cos(angle);
//     const y = centerY + (radius + 20) * Math.sin(angle);
//     return (
//       <text
//         key={i}
//         x={x}
//         y={y}
//         textAnchor="middle"
//         className="text-xs fill-gray-700"
//       >
//         {item.label}
//       </text>
//     );
//   })}
// </svg>
// );
// }