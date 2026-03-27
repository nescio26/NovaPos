import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);

  return (
    /* 1. Added pb-24 to ensure content stops before reaching the BottomNav */
    <section className="h-screen bg-[#0F172A] flex text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative pb-24">
      {" "}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT COLUMN: Menu Selection */}
        <div className="flex-[2.5] flex flex-col bg-slate-900/40 m-3 rounded-[2.5rem] overflow-hidden border border-white/5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between px-8 py-6 bg-slate-900/40 border-b border-white/5">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-white text-2xl font-black uppercase tracking-tighter">
                Menu Selection<span className="text-indigo-500">.</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-slate-800/60 p-2.5 px-4 rounded-2xl border border-indigo-500/20">
              <MdRestaurantMenu className="text-indigo-400" size={24} />
              <div className="flex flex-col items-start leading-tight">
                <h1 className="text-[15px] text-white font-bold uppercase tracking-normal">
                  {customerData.customerName || "Walk-In"}
                </h1>
                <p className="text-[11px] text-indigo-100 font-bold uppercase tracking-[0.15em]">
                  {customerData.tableNo || "No Table"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <MenuContainer />
          </div>
        </div>
        {/* RIGHT COLUMN: Sidebar */}
        {/* 2. Added mb-2 here to give a tiny gap between the sidebar bottom and the Nav area */}
        <div className="flex-[1] flex flex-col bg-slate-800/80 m-3 ml-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md">
          <div className="flex-none">
            <CustomerInfo />
          </div>

          <div className="flex-1 overflow-hidden">
            <CartInfo />
          </div>

          {/* 3. The Bill stays pinned here, but because of the section's pb-24, it's now visible! */}
          <div className="flex-none bg-slate-900/60 border-t border-white/10">
            <Bill />
          </div>
        </div>
        {/* Fixed Navigation */}
        <div className="absolute bottom-0 left-0 w-full z-50">
          <BottomNav />
        </div>
      </div>
    </section>
  );
};

export default Menu;
