import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../https";
import { enqueueSnackbar } from "notistack";

const PopularDishes = () => {
  const [popularDishes, setPopularDishes] = useState([]);

  // Fetch all orders
  const {
    data: resData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      return response.data;
    },
  });

  useEffect(() => {
    if (resData?.data) {
      const orders = resData.data;
      const dishMap = new Map();

      // Aggregate all items from orders
      orders.forEach((order) => {
        order.items?.forEach((item) => {
          const existing = dishMap.get(item.name);
          if (existing) {
            dishMap.set(item.name, {
              ...existing,
              quantity: existing.quantity + item.quantity,
              totalOrders: existing.totalOrders + 1,
            });
          } else {
            dishMap.set(item.name, {
              name: item.name,
              quantity: item.quantity,
              totalOrders: 1,
              pricePerQuantity: item.pricePerQuantity,
            });
          }
        });
      });

      // Convert to array and sort
      const sorted = Array.from(dishMap.values())
        .map((dish) => ({
          ...dish,
          numberOfOrders: dish.quantity,
        }))
        .sort((a, b) => b.numberOfOrders - a.numberOfOrders)
        .slice(0, 5);

      setPopularDishes(sorted);
    }
  }, [resData]);

  if (isError) {
    enqueueSnackbar("Failed to load popular dishes", { variant: "error" });
  }

  if (isLoading) {
    return (
      <div className="mt-8 transition-colors duration-300">
        <div className="bg-white dark:bg-[#16191D] rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 sm:p-8 shadow-sm">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (popularDishes.length === 0) {
    return (
      <div className="mt-8 transition-colors duration-300">
        <div className="bg-white dark:bg-[#16191D] rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 sm:p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">
              No orders yet
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Popular dishes will appear once orders are placed
            </p>
          </div>
        </div>
      </div>
    );
  }

  const maxOrders = popularDishes[0]?.numberOfOrders || 1;

  return (
    <div className="mt-8 transition-colors duration-300">
      <div className="bg-white dark:bg-[#16191D] rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 sm:p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-[#1A1D21] dark:text-white text-lg font-black tracking-tight uppercase leading-none">
              Top Sellers<span className="text-[#FF5C00]">.</span>
            </h1>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">
              Most ordered items
            </p>
          </div>

          <button className="text-[#FF5C00] text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity border-b-2 border-orange-500/10 pb-1">
            View All
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-8">
          {popularDishes.map((dish, index) => {
            const percentage = (dish.numberOfOrders / maxOrders) * 100;

            return (
              <div
                key={dish.name}
                className="group flex items-center gap-4 sm:gap-6"
              >
                {/* RANK BADGE */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#ff8c4a] flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-sm">
                    {index + 1}
                  </span>
                </div>

                {/* INFO & PROGRESS */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#1A1D21] dark:text-white font-black text-sm sm:text-base tracking-tight group-hover:text-[#FF5C00] transition-colors">
                      {dish.name}
                    </h1>
                    <span className="text-[#1A1D21] dark:text-white font-black text-xs bg-[#F8F9FD] dark:bg-white/5 px-2 py-1 rounded-lg border border-slate-100 dark:border-white/5">
                      {dish.numberOfOrders}{" "}
                      <span className="text-slate-400 dark:text-slate-500 text-[9px] ml-0.5">
                        sold
                      </span>
                    </span>
                  </div>

                  {/* Visual Popularity Bar */}
                  <div className="w-full h-2 bg-[#F8F9FD] dark:bg-white/5 rounded-full overflow-hidden border border-slate-50 dark:border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF5C00] to-[#ff8c4a] rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,92,0,0.3)]"
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                      {dish.totalOrders}{" "}
                      {dish.totalOrders === 1 ? "order" : "orders"}
                    </p>
                    <p className="text-[#FF5C00] text-[9px] font-black uppercase">
                      {percentage.toFixed(0)}% of top seller
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER CTA */}
        <button className="w-full mt-10 py-4 bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FF5C00] hover:text-white hover:border-[#FF5C00] hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all">
          Generate Performance Report
        </button>
      </div>
    </div>
  );
};

export default PopularDishes;
