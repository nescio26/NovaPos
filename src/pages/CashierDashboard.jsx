import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTables,
  getOrderById,
  processCashPayment,
  createStripePaymentForOrder,
} from "../https";
import { enqueueSnackbar } from "notistack";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaCreditCard,
  FaMoneyBill,
  FaQrcode,
  FaSyncAlt,
  FaPhoneAlt,
  FaReceipt,
} from "react-icons/fa";

import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import Invoice from "../components/invoice/Invoice";

const CashierDashboard = () => {
  const queryClient = useQueryClient();
  const [selectedTable, setSelectedTable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showInvoice, setShowInvoice] = useState(false);
  const [paidOrder, setPaidOrder] = useState(null);

  const { data: tablesData, isLoading: tablesLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await getTables();
      return res.data.data;
    },
  });

  const bookedTables =
    tablesData?.filter((table) => table.status === "Booked") || [];
  const currentOrderId =
    selectedTable?.currentOrder?._id || selectedTable?.currentOrder;

  const { data: selectedOrder } = useQuery({
    queryKey: ["order", currentOrderId],
    queryFn: async () => {
      const res = await getOrderById(currentOrderId);
      return res.data.data;
    },
    enabled: !!currentOrderId,
  });

  const cashPaymentMutation = useMutation({
    mutationFn: async (paymentData) => {
      if (paymentData.paymentMethod === "card") {
        // Stripe — redirects to Stripe checkout
        const res = await createStripePaymentForOrder({
          orderId: paymentData.orderId,
        });
        window.location.href = res.data.url; // redirect to Stripe
        return res;
      } else {
        // Cash or QR — handled internally
        return processCashPayment(paymentData);
      }
    },
    onSuccess: (res, variables) => {
      if (variables.paymentMethod === "card") return; // Stripe handles its own redirect
      enqueueSnackbar("Payment Successful", { variant: "success" });
      setPaidOrder({
        ...selectedOrder,
        paymentMethod,
        paymentData: res.data.payment,
      });
      setShowInvoice(true);
      setSelectedTable(null);
      queryClient.invalidateQueries(["tables"]);
    },
    onError: () => {
      enqueueSnackbar("Payment failed. Please try again.", {
        variant: "error",
      });
    },
  });

  return (
    <section className="h-screen bg-[#F4F7FE] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      {/* 1. RESPONSIVE HEADER */}
      <header className="flex-none w-full bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 sticky top-0 z-30">
        <div className="max-w-[2000px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5">
            <BackButton className="hover:rotate-[-10deg] transition-transform scale-90 md:scale-100" />
            <div>
              <h1 className="text-[#1A1D21] dark:text-white text-xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
                Cashier<span className="hidden sm:inline"> Dashboard</span>
                <span className="text-[#FF5C00]">.</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-1 md:mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <p className="text-slate-400 dark:text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                  Live Terminal
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => queryClient.invalidateQueries(["tables"])}
            className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-slate-100 dark:bg-white/5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black text-slate-500 dark:text-slate-400 hover:bg-[#FF5C00] hover:text-white transition-all uppercase tracking-widest active:scale-95"
          >
            <FaSyncAlt className={tablesLoading ? "animate-spin" : ""} />
            <span className="hidden xs:inline">Sync Data</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden flex justify-center">
        <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* LEFT: TABLE SELECTION (Responsive Grid) */}
          <div className="lg:col-span-7 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Occupied Tables
              </h2>
              <div className="h-[1px] flex-1 mx-4 md:mx-6 bg-slate-200 dark:bg-white/5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {bookedTables.map((table) => (
                <button
                  key={table._id}
                  onClick={() => setSelectedTable(table)}
                  className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 text-left transition-all duration-300 ${
                    selectedTable?._id === table._id
                      ? "border-[#FF5C00] bg-white dark:bg-[#16191D] shadow-xl"
                      : "border-transparent bg-white dark:bg-[#16191D] shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-5">
                    <div
                      className={`h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center font-black italic text-base md:text-xl ${
                        selectedTable?._id === table._id
                          ? "bg-[#FF5C00] text-white"
                          : "bg-slate-50 dark:bg-white/5 text-slate-400"
                      }`}
                    >
                      {table.tableNo}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-0.5 md:mb-1">
                        Customer
                      </p>
                      <p className="text-xs md:text-sm font-black truncate w-24 md:w-32">
                        {table.currentOrder?.customerDetails?.name || "Guest"}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: BILLING PANEL */}
          <div className="lg:col-span-5 bg-white dark:bg-[#16191D]/50 border-l border-slate-200 dark:border-white/5 h-full overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {!selectedTable ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center opacity-30 p-8"
                >
                  <FaReceipt size={48} className="mb-4 text-slate-300" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">
                    Select a table to view details
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-full flex flex-col p-4 md:p-8"
                >
                  {/* TOP: Customer Info */}
                  <div className="flex justify-between items-start mb-6 shrink-0">
                    <div className="min-w-0">
                      <p className="text-[9px] md:text-[10px] font-black text-[#FF5C00] uppercase tracking-widest mb-1">
                        Billing Summary
                      </p>
                      <h3 className="text-lg md:text-2xl font-black italic uppercase leading-tight truncate">
                        {selectedOrder?.customerDetails?.name ||
                          "Walk-in Guest"}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] md:text-xs mt-1 md:mt-2">
                        <FaPhoneAlt size={10} />{" "}
                        {selectedOrder?.customerDetails?.phone || "No Contact"}
                      </div>
                    </div>
                    <div className="bg-slate-900 text-white p-3 md:p-4 rounded-xl md:rounded-2xl text-center shadow-lg shrink-0">
                      <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Table
                      </p>
                      <p className="text-xl md:text-2xl font-black italic">
                        #{selectedTable.tableNo}
                      </p>
                    </div>
                  </div>

                  {/* MIDDLE: SCROLLABLE ITEM LIST */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-6 border-t border-slate-100 dark:border-white/5 pt-6">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      Order Items
                    </p>
                    {selectedOrder?.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs md:text-sm font-black dark:text-slate-200 uppercase tracking-tight">
                            {item.name}
                          </span>
                          <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {item.quantity} x RM{" "}
                            {item.pricePerQuantity.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs md:text-sm font-black dark:text-white group-hover:text-[#FF5C00] transition-colors">
                          RM{" "}
                          {(item.quantity * item.pricePerQuantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM: FIXED SETTLEMENT AREA */}
                  <div className="mt-auto shrink-0 pt-4 border-t border-slate-100 dark:border-white/5 space-y-4 md:space-y-6">
                    {/* Tiny Breakdown */}
                    <div className="space-y-2 px-1">
                      <div className="flex justify-between text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span className="text-slate-800 dark:text-white">
                          RM {selectedOrder?.bills?.total?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <span>SST (6%)</span>
                        <span className="text-slate-800 dark:text-white">
                          RM {selectedOrder?.bills?.tax?.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Grand Total Box */}
                    <div className="bg-[#1A1D21] dark:bg-black p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between shadow-2xl border border-white/5">
                      <span className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-widest">
                        Total Payable
                      </span>
                      <div className="text-right">
                        <span className="text-[#FF5C00] text-[10px] md:text-xs font-black italic mr-1">
                          RM
                        </span>
                        <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">
                          {selectedOrder?.bills?.totalWithTax?.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Payment Selectors */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {[
                        { id: "cash", label: "CASH", icon: <FaMoneyBill /> },
                        { id: "card", label: "CARD", icon: <FaCreditCard /> },
                        { id: "qr", label: "QR PAY", icon: <FaQrcode /> },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={`py-3 md:py-4 rounded-xl md:rounded-2xl border flex flex-col items-center gap-1 md:gap-2 transition-all active:scale-95 ${
                            paymentMethod === m.id
                              ? "bg-[#FF5C00] text-white border-transparent shadow-lg shadow-orange-500/30"
                              : "bg-[#F8F9FD] dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400"
                          }`}
                        >
                          <span className="text-lg md:text-xl">{m.icon}</span>
                          <span className="text-[8px] md:text-[9px] font-black tracking-widest">
                            {m.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Final Button */}
                    <button
                      onClick={() =>
                        cashPaymentMutation.mutate({
                          orderId: selectedOrder._id,
                          tableId: selectedTable._id,
                          amount: selectedOrder.bills.totalWithTax,
                          paymentMethod,
                        })
                      }
                      disabled={cashPaymentMutation.isPending}
                      className="w-full py-4 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-[#FF5C00] text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-500/40 hover:bg-[#e65300] transition-all disabled:opacity-50"
                    >
                      {cashPaymentMutation.isPending
                        ? "PROCESSING..."
                        : "COMPLETE SETTLEMENT"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {showInvoice && paidOrder && (
        <Invoice orderInfo={paidOrder} setShowInvoice={setShowInvoice} />
      )}
    </section>
  );
};

export default CashierDashboard;
