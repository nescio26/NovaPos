import React, { useState, useEffect } from "react";
import {
  FaCheckDouble,
  FaCircle,
  FaClock,
  FaReceipt,
  FaUser,
} from "react-icons/fa";
import OrderDetailsModal from "./OrderDetailsModal";

const OrdersCard = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  const customerName = order.customerDetails?.name || "Guest";
  const itemsCount = order.items?.length || 0;
  const status = order.orderStatus || "Pending";
  const createdAt = order.createdAt || order.orderDate;
  const total = order.bills?.totalWithTax || 0;
  const tableNo = order.table?.tableNo || "N/A";

  useEffect(() => {
    const updateTime = () => {
      if (!createdAt) return;
      const start = new Date(createdAt);
      const now = new Date();
      const diffInMins = Math.floor((now - start) / 60000);
      if (diffInMins < 1) setTimeAgo("Just now");
      else if (diffInMins < 60) setTimeAgo(`${diffInMins}m ago`);
      else setTimeAgo(`${Math.floor(diffInMins / 60)}h ago`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [createdAt]);

  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    if (s === "paid" || s === "completed" || s === "served") {
      return {
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        label: "Served",
      };
    }
    if (s === "ready") {
      return { color: "text-blue-500", bg: "bg-blue-500/10", label: "Ready" };
    }
    return {
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      label: "Preparing",
    };
  };

  const config = getStatusConfig(status);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/5 p-5 rounded-[2rem] transition-all duration-300 hover:border-[#FF5C00]/30 hover:shadow-2xl hover:shadow-orange-500/5 cursor-pointer active-press"
      >
        {/* HEADER: Balanced Table & Name */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                Table
              </span>
              <span className="text-xl font-black italic text-[#1A1D21] dark:text-white leading-none">
                #{tableNo}
              </span>
            </div>
            <div className="h-6 w-[1px] bg-slate-100 dark:bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                Customer
              </span>
              <span className="text-lg font-bold text-[#1A1D21] dark:text-white leading-none truncate max-w-[120px]">
                {customerName}
              </span>
            </div>
          </div>

          {/* Status Indicator Dot */}
          <div className={`${config.bg} p-2 rounded-full`}>
            <div
              className={`w-2 h-2 rounded-full ${config.color.replace("text", "bg")} ${status === "Preparing" ? "animate-pulse" : ""}`}
            />
          </div>
        </div>

        {/* MIDDLE: Modern Info Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <FaClock size={10} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
              {timeAgo}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <FaReceipt size={10} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
              {itemsCount} Items
            </span>
          </div>
        </div>

        {/* FOOTER: Price & Status Label */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span
              className={`text-[9px] font-black uppercase tracking-[0.2em] ${config.color}`}
            >
              {config.label}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[#FF5C00] text-[10px] font-bold">RM</span>
              <span className="text-2xl font-black tracking-tighter text-[#1A1D21] dark:text-white">
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Interaction Icon */}
          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#FF5C00] transition-colors duration-300">
            <FaCheckDouble
              size={12}
              className="text-slate-300 group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </div>

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={order}
      />
    </>
  );
};

export default OrdersCard;
