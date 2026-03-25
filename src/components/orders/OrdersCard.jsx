import React from "react";
import { FaCheckDouble, FaCircle, FaClock } from "react-icons/fa";

const OrdersCard = () => {
  // These should ideally be passed as props later
  const name = "Syahmi";
  const items = 8;
  const status = "Ready";
  const time = "8:30 PM";
  const date = "18 Jan 2026";
  const total = 250.0;

  const isReady = status === "Ready";

  return (
    <div className="group flex flex-col gap-4 bg-slate-800/20 hover:bg-slate-800/40 border border-white/5 p-6 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1 w-full md:w-[350px] shadow-xl">
      {/* TOP SECTION: AVATAR & STATUS */}
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-3 ${
            isReady
              ? "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-indigo-500/20"
              : "bg-gradient-to-br from-slate-700 to-slate-800"
          }`}
        >
          <span className="text-white font-black text-lg">
            {name.substring(0, 2).toUpperCase()}
          </span>
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
            isReady
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest">
            {status}
          </span>
          {isReady ? (
            <FaCheckDouble size={10} />
          ) : (
            <FaCircle size={6} className="animate-pulse" />
          )}
        </div>
      </div>

      {/* MIDDLE SECTION: NAME & ORDER INFO */}
      <div className="space-y-3">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            {name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md">
              #101 / Dine In
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-[9px] font-bold uppercase">
              <FaClock size={8} /> {time}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-slate-400 text-[11px] font-medium border-t border-white/5 pt-4">
          <p>{date}</p>
          <p className="font-black text-indigo-400">{items} ITEMS</p>
        </div>
      </div>

      {/* BOTTOM SECTION: TOTAL */}
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl mt-2">
        <h1 className="text-slate-400 text-xs font-black uppercase tracking-widest">
          Total Amount
        </h1>
        <p className="text-white text-xl font-black tracking-tighter">
          RM {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
