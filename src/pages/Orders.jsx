import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrdersCard from "../components/orders/OrdersCard";
import BackButton from "../components/shared/BackButton";

const Orders = () => {
  const [status, setStatus] = useState("all");

  const categories = [
    { id: "all", label: "All Orders" },
    { id: "progress", label: "Preparing" },
    { id: "ready", label: "Ready" },
    { id: "completed", label: "Served" },
  ];

  return (
    <section className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white transition-colors duration-300 overflow-hidden">
      {/* HEADER: Sticky with glass effect */}
      <header className="flex-none p-6 pb-4 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-[#16191D]/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-black uppercase italic tracking-tighter leading-none dark:text-white">
                Orders<span className="text-[#FF5C00]">.</span>
              </h1>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
                Live Kitchen Sync
              </p>
            </div>
          </div>

          {/* STATUS INDICATOR: Neon Glow in Dark Mode */}
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-widest">
              Kitchen Live
            </span>
          </div>
        </div>

        {/* TABS: Updated Pill Buttons */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setStatus(cat.id)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap active-press ${
                status === cat.id
                  ? "bg-[#FF5C00] text-white shadow-lg shadow-orange-500/20"
                  : "bg-white dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-white/5 hover:text-[#1A1D21] dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <OrdersCard key={i} />
          ))}
        </div>

        {/* BOTTOM SPACER */}
        <div className="h-40" aria-hidden="true" />
      </main>

      <BottomNav />
    </section>
  );
};

export default Orders;
