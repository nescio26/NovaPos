import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP - Deep Blur Effect */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-900/50">
          <h2 className="text-white text-lg font-black uppercase tracking-tighter">
            {title}
            <span className="text-indigo-500">.</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-500 transition-all active:scale-90"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-8">{children}</div>

        {/* DECORATIVE BLUR (Optional) */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Modal;
