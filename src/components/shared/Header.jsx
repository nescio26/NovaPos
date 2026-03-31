import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  FaSearch,
  FaSun,
  FaMoon,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  return (
    <>
      <header className="sticky top-0 z-[60] w-full bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 py-3 md:py-4 flex items-center justify-between gap-4">
          {/* LEFT: LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center shrink-0 cursor-pointer group"
          >
            <div className="leading-none">
              <h1 className="text-[#1A1D21] dark:text-white text-lg md:text-2xl font-black tracking-tighter italic uppercase transition-colors group-hover:text-[#FF5C00]">
                Nova
                <span className="text-[#FF5C00] group-hover:text-[#1A1D21] dark:group-hover:text-white">
                  POS
                </span>
              </h1>
              <p className="hidden xs:block text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mt-0.5 md:mt-1">
                Smart Terminal
              </p>
            </div>
          </div>

          {/* MIDDLE: SEARCH BAR (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl items-center bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 px-5 py-2.5 rounded-2xl transition-all focus-within:border-[#FF5C00]/30 focus-within:ring-4 focus-within:ring-[#FF5C00]/5 focus-within:bg-white dark:focus-within:bg-[#16191D]">
            <FaSearch className="text-slate-400 dark:text-slate-600 mr-3 text-sm" />
            <input
              type="text"
              placeholder="Search menu, tables, or orders..."
              className="bg-transparent outline-none text-[#1A1D21] dark:text-white w-full text-sm font-bold placeholder:text-slate-300 uppercase tracking-wider"
            />
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {/* Mobile Search Trigger */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="lg:hidden p-2.5 text-slate-400 hover:text-[#FF5C00] transition-colors"
            >
              <FaSearch size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#F8F9FD] dark:bg-white/5 rounded-xl md:rounded-2xl border border-slate-100 dark:border-white/5 text-slate-400 hover:text-[#FF5C00] transition-all active:scale-90"
            >
              {isDark ? (
                <FaSun size={18} className="text-orange-400" />
              ) : (
                <FaMoon size={18} />
              )}
            </button>

            {userData.role === "admin" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden sm:flex p-2.5 md:p-3 text-slate-400 hover:text-[#FF5C00] hover:bg-orange-50 dark:hover:bg-white/5 rounded-xl transition-all active:scale-95"
              >
                <MdDashboard size={24} />
              </button>
            )}

            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block"></div>

            {/* USER PROFILE */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[1.2rem] bg-[#1A1D21] dark:bg-white/10 flex items-center justify-center text-white shadow-lg border border-white/5">
                  <RiUser3Fill size={20} className="md:size-6" />
                </div>

                <div className="text-right hidden xl:block">
                  <p className="text-[#1A1D21] dark:text-white text-sm font-black leading-none mb-1 truncate max-w-[120px]">
                    {userData.name || "User"}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider flex items-center justify-end gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    {userData.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2.5 md:p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
              >
                <IoLogOut size={24} className="md:size-7" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE FULL-SCREEN SEARCH OVERLAY */}
        {mobileSearchOpen && (
          <div className="absolute inset-0 bg-white dark:bg-[#0B0E11] px-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <FaSearch className="text-[#FF5C00] text-lg" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-[#1A1D21] dark:text-white font-bold uppercase"
            />
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 text-slate-400"
            >
              <FaTimes size={20} />
            </button>
          </div>
        )}
      </header>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowLogoutConfirm(false)}
          ></div>

          <div className="relative bg-white dark:bg-[#121417] w-full max-w-[340px] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <FaExclamationTriangle size={32} />
              </div>

              <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white mb-2">
                Session Exit
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-8">
                Are you sure you want to <br /> leave the terminal?
              </p>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="w-full py-4 rounded-2xl bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/30 hover:bg-red-600 active:scale-95 transition-all"
                >
                  {logoutMutation.isPending ? "Closing..." : "Yes, Log Out"}
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
