import React from "react";
import { FaCheckDouble, FaCircle, FaClock } from "react-icons/fa";

const OrdersCard = () => {
  const name = "Syahmi";
  const items = 8;
  const status = "Ready";
  const time = "8:30 PM";
  const date = "18 Jan 2026";
  const total = 250.0;

  const isReady = status.toLowerCase() === "ready";

  return (
    <div className="group flex flex-col gap-6 bg-white dark:bg-[#16191D] hover:bg-[#FDFDFD] dark:hover:bg-[#1c2025] border border-slate-100 dark:border-white/5 p-6 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 w-full active-press">
      {/* TOP SECTION: IDENTIFIER & STATUS */}
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-3 ${
            isReady
              ? "bg-[#FF5C00] shadow-orange-500/20"
              : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5"
          }`}
        >
          <span
            className={`font-black text-lg uppercase tracking-tighter ${isReady ? "text-white" : "text-slate-400 dark:text-slate-500"}`}
          >
            {name.substring(0, 2)}
          </span>
        </div>

        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border transition-all ${
            isReady
              ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400"
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {status}
          </span>
          {isReady ? (
            <FaCheckDouble size={10} />
          ) : (
            <FaCircle size={6} className="animate-pulse" />
          )}
        </div>
      </div>

      {/* MIDDLE SECTION: PRIMARY DATA */}
      <div className="space-y-4">
        <div>
          <h1 className="text-[#1A1D21] dark:text-white text-2xl font-black tracking-tighter leading-none group-hover:text-[#FF5C00] transition-colors">
            {name}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[#FF5C00] text-[9px] font-black uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-100 dark:border-orange-500/20">
              #101 / Dine In
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <FaClock
                size={10}
                className="text-slate-300 dark:text-slate-600"
              />{" "}
              {time}
            </span>
          </div>
        </div>

        {/* METADATA BAR */}
        <div className="flex justify-between items-center border-t border-slate-50 dark:border-white/5 pt-4">
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.15em]">
            {date}
          </p>
          <p className="text-[#FF5C00] text-[10px] font-black uppercase tracking-[0.15em]">
            {items} ITEMS
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION: PRICING */}
      <div className="flex items-center justify-between bg-[#F8F9FD] dark:bg-white/5 p-5 rounded-[1.8rem] mt-1 border border-slate-50 dark:border-white/5 shadow-inner">
        <h2 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          Total
        </h2>
        <p className="text-[#1A1D21] dark:text-white text-2xl font-black tracking-tighter">
          <span className="text-[#FF5C00] text-sm mr-1.5 font-bold">RM</span>
          {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
