import React from "react";
import { getRandomBg } from "../../utils";

const TableCard = ({ name, status, initials }) => {
  const isBooked = status === "Booked";

  return (
    <div className="group flex flex-col gap-4 bg-slate-300/20 hover:bg-slate-300/40 border border-white/5 p-6 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1 w-full md:w-[350px] shadow-xl">
      {/* HEADER: Table Name & Status */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-bold tracking-tight">{name}</h1>
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
            isBooked
              ? "bg-rose-500/10 text-rose-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {status}
        </span>
      </div>

      {/* AVATAR: The Circle */}
      <div className="flex justify-center pb-4">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg ${getRandomBg()}`}
        >
          {initials}
        </div>
      </div>

      {/* FOOTER: Simple Info */}
      <div className="text-center mt-2">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          {isBooked ? "Occupied" : "Available"}
        </p>
      </div>
    </div>
  );
};

export default TableCard;
