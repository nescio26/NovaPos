import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdTableBar, MdOutlineFastfood } from "react-icons/md";
import { BiUser, BiTimeFive } from "react-icons/bi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrderStatus } from "../../https";

const RecentOrders = () => {
  const queryClient = useQueryClient();

  // Fetch real orders
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
  });

  // Status update mutation - Fixed to pass parameters correctly
  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus(orderId, orderStatus), // ✅ Pass as separate params
    onSuccess: () => {
      enqueueSnackbar("Order Status Updated Successfully", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Update error:", error);
      enqueueSnackbar(
        error.response?.data?.message || "Failed to update order status",
        {
          variant: "error",
        },
      );
    },
  });

  const handleStatusChange = (orderId, newStatus) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus: newStatus });
  };

  // Get orders array
  const orders = resData?.data || [];

  // Filter orders that are not completed/paid (active orders)
  const activeOrders = orders.filter(
    (order) =>
      order.orderStatus?.toLowerCase() !== "paid" &&
      order.orderStatus?.toLowerCase() !== "completed",
  );

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return "Just Now";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just Now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString("en-MY", {
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "ready") return "bg-emerald-500 text-white";
    if (statusLower === "preparing") return "bg-blue-500 text-white";
    return "bg-amber-500 text-white";
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-[#16191D] p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00]"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching orders:", error);
    return (
      <div className="w-full bg-white dark:bg-[#16191D] p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">
            Failed to load orders
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Please refresh the page to try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#16191D] p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[#1A1D21] dark:text-white text-2xl font-black uppercase tracking-tighter italic">
            Live Orders<span className="text-[#FF5C00]">.</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
              {activeOrders.length} Active{" "}
              {activeOrders.length === 1 ? "Order" : "Orders"}
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["orders"] })
          }
          className="group p-4 bg-[#F8F9FD] dark:bg-white/5 rounded-2xl text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white transition-all active:scale-90 shadow-sm"
        >
          <GrUpdate
            size={20}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
        </button>
      </div>

      {/* LIST WRAPPER */}
      {activeOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-7xl mb-4 opacity-50">🍽️</div>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-2">
            No Active Orders
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            All orders have been completed
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map((order) => {
            const orderStatus = order.orderStatus || "Pending";
            const isReady = orderStatus.toLowerCase() === "ready";
            const orderNumber = order._id?.slice(-6) || "N/A";

            return (
              <div
                key={order._id}
                className="group flex flex-col lg:flex-row lg:items-center justify-between p-5 sm:p-6 bg-[#F8F9FD] dark:bg-[#1c2025] hover:bg-white dark:hover:bg-[#252a30] rounded-[2rem] border border-transparent hover:border-orange-500/20 transition-all duration-300 shadow-sm"
              >
                {/* LEFT SIDE: ID & CUSTOMER */}
                <div className="flex items-center gap-5 flex-1">
                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-[#0B0E11] flex flex-col items-center justify-center border border-slate-100 dark:border-white/10 shadow-inner">
                    <span className="text-[9px] font-black text-slate-400 uppercase">
                      Order
                    </span>
                    <span className="text-sm font-black text-[#1A1D21] dark:text-white leading-none">
                      #{orderNumber}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#1A1D21] dark:text-white font-black text-base tracking-tight">
                      <BiUser className="text-slate-400" />
                      {order.customerDetails?.name || "Guest"}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <BiTimeFive className="text-[#FF5C00]" />
                      {formatDateTime(order.createdAt)}
                    </div>
                  </div>
                </div>

                {/* CENTER: STATUS & TABLE */}
                <div className="flex flex-wrap items-center gap-3 my-4 lg:my-0 lg:flex-1 lg:justify-center">
                  {/* TABLE BADGE */}
                  <div className="flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2.5 rounded-xl border border-blue-500/20">
                    <MdTableBar className="text-lg" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      Table {order.table?.tableNo || "N/A"}
                    </span>
                  </div>

                  {/* QUANTITY BADGE */}
                  <div className="flex items-center gap-2 bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-2.5 rounded-xl border border-orange-500/20">
                    <MdOutlineFastfood className="text-lg" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      {order.items?.length || 0} Items
                    </span>
                  </div>

                  {/* STATUS SELECT */}
                  <select
                    className={`text-[10px] font-black uppercase tracking-[0.1em] py-2.5 px-4 rounded-xl border-none focus:outline-none cursor-pointer shadow-sm transition-colors ${getStatusColor(orderStatus)}`}
                    value={orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={orderStatusUpdateMutation.isPending}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                  </select>
                </div>

                {/* RIGHT SIDE: TOTAL */}
                <div className="flex items-center justify-between lg:justify-end lg:flex-1 gap-6 pt-4 lg:pt-0 border-t lg:border-none border-slate-100 dark:border-white/5">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Total Amount
                    </p>
                    <p className="text-xl font-black text-[#1A1D21] dark:text-white tracking-tighter">
                      RM {order.bills?.totalWithTax?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleStatusChange(order._id, "Ready")}
                    disabled={orderStatusUpdateMutation.isPending || isReady}
                    className="h-12 w-12 bg-white dark:bg-[#0B0E11] rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#FF5C00] border border-slate-100 dark:border-white/10 transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <GrUpdate size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
