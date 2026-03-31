import React, { useState, useEffect } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { getCategory, getDish } from "../../https";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const MenuContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [counts, setCounts] = useState({});
  const dispatch = useDispatch();

  // Fetch category from database
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["menu-category"],
    queryFn: async () => {
      const response = await getCategory();
      return response.data;
    },
  });

  // Fetch dish from database
  const {
    data: dishData,
    isLoading: dishLoading,
    error: dishError,
  } = useQuery({
    queryKey: ["menu-dish"],
    queryFn: async () => {
      const response = await getDish();
      return response.data;
    },
  });

  // Process category and dish
  const category = categoryData?.data || [];
  const dish = dishData?.data || [];

  // Group dish by category
  const menuItems = React.useMemo(() => {
    if (!category.length || !dish.length) return [];

    return category.map((cat) => ({
      id: cat._id,
      name: cat.name,
      description: cat.description,
      items: dish
        .filter((d) => d.category?._id === cat._id)
        .map((d) => ({
          id: d._id,
          name: d.name,
          price: d.price,
          description: d.description,
          image: d.image,
          isAvailable: d.isAvailable,
          category: d.category,
        })),
    }));
  }, [category, dish]);

  // Set default selected category when data loads
  useEffect(() => {
    if (menuItems.length > 0 && !selectedCategory) {
      setSelectedCategory(menuItems[0]);
    }
  }, [menuItems, selectedCategory]);

  const updateCount = (id, delta) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const itemCount = counts[item.id] || 0;
    if (itemCount === 0) {
      enqueueSnackbar("Please select quantity first", { variant: "warning" });
      return;
    }

    if (!item.isAvailable) {
      enqueueSnackbar(`${item.name} is currently unavailable`, {
        variant: "error",
      });
      return;
    }

    const { name, price } = item;
    const newObj = {
      id: Date.now(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
      dishId: item.id,
    };

    dispatch(addItems(newObj));

    enqueueSnackbar(`Added ${itemCount}x ${name} to cart`, {
      variant: "success",
    });

    setCounts((prev) => ({
      ...prev,
      [item.id]: 0,
    }));
  };

  // Loading state
  if (categoryLoading || dishLoading) {
    return (
      <div className="flex flex-col w-full h-full bg-[#FDFDFF] dark:bg-[#16191D] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00] mb-4"></div>
        <p className="text-slate-500 dark:text-slate-400 font-bold">
          Loading menu...
        </p>
      </div>
    );
  }

  // Error state
  if (categoryError || dishError) {
    return (
      <div className="flex flex-col w-full h-full bg-[#FDFDFF] dark:bg-[#16191D] items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">😢</span>
          <p className="text-red-500 dark:text-red-400 font-bold mb-2">
            Failed to load menu
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Please refresh the page or try again later
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (menuItems.length === 0) {
    return (
      <div className="flex flex-col w-full h-full bg-[#FDFDFF] dark:bg-[#16191D] items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🍽️</span>
          <p className="text-slate-700 dark:text-slate-300 font-black text-xl mb-2">
            No Menu Items Found
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Please add category and dish to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#FDFDFF] dark:bg-[#16191D] overflow-hidden transition-colors duration-300">
      {/* CATEGORY SELECTOR */}
      <div className="flex-shrink-0">
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 px-6 py-6 custom-scrollbar">
          {menuItems.map((menu) => {
            const isSelected = selectedCategory?.id === menu.id;
            const availableItems = menu.items.filter(
              (item) => item.isAvailable,
            ).length;

            return (
              <div
                key={menu.id}
                onClick={() => setSelectedCategory(menu)}
                className={`flex-shrink-0 w-[140px] md:w-auto flex flex-col items-start justify-between p-5 rounded-[2rem] h-[120px] cursor-pointer transition-all duration-500 border active-press ${
                  isSelected
                    ? "bg-[#1A1D21] dark:bg-white/10 border-[#1A1D21] dark:border-white/20 shadow-xl shadow-slate-200 dark:shadow-black/20"
                    : "bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-orange-200 dark:hover:border-[#FF5C00]/30 hover:bg-orange-50/30 dark:hover:bg-[#FF5C00]/5"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl">{menu.icon}</span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#FF5C00] flex items-center justify-center shadow-lg shadow-orange-500/40">
                      <GrRadialSelected className="text-white" size={12} />
                    </div>
                  )}
                </div>
                <div>
                  <h1
                    className={`text-sm font-black uppercase tracking-tighter italic ${
                      isSelected
                        ? "text-white"
                        : "text-[#1A1D21] dark:text-slate-300"
                    }`}
                  >
                    {menu.name}
                  </h1>
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${
                      isSelected
                        ? "text-[#FF5C00]"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {availableItems} / {menu.items.length} Items
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-6">
          <div className="h-[1px] w-full bg-slate-100 dark:bg-white/5" />
        </div>
      </div>

      {/* ITEMS GRID */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8">
        {selectedCategory?.items.filter((item) => item.isAvailable).length ===
        0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🍽️</span>
              <p className="text-slate-500 dark:text-slate-400 font-bold">
                No available items in this category
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Please check back later
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {selectedCategory?.items
              .filter((item) => item.isAvailable)
              .map((item) => {
                const currentCount = counts[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#1c2025] border border-slate-100 dark:border-white/5 flex flex-col items-start justify-between p-6 rounded-[2.5rem] h-[180px] hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 transition-all group"
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <div className="flex flex-col gap-1 overflow-hidden flex-1">
                        <h1 className="text-[#1A1D21] dark:text-white text-lg font-black tracking-tighter leading-tight uppercase italic group-hover:text-[#FF5C00] transition-colors truncate">
                          {item.name}
                        </h1>
                        {item.description && (
                          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-slate-400 dark:text-slate-500 text-[12px] font-black tracking-widest mt-1">
                          RM {item.price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`p-3 rounded-2xl transition-all flex-shrink-0 active:scale-90 ${
                          currentCount > 0
                            ? "bg-[#FF5C00] text-white shadow-lg shadow-orange-500/30"
                            : "bg-slate-50 dark:bg-white/5 text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/10"
                        }`}
                      >
                        <FaShoppingCart size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto">
                      <span className="text-[#1A1D21] dark:text-white text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                        Qty
                      </span>

                      <div className="flex items-center bg-[#F8F9FD] dark:bg-white/5 rounded-2xl p-1 border border-slate-100 dark:border-white/5">
                        <button
                          className="w-9 h-9 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"
                          onClick={() => updateCount(item.id, -1)}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="text-[#1A1D21] dark:text-white text-sm font-black w-10 text-center">
                          {currentCount}
                        </span>
                        <button
                          className="w-9 h-9 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#FF5C00] transition-colors"
                          onClick={() => updateCount(item.id, 1)}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MenuContainer;
