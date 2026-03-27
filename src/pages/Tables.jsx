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
    <section className="h-[100dvh] bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white font-sans selection:bg-orange-500/30 overflow-hidden transition-colors duration-300">
      {/* 1. HEADER AREA: Glass effect with dark support */}
      <header className="flex-none flex flex-col lg:flex-row lg:items-center justify-between px-6 pt-8 pb-6 gap-6 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-[#16191D]/80 backdrop-blur-xl z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-[#1A1D21] dark:text-white text-2xl font-black tracking-tighter uppercase italic leading-none">
                Floor Plan<span className="text-[#FF5C00]">.</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse shadow-[0_0_10px_rgba(255,92,0,0.3)]" />
                <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                  Live Occupancy Terminal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT TABS: Segmented Control style */}
        <div className="flex items-center bg-[#F1F3F9] dark:bg-white/5 p-1.5 rounded-[1.5rem] shadow-inner overflow-x-auto no-scrollbar border border-transparent dark:border-white/5">
          {["all", "booked", "available"].map((cat) => (
            <button
              key={cat}
              onClick={() => setStatus(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap active-press ${
                status === cat
                  ? "bg-white dark:bg-[#FF5C00] text-[#FF5C00] dark:text-white shadow-md"
                  : "text-slate-400 dark:text-slate-500 hover:text-[#1A1D21] dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 2. GRID AREA */}
      <main className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar bg-transparent relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 content-start max-w-[1600px] mx-auto">
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

        {/* 3. BOTTOM SPACER */}
        <div className="h-40" aria-hidden="true" />

        {/* Visual Fade to Nav: Fixed the color for dark mode */}
        <div className="fixed bottom-24 left-0 right-0 h-16 bg-gradient-to-t from-[#F8F9FD] to-transparent dark:from-[#0B0E11] pointer-events-none z-10" />
      </main>

      {/* 4. NAVIGATION */}
      <BottomNav />
    </section>
  );
}

export default Tables;
