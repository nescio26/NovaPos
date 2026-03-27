import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
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

  // const openModal = () => setIsModalOpen(true);
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
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                Customer Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Phone"
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

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

          <button
            onClick={handleCreateOrder}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-3.5 rounded-lg transition-colors mt-2 active-press"
          >
            Confirm & Select Table
          </button>
        </div>
      </Modal>

      {/* FIXED NAVIGATION BAR */}
      {/* Changed 'relative' to 'fixed bottom-0 left-0 right-0' */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around items-center z-50 px-4 pb-safe">
        <NavButton
          icon={<FaHome size={20} />}
          label="Home"
          onClick={() => navigate("/")}
          active={isActive("/")}
        />
        <NavButton
          icon={<MdOutlineReorder size={20} />}
          label="Orders"
          onClick={() => navigate("/orders")}
          active={isActive("/orders")}
        />

        {/* CENTER ACTION */}
        <div className="relative -top-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-5 rounded-[2rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 active-press border-4 border-[#0F172A]"
          >
            <BiSolidDish size={26} />
          </button>
        </div>

        <NavButton
          icon={<MdTableBar size={20} />}
          label="Tables"
          onClick={() => navigate("/tables")}
          active={isActive("/tables")}
        />
        <NavButton
          icon={<CiCircleMore size={20} />}
          label="More"
          onClick={() => navigate("/more")}
          active={isActive("/more")}
        />
      </div>
    </>
  );
};

const NavButton = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 active:scale-90 ${
      active
        ? "text-indigo-400 scale-110"
        : "text-slate-500 hover:text-slate-300"
    }`}
  >
    <div
      className={active ? "drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" : ""}
    >
      {icon}
    </div>
    <span
      className={`text-[9px] font-black uppercase tracking-widest ${active ? "opacity-100" : "opacity-60"}`}
    >
      {label}
    </span>
    {active && (
      <div className="w-1 h-1 bg-indigo-400 rounded-full mt-0.5 animate-pulse" />
    )}
  </button>
);

export default BottomNav;
