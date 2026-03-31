import React from "react";
import { getRandomBg } from "../../utils";
import { FaUsers, FaChair } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import PropTypes from "prop-types";

const TableCard = ({ id, name, status, initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isBooked =
    status?.toLowerCase() === "booked" || status?.toLowerCase() === "occupied";

  const bgColor = React.useMemo(() => getRandomBg(name?.toString()), [name]);

  const handleClick = () => {
    if (isBooked) return;
    const tableData = { tableId: id, tableNo: name };
    dispatch(updateTable({ table: tableData }));
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col gap-4 bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/5 p-5 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 w-full shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 ${
        isBooked
          ? "cursor-not-allowed bg-slate-50/50 dark:bg-white/[0.02] grayscale-[0.2]"
          : "cursor-pointer active-press"
      }`}
    >
      {/* NEW: HIGH VISIBILITY SEAT BADGE */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm transition-colors ${
            isBooked
              ? "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400"
              : "bg-[#FF5C00]/10 border-[#FF5C00]/20 text-[#FF5C00]"
          }`}
        >
          <FaUsers
            size={10}
            className={isBooked ? "opacity-40" : "animate-pulse"}
          />
          <span className="text-[11px] font-black tracking-tight">{seats}</span>
        </div>
      </div>

      {/* HEADER: Table Name */}
      <div className="flex flex-col">
        <h1 className="text-[#1A1D21] dark:text-white text-xl font-black tracking-tighter uppercase italic leading-none group-hover:text-[#FF5C00] transition-colors">
          T-{name}
        </h1>
        <p
          className={`text-[9px] font-black uppercase tracking-[0.2em] mt-1 ${
            isBooked ? "text-rose-500" : "text-emerald-500"
          }`}
        >
          {isBooked ? "Occupied" : "Ready"}
        </p>
      </div>

      {/* CENTER: Visual Identifier */}
      <div className="flex items-center justify-center py-2">
        <div
          className={`w-20 h-20 rounded-[2.2rem] flex flex-col items-center justify-center text-white font-black shadow-lg transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 border-4 border-white dark:border-[#1c2025] ${
            isBooked ? "bg-slate-300 dark:bg-white/10" : bgColor
          }`}
        >
          {isBooked ? (
            <>
              <span
                className={`text-2xl ${initials ? "text-white" : "text-slate-400 dark:text-slate-500"}`}
              >
                {initials ? initials.charAt(0).toUpperCase() : "!!!"}
              </span>
              {initials && (
                <span className="text-[8px] font-black uppercase tracking-wider text-white/70 mt-0.5 px-1 text-center leading-tight truncate w-full">
                  {initials.split(" ")[0]}
                </span>
              )}
            </>
          ) : (
            <span className="text-xl font-black italic">{name}</span>
          )}
        </div>
      </div>

      {/* FOOTER: Interaction Info */}
      <div className="flex flex-col items-center gap-2 mt-auto">
        <div
          className={`h-1 rounded-full transition-all duration-500 ${
            isBooked
              ? "w-8 bg-slate-100 dark:bg-white/5"
              : "w-12 bg-slate-100 dark:bg-white/5 group-hover:w-full group-hover:bg-[#FF5C00]"
          }`}
        />

        <p
          className={`text-[8px] font-black uppercase tracking-[0.3em] text-center truncate w-full ${
            isBooked
              ? "text-slate-400"
              : "text-slate-400 group-hover:text-[#1A1D21] dark:group-hover:text-white"
          }`}
        >
          {isBooked ? "Currently Dining" : "Tap to Open"}
        </p>
      </div>
    </div>
  );
};

TableCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string.isRequired,
  initials: PropTypes.string,
  seats: PropTypes.number.isRequired,
};

export default TableCard;
