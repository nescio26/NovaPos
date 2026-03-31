import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStripeOrder } from "../../https";
import { clearCart } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";

const Bill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const totalQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.pricePerQuantity * item.quantity,
    0,
  );

  const taxRate = 6;
  const taxAmount = (subtotal * taxRate) / 100;
  const finalTotal = subtotal + taxAmount;

  const buildOrderPayload = () => ({
    customerDetails: {
      name: customerData.customerName,
      phone: customerData.customerPhone,
      guests: customerData.guests,
      email: customerData.customerEmail || "",
    },
    tableId: customerData.table?.tableNo,
    items: cartData.map((item) => ({
      name: item.name,
      pricePerQuantity: item.pricePerQuantity,
      quantity: item.quantity,
    })),
    bills: {
      total: subtotal,
      tax: taxAmount,
      totalWithTax: finalTotal,
    },
  });

  const handlePlaceOrder = async () => {
    if (cartData.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" });
      return;
    }
    if (!customerData.table) {
      enqueueSnackbar("Please select a table first", { variant: "warning" });
      return;
    }

    setIsLoading(true);
    try {
      const payload = buildOrderPayload();

      // Only creates order, no payment processing
      const { data } = await createStripeOrder(payload);

      enqueueSnackbar(
        "Order placed successfully! Please proceed to cashier for payment.",
        {
          variant: "success",
        },
      );

      // Clear cart and customer data
      dispatch(clearCart());
      dispatch(removeCustomer());

      // Redirect to tables after 2 seconds
      setTimeout(() => {
        navigate("/tables");
      }, 2000);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.response?.data?.message ||
          "Failed to place order. Please try again.",
        {
          variant: "error",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintReceipt = () => {
    const receiptWindow = window.open("", "_blank", "width=400,height=600");
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Order Confirmation - NovaPos</title>
          <style>
            body { font-family: monospace; padding: 20px; font-size: 13px; }
            h2 { text-align: center; color: #FF5C00; margin-bottom: 4px; }
            p { margin: 2px 0; }
            .divider { border-top: 1px dashed #000; margin: 10px 0; }
            .row { display: flex; justify-content: space-between; }
            .total { font-weight: bold; font-size: 15px; color: #FF5C00; }
            .center { text-align: center; }
          </style>
        </head>
        <body>
          <h2>NovaPos</h2>
          <p class="center">Order Confirmation</p>
          <div class="divider"></div>
          <p>Customer: ${customerData.customerName || "Walk-In"}</p>
          <p>Phone: ${customerData.customerPhone || "-"}</p>
          <p>Table: ${customerData.table?.tableNo || "-"}</p>
          <p>Date: ${new Date().toLocaleString("en-MY")}</p>
          <div class="divider"></div>
          ${cartData
            .map(
              (item) => `
            <div class="row">
              <span>${item.name} x${item.quantity}</span>
              <span>RM ${(item.pricePerQuantity * item.quantity).toFixed(2)}</span>
            </div>`,
            )
            .join("")}
          <div class="divider"></div>
          <div class="row"><span>Subtotal</span><span>RM ${subtotal.toFixed(2)}</span></div>
          <div class="row"><span>SST (6%)</span><span>RM ${taxAmount.toFixed(2)}</span></div>
          <div class="divider"></div>
          <div class="row total"><span>TOTAL</span><span>RM ${finalTotal.toFixed(2)}</span></div>
          <div class="divider"></div>
          <p class="center">Please proceed to cashier for payment</p>
          <p class="center">Thank you for dining with us!</p>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  return (
    <div className="flex flex-col gap-1 bg-white dark:bg-[#16191D] border-t border-slate-100 dark:border-white/5 pt-5 md:pt-6 transition-colors duration-300">
      {/* SUMMARY */}
      <div className="space-y-2.5 md:space-y-3 px-6 md:px-8 mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.15em]">
            Subtotal ({totalQuantity} {totalQuantity === 1 ? "Item" : "Items"})
          </p>
          <h1 className="text-[#1A1D21] dark:text-white text-xs md:text-sm font-black">
            RM {subtotal.toFixed(2)}
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.15em]">
            SST ({taxRate}%)
          </p>
          <h1 className="text-[#1A1D21] dark:text-white text-xs md:text-sm font-black">
            RM {taxAmount.toFixed(2)}
          </h1>
        </div>
      </div>

      {/* TOTAL */}
      <div className="mx-4 md:mx-6 px-5 py-4 md:px-6 md:py-5 rounded-[1.8rem] md:rounded-[2rem] bg-[#1A1D21] dark:bg-black shadow-xl shadow-slate-200 dark:shadow-black/40 flex items-center justify-between border border-transparent dark:border-white/5 transition-all">
        <p className="text-[10px] md:text-[12px] text-white font-black uppercase tracking-[0.2em]">
          Total
        </p>
        <h1 className="text-white text-xl md:text-2xl font-black tracking-tighter leading-none">
          <span className="text-[#FF5C00] text-[10px] md:text-xs mr-1 italic font-black">
            RM
          </span>
          {finalTotal.toFixed(2)}
        </h1>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 px-6 md:px-8 mt-6 md:mt-8 pb-8 md:pb-10">
        <button
          onClick={handlePlaceOrder}
          disabled={cartData.length === 0 || isLoading}
          className="bg-[#FF5C00] hover:bg-[#e65300] disabled:opacity-30 disabled:grayscale py-4 md:py-4.5 rounded-[1.2rem] md:rounded-[1.5rem] text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-orange-500/20 active:scale-95 order-1"
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
        <button
          onClick={handlePrintReceipt}
          disabled={cartData.length === 0}
          className="bg-emerald-200 dark:bg-emerald-500/20 border disabled:grayscale border-emerald-200 dark:border-emerald-500 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 py-4 md:py-4.5 rounded-[1.2rem] md:rounded-[1.5rem] text-emerald-700 dark:text-emerald-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 order-2"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Bill;
