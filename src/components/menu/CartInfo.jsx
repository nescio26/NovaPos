import React from "react";
import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const CartInfo = () => {
  return (
    <div className="px-6 py-4 flex- flex-col h-full">
      {/* Header */}
      <h1 className="text-slate-100 text-lg font-black tracking-wide uppercase mb-4">
        Order Details
      </h1>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 h-[300px]">
        {/* CART ITEM CARD */}

        <div className="bg-slate-800/40 border border-white/ rounded-2xl p-4 mb-3 transition-all hover:bg-slate-800/60 group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-slate-100 text-[14px] font-semibold uppercase tracking-normal">
                Nasi Goreng
              </h2>
              <div className="flex items-center bg-slate-900 px-3 py-1 rounded-lg border border-white/5">
                <span className="text-indigo-400 text-[13px] font-semibold mr-1">
                  x
                </span>
                <span className="text-slate-100  text-s font-semibold ">2</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:text-rose-500 transition-colors">
                <RiDeleteBin2Fill />
              </button>

              <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                <FaNotesMedical />
              </button>
            </div>

            <p className="text-slate-100 text-base font-bold tracking-wide">
              <span className="text-slate-100 text-[13px] mr-1">RM</span>200.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
