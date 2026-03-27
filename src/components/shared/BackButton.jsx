import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center justify-center w-12 h-12 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] hover:bg-white dark:hover:bg-white/10 hover:border-[#FF5C00]/20 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 active:scale-90 active-press"
      aria-label="Go Back"
    >
      <IoArrowBackOutline className="text-2xl group-hover:-translate-x-1.5 transition-transform duration-300" />
    </button>
  );
};

export default BackButton;
