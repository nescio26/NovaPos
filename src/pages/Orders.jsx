import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrdersCard from "../components/orders/OrdersCard";
import BackButton from "../components/shared/BackButton";

const Orders = () => {
  const [status, setStatus] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "progress", label: "In Progress" },
    { id: "ready", label: "Ready" },
    { id: "completed", label: "Done" },
  ];

  return (
    // 'h-screen' and 'flex-col' keeps the layout contained to the device height
    <section className="h-screen bg-[#0F172A] flex flex-col text-slate-100 overflow-hidden">
      {/* HEADER: Flex-none keeps it from scrolling away */}
      <header className="flex-none p-6 pb-4 border-b border-white/5 bg-slate-900/40 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">
              Orders<span className="text-indigo-500">.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase text-emerald-500">
              Kitchen Live
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setStatus(cat.id)}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                status === cat.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-white/5 text-slate-500 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* CONTENT AREA: flex-1 allows it to grow and scroll */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0B1222] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {/* Your Data Mapping Here */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <OrdersCard key={i} />
          ))}
        </div>

        {/* SPACER: Adds room so the last card isn't hidden by the BottomNav */}
        <div className="h-32" aria-hidden="true" />
      </main>

      {/* FIXED NAV is rendered here */}
      <BottomNav />
    </section>
  );
};

export default Orders;
