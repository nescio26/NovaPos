import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  FaBell,
  FaSearch,
  FaSun,
  FaMoon,
  FaExclamationTriangle,
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

  // State for the confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.error("Logout Error:", error);
    },
  });

  const [isDark, setIsDark] = useState(() =>
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
    <>
      <header className="flex items-center justify-between px-4 md:px-10 py-4 bg-white/80 dark:bg-[#0B0E11]/80 border-b border-slate-100 dark:border-white/5 sticky top-0 z-[60] backdrop-blur-xl transition-all">
        {/* LOGO SECTION */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 sm:gap-4 group cursor-pointer"
        >
          <div className="hidden sm:block leading-none">
            <h1 className="text-[#1A1D21] dark:text-white text-xl md:text-2xl font-black tracking-tighter italic uppercase">
              Nova<span className="text-[#FF5C00]">POS</span>
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-[0.3em] uppercase mt-1">
              Smart Terminal
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden lg:flex items-center bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 px-5 py-3 rounded-2xl w-[400px] xl:w-[500px] transition-all focus-within:border-[#FF5C00]/30 focus-within:bg-white dark:focus-within:bg-[#16191D]">
          <FaSearch className="text-slate-400 dark:text-slate-600 mr-3 text-sm" />
          <input
            type="text"
            placeholder="Search menu, tables, or orders..."
            className="bg-transparent outline-none text-[#1A1D21] dark:text-white w-full text-sm font-bold placeholder:text-slate-300 uppercase tracking-wider"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center bg-[#F8F9FD] dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-400 hover:text-[#FF5C00] transition-all active:scale-90"
          >
            {isDark ? (
              <FaSun size={20} className="text-orange-400" />
            ) : (
              <FaMoon size={20} />
            )}
          </button>
          {userData.role === "admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
            >
              <MdDashboard size={28} />
            </button>
          )}

          <div className="hidden md:block w-[1px] h-8 bg-slate-100 dark:bg-white/5 mx-1"></div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.2rem] bg-[#1A1D21] dark:bg-white/10 flex items-center justify-center text-white shadow-lg group-hover:bg-[#FF5C00] transition-all duration-500">
                <RiUser3Fill size={24} />
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-[#1A1D21] dark:text-white text-lg font-black leading-none mb-1">
                  {userData.name || "N/A"}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-wider flex items-center justify-end gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  {userData.role || "N/A"}
                </p>
              </div>
            </div>

            {/* Logout Trigger */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
            >
              <IoLogOut size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutConfirm(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white dark:bg-[#121417] w-full max-w-sm rounded-[2rem] border border-slate-100 dark:border-white/5 p-8 shadow-2xl transition-all scale-110">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <FaExclamationTriangle size={32} />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tighter dark:text-white mb-2">
                Log Out?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-8">
                Are you sure you want to end <br /> your active session?
              </p>

              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Go Back
                </button>
                <button
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="py-4 rounded-2xl bg-red-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  {logoutMutation.isPending ? "..." : "Log Out"}
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
