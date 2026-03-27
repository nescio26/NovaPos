import React, { useEffect, useRef } from "react";
import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiSolidDish } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#16191D] transition-colors duration-300">
      {/* --- HEADER --- */}
      <div className="px-6 py-5 md:px-8 border-b border-slate-50 dark:border-white/5">
        <h1 className="text-[#1A1D21] dark:text-white text-lg md:text-xl font-black tracking-tighter uppercase italic leading-none">
          Order Details<span className="text-[#FF5C00]">.</span>
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">
          {totalItems} {totalItems === 1 ? "Item" : "Items"} in Cart
        </p>
      </div>

      {/* --- SCROLLABLE ITEMS AREA --- */}
      <div
        className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 md:px-8 space-y-4 bg-[#FDFDFF] dark:bg-transparent"
        ref={scrollRef}
      >
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
              <BiSolidDish
                size={32}
                className="text-slate-300 dark:text-slate-600"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
              Cart is Empty
            </p>
          </div>
        ) : (
          cartData.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[#1A1D21] dark:text-slate-200 text-[13px] font-black uppercase tracking-tight leading-tight group-hover:text-[#FF5C00] transition-colors truncate">
                  {item.name}
                </h2>
                <div className="flex-shrink-0 flex items-center bg-[#1A1D21] dark:bg-[#FF5C00] px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-lg shadow-slate-200 dark:shadow-orange-500/10 transition-colors">
                  <span className="text-[#FF5C00] dark:text-white text-[9px] font-black mr-1">
                    x
                  </span>
                  <span className="text-white text-xs font-black">
                    {item.quantity}
                  </span>
                </div>
              </div>

              {/* ACTION & PRICE BAR */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50 dark:border-white/5">
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="flex items-center gap-1 text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors active:scale-90"
                  >
                    <RiDeleteBin2Fill size={14} />
                    <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-widest transition-colors">
                      Remove
                    </span>
                  </button>

                  <button className="flex items-center gap-1 text-slate-300 dark:text-slate-600 hover:text-emerald-500 transition-colors active:scale-90">
                    <FaNotesMedical size={12} />
                    <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-widest">
                      Notes
                    </span>
                  </button>
                </div>

                <p className="text-[#1A1D21] dark:text-white text-md md:text-lg font-black tracking-tighter leading-none">
                  <span className="text-[#FF5C00] text-[10px] mr-0.5 font-black italic">
                    RM
                  </span>
                  {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartInfo;
