import React from "react";

const MiniCard = ({ title, icon, number, footerNum, trend }) => {
  const isEarnings = title.trim() === "Total Earnings";

  return (
    <div className="group relative overflow-hidden bg-slate-800/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/5 shadow-lg hover:border-white/20 hover:bg-slate-800/60 transition-all duration-300 flex flex-col justify-between min-h-[160px]">
      <div
        className={`absolute -top-10 -right-10 w-24 h-24 blur-[50px] transition-opacity duration-500 group-hover:opacity-100 opacity-50 ${
          isEarnings ? "bg-indigo-500/20" : "bg-emerald-500/20"
        }`}
      />

      {/* TOP SECTION */}
      <div className="flex justify-between items-start z-10">
        <h2 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">
          {title}
        </h2>

        {/* ICON - Now using soft backgrounds instead of solid blocks */}
        <div
          className={`p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center ${
            isEarnings
              ? "bg-indigo-500/10 text-indigo-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          <span className="text-xl">{icon}</span>
        </div>
      </div>

      {/* MIDDLE SECTION: NUMBER */}
      <div className="mt-4 z-10">
        <h1 className="text-white text-3xl font-extrabold tracking-tight leading-none">
          {title === "Total Earnings" ? `RM${number}` : number}{" "}
        </h1>
      </div>

      {/* FOOTER SECTION */}
      <div className="flex items-center gap-2 mt-4 z-10">
        {trend && (
          <div
            className={`flex items-center justify-center px-2 py-1 rounded-full text-[10px] font-bold ${
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend === "up" ? "↗" : "↘"}
          </div>
        )}
        <p className="text-slate-500 text-xs font-medium tracking-tight">
          {footerNum}
        </p>
      </div>
    </div>
  );
};

export default MiniCard;
