import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants";

const Tables = () => {
  const [status, setStatus] = useState("all");

  // Filter logic: Only show tables that match the status, or all if status is "all"
  const filteredTables = tables.filter((table) => {
    if (status === "all") return true;
    return table.status.toLowerCase() === status;
  });

  return (
    <section className="h-screen bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* HEADER & FILTER TABS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-10 pt-10 pb-6 gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic flex items-center">
              Tables<span className="text-indigo-500">.</span>
            </h1>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] pl-16">
            Floor Map Management
          </p>
        </div>

        {/* COMPACT FILTER BUTTONS */}
        <div className="flex items-center gap-2 bg-slate-800/40 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setStatus("all")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              status === "all"
                ? "bg-[#383838] text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("booked")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              status === "booked"
                ? "bg-[#383838] text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* TABLES GRID - Scrollable Area */}
      <div className="flex-1 px-10 py-4 flex flex-wrap content-start justify-center lg:justify-start gap-8 overflow-y-auto no-scrollbar pb-32">
        {filteredTables.map((table) => (
          <TableCard
            key={table.id}
            name={table.name}
            status={table.status}
            initials={table.initials}
          />
        ))}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
