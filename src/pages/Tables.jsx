import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";

const Tables = () => {
  return (
    <section className="h-screen bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* HEADER & FILTER TABS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-10 pt-10 pb-6 gap-6">
        <div className="flex flex-col gap-1">
          {/* FLEX CONTAINER FOR BUTTON + TITLE */}
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic flex items-center">
              Tables<span className="text-indigo-500">.</span>
            </h1>
          </div>

          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] pl-16">
            Real-time kitchen status
          </p>
        </div>

        <TableCard />
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;
