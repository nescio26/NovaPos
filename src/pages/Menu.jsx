import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { IoClose } from "react-icons/io5";
/* Component Imports */
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <section className="h-[100dvh] bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white font-sans overflow-hidden relative transition-colors duration-300">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden p-2 md:p-4 gap-4 mb-20 md:mb-0">
        {/* LEFT COLUMN: Menu Selection */}
        <div className="flex-[2.5] flex flex-col bg-white dark:bg-[#16191D] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-500">
          <div className="flex items-center justify-between px-6 py-5 md:px-8 md:py-6 border-b border-slate-50 dark:border-white/5">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-[#1A1D21] dark:text-white text-xl md:text-2xl font-black uppercase tracking-tighter italic">
                Menu<span className="text-[#FF5C00]">.</span>
              </h1>
            </div>

            {/* Mobile Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="xl:hidden relative p-3 bg-[#1A1D21] dark:bg-white/10 rounded-2xl text-white active:scale-95 transition-transform"
            >
              <MdShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5C00] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1A1D21]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop Customer Tag */}
            <div className="hidden lg:flex items-center gap-4 bg-[#F8F9FD] dark:bg-white/5 p-2 px-5 rounded-[1.5rem]">
              <div className="flex flex-col items-end leading-tight">
                <h1 className="text-[15px] font-black uppercase dark:text-white">
                  {customerData.customerName || "Walk-In"}
                </h1>
                <p className="text-[13px] text-[#FF5C00] font-black">
                  {customerData.tableNo || "T-01"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <MenuContainer />
          </div>
        </div>

        {/* RIGHT COLUMN: Desktop Sidebar */}
        <div className="hidden xl:flex flex-[1] flex-col bg-white dark:bg-[#16191D] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-white/5 transition-all duration-500">
          <CustomerInfo />
          <div className="flex-1 overflow-hidden">
            <CartInfo />
          </div>
          <Bill />
        </div>
      </div>

      {/* MOBILE OVERLAY CART */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 xl:hidden ${isCartOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-[#1A1D21]/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[90%] max-w-[400px] bg-white dark:bg-[#16191D] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-white/5">
            <h2 className="font-black uppercase italic dark:text-white">
              Current Order
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 bg-slate-100 dark:bg-white/10 rounded-xl text-slate-400"
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <CartInfo />
          </div>
          <div className="pb-6">
            <Bill />
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV BAR */}
      <div className="fixed bottom-0 left-0 w-full z-[60] md:hidden bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-lg border-t border-slate-100 dark:border-white/5 pb-safe transition-colors duration-300">
        <BottomNav />
      </div>
    </section>
  );
};

export default Menu;
