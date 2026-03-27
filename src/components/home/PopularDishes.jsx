import React from "react";
import { popularDishes } from "../../constants/index.jsx";

const PopularDishes = () => {
  // Sort by popularity
  const sortedDishes = [...popularDishes].sort(
    (a, b) => b.numberOfOrders - a.numberOfOrders,
  );

  return (
    <div className="mt-8 transition-colors duration-300">
      <div className="bg-white dark:bg-[#16191D] rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 sm:p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-[#1A1D21] dark:text-white text-lg font-black tracking-tight uppercase leading-none">
              Top Sellers<span className="text-[#FF5C00]">.</span>
            </h1>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">
              Most ordered today
            </p>
          </div>

          <button className="text-[#FF5C00] text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity border-b-2 border-orange-500/10 pb-1">
            View All
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-8">
          {sortedDishes.map((dish) => (
            <div
              key={dish.id}
              className="group flex items-center gap-4 sm:gap-6 cursor-pointer"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-[#FF5C00]/10 dark:bg-[#FF5C00]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-[1.5rem] relative z-10 border border-slate-100 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* INFO & PROGRESS */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-[#1A1D21] dark:text-white font-black text-sm sm:text-base tracking-tight group-hover:text-[#FF5C00] transition-colors">
                    {dish.name}
                  </h1>
                  <span className="text-[#1A1D21] dark:text-white font-black text-xs bg-[#F8F9FD] dark:bg-white/5 px-2 py-1 rounded-lg border border-slate-100 dark:border-white/5">
                    {dish.numberOfOrders}{" "}
                    <span className="text-slate-400 dark:text-slate-500 text-[9px] ml-0.5">
                      PTS
                    </span>
                  </span>
                </div>

                {/* Visual Popularity Bar - High Contrast Dark Variant */}
                <div className="w-full h-2 bg-[#F8F9FD] dark:bg-white/5 rounded-full overflow-hidden border border-slate-50 dark:border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF5C00] to-[#ff8c4a] rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,92,0,0.3)]"
                    style={{
                      width: `${Math.min((dish.numberOfOrders / 50) * 100, 100)}%`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                    Daily Volume
                  </p>
                  <p className="text-[#FF5C00] text-[9px] font-black uppercase">
                    {Math.min((dish.numberOfOrders / 50) * 100, 100).toFixed(0)}
                    % Capacity
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <button className="w-full mt-10 py-4 bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all">
          Generate Performance Report
        </button>
      </div>
    </div>
  );
};

export default PopularDishes;
