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
    // 'h-[100dvh]' prevents jumping when the browser UI shows/hides
    <section className="h-[100dvh] bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* 1. HEADER AREA: Fixed height, backdrop blur for premium feel */}
      <div className="flex-none flex flex-col lg:flex-row lg:items-center justify-between px-6 pt-8 pb-4 gap-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-xl z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-white text-2xl font-black tracking-tighter uppercase italic">
              Floor Plan<span className="text-indigo-500">.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1.5 pl-10">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Live Occupancy
            </p>
          </div>
        </div>

        {/* COMPACT TABS: Increased padding for iPad touch targets */}
        <div className="flex items-center bg-black/20 border border-white/10 p-1.5 rounded-[1.2rem] shadow-inner overflow-x-auto no-scrollbar">
          {["all", "booked", "available"].map((cat) => (
            <button
              key={cat}
              onClick={() => setStatus(cat)}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap active:scale-95 ${
                status === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. GRID AREA: Independent scrolling */}
      <div className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar bg-[#0B1222] relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 content-start">
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

        {/* 3. BOTTOM SPACER: Essential to clear the Fixed BottomNav */}
        <div className="h-32" aria-hidden="true" />

        {/* Visual Fade to Nav */}
        <div className="fixed bottom-20 left-0 right-0 h-12 bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none z-10" />
      </div>

      {/* 4. NAVIGATION: Always visible */}
      <BottomNav />
    </section>
  );
}

export default Tables;
