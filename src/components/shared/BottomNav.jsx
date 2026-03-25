import React from "react";
import { BiSolidDish } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    // Added backdrop-blur and a softer border color
    <div className="fixed bottom-0 left-0 right-0 h-15 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center z-50">
      {/* HOME */}
      <button
        onClick={() => navigate("/")}
        className="flex flex-col items-center gap-1 transition-all duration-300 text-indigo-400 group"
      >
        <FaHome
          size={22}
          className="group-active:scale-90 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Home
        </span>
        {/* Active Indicator Dot */}
        <div className="w-1 h-1 bg-indigo-400 rounded-full mt-0.5"></div>
      </button>

      {/* ORDERS */}
      <button
        onClick={() => navigate("/orders")}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors group"
      >
        <MdOutlineReorder
          size={22}
          className="group-active:scale-90 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Orders
        </span>
        <div className="w-1 h-1 bg-transparent mt-0.5"></div>
      </button>

      {/* CENTER GAP for FAB */}
      <div className="w-20"></div>

      {/* TABLES */}
      <button
        onClick={() => navigate("/tables")}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors group"
      >
        <MdTableBar
          size={22}
          className="group-active:scale-90 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Tables
        </span>
        <div className="w-1 h-1 bg-transparent mt-0.5"></div>
      </button>

      {/* MORE */}
      <button
        onClick={() => navigate("/more")}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors group"
      >
        <CiCircleMore
          size={22}
          className="group-active:scale-90 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          More
        </span>
        <div className="w-1 h-1 bg-transparent mt-0.5"></div>
      </button>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 flex flex-col items-center">
        {/* Decorative Ring for depth */}
        <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full -z-10 animate-pulse"></div>

        <button className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-[1.75rem] p-5 shadow-[0_10px_25px_rgba(79,70,229,0.4)] border-4 border-[#0F172A] active:scale-90 hover:scale-105 transition-all duration-200 group">
          <BiSolidDish
            size={28}
            className="drop-shadow-md group-hover:rotate-12 transition-transform"
          />
        </button>

        {/* Subtle Label for the FAB */}
        <span className="mt-2 text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
          New Order
        </span>
      </div>
    </div>
  );
};

export default BottomNav;
