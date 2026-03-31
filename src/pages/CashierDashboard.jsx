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
        const res = await createStripePaymentForOrder({
          orderId: paymentData.orderId,
        });
        window.location.href = res.data.url;
        return res;
      } else {
        return processCashPayment(paymentData);
      }
    },
    onSuccess: (res, variables) => {
      if (variables.paymentMethod === "card") return;
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
    <section className="h-[100dvh] bg-[#F4F7FE] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      {/* 1. HEADER */}
      <header className="flex-none w-full bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 z-30">
        <div className="max-w-[2000px] mx-auto px-4 md:px-8 py-3 md:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5">
            <BackButton className="scale-90 md:scale-100" />
            <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
              Cashier Dashboard<span className="text-[#FF5C00]">.</span>
            </h1>
          </div>
          <button
            onClick={() => queryClient.invalidateQueries(["tables"])}
            className="p-2 md:p-3 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-[#FF5C00] hover:text-white transition-all active:scale-95"
          >
            <FaSyncAlt className={tablesLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT: TABLE SELECTION */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar pb-32">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Occupied Tables
            </h2>
            <div className="h-[1px] flex-1 mx-6 bg-slate-200 dark:bg-white/5" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {bookedTables.map((table) => {
              const isSelected = selectedTable?._id === table._id;

              return (
                <button
                  key={table._id}
                  onClick={() => setSelectedTable(table)}
                  className={`
          relative group p-5 md:p-7 rounded-[2rem] border-2 transition-all duration-300 text-left
          ${
            isSelected
              ? "border-[#FF5C00] bg-white dark:bg-[#16191D] shadow-[0_20px_40px_-15px_rgba(255,92,0,0.15)] scale-[1.02]"
              : "border-transparent bg-white dark:bg-[#16191D] shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-white/10"
          }
        `}
                >
                  {/* Selection Indicator Dot */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse" />
                  )}

                  <div className="flex flex-col gap-4">
                    <span
                      className={`
              h-10 md:h-12 w-fit px-4 rounded-2xl flex items-center justify-center 
              text-[10px] md:text-xs font-black uppercase italic tracking-widest transition-colors
              ${
                isSelected
                  ? "bg-[#FF5C00] text-white shadow-lg shadow-orange-500/30"
                  : "bg-slate-50 dark:bg-white/5 text-black dark:text-white"
              }
            `}
                    >
                      <span className="opacity-50 not-italic mr-1">Table</span>
                      {table.tableNo}
                    </span>

                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Customer
                      </p>
                      <p
                        className={`text-sm font-black truncate transition-colors ${isSelected ? "text-[#FF5C00]" : "text-slate-700 dark:text-slate-200"}`}
                      >
                        {table.currentOrder?.customerDetails?.name ||
                          "Walk-in Guest"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: BILLING PANEL */}
        <aside className="w-full lg:w-[450px] bg-white dark:bg-[#16191D]/50 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/5 h-[55vh] lg:h-full flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {!selectedTable ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center opacity-30 p-8"
              >
                <FaReceipt size={40} className="mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Select Table
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col p-4 md:p-8 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4 shrink-0">
                  <div className="min-w-0">
                    <p className="text-[9px] font-black text-[#FF5C00] mb-1">
                      BILLING SUMMARY
                    </p>
                    <h3 className="text-xl font-black italic uppercase truncate">
                      {selectedOrder?.customerDetails?.name || "Guest"}
                    </h3>
                  </div>
                  <div className="bg-slate-900 text-white p-3 rounded-2xl text-center">
                    <p className="text-[8px] text-slate-400">TABLE</p>
                    <p className="text-lg font-black italic">
                      Table #{selectedTable.tableNo}
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 mb-4 border-t border-slate-100 dark:border-white/5 pt-4">
                  {selectedOrder?.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <p className="font-bold uppercase tracking-tight">
                        {item.quantity}x {item.name}
                      </p>
                      <p className="font-black">
                        RM {(item.quantity * item.pricePerQuantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Settlement Area with Extra Padding for BottomNav */}
                <div className="mt-auto space-y-4 pb-24 lg:pb-24">
                  <div className="bg-[#1A1D21] dark:bg-black p-4 rounded-[1.5rem] flex items-center justify-between shadow-xl">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      Total Payable
                    </span>
                    <span className="text-2xl font-black text-white italic">
                      <span className="text-[#FF5C00] text-xs mr-1">RM</span>
                      {selectedOrder?.bills?.totalWithTax?.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {["cash", "card", "qr"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`py-3 rounded-xl border text-[9px] font-black transition-all ${
                          paymentMethod === m
                            ? "bg-[#FF5C00] text-white border-transparent"
                            : "bg-slate-50 dark:bg-white/5 border-slate-200 text-slate-400"
                        }`}
                      >
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={cashPaymentMutation.isPending}
                    onClick={() =>
                      cashPaymentMutation.mutate({
                        orderId: selectedOrder._id,
                        tableId: selectedTable._id,
                        amount: selectedOrder.bills.totalWithTax,
                        paymentMethod,
                      })
                    }
                    className="w-full py-4 rounded-2xl bg-[#FF5C00] text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    {cashPaymentMutation.isPending
                      ? "PROCESSING..."
                      : "COMPLETE PAYMENT"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      {/* 3. GLOBAL BOTTOM NAV (Fixed & Safe) */}
      <footer className="fixed bottom-0 left-0 w-full z-[60] bg-white/90 dark:bg-[#0B0E11]/90 backdrop-blur-xl border-t border-slate-100 dark:border-white/5">
        <div className="max-w-md mx-auto h-[80px] flex items-center justify-center px-4">
          <BottomNav />
        </div>
        {/* Home Indicator / iOS Safe Area padding */}
        <div className="h-safe-bottom" />
      </footer>

      {showInvoice && paidOrder && (
        <Invoice orderInfo={paidOrder} setShowInvoice={setShowInvoice} />
      )}
    </section>
  );
};

export default CashierDashboard;
