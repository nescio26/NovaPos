import React, { useRef } from "react";
import {
  FaTimes,
  FaUtensils,
  FaPhone,
  FaUsers,
  FaTable,
  FaClock,
} from "react-icons/fa";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  const modalRef = useRef();

  if (!isOpen || !order) return null;

  // Close when clicking the backdrop
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const base =
      "px-3 py-1 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-black ";
    if (statusLower === "paid" || statusLower === "completed") {
      return (
        base +
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30"
      );
    } else if (statusLower === "ready") {
      return (
        base +
        "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30"
      );
    }
    return (
      base +
      "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
    );
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b0e11]/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#16191D] rounded-[2.5rem] max-w-lg w-full max-h-[90vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 flex flex-col animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="relative p-6 md:p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div>
              <span className={getStatusBadge(order.orderStatus)}>
                {order.orderStatus || "Processing"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1D21] dark:text-white mt-2 italic uppercase">
                Order Details<span className="text-[#FF5C00]">.</span>
              </h2>
              <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">
                REF: {order._id?.slice(-8) || "N/A"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-4 bg-slate-100 dark:bg-white/5 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 text-slate-400 rounded-2xl transition-all active:scale-90"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] border border-slate-100 dark:border-white/5">
              <p className="text-[9px] uppercase font-black text-slate-400 mb-2 flex items-center gap-1 tracking-widest">
                <FaUsers /> Customer
              </p>
              <p className="font-black text-sm truncate dark:text-white uppercase italic">
                {order.customerDetails?.name || "Walk-in Guest"}
              </p>
              <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-1">
                {order.customerDetails?.phone || "No phone provided"}
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] border border-slate-100 dark:border-white/5">
              <p className="text-[9px] uppercase font-black text-slate-400 mb-2 flex items-center gap-1 tracking-widest">
                <FaTable /> Table
              </p>
              <p className="font-black text-sm dark:text-white italic">
                NO. {order.table?.tableNo || order.tableNo || "N/A"}
              </p>
              <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-1">
                {order.customerDetails?.guests || 0} Total Guests
              </p>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
                Order Items ({order.items?.length || 0})
              </h3>
              <div className="h-[1px] w-full bg-slate-100 dark:bg-white/5" />
            </div>

            <div className="space-y-3">
              {order.items?.length > 0 ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="h-10 w-10 rounded-xl bg-[#FF5C00] text-white flex items-center justify-center font-black italic text-xs shadow-lg shadow-orange-500/20">
                        {item.quantity}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#1A1D21] dark:text-slate-200 uppercase tracking-tight">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          RM {item.pricePerQuantity?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-black text-sm dark:text-white text-right italic">
                      RM {(item.pricePerQuantity * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  No items found in this order.
                </div>
              )}
            </div>
          </div>

          {/* Bill Summary - Clean Receipt Style */}
          <div className="p-6 bg-[#1A1D21] dark:bg-black rounded-[2rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <FaUtensils size={80} className="rotate-12 text-white" />
            </div>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Subtotal</span>
                <span className="text-white">
                  RM {order.bills?.total?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Tax (SST 6%)</span>
                <span className="text-white">
                  RM {order.bills?.tax?.toFixed(2)}
                </span>
              </div>
              <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-end">
                <span className="font-black text-white uppercase text-[10px] tracking-[0.2em]">
                  Grand Total
                </span>
                <div className="text-right">
                  <span className="text-[#FF5C00] font-black italic text-xs mr-1">
                    RM
                  </span>
                  <span className="font-black text-3xl text-white tracking-tighter italic">
                    {order.bills?.totalWithTax?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Placed At */}
          <div className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
            <FaClock className="text-[#FF5C00]" /> Placed on{" "}
            {formatDate(order.createdAt)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
          <button
            onClick={onClose}
            className="w-full bg-[#FF5C00] text-white font-black py-5 rounded-[1.5rem] transition-all active:scale-[0.98] shadow-xl shadow-orange-500/20 hover:bg-[#e65300] uppercase tracking-widest text-xs"
          >
            Acknowledge & Dismiss
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>
    </div>
  );
};

export default OrderDetailsModal;
