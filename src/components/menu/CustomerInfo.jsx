import React from "react";

const CustomerInfo = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex flex-col items-start">
          <h1 className="text-slate-100 font-black tracking-wide uppercase text-base">
            Customer Name
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-indigo-500/10 text-indigo-400 text-[12px] font-black px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-widest ">
              #101
            </span>
            <span className="text-slate-200 text-[13px] font-bold upppercase tracking-widest">
              Dine-in
            </span>
          </div>
          <p className="text-[12px] text-slate-200 font-black uppercase tracking-[0.15rem] mt-3">
            19 January 2025 • 04:30 PM
          </p>
        </div>
        <div className="bg-amber-500 w-12 h-12 flex items-center justify-center text-slate-900 text-sm font-black rounded-2xl shadow-lg shadow-amber-500/20 border-2 border-white/10">
          CN
        </div>
      </div>
      <hr className="border-white mx-6" />
    </div>
  );
};

export default CustomerInfo;
