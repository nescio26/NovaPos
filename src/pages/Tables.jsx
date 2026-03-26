import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";
import BackButton from "../components/shared/BackButton";
import { tables } from "../constants";

function Tables() {
  const [status, setStatus] = useState("all");

  const filteredTables = tables.filter((table) => {
    if (status === "all") return true;
    return table.status.toLowerCase() === status;
  });

  return (
    <section className="h-screen bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* TIGHTENED HEADER AREA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pt-6 pb-3 gap-4 border-b border-white/5 bg-slate-900/40 backdrop-blur-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-slate-100 text-xl font-black tracking-tighter uppercase flex items-center">
              Floor Management<span className="text-indigo-500 ml-1">.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1 pl-10">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
              Live Status
            </p>
          </div>
        </div>

        {/* COMPACT TABS */}
        <div className="flex items-center bg-slate-900 border border-white/10 p-1 rounded-xl shadow-inner">
          {["all", "booked", "available"].map((cat) => (
            <button
              key={cat}
              onClick={() => setStatus(cat)}
              className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                status === cat
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TIGHTENED GRID AREA */}
      <div className="flex-1 px-3 py-3 overflow-y-auto custom-scrollbar bg-[#0B1222]">
        {/* Gap reduced from 10 to 4 for better density */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 content-start">
          {filteredTables.map((table) => (
            <TableCard
              key={table.id}
              name={table.name}
              status={table.status}
              initials={table.initials}
              seats={table.seats}
            />
          ))}
        </div>

        {/* SPACER */}
        <div className="h-28"></div>
      </div>

      <BottomNav />
    </section>
  );
}

export default Tables;
