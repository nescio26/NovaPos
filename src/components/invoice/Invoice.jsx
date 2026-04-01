import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaDownload, FaPrint } from "react-icons/fa6";

const Invoice = ({ orderInfo, setShowInvoice }) => {
  const invoiceRef = useRef(null);

  const handlePrint = () => {
    const printContent = invoiceRef.current.innerHTML;
    const WinPrint = window.open("", "", "width=900,height=650");

    WinPrint.document.write(`
        <html>
          <head>
            <title>Order Receipt - NovaPos</title>
            <style>
              body { 
                font-family: 'Courier New', monospace; 
                padding: 20px; 
                margin: 0;
                background: white;
              }
              .receipt-container { 
                max-width: 400px; 
                margin: 0 auto;
                border: 1px solid #ddd; 
                padding: 20px;
                border-radius: 8px;
              }
              h2 { 
                text-align: center; 
                color: #FF5C00;
                margin-bottom: 5px;
              }
              .divider {
                border-top: 1px dashed #ddd;
                margin: 15px 0;
              }
              .text-center {
                text-align: center;
              }
              .total {
                font-size: 18px;
                font-weight: bold;
                color: #FF5C00;
              }
              .row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
              }
              .bold {
                font-weight: bold;
              }
              @media print {
                body { margin: 0; padding: 0; }
                .receipt-container { border: none; padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              ${printContent}
            </div>
          </body>
        </html>
      `);

    WinPrint.document.close();
    WinPrint.focus();
    setTimeout(() => {
      WinPrint.print();
      WinPrint.close();
    }, 500);
  };

  if (!orderInfo) return null;

  // Format date
  const formatDate = (date) => {
    if (!date) return new Date().toLocaleString("en-MY");
    return new Date(date).toLocaleString("en-MY", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate order number from ID or date
  const orderNumber =
    orderInfo._id?.slice(-6) ||
    Math.floor(new Date(orderInfo.orderDate || Date.now()).getTime() / 1000)
      .toString()
      .slice(-6);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-[#16191D] rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Receipt Content for Printing */}
        <div ref={invoiceRef} className="p-6">
          {/* Success Animation */}
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <FaCheck className="text-white text-2xl" />
              </motion.span>
            </motion.div>
          </div>

          {/* Receipt Header */}
          <h2 className="text-2xl font-black text-center text-[#FF5C00] mb-1">
            NovaPos
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center text-xs mb-4">
            Official Receipt
          </p>
          <div className="divider" />

          {/* Order Info */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Order #:</span>
              <span className="font-mono font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Date:</span>
              <span>
                {formatDate(orderInfo.createdAt || orderInfo.orderDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Table:</span>
              <span className="font-bold">
                Table {orderInfo.table?.tableNo || "N/A"}
              </span>
            </div>
          </div>

          <div className="divider" />

          {/* Customer Details */}
          <div className="space-y-2 text-sm">
            <h3 className="font-bold text-[#1A1D21] dark:text-white mb-2">
              Customer Information
            </h3>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              <span>{orderInfo.customerDetails?.name || "Walk-In"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              <span>{orderInfo.customerDetails?.phone || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Guests:</span>
              <span>{orderInfo.customerDetails?.guests || 1}</span>
            </div>
          </div>

          <div className="divider" />

          {/* Items Ordered */}
          <div>
            <h3 className="font-bold text-[#1A1D21] dark:text-white mb-3">
              Order Items
            </h3>
            <div className="space-y-2">
              {orderInfo.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="font-mono">
                    RM {(item.pricePerQuantity * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Bill Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Subtotal:
              </span>
              <span>RM {orderInfo.bills?.total?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                SST (6%):
              </span>
              <span>RM {orderInfo.bills?.tax?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-[#1A1D21] dark:text-white">TOTAL:</span>
              <span className="text-[#FF5C00]">
                RM {orderInfo.bills?.totalWithTax?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>

          <div className="divider" />

          {/* Payment Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Payment Method:
              </span>
              <span className="font-bold uppercase">
                {orderInfo.paymentMethod === "qr"
                  ? "E-Wallet"
                  : orderInfo.paymentMethod || "Cash"}
              </span>
            </div>
            {orderInfo.paymentMethod === "card" &&
              orderInfo.paymentData?.paymentId && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Transaction ID:
                    </span>
                    <span className="font-mono text-xs">
                      {orderInfo.paymentData.paymentId.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Payment Status:
                    </span>
                    <span className="text-green-600">Paid</span>
                  </div>
                </>
              )}
            {orderInfo.paymentMethod === "cash" && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Amount Paid:
                </span>
                <span>
                  RM {orderInfo.bills?.totalWithTax?.toFixed(2) || "0.00"}
                </span>
              </div>
            )}
            {orderInfo.paymentMethod === "qr" && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Amount Paid:
                </span>
                <span>
                  RM {orderInfo.bills?.totalWithTax?.toFixed(2) || "0.00"}
                </span>
              </div>
            )}
          </div>

          <div className="divider" />

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Thank you for dining with us!
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Please keep this receipt for reference
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3 p-4 border-t border-slate-100 dark:border-white/5">
          <button
            onClick={handlePrint}
            className="flex-1 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-400 font-black py-3 rounded-xl transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
          >
            <FaPrint size={14} />
            Print
          </button>

          <button
            onClick={() => setShowInvoice(false)}
            className="flex-1 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-400 font-black py-3 rounded-xl transition-all active:scale-95 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
