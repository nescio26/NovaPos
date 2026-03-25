import React, { useEffect, useState } from "react";

const Greetings = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-2">
      {/* LEFT - PERSONALIZED MESSAGE */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter transition-all">
          {getGreeting()}
          <span className="text-indigo-500">.</span>
        </h1>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.1em]">
            System Online <span className="mx-1 text-slate-600">•</span> Ready
            for orders
          </p>
        </div>
      </div>

      {/* RIGHT - DYNAMIC CLOCK */}
      <div className="mt-4 md:mt-0 md:text-right bg-white/5 border border-white/5 px-5 py-3 rounded-2xl backdrop-blur-sm">
        <div className="flex items-baseline md:justify-end gap-2">
          <h2 className="text-3xl font-mono font-bold text-white tabular-nums tracking-tight">
            {formatTime(dateTime).split(" ")[0]}
          </h2>
          <span className="text-s font-black text-indigo-400 uppercase">
            {formatTime(dateTime).split(" ")[1]}
          </span>
        </div>
        <p className="text-slate-500 text-[20px] font-black uppercase tracking-[0.2em] mt-1">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
