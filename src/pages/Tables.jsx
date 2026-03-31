import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

function Tables() {
  const [status, setStatus] = useState("all");

  const {
    data: resData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["tables", status],
    queryFn: async () => {
      const res = await getTables();
      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });

  // Handle Error Notifications
  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong while fetching tables!", {
        variant: "error",
      });
    }
  }, [isError]);

  // Safe filtering logic
  const filteredTables = (resData || []).filter((table) => {
    if (status === "all") return true;
    return table.status?.toLowerCase() === status;
  });

  return (
    <section className="h-[100dvh] bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white font-sans selection:bg-orange-500/30 overflow-hidden transition-colors duration-300">
      {/* 1. HEADER AREA: Glass effect */}
      <header className="flex-none px-6 pt-8 pb-6 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-[#16191D]/80 backdrop-blur-xl z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BackButton className="hover:rotate-[-10deg] transition-transform" />
            <div>
              <h1 className="text-[#1A1D21] dark:text-white text-3xl font-black tracking-tighter uppercase italic leading-none">
                Floor Plan<span className="text-[#FF5C00]">.</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                  Live Occupancy Terminal
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* LEGEND: Quick visual guide */}
            <div className="hidden md:flex items-center gap-4 mr-4 px-4 py-2 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-black uppercase text-slate-400">
                  Avail
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-[9px] font-black uppercase text-slate-400">
                  Busy
                </span>
              </div>
            </div>

            {/* COMPACT TABS with Framer Motion Pill */}
            <div className="relative flex items-center bg-[#F1F3F9] dark:bg-white/5 p-1.5 rounded-[1.5rem] shadow-inner border border-transparent dark:border-white/5">
              {["all", "booked", "available"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setStatus(cat)}
                  className={`relative z-10 px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap active:scale-95 ${
                    status === cat
                      ? "text-[#FF5C00] dark:text-white"
                      : "text-slate-400 dark:text-slate-500 hover:text-[#1A1D21] dark:hover:text-white"
                  }`}
                >
                  {status === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white dark:bg-[#FF5C00] rounded-2xl shadow-sm -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. GRID AREA */}
      <main className="flex-1 px-6 py-8 overflow-y-auto custom-scrollbar bg-transparent relative">
        <div className="max-w-[1600px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : filteredTables.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-40">
              <span className="text-5xl mb-4">📍</span>
              <p className="font-black uppercase tracking-widest text-[10px]">
                No Tables Found
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 content-start"
            >
              {filteredTables.map((table) => (
                <TableCard
                  key={table._id}
                  id={table._id}
                  name={table.tableNo}
                  status={
                    table.status === "Occupied"
                      ? "booked"
                      : table.status?.toLowerCase()
                  }
                  seats={table.seats}
                  initials={table?.currentOrder?.customerDetails?.name
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")
                    ?.toUpperCase()}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* BOTTOM SPACER */}
        <div className="h-40" aria-hidden="true" />

        {/* Improved Visual Fade to Nav */}
        <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F9FD] via-[#F8F9FD]/80 to-transparent dark:from-[#0B0E11] dark:via-[#0B0E11]/80 pointer-events-none z-10" />
      </main>

      {/* 4. NAVIGATION */}
      <BottomNav className="z-30" />
    </section>
  );
}

export default Tables;
