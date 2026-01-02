import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Adjusts so the navbar doesn't cover the title
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-x-hidden pt-20">
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-200 opacity-40 blur-3xl"></div>
      </div>

      {/* ======================= NAVBAR======================= */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
        <nav className="flex w-full items-center gap-12 px-10 py-2 relative z-20 bg-white">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/assets/Logo_Truerize.png" alt="Truerize Logo" className="h-20 w-auto object-contain" />
            <div className="flex flex-col leading-none">

          <span className="text-[26px] font-black tracking-tight font-sans text-[#001A7D]">
           TrueCore<span className="text-[#3B82F6]">HR</span>
          </span>
          
        </div>
          </div>

          {/* CENTER: Navigation Links with Dropdowns */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-900 font-sans tracking-wide h-full">
            
            {/* 1. FEATURES (Scrolls to section) */}
            <button onClick={() => scrollToSection('features')} className="hover:text-[#000080] transition-colors">
              Features
            </button>

          {/* SOLUTIONS DROPDOWN */}
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 hover:text-[#000080] transition-colors py-4">
                Solutions
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full -left-4 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden grid gap-1">
                  
                  {/* 1. Recruitment */}
                  <a href="/solutions/recruitment" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover/item:bg-[#000080] group-hover/item:text-white transition-colors">🚀</div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Recruitment</div>
                      <div className="text-xs text-slate-500">ATS & Onboarding</div>
                    </div>
                  </a>

                  {/* 2. Payroll */}
                  <a href="/solutions/payroll" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <div className="mt-1 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover/item:bg-[#000080] group-hover/item:text-white transition-colors">💰</div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Payroll</div>
                      <div className="text-xs text-slate-500">Salary & Taxes</div>
                    </div>
                  </a>

                  {/* 3. Attendance */}
                  <a href="/solutions/attendance" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <div className="mt-1 w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover/item:bg-[#000080] group-hover/item:text-white transition-colors">⏰</div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Time & Attendance</div>
                      <div className="text-xs text-slate-500">Shifts & Leaves</div>
                    </div>
                  </a>

                  {/* 4. Performance */}
                  <a href="/solutions/performance" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <div className="mt-1 w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover/item:bg-[#000080] group-hover/item:text-white transition-colors">📊</div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Performance</div>
                      <div className="text-xs text-slate-500">Appraisals & Goals</div>
                    </div>
                  </a>

                </div>
              </div>
            </div>

            {/* 3. PRICING (Scrolls to section - Make sure you create <section id="pricing"> later) */}
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#000080] transition-colors">
              Pricing
            </button>

            {/* 4. RESOURCES (Rich Dropdown) */}
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 hover:text-[#000080] transition-colors py-4">
                Resources
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full -left-4 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden grid gap-1">
                  <a href="/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <span className="text-lg">📝</span>
                    <span className="text-sm font-medium text-slate-700 group-hover/item:text-[#000080]">Blog</span>
                  </a>
                  <a href="/help-center" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <span className="text-lg">💡</span>
                    <span className="text-sm font-medium text-slate-700 group-hover/item:text-[#000080]">Help Center</span>
                  </a>
                  <a href="/api-docs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm font-medium text-slate-700 group-hover/item:text-[#000080]">API Docs</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-6 ml-auto">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`transition-colors duration-200 hover:text-[#000080] ${isSearchOpen ? 'text-[#000080]' : 'text-slate-900'}`}>
              {isSearchOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              )}
            </button>
           <Link
  to="/login"
  className="text-[15px] font-medium hover:text-[#000080] text-slate-900"
>
  Sign in
</Link>
            <button className="hidden sm:inline-flex rounded text-sm font-bold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" style={{ backgroundColor: '#000080', padding: '10px 24px' }}>Get started</button>
          </div>
        </nav>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-100 ${isSearchOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="relative flex items-center bg-white border border-slate-200 rounded hover:border-slate-300 transition-colors">
              <input type="text" placeholder="Search..." className="w-full py-3 px-5 text-slate-700 outline-none placeholder:text-slate-400 text-[15px]" autoFocus={isSearchOpen} />
              <button className="p-3 text-slate-500 hover:text-[#000080]">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ======================= MAIN CONTENT ======================= */}
      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
<section className="pt-8 pb-20 px-6 lg:pt-10 lg:pb-32 relative">
  <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:gap-16">
<div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">


<div className="flex justify-center lg:justify-start gap-8 mb-8 border-b border-slate-100 pb-4 w-fit">
   <div>
      <p className="text-xl font-extrabold text-slate-900">2x</p>
      <p className="text-[10px] text-slate-500 font-medium uppercase">Faster Hiring</p>
   </div>
   <div className="w-px h-8 bg-slate-200"></div>
   <div>
      <p className="text-xl font-extrabold text-slate-900">0%</p>
      <p className="text-[10px] text-slate-500 font-medium uppercase">Payroll Errors</p>
   </div>
</div>


  <div 
  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold mb-8 shadow-sm"
  style={{ color: '#000080' }}
  >
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#000080' }}></span>
  </span>
  Trusted by growing teams everywhere
</div>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-[1.1]">
                Put your HR on <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600" style={{ color: '#000080' }}>Autopilot.</span>
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-600 mb-10 leading-relaxed">
                From onboarding to attendance, leave, and payroll, manage your entire employee lifecycle in one simple, powerful HRMS.
              </p>
             <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
    <Link 
        to="/solutions/bookdemo" 
        className="rounded-full px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
        style={{ backgroundColor: '#000080' }}
    >
        Book a demo
    </Link>
</div>
            </div>
            
            {/* HERO DASHBOARD CARD RIGHT */}
          {/* RIGHT COLUMN: Infinite Scroll Activity Feed (Option 3) */}
            <div className="flex-1 relative h-[550px] overflow-hidden mask-linear-fade">
              
              {/* Custom CSS for the Infinite Scroll Animation */}
              <style>{`
                @keyframes scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
                @keyframes scroll-down { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
                .animate-scroll-up { animation: scroll-up 40s linear infinite; }
                .animate-scroll-down { animation: scroll-down 40s linear infinite; }
                /* Fade masks to make cards appear/disappear smoothly */
                .mask-linear-fade {
                   mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                   -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                }
              `}</style>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

              <div className="flex gap-6 h-full">
                 
                 {/* COLUMN 1: Scrolling UP */}
                 <div className="flex-1 flex flex-col gap-4 animate-scroll-up">
                    {/* --- Content Block A --- */}
                    <ActivityCard title="New Hire" desc="Sarah Jenkins joined Design" time="2m ago" icon="🎉" color="bg-green-100" />
                    <ActivityCard title="Payroll Run" desc="$142k processed successfully" time="1h ago" icon="💰" color="bg-blue-100" />
                    <ActivityCard title="Leave Request" desc="Mike requested 3 days off" time="3h ago" icon="📅" color="bg-orange-100" />
                    <ActivityCard title="Review Cycle" desc="Q4 Reviews started" time="5h ago" icon="📈" color="bg-purple-100" />
                    
                    {/* --- Duplicate Block A (For Seamless Loop) --- */}
                    <ActivityCard title="New Hire" desc="Sarah Jenkins joined Design" time="2m ago" icon="🎉" color="bg-green-100" />
                    <ActivityCard title="Payroll Run" desc="$142k processed successfully" time="1h ago" icon="💰" color="bg-blue-100" />
                    <ActivityCard title="Leave Request" desc="Mike requested 3 days off" time="3h ago" icon="📅" color="bg-orange-100" />
                    <ActivityCard title="Review Cycle" desc="Q4 Reviews started" time="5h ago" icon="📈" color="bg-purple-100" />
                 </div>

                 {/* COLUMN 2: Scrolling DOWN */}
                 <div className="flex-1 flex flex-col gap-4 animate-scroll-down">
                    {/* --- Content Block B --- */}
                    <ActivityCard title="Expense" desc="Travel reimbursement paid" time="10m ago" icon="💳" color="bg-pink-100" />
                    <ActivityCard title="Attendance" desc="98% On-time today" time="30m ago" icon="⏰" color="bg-indigo-100" />
                    <ActivityCard title="Promotion" desc="Alex promoted to Lead" time="2h ago" icon="⭐" color="bg-yellow-100" />
                    <ActivityCard title="Compliance" desc="Tax documents updated" time="4h ago" icon="🔒" color="bg-teal-100" />

                    {/* --- Duplicate Block B (For Seamless Loop) --- */}
                    <ActivityCard title="Expense" desc="Travel reimbursement paid" time="10m ago" icon="💳" color="bg-pink-100" />
                    <ActivityCard title="Attendance" desc="98% On-time today" time="30m ago" icon="⏰" color="bg-indigo-100" />
                    <ActivityCard title="Promotion" desc="Alex promoted to Lead" time="2h ago" icon="⭐" color="bg-yellow-100" />
                    <ActivityCard title="Compliance" desc="Tax documents updated" time="4h ago" icon="🔒" color="bg-teal-100" />
                 </div>

              </div>
            </div>
          </div>
        </section>

{/* 2. CORE VALUES SECTION */}
        <section className="py-12 border-y border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
               The Truerize Standard
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {/* 1. Setup */}
               <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">🚀</div>
                  <div>
                    <h4 className="font-bold text-slate-900">5-Minute Setup</h4>
                    <p className="text-xs text-slate-500 mt-1">No complex training needed.</p>
                  </div>
               </div>

               {/* 2. Security */}
               <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">🔒</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Secure by Design</h4>
                    <p className="text-xs text-slate-500 mt-1">Data encrypted at rest.</p>
                  </div>
               </div>

               {/* 3. Transparency */}
               <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-2xl">💳</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Transparent Pricing</h4>
                    <p className="text-xs text-slate-500 mt-1">No hidden implementation fees.</p>
                  </div>
               </div>

               {/* 4. Support */}
               <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-2xl">💬</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Support</h4>
                    <p className="text-xs text-slate-500 mt-1">Talk to real humans, not bots.</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

{/* 3. FEATURE: ATTENDANCE (Text Left, UI Right — Real Portal Style) */}
<section className="py-24 overflow-hidden">
  <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-20">
    
    {/* TEXT SECTION */}
    <div className="flex-1 mb-12 lg:mb-0">
      <span className="font-bold text-sm tracking-widest uppercase text-blue-600">
        Attendance
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
        A smarter way to track<br />time and presence.
      </h2>

      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        Your team can record attendance, track work hours, monitor breaks, and view
        their entire monthly performance in one place. Everything syncs instantly
        with payroll to ensure complete accuracy.
      </p>

      <ul className="space-y-4 mb-8">
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
          <span className="text-slate-700 font-medium">Interactive attendance calendar</span>
        </li>

        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
          <span className="text-slate-700 font-medium">Start/Stop work with a single click</span>
        </li>

        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
          <span className="text-slate-700 font-medium">Live work-time and break-time tracking</span>
        </li>

        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
          <span className="text-slate-700 font-medium">Apply leave or request corrections instantly</span>
        </li>
      </ul>
    </div>

   {/* Attendance UI Mockup */}
<div className="flex-1 relative">
    
    {/* Background blob */}
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

    {/* CARD with hover tilt */}
    <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 
                    rotate-1 hover:rotate-0 transition-transform duration-500">

        {/* MINI CALENDAR MOCKUP */}
        <div className="mb-8">
          <h4 className="font-bold text-slate-800 mb-3">Attendance Calendar</h4>
          <div className="grid grid-cols-7 gap-3 text-center text-xs">
            <div className="p-2 border rounded-lg">1</div>
            <div className="p-2 border rounded-lg">2</div>
            <div className="p-2 border rounded-lg bg-blue-50 border-blue-500 font-bold">3</div>
            <div className="p-2 border rounded-lg">4</div>
            <div className="p-2 border rounded-lg">5</div>
            <div className="p-2 border rounded-lg bg-slate-100">6</div>
            <div className="p-2 border rounded-lg bg-slate-100">7</div>
          </div>
        </div>

        {/* Punch Controls */}
        <div className="border rounded-xl p-4 mb-6">
          <p className="text-slate-500 text-sm mb-2">Status:</p>
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Not Started</span>

          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium">
            Start Work
          </button>

          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p className="text-slate-500">Work</p>
              <p className="text-blue-600 font-bold">00:00:00</p>
            </div>
            <div>
              <p className="text-slate-500">Break</p>
              <p className="text-red-600 font-bold">00:00:00</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-3">
          <button className="bg-green-500 text-white w-full py-2 rounded-lg font-medium">
            Apply Leave
          </button>
          <button className="bg-orange-500 text-white w-full py-2 rounded-lg font-medium">
            Request Correction
          </button>
        </div>

    </div>
</div>


  </div>
</section>


        {/* 4. FEATURE: PAYROLL (UI Left, Text Right) */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:flex-row-reverse lg:gap-20">
            <div className="flex-1 mb-12 lg:mb-0">
               <span className="font-bold text-sm tracking-widest uppercase text-blue-600">Payroll & Expenses</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">Payroll that runs itself.<br/>Error-free.</h2>
               <p className="text-lg text-slate-600 leading-relaxed mb-8">
                 Say goodbye to spreadsheets. Truerize automatically calculates taxes, deductions, and bonuses based on attendance data. Run payroll in minutes, not days.
               </p>
               <button className="text-[#000080] font-bold hover:underline flex items-center gap-2">
                 Explore Payroll Features 
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
               </button>
            </div>

            {/* Payroll UI Mockup */}
            <div className="flex-1 relative">
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">💰</div>
                       <div>
                          <p className="text-sm text-slate-500">Total Payroll Cost</p>
                          <p className="text-2xl font-bold text-slate-900">$142,500.00</p>
                       </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                       <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-slate-700">Processing October Salary</span>
                          <span className="text-blue-600 font-bold">100%</span>
                       </div>
                       <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 w-full h-full"></div>
                       </div>
                       <p className="text-xs text-slate-400 mt-2">All tax deductions calculated automatically.</p>
                    </div>
                    <button className="w-full py-3 rounded-lg bg-[#000080] text-white font-bold text-sm shadow-lg">Release Payments</button>
                </div>
            </div>
          </div>
        </section>

        {/* 5. IMPACT STATS (Dark Section) */}
        <section className="py-20 text-white" style={{ backgroundColor: '#000080' }}>
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800">
                 <div className="p-4">
                    <p className="text-5xl font-extrabold mb-2">50%</p>
                    <p className="text-blue-200">Less time on Admin</p>
                 </div>
                 <div className="p-4">
                    <p className="text-5xl font-extrabold mb-2">100%</p>
                    <p className="text-blue-200">Compliance Accuracy</p>
                 </div>
                 <div className="p-4">
                    <p className="text-5xl font-extrabold mb-2">24/7</p>
                    <p className="text-blue-200">Employee Self-Service</p>
                 </div>
              </div>
           </div>
        </section>

{/* 6. GRID OF FEATURES */}
<section
  id="features"
  className="relative bg-slate-50 py-24 scroll-mt-20 overflow-hidden"
>
  {/* Decorative blobs */}
  <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-100 opacity-40 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-100 opacity-40 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 text-center">
    <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
      Core Features
    </span>

    <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "#000080" }}>
      Everything in one smart dashboard
    </h2>

    <p className="text-slate-500 max-w-2xl mx-auto mb-14 text-sm md:text-base">
      From employee records to payroll prep, TrueCoreHR keeps your entire HR
      workflow connected, automated, and easy to manage.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
      <FeatureCard
        icon="👥"
        title="Employee Dashboard"
        description="Secure, centralized records for every employee."
      />
      <FeatureCard
        icon="🕒"
        title="Attendance"
        description="Track clock-ins, breaks, and timesheets in real time."
      />
      <FeatureCard
        icon="📅"
        title="Leave Management"
        description="Custom leave types, rules, and approval workflows."
      />
      <FeatureCard
        icon="💰"
        title="Payroll Prep"
        description="Clean exports with all earnings, deductions, and days."
      />
      <FeatureCard
        icon="📊"
        title="Analytics"
        description="Get instant insights into headcount, leave, and trends."
      />
      <FeatureCard
        icon="📱"
        title="Mobile App"
        description="Coming soon — manage HR on the go from anywhere."
      />
      <FeatureCard
        icon="🔒"
        title="Security"
        description="Role-based access with enterprise-grade protection."
      />
      <FeatureCard
        icon="🚀"
        title="Onboarding"
        description="Smooth joining experience with zero paperwork chaos."
      />
    </div>
  </div>
</section>


{/* ================================================================= */}
        {/* PRICING SECTION                                                   */}
        {/* ================================================================= */}
        <section id="pricing" className="py-24 bg-white border-y border-slate-100 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            
            {/* Section Header (Toggle Removed) */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
              <p className="text-slate-500">No hidden fees. Pay only for active employees.</p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* CARD 1: STARTER */}
              <div className="border border-slate-200 rounded-2xl p-8 flex flex-col bg-white hover:border-blue-200 transition-colors">
                <div className="mb-4">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Starter</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                    <span className="text-slate-500 font-medium">/forever</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Free forever for up to 10 employees.</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> Core HR Database</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> Document Management</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> Basic Leave Tracking</li>
                </ul>
                <button className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:border-[#000080] hover:text-[#000080] transition-all">
                  Get Started
                </button>
              </div>

              {/* CARD 2: PRO (₹99/month) */}
              <div className="relative border border-[#000080] bg-[#000080] rounded-2xl p-8 flex flex-col text-white shadow-2xl transform md:-translate-y-4">
                {/* Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  Most Popular
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">Growth</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">₹99</span>
                    {/* Added /month for clarity since toggle is gone */}
                    <span className="text-blue-200 text-sm font-medium">/employee/month</span>
                  </div>
                  <p className="text-xs text-blue-200 mt-2">Everything you need to scale fast.</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-blue-50"><span className="text-white">✓</span> <strong>Everything in Starter</strong></li>
                  <li className="flex items-center gap-2 text-sm text-blue-50"><span className="text-white">✓</span> Automated Payroll (India)</li>
                  <li className="flex items-center gap-2 text-sm text-blue-50"><span className="text-white">✓</span> Biometric Integration</li>
                  <li className="flex items-center gap-2 text-sm text-blue-50"><span className="text-white">✓</span> Employee Self-Service App</li>
                </ul>
                <button className="w-full py-3 rounded-xl bg-white font-bold text-[#000080] hover:bg-blue-50 transition-all shadow-lg">
                  Try Free for 7 Days
                </button>
              </div>

              {/* CARD 3: ENTERPRISE */}
              <div className="border border-slate-200 rounded-2xl p-8 flex flex-col bg-white hover:border-blue-200 transition-colors">
                <div className="mb-4">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Enterprise</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">For large organizations (500+).</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> <strong>Everything in Growth</strong></li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> Dedicated Success Manager</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> Custom API Integrations</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><span className="text-green-500">✓</span> On-Premise Deployment</li>
                </ul>
                <button className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:border-[#000080] hover:text-[#000080] transition-all">
                  Contact Sales
                </button>
              </div>

            </div>

            {/* Disclaimer Text - Right Aligned (Below 3rd Card) */}
            <div className="max-w-6xl mx-auto mt-4 text-right">
              <p className="text-xs font-medium text-black">
                * Local taxes (VAT, GST, etc.) will be charged in addition to the prices mentioned.
              </p>
            </div>

          </div>
        </section>


        {/* 7. CTA SECTION */}
        <section className="py-24 relative overflow-hidden bg-white">
           <div className="absolute inset-0 bg-slate-50 -skew-y-3 origin-top-left -z-10 transform scale-110"></div>
           <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Ready to upgrade your HR?</h2>
              <p className="text-lg text-slate-600 mb-10">Join 5,000+ companies streamlining their people operations with Truerize.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="rounded-full px-10 py-5 text-base font-bold text-white shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#000080' }}>
                  Get Started
                </button>
                <button className="rounded-full border-2 border-slate-200 bg-white px-10 py-5 text-base font-bold text-slate-700 hover:bg-slate-50 transition-all duration-300">
                  Contact Sales
                </button>
              </div>
           </div>
        </section>

      </main>

     {/* FOOTER */}
      <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800">
          
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-8 mb-12">

             <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-9 rounded bg-white flex items-center justify-center text-[#000080] font-bold text-xs">HRMS</div>
                  <span className="font-bold text-white text-lg">Truerize Inc.</span>
                </div>
                <p className="text-sm max-w-xs">Making work life better for everyone.</p>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                   <li><a href="#" className="hover:text-white">Features</a></li>
                   <li><a href="#" className="hover:text-white">Pricing</a></li>
                   <li><a href="#" className="hover:text-white">Integrations</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                   <li><a href="#" className="hover:text-white">About Us</a></li>
                   <li><a href="#" className="hover:text-white">Careers</a></li>
                   <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
             </div>
          </div>


          <div className="mx-auto max-w-7xl px-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 mb-8">
             
             {/* LEFT: Support Email */}
             <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@truerize.com" className="text-white font-medium hover:underline">
                   support@truerize.com
                </a>
             </div>

             {/* RIGHT: Colorful Social Icons */}
         <div className="flex items-center gap-4">
  {/* Facebook */}
  <a 
    href="#" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:scale-110 transition-transform"
  >
    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  </a>
  
  {/* X (Twitter) */}
  <a 
    href="#" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:scale-110 transition-transform"
  >
    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  </a>

  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com/company/truerizeiq-strategic-solutions-pvt-ltd/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:scale-110 transition-transform"
  >
    <svg className="w-6 h-6" fill="#0A66C2" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  </a>

  {/* YouTube */}
  <a 
    href="#" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:scale-110 transition-transform"
  >
    <svg className="w-7 h-7" fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/truerizeiq?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:scale-110 transition-transform"
  >
    <svg className="w-6 h-6" fill="#E4405F" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  </a>
</div>
          </div>
          {/* ================================================================================== */}

          <div className="mx-auto max-w-7xl px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
             <p>© {new Date().getFullYear()} Truerize Inc. All rights reserved.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
             </div>
          </div>

        </footer>
    </div>
  );
}

// --- Helper Components ---
function FeatureCard({ title, description, icon }) {
  return (
    <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors duration-300 group-hover:bg-[#000080] group-hover:text-white bg-blue-50 text-blue-900">{icon}</div>
      <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-[#000080] transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function ActivityCard({ title, desc, time, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3 transition-all duration-300 hover:shadow-md hover:border-slate-200 cursor-default">
      {/* Icon Circle */}
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-lg shrink-0`}>
        {icon}
      </div>
      
      {/* Text Content */}
      <div>
        <h4 className="font-bold text-slate-800 text-sm leading-tight">{title}</h4>
        <p className="text-xs text-slate-500 mt-1 leading-tight">{desc}</p>
        <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{time}</p>
      </div>
    </div>
  );
}

function CandidateCard({ name, role, status, active }) {
    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border ${active ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-white'}`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-[#000080] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-white border border-slate-200 text-slate-600">{status}</span>
        </div>
    )
}