import React, { useState } from "react";
import { useSelector } from "react-redux";

const Bill = () => {
  const cartData = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // 1. CALCULATIONS
  // Calculate total quantity (Physical items count)
  const totalQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate Subtotal (Price * Quantity)
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // SST Calculation (6% standard for Malaysia)
  const taxRate = 6;
  const taxAmount = (subtotal * taxRate) / 100;

  const finalTotal = subtotal + taxAmount;

  return (
    <div className="flex flex-col gap-1 bg-slate-900/60 border-t border-white/10 pt-4 backdrop-blur-md">
      {/* SUMMARY SECTION */}
      <div className="flex items-center justify-between px-6 mb-2">
        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">
          Subtotal ({totalQuantity} {totalQuantity === 1 ? "Item" : "Items"})
        </p>
        <h1 className="text-white text-sm font-bold">
          RM {subtotal.toFixed(2)}
        </h1>
      </div>

      <div className="flex items-center justify-between px-6">
        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">
          SST ({taxRate}%)
        </p>
        <h1 className="text-white text-sm font-bold">
          RM {taxAmount.toFixed(2)}
        </h1>
      </div>

      {/* TOTAL SECTION */}
      <div className="flex items-center justify-between px-6 mt-4 py-5 border-t border-white/5 bg-white/[0.02]">
        <p className="text-[14px] text-white font-black uppercase tracking-[0.2em]">
          Total Amount
        </p>
        <h1 className="text-indigo-400 text-2xl font-black tracking-tighter">
          <span className="text-xs mr-1 italic font-medium">RM</span>
          {finalTotal.toFixed(2)}
        </h1>
      </div>

      {/* PAYMENT METHODS */}
      <div className="px-6 mt-4">
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">
          Select Payment Method
        </p>
        <div className="flex items-center gap-2">
          {["Cash", "QR", "Card"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 border ${
                paymentMethod === method
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800/50 border-white/5 text-slate-500 hover:text-slate-300"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 px-6 mt-6 pb-10">
        <button
          disabled={cartData.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:bg-slate-800 py-4 rounded-2xl text-white text-[13px] font-black uppercase tracking-[0.15em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          Place Order
        </button>
        <button className="bg-white hover:bg-slate-100 py-4 rounded-2xl text-slate-900 text-[13px] font-black uppercase tracking-[0.15em] transition-all active:scale-95 flex items-center justify-center gap-2">
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Bill;
