import React from "react";
import { getRandomBg } from "../../utils";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TableCard = ({ name, status, initials, seats }) => {
  const navigate = useNavigate();

  const isBooked = status?.toLowerCase() === "booked";

  const bgColor = React.useMemo(() => getRandomBg(), []);

  const handleClick = () => {
    if (isBooked) return;
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      className={`ggroup flex flex-col gap-3 bg-slate-700 hover:bg-slate-700/50 border border-white/10 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 w-full shadow-xl ${
        isBooked ? "cursor-not-allowed opacity-40" : "cursor-pointer"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-slate-100 text-base font-black tracking-tight leading-none">
            {name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <FaUsers size={12} className="text-indigo-400/80" />
            <span className="text-slate-200 text-[11px] font-black uppercase tracking-[0.1em]">
              {seats} Seats
            </span>
          </div>
        </div>

        <span
          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
            isBooked
              ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
              : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
          }`}
        >
          {status}
        </span>
      </div>

      {/* AVATAR */}
      <div className="flex items-center justify-center py-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border-4 border-white/5 ${bgColor}`}
        >
          {initials}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col items-center gap-1.5 mt-2">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] ${
            isBooked ? "text-rose-500/90" : "text-green-300"
          }`}
        >
          {isBooked ? "In Service" : "Available Now"}
        </p>

        <div className="h-1 w-12 rounded-full bg-white/5 group-hover:w-20 group-hover:bg-indigo-500/30 transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default TableCard;
