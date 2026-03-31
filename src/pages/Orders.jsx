import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrdersCard from "../components/orders/OrdersCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../https";

const Orders = () => {
  const [status, setStatus] = useState("all");

  const {
    data: resData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    console.error("Error fetching orders:", error);
    enqueueSnackbar("Something Went Wrong", { variant: "error" });
  }

  // Get orders array from response
  const orders = resData?.data || [];

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (status === "all") return true;

    const orderStatus = order.orderStatus?.toLowerCase();
    switch (status) {
      case "progress":
        return orderStatus === "pending" || orderStatus === "preparing";
      case "ready":
        return orderStatus === "ready";
      case "completed":
        return orderStatus === "paid" || orderStatus === "completed";
      default:
        return true;
    }
  });

  const categories = [
    { id: "all", label: "All Orders" },
    { id: "progress", label: "Preparing" },
    { id: "ready", label: "Ready" },
    { id: "completed", label: "Served" },
  ];

  if (isLoading) {
    return (
      <section className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00] mx-auto"></div>
          <p className="mt-4 text-slate-500">Loading orders...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white transition-colors duration-500 overflow-hidden relative">
      {/* HEADER: Sticky with glass effect */}
      <header className="flex-none w-full bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 sticky top-0 z-30">
        <div className="max-w-[2000px] mx-auto px-4 md:px-8 py-4 md:py-6">
          {/* TOP ROW */}
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <div className="flex items-center gap-3 md:gap-5">
              <BackButton className="hover:rotate-[-10deg] transition-transform scale-90 md:scale-100" />
              <div>
                <h1 className="text-[#1A1D21] dark:text-white text-xl md:text-3xl font-black uppercase italic tracking-normal leading-none">
                  Orders<span className="text-[#FF5C00]">.</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-1 md:mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse shadow-[0_0_8px_rgba(255,92,0,0.4)]" />
                  <p className="text-slate-400 dark:text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.25em]">
                    Live Kitchen Sync
                  </p>
                </div>
              </div>
            </div>

            {/* STATUS CHIP */}
            <div className="flex items-center gap-3 bg-emerald-500/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[8px] md:text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter mb-1">
                  System Live
                </span>
                <span className="text-[11px] md:text-[13px] font-bold text-slate-700 dark:text-white">
                  {filteredOrders.length} Active
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: TABS */}
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setStatus(cat.id)}
                className={`px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 whitespace-nowrap border ${
                  status === cat.id
                    ? "bg-[#FF5C00] text-white border-transparent shadow-lg shadow-orange-500/20"
                    : "bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-white/5 hover:border-[#FF5C00]/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-transparent relative">
        <div className="max-w-[2000px] mx-auto">
          {filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 pb-20">
              {filteredOrders.map((order) => (
                <OrdersCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] animate-in fade-in zoom-in duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#FF5C00] blur-3xl opacity-10 rounded-full animate-pulse"></div>
                <span className="text-7xl relative">📋</span>
              </div>
              <p className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                Zero Orders Found
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 font-medium max-w-[250px] text-center mt-2">
                {status === "all"
                  ? "Your kitchen is currently clear. Time for a break?"
                  : `No orders are currently marked as "${status}"`}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Gradient Fade: Prevents abrupt cutoff at BottomNav */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F9FD] dark:from-[#0B0E11] to-transparent pointer-events-none z-20" />
      </main>

      <BottomNav className="relative z-40" />
    </section>
  );
};

export default Orders;
