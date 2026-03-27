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

  // Calculate physical total quantity (e.g., 2 Nasi Lemak + 1 Teh Tarik = 3)
  const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);

  // Auto-scroll to bottom when adding items
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  return (
    <div className="flex flex-col h-full bg-[#0F172A]/50 backdrop-blur-md">
      {/* --- HEADER --- */}
      <div className="px-6 py-6 border-b border-white/5">
        <h1 className="text-white text-xl font-black tracking-tighter uppercase italic">
          Order Details<span className="text-indigo-500">.</span>
        </h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
          {totalItems} {totalItems === 1 ? "Item" : "Items"} in Cart
        </p>
      </div>

      {/* --- SCROLLABLE ITEMS AREA --- */}
      <div
        className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-4"
        ref={scrollRef}
      >
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-30">
            <BiSolidDish size={40} className="text-slate-500 mb-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Cart is Empty
            </p>
          </div>
        ) : (
          cartData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/60 border border-white/5 rounded-[2rem] p-5 active-press group"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-slate-100 text-sm font-black uppercase tracking-tight leading-tight">
                  {item.name}
                </h2>
                <div className="flex items-center bg-indigo-600 px-3 py-1 rounded-xl shadow-lg shadow-indigo-500/20">
                  <span className="text-white text-[10px] font-black mr-1 opacity-70">
                    x
                  </span>
                  <span className="text-white text-xs font-black">
                    {item.quantity}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors active-press"
                  >
                    <RiDeleteBin2Fill size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Remove
                    </span>
                  </button>

                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 transition-colors active-press">
                    <FaNotesMedical size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Notes
                    </span>
                  </button>
                </div>

                <p className="text-white text-lg font-black tracking-tighter">
                  <span className="text-indigo-400 text-xs mr-1 font-medium italic">
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
