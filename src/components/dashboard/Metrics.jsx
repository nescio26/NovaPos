import React from "react";
import { itemsData, metricsData } from "../../constants";

const Metrics = () => {
  return (
    <div className="py-2 transition-colors duration-300">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="font-black text-[#1A1D21] dark:text-white text-2xl uppercase tracking-tighter italic">
            Overall Performance<span className="text-[#FF5C00]">.</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">
            Real-time business health monitoring
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1A1D21] dark:text-white bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/5 shadow-sm active:scale-95 transition-all">
          Last 30 Days
          <svg
            className="w-3 h-3 text-[#FF5C00]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-[2rem] p-6 shadow-sm border border-white/10"
            style={{ backgroundColor: metric.color }}
          >
            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <p className="font-black text-[10px] uppercase tracking-widest text-white/80">
                  {metric.title}
                </p>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-md">
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    style={{ color: metric.isIncrease ? "#fff" : "#ff4d4d" }}
                  >
                    <path
                      d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                  <p className="font-black text-[9px] text-white">
                    {metric.percentage}
                  </p>
                </div>
              </div>
              <p className="font-black text-3xl text-white tracking-tighter">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ITEM DETAILS SECTION */}
      <div className="mt-14">
        <div className="mb-8">
          <h2 className="font-black text-[#1A1D21] dark:text-white text-2xl uppercase tracking-tighter italic">
            Item Analytics<span className="text-[#FF5C00]">.</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">
            Breakdown of category and product movement
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {itemsData.map((item, index) => (
            <div
              key={index}
              className="group rounded-[2rem] p-6 border border-slate-100 dark:border-white/5 bg-white dark:bg-[#16191D] hover:border-[#FF5C00]/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[#FF5C00] transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400">
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                  >
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                  <p className="font-black text-[9px] uppercase">
                    {item.percentage}
                  </p>
                </div>
              </div>
              <p className="font-black text-3xl text-[#1A1D21] dark:text-white tracking-tighter">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
