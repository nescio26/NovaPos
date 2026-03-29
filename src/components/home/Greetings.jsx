import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const userData = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
      {/* LEFT: GREETING & STATUS */}
      <div className="space-y-2 sm:space-y-1">
        {/* Added dark:text-white */}
        <h1 className="text-3xl md:text-4xl font-black text-[#1A1D21] dark:text-white tracking-tight">
          {getGreeting()} {userData.name || "N/A"}
          <span className="text-[#FF5C00]">.</span>
        </h1>

        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {/* Updated text-slate colors for dark mode readability */}
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            System Online •{" "}
            <span className="text-slate-600 dark:text-slate-400">
              Terminal 01
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT: ELEGANT CLOCK CARD */}
      {/* Added dark:bg-white/5 and dark:border-white/5 */}
      <div className="w-full sm:w-auto bg-[#F8F9FD] dark:bg-white/5 border border-slate-100 dark:border-white/5 px-6 py-4 rounded-[2.5rem] shadow-sm transition-colors duration-300">
        <div className="flex items-baseline justify-between sm:justify-start gap-2">
          {/* Added dark:text-white */}
          <h2 className="text-4xl font-bold text-[#1A1D21] dark:text-white tabular-nums tracking-wider">
            {formatTime(dateTime).split(" ")[0]}
          </h2>
          <span className="text-3xl font-black text-[#FF5C00] uppercase italic tracking-wider">
            {formatTime(dateTime).split(" ")[1]}
          </span>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[13px] font-bold uppercase tracking-[0.2em] text-right mt-0.5">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
