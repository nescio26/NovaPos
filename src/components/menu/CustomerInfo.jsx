import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, formatTime, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const customerData = useSelector((state) => state.customer);
  const [dateTime] = useState(new Date());

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex flex-col items-start">
          {/* Main Title - High Contrast */}
          <h1 className="text-white font-semibold italic tracking-tight uppercase text-lg">
            {customerData.customerName || "Customer Name"}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            {/* Table Badge */}
            <span className="bg-indigo-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-widest shadow-lg shadow-indigo-500/20">
              {customerData.orderId || "N/A"}
            </span>
            {/* Status - Lightened for the new Slate background */}
            <span className="text-slate-100 text-[12px] font-black uppercase tracking-[0.1em]">
              Dine-in
            </span>
          </div>

          {/* Date & Time - Increased visibility */}
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.12em] mt-4 opacity-80">
            {formatDate(dateTime)} • {formatTime(dateTime)}
          </p>
        </div>

        {/* Initials Avatar */}
        <div className="bg-amber-500 w-14 h-14 flex items-center justify-center text-slate-900 text-base font-black rounded-[1.2rem] shadow-xl shadow-amber-500/10 border-2 border-white/20 transition-transform active:scale-95 cursor-pointer">
          {getAvatarName(customerData.customerName) || "NP"}
        </div>
      </div>

      {/* Cleaner Divider for the lighter background */}
      <hr className="border-white/10 mx-6" />
    </div>
  );
};

export default CustomerInfo;
