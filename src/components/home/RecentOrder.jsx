import React from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import OrderList from "./OrderList";

const RecentOrder = () => {
  return (
    <div className="mt-10 space-y-6 transition-colors duration-300">
      {/* HEADER & SEARCH ACTION */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 px-2">
        <div>
          {/* Added dark:text-white */}
          <h1 className="text-[#1A1D21] dark:text-white text-2xl font-black tracking-tighter uppercase italic">
            Live Orders<span className="text-[#FF5C00]">.</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Managing current active sessions
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* SEARCH BAR - Added dark:bg-white/5 and dark:border-white/5 */}
          <div className="flex flex-1 items-center bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 px-5 py-3 rounded-2xl w-full md:w-[350px] focus-within:border-orange-500/30 dark:focus-within:border-orange-500/50 focus-within:shadow-lg focus-within:shadow-orange-500/5 transition-all duration-300">
            <FaSearch className="text-slate-300 dark:text-slate-600 mr-3 text-sm" />
            <input
              type="text"
              placeholder="Search by name or table..."
              className="bg-transparent outline-none text-[#1A1D21] dark:text-white w-full text-xs font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 uppercase tracking-wider"
            />
          </div>

          <button className="hidden sm:flex items-center gap-2 text-[#FF5C00] text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-all group">
            View All{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ORDERS LIST CONTAINER - Added dark:bg-[#16191D] and dark:border-white/5 */}
      <div className="relative group bg-white dark:bg-[#16191D] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-4 md:p-6 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
        {/* THE LIST */}
        <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto no-scrollbar pb-10">
          <OrderList
            name="Syahmi"
            items={8}
            tableNo="03"
            status="Ready"
            time="12:45 PM"
          />
          <OrderList
            name="Sarah"
            items={3}
            tableNo="12"
            status="Pending"
            time="12:50 PM"
          />
          <OrderList
            name="Aziz"
            items={5}
            tableNo="01"
            status="Ready"
            time="01:05 PM"
          />
          <OrderList
            name="Amira"
            items={2}
            tableNo="07"
            status="Pending"
            time="01:15 PM"
          />
        </div>

        {/* MASK EFFECT: Fades items into the card base. Added dark variants. */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#16191D] dark:via-[#16191D]/80 dark:to-transparent pointer-events-none rounded-b-[2.5rem]"></div>
      </div>
    </div>
  );
};

export default RecentOrder;
