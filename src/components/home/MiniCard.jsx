import React from "react";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

const MiniCard = ({
  title,
  icon,
  number,
  footerNum,
  trend,
  footerIcon,
  subText,
}) => {
  const isEarnings =
    title.trim() === "Total Earnings" || title.trim() === "Total Revenue";

  // Format number based on type
  const formattedNumber = () => {
    if (typeof number === "number") {
      if (
        title.toLowerCase().includes("earnings") ||
        title.toLowerCase().includes("revenue")
      ) {
        return `RM ${number.toFixed(2)}`;
      }
      return number.toLocaleString();
    }
    return number;
  };

  // Get trend icon
  const TrendIcon = () => {
    if (trend === "up") return <HiTrendingUp size={12} />;
    if (trend === "down") return <HiTrendingDown size={12} />;
    return null;
  };

  // Get trend color
  const getTrendColor = () => {
    if (trend === "up") return "text-emerald-600 dark:text-emerald-400";
    if (trend === "down") return "text-rose-600 dark:text-rose-400";
    return "text-slate-400 dark:text-slate-500";
  };

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-[#16191D] p-6 sm:p-7 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[160px] sm:min-h-[175px] active-press">
      {/* TOP SECTION: TITLE & ICON */}
      <div className="flex justify-between items-start z-10">
        <div className="space-y-1">
          <h2 className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
            {title}
          </h2>
          {/* Main Number */}
          <h1 className="text-[#1A1D21] dark:text-white text-2xl sm:text-3xl font-black tracking-tighter mt-1 sm:mt-2 transition-colors">
            {formattedNumber()}
          </h1>
        </div>

        {/* ICON BOX */}
        <div
          className={`p-3 sm:p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 flex items-center justify-center ${
            isEarnings
              ? "bg-orange-50 dark:bg-orange-500/10 text-[#FF5C00]"
              : "bg-blue-50 dark:bg-blue-500/10 text-blue-500"
          }`}
        >
          <span className="text-xl sm:text-2xl">{icon}</span>
        </div>
      </div>

      {/* FOOTER SECTION: TREND & STATS */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-white/5 z-10">
        {trend && (
          <div
            className={`flex items-center justify-center w-5 h-5 rounded-full bg-${trend === "up" ? "emerald" : "rose"}-100 dark:bg-${trend === "up" ? "emerald" : "rose"}-500/10 ${getTrendColor()}`}
          >
            <TrendIcon />
          </div>
        )}
        {footerIcon && (
          <span className="text-slate-400 dark:text-slate-500">
            {footerIcon}
          </span>
        )}
        <p className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-[11px] font-bold tracking-tight uppercase">
          {footerNum}
        </p>
        {subText && (
          <p className="text-slate-400 dark:text-slate-500 text-[9px] font-medium ml-auto">
            {subText}
          </p>
        )}
      </div>

      {/* Subtle Background Accent (Visible on hover) */}
      <div
        className={`absolute -bottom-10 -left-10 w-24 h-24 blur-[50px] opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${
          isEarnings ? "bg-orange-400" : "bg-blue-400"
        }`}
      />
    </div>
  );
};

export default MiniCard;
