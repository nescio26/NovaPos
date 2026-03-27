import React, { useState } from "react"; // ✅ remove useEffect import
import { FaBell, FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

const Header = () => {
  const [isDark, setIsDark] = useState(() =>
    // ✅ lazy initializer
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-10 py-4 bg-white/80 dark:bg-[#0B0E11]/80 border-b border-slate-100 dark:border-white/5 sticky top-0 z-[60] backdrop-blur-xl transition-all">
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
        <div className="hidden sm:block leading-none">
          <h1 className="text-[#1A1D21] dark:text-white text-xl md:text-2xl font-black tracking-tighter italic uppercase">
            Nova<span className="text-[#FF5C00]">POS</span>
          </h1>
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black tracking-[0.3em] uppercase mt-0.5">
            Smart Terminal
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="hidden lg:flex items-center bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 px-5 py-3 rounded-2xl w-[400px] xl:w-[500px] transition-all focus-within:border-[#FF5C00]/30 focus-within:bg-white dark:focus-within:bg-[#16191D]">
        <FaSearch className="text-slate-300 dark:text-slate-600 mr-3 text-sm" />
        <input
          type="text"
          placeholder="Search menu, tables, or orders..."
          className="bg-transparent outline-none text-[#1A1D21] dark:text-white w-full text-xs font-bold placeholder:text-slate-300 uppercase tracking-widest"
        />
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-[#0B0E11] border border-slate-100 dark:border-white/5 text-[9px] font-black text-slate-400 shadow-sm">
          <span className="opacity-50">CMD</span> K
        </div>
      </div>

      {/* RIGHT SECTION: ACTIONS & PROFILE */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className="w-11 h-11 flex items-center justify-center bg-[#F8F9FD] dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-400 hover:text-[#FF5C00] transition-all active:scale-90 overflow-hidden"
        >
          <div
            className={`transition-all duration-500 ${isDark ? "rotate-[360deg]" : "rotate-0"}`}
          >
            {isDark ? (
              <FaSun size={18} className="text-orange-400" />
            ) : (
              <FaMoon size={18} />
            )}
          </div>
        </button>

        {/* Notification */}
        <div className="relative group">
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF5C00] border-2 border-white dark:border-[#0B0E11] rounded-full z-20 animate-pulse"></div>
          <button className="w-11 h-11 flex items-center justify-center bg-[#F8F9FD] dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-400 hover:text-[#FF5C00] transition-all">
            <FaBell size={18} />
          </button>
        </div>

        <div className="hidden md:block w-[1px] h-8 bg-slate-100 dark:bg-white/5 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-1 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-[#1A1D21] dark:text-white text-sm font-black leading-none mb-1 group-hover:text-[#FF5C00] transition-colors">
              Syahmi
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest flex items-center justify-end gap-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              Manager
            </p>
          </div>
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-[1.2rem] bg-[#1A1D21] dark:bg-white/10 flex items-center justify-center text-white shadow-xl shadow-slate-200 dark:shadow-none group-hover:bg-[#FF5C00] group-hover:-translate-y-1 transition-all duration-500">
            <RiUser3Fill size={22} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
