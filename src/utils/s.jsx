import React from "react";
import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const CartInfo = () => {
  return (
    <div className="px-6 py-4 flex flex-col h-full">
      {/* Header */}
      <h1 className="text-white text-lg font-black tracking-tight uppercase mb-4">
        Order Details<span className="text-indigo-500">.</span>
      </h1>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 h-[400px]">
        {/* CART ITEM CARD */}
        <div className="bg-slate-900/40 border border-white/10 rounded-[1.5rem] p-4 mb-3 transition-all hover:bg-slate-900/60 group shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-slate-100 text-[14px] font-black uppercase tracking-tight">
                Nasi Goreng
              </h2>
              {/* Quantity Badge - Matches the solid style of CustomerInfo */}
              <div className="flex items-center bg-indigo-500 px-3 py-1 rounded-lg shadow-lg shadow-indigo-500/10">
                <span className="text-white text-[10px] font-black mr-1 uppercase">
                  x
                </span>
                <span className="text-white text-xs font-black">2</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:text-rose-500 transition-all active:scale-90">
                <RiDeleteBin2Fill size={18} />
              </button>

              <button className="text-slate-500 hover:text-emerald-400 transition-all active:scale-90">
                <FaNotesMedical size={16} />
              </button>
            </div>

            <p className="text-white text-base font-bold tracking-normal">
              <span className="text-white-400 text-[13px] mr-1">RM</span>
              200.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
