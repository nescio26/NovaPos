import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-colors duration-500">
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/5 w-full max-w-[440px] rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between px-8 py-7 sm:px-10 border-b border-slate-50 dark:border-white/5 bg-[#F8F9FD]/50 dark:bg-white/5">
          <div>
            <h2 className="text-[#1A1D21] dark:text-white text-lg sm:text-xl font-black uppercase tracking-tighter italic">
              {title}
              <span className="text-[#FF5C00]">.</span>
            </h2>
            <div className="h-1 w-8 bg-[#FF5C00] rounded-full mt-1"></div>
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500 hover:text-white hover:bg-[#FF5C00] hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-90 group"
          >
            <IoClose
              size={22}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-8 sm:p-10 bg-white dark:bg-[#16191D]">{children}</div>

        {/* SUBTLE BRANDING ACCENT */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FF5C00]/5 dark:bg-[#FF5C00]/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Modal;
