import React from "react";
import { getRandomBg } from "../../utils";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ name, status, initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isBooked = status?.toLowerCase() === "booked";

  // Memoize the background to prevent "flickering" colors on re-renders
  const bgColor = React.useMemo(() => getRandomBg(), []);

  const handleClick = (tableName) => {
    if (isBooked) return;
    dispatch(updateTable({ tableNo: tableName }));
    navigate(`/menu`);
  };

  return (
    <div
      onClick={() => handleClick(name)}
      className={`group flex flex-col gap-4 bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/5 p-5 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 w-full shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 ${
        isBooked
          ? "cursor-not-allowed bg-slate-50/50 dark:bg-white/[0.02] grayscale-[0.5]"
          : "cursor-pointer active-press"
      }`}
    >
      {/* HEADER: Table Name & Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1D21] dark:text-white text-lg font-black tracking-tighter uppercase italic leading-none group-hover:text-[#FF5C00] transition-colors">
            {name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <FaUsers
              size={12}
              className={
                isBooked
                  ? "text-slate-300 dark:text-slate-600"
                  : "text-[#FF5C00]/60"
              }
            />
            <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              {seats} Seats
            </span>
          </div>
        </div>

        <span
          className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border transition-all ${
            isBooked
              ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20"
              : "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
          }`}
        >
          {status}
        </span>
      </div>

      {/* CENTER: Visual Identifier (Avatar) */}
      <div className="flex items-center justify-center py-4">
        <div
          className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-white text-2xl font-black shadow-lg transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 border-4 border-white dark:border-[#1c2025] ${
            isBooked ? "bg-slate-200 dark:bg-white/10" : bgColor
          }`}
        >
          {isBooked ? (
            <span className="text-slate-400 dark:text-slate-500 text-xs">
              OCC
            </span>
          ) : (
            initials
          )}
        </div>
      </div>

      {/* FOOTER: Interaction Indicator */}
      <div className="flex flex-col items-center gap-2">
        <p
          className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${
            isBooked
              ? "text-slate-300 dark:text-slate-600"
              : "text-emerald-500 dark:text-emerald-400 group-hover:text-[#FF5C00]"
          }`}
        >
          {isBooked ? "In Service" : "Available Now"}
        </p>

        <div
          className={`h-1 rounded-full transition-all duration-500 ${
            isBooked
              ? "w-8 bg-slate-100 dark:bg-white/5"
              : "w-12 bg-slate-100 dark:bg-white/5 group-hover:w-24 group-hover:bg-[#FF5C00]"
          }`}
        />
      </div>
    </div>
  );
};

export default TableCard;
