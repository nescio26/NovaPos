import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrder from "../components/home/RecentOrder";
import PopularDishes from "../components/home/PopularDishes";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { HiTrendingUp } from "react-icons/hi";

const Home = () => {
  return (
    <div className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white font-sans selection:bg-orange-500/30 overflow-hidden transition-colors duration-300">
      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden justify-center">
        {/* CENTERED CONTENT WRAPPER */}
        <div className="w-full max-w-[1400px] p-4 sm:p-6 lg:p-10 space-y-8 lg:space-y-12 overflow-y-auto custom-scrollbar pb-32">
          {/* GREETING SECTION */}
          <div className="relative overflow-hidden bg-white dark:bg-[#16191D] p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
            <Greetings />
            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]"></div>
          </div>

          {/* STATS SECTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <h2 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                Business Pulse
              </h2>
              <div className="h-[1px] w-full bg-slate-200/50 dark:bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {/* Added a third card to balance the top row since we have the space */}
              <MiniCard
                title="Top Efficiency"
                icon={<HiTrendingUp className="text-emerald-500" />}
                number="94%"
              />
            </div>
          </div>

          {/* MAIN DASHBOARD GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Left Column: Recent Orders (Takes up more space) */}
            <div className="xl:col-span-7">
              <RecentOrder />
            </div>

            {/* Right Column: Popular Dishes (The new spotlight) */}
            <div className="xl:col-span-5">
              <PopularDishes />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
