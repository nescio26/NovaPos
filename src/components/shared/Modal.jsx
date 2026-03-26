import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ title, onClose, isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* THE BACKDROP: 
         Changed bg-opacity to 40% and increased blur to 'md' 
         This keeps the background visible but puts the focus on the modal.
      */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div className="relative z-10 bg-slate-900/90 border border-white/10 shadow-2xl w-full max-w-lg rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-xl text-white font-black tracking-tight uppercase italic">
            {title}
            <span className="text-indigo-500">.</span>
          </h2>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all active:scale-90"
            onClick={onClose}
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
