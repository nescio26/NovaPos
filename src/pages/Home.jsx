import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrder from "../components/home/RecentOrder";
import PopularDishes from "../components/home/PopularDishes";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
  return (
    <div className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white font-sans selection:bg-orange-500/30 overflow-hidden transition-colors duration-300">
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* LEFT AREA */}
        <div className="flex-1 lg:flex-[3] p-4 sm:p-6 lg:p-10 space-y-8 lg:space-y-10 overflow-y-auto custom-scrollbar">
          {/* GREETING SECTION: Added dark:bg-[#16191D] and dark:border-white/5 */}
          <div className="relative overflow-hidden bg-white dark:bg-[#16191D] p-6 sm:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
            <Greetings />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
          </div>

          {/* STATS GRID */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                Business Pulse
              </h2>
              <div className="h-[1px] flex-1 bg-slate-200/50 dark:bg-white/5"></div>
            </div>

            {/* These MiniCards will need 'dark:' classes inside their own component files too! */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <MiniCard
                title="Total Earnings"
                icon={<BsCashCoin className="text-orange-500" />}
                number="RM 512.00"
              />
              <MiniCard
                title="In Progress"
                icon={<GrInProgress className="text-blue-500" />}
                number="16"
              />
            </div>
          </div>

          <RecentOrder />
          <PopularDishes />
        </div>

        {/* RIGHT AREA: THE CART SIDEBAR */}
        <div className="hidden lg:flex lg:flex-[1.1] bg-white dark:bg-[#16191D] m-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex-col border border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors">
          <div className="p-8 pb-4">
            <h1 className="text-2xl font-black tracking-tighter text-[#1A1D21] dark:text-white">
              My Cart<span className="text-orange-500">.</span>
            </h1>
          </div>

          {/* EMPTY STATE */}
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-24 h-24 bg-[#F8F9FD] dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-6 border border-slate-100 dark:border-white/5">
              <span className="text-4xl opacity-20 grayscale">🍔</span>
            </div>
            <h3 className="text-[#1A1D21] dark:text-white font-bold text-lg">
              Start an Order
            </h3>
          </div>

          {/* FOOTER */}
          <div className="p-8 bg-white dark:bg-[#16191D] border-t border-slate-100 dark:border-white/5">
            <button className="w-full py-5 bg-[#FF5C00] text-white rounded-2xl font-black text-sm uppercase tracking-widest">
              Complete Payment
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
