import React, { useState } from "react";
import { BiSolidDish } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const BottomNav = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => guestCount < 12 && setGuestCount((prev) => prev + 1);
  const decrement = () => guestCount > 1 && setGuestCount((prev) => prev - 1);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="New Order Registration"
      >
        <div className="flex flex-col gap-5">
          {/* INPUT FIELDS */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                Customer Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="Phone"
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* GUEST SELECTOR - CLEANER VERSION */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              Total Guests
            </label>
            <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700 rounded-lg p-2">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-all text-xl"
              >
                &minus;
              </button>
              <span className="text-white font-semibold text-sm">
                {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
              </span>
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-all text-xl"
              >
                &#43;
              </button>
            </div>
          </div>

          {/* PRIMARY ACTION */}
          <button
            onClick={() => {
              navigate("/tables");
              closeModal();
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-3.5 rounded-lg transition-colors mt-2"
          >
            Confirm & Select Table
          </button>
        </div>
      </Modal>

      {/* NAVIGATION BAR - REDUCED OPACITY & NO GLOW */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex justify-around items-center z-50">
        <NavButton
          icon={<FaHome size={20} />}
          label="Home"
          onClick={() => navigate("/")}
          active
        />
        <NavButton
          icon={<MdOutlineReorder size={20} />}
          label="Orders"
          onClick={() => navigate("/orders")}
        />

        {/* CENTER ACTION - NO GLOW/PULSE */}
        <div className="relative -top-5">
          <button
            onClick={openModal}
            className="bg-indigo-600 text-white p-4 rounded-xl shadow-xl hover:bg-indigo-500 active:scale-95 transition-all"
          >
            <BiSolidDish size={24} />
          </button>
        </div>

        <NavButton
          icon={<MdTableBar size={20} />}
          label="Tables"
          onClick={() => navigate("/tables")}
        />
        <NavButton
          icon={<CiCircleMore size={20} />}
          label="More"
          onClick={() => navigate("/more")}
        />
      </div>
    </>
  );
};

// Internal helper for cleaner code
const NavButton = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 w-16 transition-colors ${active ? "text-indigo-500" : "text-slate-500 hover:text-slate-300"}`}
  >
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-tight">
      {label}
    </span>
  </button>
);

export default BottomNav;
