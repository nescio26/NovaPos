import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="h-[100dvh] bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white font-sans overflow-hidden transition-colors duration-300">
      {/* --- UNIFIED HEADER --- */}
      <header className="flex-none w-full bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 sticky top-0 z-30">
        <div className="max-w-[2000px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          {/* LEFT: Identity */}
          <div className="flex items-center gap-3 md:gap-5">
            <BackButton className="hover:rotate-[-10deg] transition-transform scale-90 md:scale-100" />
            <h1 className="text-[#1A1D21] dark:text-white text-xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
              Menu<span className="text-[#FF5C00]">.</span>
            </h1>
          </div>

          {/* RIGHT: Actions & Info */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Desktop Customer Tag (Consistent with System Status Chips) */}
            <div className="hidden lg:flex items-center gap-4 bg-[#F8F9FD] dark:bg-white/5 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[12px] md:text-[14px] font-black uppercase dark:text-white truncate max-w-[150px] mb-1">
                  {customerData.customerName || "Walk-In"}
                </span>
                <span className="text-[9px] md:text-[11px] text-[#FF5C00] font-black uppercase tracking-tighter">
                  Table : {customerData.table?.tableNo || "N/A"}
                </span>
              </div>
            </div>

            {/* Mobile Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="xl:hidden relative p-3 md:p-4 bg-[#1A1D21] dark:bg-white/10 rounded-xl md:rounded-2xl text-white active:scale-95 transition-all border border-white/10 shadow-lg shadow-black/20"
            >
              <MdShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF5C00] text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1A1D21] animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-1 overflow-hidden p-2 md:p-4 gap-4 mb-20 md:mb-0">
        {/* LEFT COLUMN: Menu Selection */}
        <div className="flex-[2.5] flex flex-col bg-white dark:bg-[#16191D] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-500">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <MenuContainer />
          </div>
        </div>

        {/* RIGHT COLUMN: Desktop Sidebar (Cart & Bill) */}
        <div className="hidden xl:flex flex-[1] flex-col bg-white dark:bg-[#16191D] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-white/5 transition-all duration-500">
          <CustomerInfo />
          <div className="flex-1 overflow-hidden">
            <CartInfo />
          </div>
          <Bill />
        </div>
      </div>

      {/* --- MOBILE OVERLAY CART (AnimatePresence for smooth slide) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] xl:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-[400px] bg-white dark:bg-[#121417] shadow-2xl flex flex-col border-l border-white/5"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                <div>
                  <h2 className="text-lg font-black uppercase italic tracking-tight dark:text-white leading-none">
                    Order Details<span className="text-[#FF5C00]">.</span>
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Check & Checkout
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-500 transition-colors active:scale-90"
                >
                  <IoClose size={22} />
                </button>
              </div>

              {/* Mobile Cart Content Area */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <CustomerInfo />
                <div className="flex-1 overflow-hidden">
                  <CartInfo />
                </div>
                <div className="pb-8">
                  <Bill />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MOBILE BOTTOM NAV BAR --- */}
      <div className="fixed bottom-0 left-0 w-full z-[60] md:hidden bg-white/90 dark:bg-[#0B0E11]/90 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
        <BottomNav />
      </div>
    </section>
  );
};

export default Menu;
