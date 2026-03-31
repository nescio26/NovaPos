import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../redux/slices/cartSlice";
import { removeCustomer } from "../redux/slices/customerSlice";
import { enqueueSnackbar } from "notistack";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  const sessionId = searchParams.get("session_id");
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    // Clear cart and customer data after successful payment
    dispatch(clearCart());
    dispatch(removeCustomer());

    // Invalidate tables query to refresh data
    queryClient.invalidateQueries({ queryKey: ["tables"] });

    // Show success message
    enqueueSnackbar("Payment successful! Thank you for your order.", {
      variant: "success",
    });

    // Redirect to tables page after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/tables");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, navigate, queryClient]);

  const handleRedirectNow = () => {
    navigate("/tables");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#16191D] rounded-2xl shadow-xl p-8 text-center border border-slate-100 dark:border-white/5">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-600 dark:text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-[#1A1D21] dark:text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Thank you for your order. Your payment has been processed
          successfully.
        </p>

        <div className="space-y-4">
          {sessionId && (
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Transaction ID: {sessionId.slice(-8)}
              </p>
            </div>
          )}

          <button
            onClick={handleRedirectNow}
            className="w-full bg-[#FF5C00] hover:bg-[#e65300] text-white font-black py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            Go to Tables ({countdown}s)
          </button>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            You will be automatically redirected in {countdown} seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
