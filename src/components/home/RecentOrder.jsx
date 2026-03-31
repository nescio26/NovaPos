import React, { useState } from "react";
import { FaSearch, FaArrowRight, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../https";
import OrdersCard from "../orders/OrdersCard";
import { enqueueSnackbar } from "notistack";
import { keepPreviousData } from "@tanstack/react-query";

const RecentOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      order.customerDetails?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.table?.tableNo?.toString().includes(searchTerm) ||
      order._id?.includes(searchTerm);

    // Status filter
    let matchesStatus = true;
    if (statusFilter !== "all") {
      const orderStatus = order.orderStatus?.toLowerCase();
      if (statusFilter === "progress") {
        matchesStatus =
          orderStatus === "pending" || orderStatus === "preparing";
      } else if (statusFilter === "ready") {
        matchesStatus = orderStatus === "ready";
      } else if (statusFilter === "completed") {
        matchesStatus = orderStatus === "paid" || orderStatus === "completed";
      }
    }

    return matchesSearch && matchesStatus;
  });

  // Get only recent orders (last 6) for the main view
  const recentOrders = filteredOrders.slice(0, 6);

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Filter options
  const filterOptions = [
    { id: "all", label: "All Orders" },
    { id: "progress", label: "Preparing" },
    { id: "ready", label: "Ready" },
    { id: "completed", label: "Served" },
  ];

  if (isLoading) {
    return (
      <div className="mt-10 space-y-6">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8 transition-colors duration-300">
      {/* HEADER SECTION */}
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-[#1A1D21] dark:text-white text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
              Live Orders<span className="text-[#FF5C00]">.</span>
            </h1>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mt-2">
              Managing current active sessions • {filteredOrders.length} active
              orders
            </p>
          </div>

          {/* SEARCH BAR - Consistent for both mobile and desktop */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-sm" />
            <input
              type="text"
              placeholder="Search by name, table or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl w-full focus:border-[#FF5C00]/50 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 text-sm text-[#1A1D21] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>

        {/* FILTER TABS - Same pill design for both mobile and desktop */}
        <div className="mt-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max pb-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  statusFilter === filter.id
                    ? "bg-[#FF5C00] text-white shadow-lg shadow-orange-500/20"
                    : "bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-[#FF5C00] hover:text-[#FF5C00] dark:hover:text-[#FF5C00]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ORDERS GRID */}
      <div className="relative px-4">
        <div className="bg-white dark:bg-[#16191D] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
          {recentOrders.length > 0 ? (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentOrders.map((order) => (
                  <OrdersCard key={order._id} order={order} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-7xl mb-4 opacity-50">🍽️</div>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-2">
                  No Orders Found
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No orders have been placed yet"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show more orders button */}
      {filteredOrders.length > 6 && (
        <div className="flex justify-center pt-4">
          <button className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-[#FF5C00] transition-all">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-[#FF5C00]">
              View {filteredOrders.length - 6} More Orders
            </span>
            <FaArrowRight className="text-slate-400 group-hover:text-[#FF5C00] group-hover:translate-x-1 transition-all text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentOrder;
