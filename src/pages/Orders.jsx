import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrdersCard from "../components/orders/OrdersCard";
import BackButton from "../components/shared/BackButton";

const Orders = () => {
  const [status, setStatus] = useState("all");

  const categories = [
    { id: "all", label: "All Orders" },
    { id: "progress", label: "In Progress" },
    { id: "ready", label: "Ready to Serve" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <section className="h-screen bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* COMPACT HEADER AREA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pt-6 pb-3 gap-4 border-b border-white/5 bg-slate-900/40 backdrop-blur-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-slate-100 text-xl font-black tracking-tighter uppercase flex items-center">
              Orders Management<span className="text-indigo-500 ml-1">.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1 pl-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
              Kitchen Live
            </p>
          </div>
        </div>

        {/* COMPACT TABS */}
        <div className="flex items-center bg-slate-900 border border-white/10 p-1 rounded-xl shadow-inner overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setStatus(cat.id)}
              className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                status === cat.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* COMPACT ORDERS GRID */}
      <div className="flex-1 px-6 py-6 overflow-y-auto custom-scrollbar bg-[#0B1222]">
        {/* Gap reduced to 4 to maximize visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 content-start justify-items-center lg:justify-items-start">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <OrdersCard key={i} />
          ))}
        </div>

        {/* BOTTOM NAV SPACER */}
        <div className="h-24"></div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
