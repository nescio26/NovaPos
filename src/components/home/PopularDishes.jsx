import React from "react";
import { popularDishes } from "../../constants/index.jsx";
const PopularDishes = () => {
  const sortedDishes = [...popularDishes].sort(
    (a, b) => b.numberOfOrders - a.numberOfOrders,
  );
  return (
    <div className="mt-8 pr-4">
      <div className="bg-slate-800/20 backdrop-blur-xl rounded-[2rem] border border-white/5 p-6 shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-white text-lg font-black tracking-tight uppercase leading-none">
              Top Sellers<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Most ordered today
            </p>
          </div>

          <button className="text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-300 transition-colors border-b border-indigo-500/30 pb-0.5">
            View All
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {sortedDishes.map((dish) => (
            <div
              key={dish.id}
              className="group flex items-center gap-4 cursor-pointer"
            >
              {/* IMAGE WITH GLOW */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-14 h-14 object-cover rounded-2xl relative z-10 border border-white/10 group-hover:scale-105 transition-transform"
                />
              </div>

              {/* INFO & PROGRESS */}
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center">
                  <h1 className="text-slate-100 font-bold text-sm tracking-tight group-hover:text-indigo-300 transition-colors">
                    {dish.name}
                  </h1>
                  <span className="text-white font-black text-xs">
                    {dish.numberOfOrders}
                  </span>
                </div>

                {/* Visual Popularity Bar */}
                <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"
                    style={{
                      width: `${Math.min((dish.numberOfOrders / 50) * 100, 100)}%`,
                    }} // Example calculation
                  ></div>
                </div>

                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                  Daily Volume
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <button className="w-full mt-8 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-700 hover:text-white transition-all">
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default PopularDishes;
