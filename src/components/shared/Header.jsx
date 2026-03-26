import React from "react";
import logo from "../../assets/images/logo.png";
import { FaBell, FaSearch } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri"; // Switching to a slightly more modern user icon

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#0F172A] border-b border-white/5 sticky top-0 z-[60] backdrop-blur-md bg-opacity-90">
      {/* LOGO SECTION */}
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="relative">
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover:bg-indigo-500/40 transition-all"></div>
          <img
            src={logo}
            className="h-9 w-9 md:h-11 md:w-11 object-contain relative z-10"
            alt="NovaPos Logo"
          />
        </div>
        <div className="hidden sm:block leading-none">
          <h1 className="text-white text-xl font-black tracking-tighter italic">
            NOVA<span className="text-indigo-400">POS</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">
            Enterprise
          </p>
        </div>
      </div>

      {/* SEARCH BAR - Refined with focus-ring and better padding */}
      <div className="hidden md:flex items-center bg-slate-800/50 border border-white/5 px-4 py-2.5 rounded-2xl w-[300px] lg:w-[450px] transition-all focus-within:border-indigo-500/50 focus-within:bg-slate-800 focus-within:shadow-[0_0_20px_rgba(79,70,229,0.1)]">
        <FaSearch className="text-slate-500 mr-3 text-sm" />
        <input
          type="text"
          placeholder="Search products, orders, or tables..."
          className="bg-transparent outline-none text-slate-200 w-full text-sm placeholder:text-slate-500 font-medium"
        />
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-[10px] font-medium text-slate-500">
          ⌘K
        </kbd>
      </div>

      {/* RIGHT SECTION: ACTIONS & PROFILE */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Mobile Search - Clean Circle */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl border border-white/5 text-slate-300">
          <FaSearch size={16} />
        </button>

        {/* Notification - With "Live" indicator */}
        <div className="relative group">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-[#0F172A] rounded-full z-10"></div>
          <button className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl border border-white/5 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
            <FaBell size={18} />
          </button>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-1px h-8 bg-white/10 mx-1"></div>

        {/* User Profile - More compact and pro */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-white text-sm font-bold leading-none mb-1">
              Syahmi
            </p>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-tighter">
              Manager
            </p>
          </div>
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <RiUser3Fill size={22} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
