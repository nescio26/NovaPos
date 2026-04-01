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
import { FaSyncAlt, FaReceipt, FaTimes } from "react-icons/fa"; // Added FaTimes

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
    onError: () => enqueueSnackbar("Payment failed", { variant: "error" }),
  });

  return (
    <section className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col text-[#1A1D21] dark:text-white transition-colors duration-500 overflow-hidden relative">
      {/* 1. HEADER */}
      <header className="flex-none w-full bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 sticky top-0 z-30">
        <div className="max-w-[2000px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5">
            <BackButton className="scale-90 md:scale-100" />
            <h1 className="text-xl md:text-3xl font-black uppercase italic italic tracking-tighter">
              Cashier<span className="text-[#FF5C00]">.</span>
            </h1>
          </div>
          <button
            onClick={() => queryClient.invalidateQueries(["tables"])}
            className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl hover:text-[#FF5C00] transition-all active:scale-95 border border-slate-100 dark:border-white/5"
          >
            <FaSyncAlt
              className={tablesLoading ? "animate-spin" : ""}
              size={18}
            />
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row relative">
        {/* LEFT: TABLE SELECTION */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar pb-32">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
            Occupied Tables
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {bookedTables.map((table) => (
              <button
                key={table._id}
                onClick={() => setSelectedTable(table)}
                className={`p-5 md:p-7 rounded-[2.5rem] border-2 transition-all duration-300 text-left ${
                  selectedTable?._id === table._id
                    ? "border-[#FF5C00] bg-white dark:bg-[#16191D] shadow-2xl scale-[1.02]"
                    : "border-transparent bg-white dark:bg-[#16191D] shadow-sm hover:border-slate-200 dark:hover:border-white/10"
                }`}
              >
                <div className="flex flex-col gap-4">
                  <span
                    className={`h-10 w-fit px-5 rounded-2xl flex items-center justify-center text-[11px] font-black uppercase italic tracking-widest ${
                      selectedTable?._id === table._id
                        ? "bg-[#FF5C00] text-white"
                        : "bg-slate-50 dark:bg-white/5"
                    }`}
                  >
                    T-{table.tableNo}
                  </span>
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 mb-1">
                      Customer
                    </p>
                    <p className="text-sm font-black truncate">
                      {table.currentOrder?.customerDetails?.name || "Walk-in"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: BILLING PANEL (Responsive Modal/Sidebar) */}
        <AnimatePresence>
          {selectedTable && (
            <motion.aside
              initial={{ y: "100%", opacity: 0 }} // Mobile: Slide from bottom
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 lg:relative lg:inset-auto lg:translate-y-0 w-full lg:w-[450px] bg-white dark:bg-[#0B0E11] lg:bg-white/50 backdrop-blur-3xl border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-white/5 flex flex-col z-[60] lg:z-10"
            >
              <div className="h-full flex flex-col p-6 md:p-8 overflow-hidden relative">
                {/* CLOSE BUTTON (Visible on Mobile Only) */}
                <button
                  onClick={() => setSelectedTable(null)}
                  className="lg:hidden absolute top-6 right-6 p-3 bg-slate-100 dark:bg-white/10 rounded-full text-slate-500 active:scale-90 transition-all"
                >
                  <FaTimes size={20} />
                </button>

                <div className="mb-6">
                  <p className="text-[10px] font-black text-[#FF5C00] uppercase mb-1">
                    Billing Summary
                  </p>
                  <h3 className="text-2xl font-black italic uppercase">
                    Table #{selectedTable.tableNo}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    {selectedOrder?.customerDetails?.name || "Walk-in Guest"}
                  </p>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-6 border-y border-slate-100 dark:border-white/5 py-6">
                  {selectedOrder?.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-slate-50 dark:bg-white/5 p-4 rounded-2xl"
                    >
                      <p className="text-xs font-black uppercase">
                        {item.quantity}x {item.name}
                      </p>
                      <p className="text-xs font-black">
                        RM {(item.quantity * item.pricePerQuantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals & Payment */}
                <div className="mt-auto space-y-4 pb-10 lg:pb-32">
                  <div className="bg-[#1A1D21] dark:bg-black p-6 rounded-[2rem] flex items-center justify-between text-white shadow-2xl">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      Total Payable
                    </span>
                    <h2 className="text-2xl font-black italic">
                      <span className="text-[#FF5C00] text-xs mr-1">RM</span>
                      {selectedOrder?.bills?.totalWithTax?.toFixed(2)}
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["cash", "card", "qr"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`py-4 rounded-2xl border text-[10px] font-black uppercase transition-all ${
                          paymentMethod === m
                            ? "bg-[#FF5C00] text-white border-transparent"
                            : "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400"
                        }`}
                      >
                        {m}
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
                    className="w-full py-5 rounded-[1.8rem] bg-[#FF5C00] text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 disabled:opacity-50"
                  >
                    {cashPaymentMutation.isPending
                      ? "Processing..."
                      : "Complete Payment"}
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />

      {/* INVOICE MODAL */}
      <AnimatePresence>
        {showInvoice && paidOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setShowInvoice(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#16191D] rounded-[3rem] shadow-2xl overflow-hidden border border-white/5"
            >
              <Invoice orderInfo={paidOrder} setShowInvoice={setShowInvoice} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CashierDashboard;
