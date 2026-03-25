import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrdersCard from "../components/orders/OrdersCard";
import BackButton from "../components/shared/BackButton";

const Orders = () => {
  // 1. Manage state with lowercase values to match your logic
  const [status, setStatus] = useState("all");

  // 2. Define the categories for easy mapping
  const categories = [
    { id: "progress", label: "In Progress" },
    { id: "all", label: "All" },
    { id: "ready", label: "Ready" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <section className="h-screen bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* HEADER & FILTER TABS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-10 pt-10 pb-6 gap-6">
        <div className="flex flex-col gap-1">
          {/* FLEX CONTAINER FOR BUTTON + TITLE */}
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic flex items-center">
              Orders Feed<span className="text-indigo-500">.</span>
            </h1>
          </div>

          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] pl-16">
            Real-time kitchen status
          </p>
        </div>

        {/* REFINED FILTER TABS */}
        <div className="flex items-center bg-slate-800/40 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setStatus(cat.id)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                status === cat.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS GRID - Scrollable with no-scrollbar */}
      <div className="flex-1 px-10 py-4 flex flex-wrap content-start gap-8 overflow-y-auto no-scrollbar pb-32">
        {/* Later you will map your real data here filtered by 'status' */}
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
