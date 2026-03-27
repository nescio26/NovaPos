import React from "react";
import { FaCheckDouble, FaCircle, FaClock } from "react-icons/fa";

const OrderList = () => {
  const name = "Syahmi";
  const items = 3;
  const tableNo = 5;
  const status = "Ready";
  const time = "8:30 PM";

  const isReady = status === "Ready";

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white dark:bg-[#16191D] hover:bg-[#F8F9FD] dark:hover:bg-white/5 border border-slate-100 dark:border-white/5 p-4 sm:p-5 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-500 hover:shadow-md active-press">
      {/* 1. LEFT SECTION: AVATAR & PRIMARY INFO */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div
          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-3 ${
            isReady
              ? "bg-[#FF5C00] shadow-lg shadow-orange-500/20"
              : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5"
          }`}
        >
          <span
            className={`font-black text-base sm:text-lg tracking-tighter ${isReady ? "text-white" : "text-slate-400 dark:text-slate-500"}`}
          >
            {name.substring(0, 2).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 sm:hidden">
          <h1 className="text-[#1A1D21] dark:text-white text-lg font-black tracking-tight">
            {name}
          </h1>
          <p className="text-[#FF5C00] text-[10px] font-black uppercase tracking-widest">
            {items} Items
          </p>
        </div>
      </div>

      {/* 2. CENTER/RIGHT SECTION: DETAILS */}
      <div className="flex flex-1 items-center justify-between w-full">
        {/* NAME & TIME (Desktop Only View) */}
        <div className="hidden sm:block space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-[#1A1D21] dark:text-white text-lg font-black tracking-tight group-hover:text-[#FF5C00] transition-colors">
              {name}
            </h1>
            <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-2 rounded-full border border-slate-100 dark:border-white/5">
              <FaClock size={8} /> {time}
            </span>
          </div>
          <span className="inline-block text-[#FF5C00] text-[10px] font-black uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-100 dark:border-orange-500/20">
            {items} Items
          </span>
        </div>

        {/* LOCATION / TABLE */}
        <div className="px-4 py-2 border border-slate-100 dark:border-white/5 rounded-xl bg-[#F8F9FD] dark:bg-white/5 sm:mx-4">
          <p className="text-slate-400 dark:text-slate-500 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-center mb-0.5">
            Table
          </p>
          <p className="text-[#1A1D21] dark:text-white text-xs sm:text-sm font-black text-center leading-none tracking-tight">
            {tableNo}
          </p>
        </div>

        {/* STATUS */}
        <div className="text-right flex flex-col items-end gap-1.5">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              isReady
                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400"
            }`}
          >
            <span className="hidden xs:block text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
              {status}
            </span>

            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                isReady
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {isReady ? (
                <FaCheckDouble size={10} />
              ) : (
                <FaCircle size={6} className="animate-pulse" />
              )}
            </div>
          </div>
          <span className="text-slate-400 dark:text-slate-500 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest sm:pr-1 hidden xs:block">
            {isReady ? "Ready" : "Prep"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
