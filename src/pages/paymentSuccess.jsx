import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
    setTimeout(() => navigate("/"), 3000);
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-[#F8F9FD] dark:bg-[#0B0E11] gap-6">
      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shadow-xl">
        <span className="text-5xl">✓</span>
      </div>
      <h1 className="text-2xl font-black uppercase italic tracking-tighter text-[#1A1D21] dark:text-white">
        Payment Successful<span className="text-[#FF5C00]">.</span>
      </h1>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
        Redirecting you back in 3 seconds...
      </p>
    </div>
  );
};

export default PaymentSuccess;
