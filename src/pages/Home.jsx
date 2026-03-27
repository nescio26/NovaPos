import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrder from "../components/home/RecentOrder";
import PopularDishes from "../components/home/PopularDishes";
import Header from "../components/shared/Header"; // Import the premium header
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
  return (
    <div className="h-screen bg-[#0F172A] flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {" "}
        {/* LEFT - DASHBOARD SCROLLABLE AREA */}
        <div className="flex-1 md:flex-[2.5] lg:flex-[3] p-6 lg:p-10 space-y-10 overflow-y-auto custom-scrollbar">
          {/* GREETING SECTION */}
          <div className="relative overflow-hidden bg-slate-800/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <Greetings />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
          </div>

          {/* STATS GRID */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                Business Pulse
              </h2>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MiniCard
                title="Total Earnings"
                icon={<BsCashCoin className="text-indigo-400" />}
                number="RM 512.00"
                footerNum="+12% this week"
                trend="up"
              />
              <MiniCard
                title="In Progress"
                icon={<GrInProgress className="text-emerald-400" />}
                number="16"
                footerNum="Orders pending"
              />
            </div>
          </div>

          {/* RECENT ORDERS TABLE */}
          <RecentOrder />

          {/* POPULAR DISHES - Now part of the dashboard flow */}
          <div className="pb-10">
            <PopularDishes />
          </div>
        </div>
        {/* RIGHT - PREMIUM CHECKOUT CART */}
        <div className="flex-1 md:flex-[1.2] lg:flex-[1] bg-white text-slate-900 md:m-5 md:rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col border border-white/20 relative overflow-hidden">
          {/* Header of the Cart */}
          <div className="p-8 pb-4">
            <div className="flex justify-between items-center mb-1">
              <h1 className="text-2xl font-black tracking-tighter">
                My Cart<span className="text-indigo-600">.</span>
              </h1>
              <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase">
                0 Items
              </span>
            </div>
            <p className="text-slate-400 text-xs font-medium italic">
              Table #04 • Dinning In
            </p>
          </div>

          {/* CART ITEMS AREA (Empty State) */}
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-4 border border-slate-100 shadow-inner group cursor-pointer hover:scale-110 transition-transform">
              <span className="text-3xl opacity-30 group-hover:opacity-100 transition-opacity">
                🛒
              </span>
            </div>
            <h3 className="text-slate-800 font-bold tracking-tight">
              Your cart is empty
            </h3>
            <p className="text-slate-400 text-xs mt-2 max-w-[150px]">
              Select items from the menu to start an order
            </p>
          </div>

          {/* CHECKOUT SUMMARY FOOTER */}
          <div className="p-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-100 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span>RM 0.00</span>
              </div>
              <div className="flex justify-between text-slate-900 text-xl font-black tracking-tighter">
                <span>Total</span>
                <span className="text-indigo-600">RM 0.00</span>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98] transition-all">
              Complete Payment
            </button>
          </div>

          {/* Decorative design element */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
};

export default Home;
