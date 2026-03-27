import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice"; // ✅ matches export

const MenuContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(menus[0]);
  const [counts, setCounts] = useState({});
  const dispatch = useDispatch();
  const updateCount = (id, delta) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const itemCount = counts[item.id] || 0;
    if (itemCount === 0) return;

    const { name, price } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };

    dispatch(addItems(newObj));

    setCounts((prev) => ({
      ...prev,
      [item.id]: 0,
    }));
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* CATEGORY SELECTOR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
        {menus.map((menu) => {
          const isSelected = selectedCategory.id === menu.id;
          return (
            <div
              key={menu.id}
              onClick={() => setSelectedCategory(menu)}
              className={`flex flex-col items-start justify-between p-4 rounded-[1.5rem] h-[110px] cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? "bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800/40 border-white/5 hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-slate-100 text-base font-black uppercase tracking-tight">
                  {menu.icon} {menu.name}
                </h1>
                {isSelected && (
                  <GrRadialSelected className="text-white" size={18} />
                )}
              </div>
              <p
                className={`text-[11px] font-bold uppercase tracking-widest ${
                  isSelected ? "text-white" : "text-blue-300"
                }`}
              >
                {menu.items.length} Options
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-white/50 mx-6" />

      {/* ITEMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-6 py-6 overflow-y-auto">
        {selectedCategory?.items.map((item) => {
          const currentCount = counts[item.id] || 0;
          return (
            <div
              key={item.id}
              className="bg-slate-800/40 border border-white/5 flex flex-col items-start justify-between p-5 rounded-[2rem] h-[150px] hover:bg-slate-800/60 transition-all group shadow-xl"
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                  <h1 className="text-slate-100 text-lg font-black tracking-normal leading-none uppercase">
                    {item.name}
                  </h1>
                  <p className="text-indigo-400 text-[11px] font-black">
                    RM {item.price.toFixed(2)}
                  </p>
                </div>

                {/* ACTION BUTTON */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-slate-900 border border-white/10 text-emerald-500 p-2.5 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
                >
                  <FaShoppingCart size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between w-full mt-4">
                <span className="text-slate-200 text-[12px] font-black uppercase tracking-[0.2rem]">
                  Quantity
                </span>

                {/* COUNTER UI */}
                <div className="flex items-center bg-slate-900/80 rounded-xl p-1 border border-white/10">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"
                    onClick={() => updateCount(item.id, -1)}
                  >
                    <FaMinus size={10} />
                  </button>

                  <span className="text-slate-100 text-sm font-black w-8 text-center">
                    {currentCount}
                  </span>

                  <button
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
                    onClick={() => updateCount(item.id, 1)}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuContainer;
