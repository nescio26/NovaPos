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
    <div className="group flex flex-col gap-6 bg-slate-700 hover:bg-slate-700/50 border border-white/10 p-6 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-1 w-full md:w-[350px] shadow-2xl">
      {/* TOP SECTION: IDENTIFIER & STATUS */}
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-3 border border-white/10 ${
            isReady
              ? "bg-gradient-to-br from-indigo-500 to-blue-600"
              : "bg-slate-700"
          }`}
        >
          <span className="text-white font-black text-lg uppercase">
            {name.substring(0, 2)}
          </span>
        </div>

        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border transition-colors ${
            isReady
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
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
          <h1 className="text-slate-100 text-2xl font-black tracking-tight leading-none">
            {name}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              #101 / Dine In
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[11px] font-black uppercase">
              <FaClock size={10} className="text-indigo-400/60" /> {time}
            </span>
          </div>
        </div>

        {/* METADATA BAR */}
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">
            {date}
          </p>
          <p className="text-indigo-400 text-[11px] font-black uppercase tracking-widest">
            {items} ITEMS
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION: PRICING (High Contrast) */}
      <div className="flex items-center justify-between bg-slate-900/60 p-5 rounded-[1.5rem] mt-1 border border-white/5">
        <h2 className="text-slate-400 text-[11px] font-black uppercase tracking-widest">
          Total
        </h2>
        <p className="text-slate-100 text-2xl font-black tracking-tighter">
          <span className="text-indigo-500 text-sm mr-1.5 font-bold">RM</span>
          {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
