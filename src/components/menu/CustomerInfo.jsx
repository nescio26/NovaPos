import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, formatTime, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const customerData = useSelector((state) => state.customer);
  const [dateTime] = useState(new Date());

  return (
    <div className="flex flex-col w-full bg-[#F8F9FD] dark:bg-white/5 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-6 md:px-8 md:py-8">
        <div className="flex flex-col items-start overflow-hidden">
          {/* Main Title */}
          <h1 className="text-[#1A1D21] dark:text-white font-black italic tracking-tighter uppercase text-lg md:text-xl leading-none truncate w-full">
            {customerData.customerName || "Walk-In Guest"}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Table/Order Badge */}
            <span className="bg-[#FF5C00] text-white text-[9px] md:text-[10px] font-black px-3 py-1 rounded-xl uppercase tracking-widest shadow-lg shadow-orange-500/20">
              {customerData.orderId || "NEW"}
            </span>

            {/* Status Indicator */}
            <div className="flex items-center gap-1.5 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                Dine-in
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-4 md:mt-5">
            {formatDate(dateTime)}{" "}
            <span className="text-[#FF5C00] mx-1">•</span>{" "}
            {formatTime(dateTime)}
          </p>
        </div>

        {/* Initials Avatar */}
        <div className="flex-shrink-0 bg-[#1A1D21] dark:bg-white/10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white text-base md:text-lg font-black rounded-[1.2rem] md:rounded-[1.5rem] shadow-xl shadow-slate-200 dark:shadow-black/40 border-4 border-white dark:border-[#1c2025] transition-all hover:rotate-3 active:scale-90 cursor-pointer group">
          <span className="group-hover:text-[#FF5C00] transition-colors">
            {getAvatarName(customerData.customerName) || "TS"}
          </span>
        </div>
      </div>

      <div className="px-6 md:px-8">
        <div className="h-[1px] w-full bg-slate-100 dark:bg-white/5" />
      </div>
    </div>
  );
};

export default CustomerInfo;
