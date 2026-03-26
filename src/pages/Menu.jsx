import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

const Menu = () => {
  return (
    <section className="h-screen bg-[#0F172A] flex text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* LEFT COLUMN: Menu & Selection */}
      <div className="flex-[4] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-10 py-6 bg-slate-900/20 border-b border-white/5">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-white text-2xl font-black uppercase tracking-tighter">
              Menu Selection<span className="text-indigo-500">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 cursor-pointer bg-slate-800/40 p-3 rounded-2xl border border-white/5 hover:bg-slate-800/60 transition-all">
              <MdRestaurantMenu className="text-indigo-400" size={28} />
              <div className="flex flex-col items-start leading-none">
                <h1 className="text-sm text-white font-black uppercase tracking-tight">
                  Guest Order
                </h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                  Table #101
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <MenuContainer />
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar (Cart & Billing) */}
      <div className="flex-[1.2] flex flex-col bg-[#0B1222] border-l border-white/5 m-3 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        {/* Top: Customer Details */}
        <div className="flex-none">
          <CustomerInfo />
        </div>

        {/* Middle: Scrollable Cart (Expands to fill) */}
        <div className="flex-1 overflow-hidden">
          <CartInfo />
        </div>

        {/* Bottom: Bill & Checkout (Fixed at bottom) */}
        <hr className="border-white mx-6" />

        <div className="flex-1 overflow-hidden">
          <Bill />
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
