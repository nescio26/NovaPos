import React from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import OrderList from "./OrderList";

const RecentOrder = () => {
  return (
    <div className="px-6 lg:px-10 mt-10 space-y-6">
      {/* HEADER & SEARCH ACTION */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tighter uppercase italic">
            Live Orders<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Managing current active sessions
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center bg-slate-800/40 border border-white/5 px-4 py-2.5 rounded-2xl w-full md:w-[350px] focus-within:border-indigo-500/50 focus-within:bg-slate-800/60 transition-all">
            <FaSearch className="text-slate-500 mr-3 text-sm" />
            <input
              type="text"
              placeholder="Search by name or table..."
              className="bg-transparent outline-none text-slate-200 w-full text-xs font-medium placeholder:text-slate-600"
            />
          </div>
          <button className="hidden sm:flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-300 transition-colors group">
            View All{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ORDERS LIST CONTAINER */}
      <div className="relative group bg-slate-800/20 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-4 md:p-6 shadow-2xl overflow-hidden">
        {/* THE LIST - with no-scrollbar class */}
        {/* Parent Container */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto no-scrollbar">
          {/* Your mapped OrderList items */}
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
        </div>

        {/* MASK EFFECT: Makes the bottom items fade out smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0F172A]/80 to-transparent pointer-events-none rounded-b-[2.5rem]"></div>
      </div>
    </div>
  );
};

export default RecentOrder;
