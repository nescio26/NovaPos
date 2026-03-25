import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center justify-center w-12 h-12 bg-slate-800/40 backdrop-blur-md border border-white rounded-2xl text-slate-400 hover:text-white hover:bg-indigo-700/60 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 active:scale-95"
      aria-label="Go Back"
    >
      <IoArrowBackOutline className="text-xl group-hover:-translate-x-1 transition-transform" />
    </button>
  );
};

export default BackButton;
