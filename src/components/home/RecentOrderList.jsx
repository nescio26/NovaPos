import React, { useState } from "react";
import { FaSearch, FaArrowRight, FaDotCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../https";
import RecentOrderList from "./RecentOrderList";
import { enqueueSnackbar } from "notistack";
import { keepPreviousData } from "@tanstack/react-query";

const RecentOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  });

  if (isError) enqueueSnackbar("Failed to sync orders", { variant: "error" });

  const orders = resData?.data || [];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.customerDetails?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.table?.tableNo?.toString().includes(searchTerm);

    let matchesStatus = true;
    if (statusFilter !== "all") {
      const s = order.orderStatus?.toLowerCase();
      if (statusFilter === "progress")
        matchesStatus = s === "pending" || s === "preparing";
      if (statusFilter === "ready") matchesStatus = s === "ready";
    }
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaDotCircle className="text-[#FF5C00] animate-pulse text-[10px]" />
            <span className="text-[#FF5C00] text-[10px] font-black uppercase tracking-[0.3em]">
              Live Feed
            </span>
          </div>
          <h1 className="text-[#1A1D21] dark:text-white text-3xl font-black tracking-tighter uppercase italic leading-none">
            Recent Orders<span className="text-[#FF5C00]">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <FaSearch className="text-slate-400 mr-2 text-xs" />
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-[#1A1D21] dark:text-white text-[10px] font-black uppercase tracking-widest w-24 md:w-40"
            />
          </div>
        </div>
      </div>

      {/* FILTER TABS STRIP */}
      <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/5 self-start">
        {["all", "progress", "ready"].map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              statusFilter === f
                ? "bg-white dark:bg-[#1A1D21] text-[#FF5C00] shadow-md ring-1 ring-black/5"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-[600px] max-h-[600px] overflow-y-auto no-scrollbar pr-2 space-y-4">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-24 w-full bg-slate-200 dark:bg-white/5 animate-pulse rounded-[2rem]"
              ></div>
            ))
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <RecentOrderList key={order._id} order={order} />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-[#16191D] rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10 opacity-50">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              No matching orders
            </p>
          </div>
        )}
      </div>

      {/* FOOTER ACTION */}
      <button className="group flex items-center justify-center gap-3 w-full py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 hover:text-[#FF5C00] transition-all">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
          Open Full Order History
        </span>
        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default RecentOrder;
