import React, { useState } from "react";
import { useSelector } from "react-redux";

const Bill = () => {
  const cartData = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // CALCULATIONS
  const totalQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.pricePerQuantity * item.quantity,
    0,
  );

  const taxRate = 6;
  const taxAmount = (subtotal * taxRate) / 100;
  const finalTotal = subtotal + taxAmount;

  return (
    <div className="flex flex-col gap-1 bg-white dark:bg-[#16191D] border-t border-slate-100 dark:border-white/5 pt-5 md:pt-6 transition-colors duration-300">
      {/* SUMMARY SECTION */}
      <div className="space-y-2.5 md:space-y-3 px-6 md:px-8 mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.15em]">
            Subtotal ({totalQuantity} {totalQuantity === 1 ? "Item" : "Items"})
          </p>
          <h1 className="text-[#1A1D21] dark:text-white text-xs md:text-sm font-black">
            RM {subtotal.toFixed(2)}
          </h1>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.15em]">
            SST ({taxRate}%)
          </p>
          <h1 className="text-[#1A1D21] dark:text-white text-xs md:text-sm font-black">
            RM {taxAmount.toFixed(2)}
          </h1>
        </div>
      </div>

      {/* TOTAL SECTION: Responsive Receipt Card */}
      <div className="mx-4 md:mx-6 px-5 py-4 md:px-6 md:py-5 rounded-[1.8rem] md:rounded-[2rem] bg-[#1A1D21] dark:bg-black shadow-xl shadow-slate-200 dark:shadow-black/40 flex items-center justify-between border border-transparent dark:border-white/5 transition-all">
        <p className="text-[10px] md:text-[12px] text-white font-black uppercase tracking-[0.2em]">
          Total
        </p>
        <h1 className="text-white text-xl md:text-2xl font-black tracking-tighter leading-none">
          <span className="text-[#FF5C00] text-[10px] md:text-xs mr-1 italic font-black">
            RM
          </span>
          {finalTotal.toFixed(2)}
        </h1>
      </div>

      {/* PAYMENT METHODS */}
      <div className="px-6 md:px-8 mt-5 md:mt-6">
        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mb-3 text-center">
          Payment Method
        </p>
        <div className="flex items-center gap-1.5 p-1 bg-[#F8F9FD] dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
          {["Cash", "QR", "Card"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`flex-1 py-2.5 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                paymentMethod === method
                  ? "bg-white dark:bg-[#FF5C00] text-[#FF5C00] dark:text-white shadow-sm dark:shadow-orange-500/20"
                  : "text-slate-400 dark:text-slate-600 hover:text-[#1A1D21] dark:hover:text-slate-300"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 px-6 md:px-8 mt-6 md:mt-8 pb-8 md:pb-10">
        <button
          disabled={cartData.length === 0}
          className="bg-[#FF5C00] hover:bg-[#e65300] disabled:opacity-30 disabled:grayscale py-4 md:py-4.5 rounded-[1.2rem] md:rounded-[1.5rem] text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-orange-500/20 active:scale-95 order-1"
        >
          Place Order
        </button>
        <button
          disabled={cartData.length === 0}
          className="bg-emerald-200 dark:bg-emerald-500/20 border disabled:grayscale border-emerald-200 dark:border-emerald-500 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 py-4 md:py-4.5 rounded-[1.2rem] md:rounded-[1.5rem] text-emerald-700 dark:text-emerald-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 order-2"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Bill;
