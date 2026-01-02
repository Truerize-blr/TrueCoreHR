import React from "react";

const TopNav = ({ onLogout }) => {
  return (
    <nav className="w-full h-18 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm sticky top-0 z-50">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        
{/* Admin Icon */}

  <img
    src="/assets/Logo_Truerize.png"
    alt="Admin"
    className="h-15 w-15 object-contain"
  />

        {/* Title */}
        <div className="leading-tight">
          <h1 className="text-lg font-semibold text-[#011A8B]">Employee Dashboard</h1>
          <span className="text-xs text-gray-500">Powered by TrueCoreHR</span>
        </div>
        
      </div>

      {/* RIGHT SECTION */}
      <div>
        <button
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 transition px-4 py-2 rounded-xl text-red-600 text-sm font-medium shadow-sm border border-red-200"
          onClick={onLogout}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>

    </nav>
  );
};

export default TopNav;