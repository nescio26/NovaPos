import React from "react";
import { FaCheckDouble, FaCircle, FaClock } from "react-icons/fa";

// Passing props makes the component reusable
const OrderList = ({ name, items, tableNo, status, time }) => {
  const isReady = status === "Ready";

  return (
    <div className="group flex items-center gap-6 bg-slate-800/10 hover:bg-slate-800/30 border border-white/[0.03] p-5 rounded-[2rem] transition-all duration-500 hover:translate-x-1">
      {/* INITIALS AVATAR - Dynamic Gradient based on status */}
      <div
        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-3 ${
          isReady
            ? "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-indigo-500/20"
            : "bg-gradient-to-br from-slate-700 to-slate-800 shadow-black/20"
        }`}
      >
        <span className="text-white font-black text-lg tracking-tighter">
          {name.substring(0, 2).toUpperCase()}
        </span>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 items-center justify-between">
        {/* CUSTOMER & QUANTITY */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-lg font-bold tracking-tight group-hover:text-indigo-300 transition-colors">
              {name}
            </h1>
            {time && (
              <span className="flex items-center gap-1 text-slate-500 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">
                <FaClock size={8} /> {time}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/10">
              {items} Items
            </span>
          </div>
        </div>

        {/* TABLE INFO - Glassmorphism style */}
        <div className="hidden lg:block">
          <div className="px-5 py-2 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-md">
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] text-center mb-0.5">
              Location
            </p>
            <p className="text-white text-sm font-black text-center leading-none tracking-tight">
              Table {tableNo}
            </p>
          </div>
        </div>

        {/* STATUS SECTION */}
        <div className="text-right flex flex-col items-end gap-1.5">
          {/* Main Status Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              isReady
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">
              {status}
            </span>
            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center ${isReady ? "bg-emerald-500/20" : "bg-amber-500/20"}`}
            >
              {isReady ? (
                <FaCheckDouble size={10} />
              ) : (
                <FaCircle size={6} className="animate-pulse" />
              )}
            </div>
          </div>

          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tight pr-1">
            {isReady ? "Ready to serve" : "In Preparation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
