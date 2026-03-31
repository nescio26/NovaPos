import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import { FaHome, FaCashRegister } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const closeModal = () => setIsModalOpen(false);
  const increment = () => guestCount < 12 && setGuestCount((prev) => prev + 1);
  const decrement = () => guestCount > 1 && setGuestCount((prev) => prev - 1);

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
    closeModal();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="New Order Registration"
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-5">
            {/* NAME INPUT */}
            <div className="flex flex-col gap-2">
              <label className="text-black dark:text-white text-[13px] font-black uppercase tracking-[0.2em]">
                Customer Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Customer Name"
                required
                className="bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm text-[#1A1D21] dark:text-white font-bold focus:border-orange-500/50 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            {/* PHONE INPUT */}
            <div className="flex flex-col gap-2">
              <label className="text-black dark:text-white text-[13px] font-black uppercase tracking-[0.2em]">
                Contact Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Phone Number"
                required
                className="bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-4 text-sm text-[#1A1D21] dark:text-white font-bold focus:border-orange-500/50 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* GUEST COUNTER */}
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-white text-[13px] font-black uppercase tracking-[0.2em]">
              Total Guests
            </label>
            <div className="flex items-center justify-between bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-2 shadow-inner">
              <button
                onClick={decrement}
                className="w-12 h-12 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#FF5C00] hover:bg-white dark:hover:bg-white/10 rounded-xl transition-all text-2xl font-bold shadow-sm"
              >
                &minus;
              </button>
              <span className="text-[#1A1D21] dark:text-white font-bold text-m tracking-normal">
                {guestCount} {guestCount === 1 ? "GUEST" : "GUESTS"}
              </span>
              <button
                onClick={increment}
                className="w-12 h-12 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#FF5C00] hover:bg-white dark:hover:bg-white/10 rounded-xl transition-all text-2xl font-bold shadow-sm"
              >
                &#43;
              </button>
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            className="w-full bg-[#FF5C00] hover:bg-[#e65300] text-white font-black text-xs uppercase tracking-[0.2em] py-4.5 rounded-[1.5rem] transition-all mt-2 active-press shadow-lg shadow-orange-500/20"
          >
            Confirm & Select Table
          </button>
        </div>
      </Modal>

      {/* FIXED NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/80 dark:bg-[#0B0E11]/80 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 flex justify-around items-center z-50 px-4 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)] transition-colors duration-300">
        <NavButton
          icon={<FaHome size={22} />}
          label="Home"
          onClick={() => navigate("/")}
          active={isActive("/")}
        />
        <NavButton
          icon={<MdOutlineReorder size={22} />}
          label="Orders"
          onClick={() => navigate("/orders")}
          active={isActive("/orders")}
        />

        {/* CENTER ACTION (FAB) */}
        <div className="relative -top-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-5 rounded-[2.2rem] bg-[#FF5C00] text-white shadow-2xl shadow-orange-500/40 active-press border-[6px] border-[#F8F9FD] dark:border-[#0B0E11] transition-all hover:scale-105"
          >
            <BiSolidDish size={28} />
          </button>
        </div>

        <NavButton
          icon={<MdTableBar size={22} />}
          label="Tables"
          onClick={() => navigate("/tables")}
          active={isActive("/tables")}
        />
        <NavButton
          icon={<FaCashRegister size={22} />}
          label="Cashier"
          onClick={() => navigate("/cashier")}
          active={isActive("/cashier")}
        />
      </div>
    </>
  );
};

const NavButton = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 w-16 transition-all duration-300 active:scale-90 ${
      active
        ? "text-[#FF5C00] scale-105"
        : "text-slate-400 dark:text-white hover:text-slate-600 dark:hover:text-slate-400"
    }`}
  >
    <div className={active ? "drop-shadow-[0_4px_8px_rgba(255,92,0,0.2)]" : ""}>
      {icon}
    </div>
    <span
      className={`text-[9px] font-black uppercase tracking-[0.15em] ${
        active ? "opacity-100" : "opacity-50"
      }`}
    >
      {label}
    </span>
    {active && <div className="w-1 h-1 bg-[#FF5C00] rounded-full mt-0.5" />}
  </button>
);

export default BottomNav;
