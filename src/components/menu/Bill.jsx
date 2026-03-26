import React from "react";

const Bill = () => {
  return (
    <div className="flex flex-col gap-1 bg-slate-900/40 border-t border-white/5 pt-2">
      {/* SUMMARY SECTION */}
      <div className="flex items-center justify-between px-6 mt-4">
        <p className="text-[12px] text-slate-300 font-black uppercase tracking-widest">
          Items (3)
        </p>
        <h1 className="text-slate-100 text-m font-black uppercase tracking-tight">
          RM 200.00
        </h1>
      </div>

      <div className="flex items-center justify-between px-6 mt-2">
        <p className="text-[12px] text-slate-300 font-black uppercase tracking-widest">
          Tax (25%)
        </p>
        <h1 className="text-slate-100 text-m font-black uppercase tracking-tight">
          RM 50.00
        </h1>
      </div>

      {/* TOTAL SECTION */}
      <div className="flex items-center justify-between px-6 mt-4 pt-4 border-t border-white/5">
        <p className="text-[15px] text-indigo-400 font-bold uppercase tracking-[0.2em]">
          Total Amount
        </p>
        <h1 className="text-indigo-500 text-xl font-bold tracking-normal">
          RM 250.00
        </h1>
      </div>

      {/* PAYMENT METHODS */}
      <div className="flex items-center gap-3 px-6 mt-6">
        {["Cash", "QR", "Card"].map((method) => (
          <button
            key={method}
            className="bg-slate-800 hover:bg-slate-700 border border-white/5 px-4 py-3 w-full rounded-xl text-slate-400 text-[13px] font-black uppercase tracking-widest transition-all active:scale-95"
          >
            {method}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3 px-6 mt-4 pb-8">
        <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-4 w-full rounded-2xl text-white text-[15px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
          Place Order
        </button>
        <button className="bg-slate-100 hover:bg-white px-4 py-4 w-full rounded-2xl text-slate-900 text-[15px] font-black uppercase tracking-widest transition-all active:scale-95">
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Bill;
