import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getTables } from "../../https";
import { enqueueSnackbar } from "notistack";
import { FaArrowUp, FaArrowDown, FaChevronDown } from "react-icons/fa";

const Metrics = () => {
  // Fetch orders data
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await getOrders();
      return res.data;
    },
  });

  // Fetch tables data
  const {
    data: tablesData,
    isLoading: tablesLoading,
    isError: tablesError,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await getTables();
      return res.data.data;
    },
  });

  if (ordersError || tablesError) {
    enqueueSnackbar("Failed to load metrics data", { variant: "error" });
  }

  const isLoading = ordersLoading || tablesLoading;

  // 1. MEMOIZED METRICS CALCULATION
  const metricsData = useMemo(() => {
    if (isLoading || !ordersData) return [];

    const orders = ordersData?.data || [];
    const tables = tablesData || [];

    const totalRevenue = orders
      .filter((o) => ["Paid", "Completed"].includes(o.orderStatus))
      .reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0);

    const activeOrders = orders.filter(
      (o) => !["Paid", "Completed"].includes(o.orderStatus),
    ).length;

    const occupiedTables = tables.filter((t) => t.status === "Booked").length;

    return [
      {
        title: "Total Revenue",
        value: `RM ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        percentage: "+12.5%",
        isIncrease: true,
        color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      },
      {
        title: "Total Orders",
        value: orders.length.toString(),
        percentage: "+8.2%",
        isIncrease: true,
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
      },
      {
        title: "Active Orders",
        value: activeOrders.toString(),
        percentage: "-2.4%",
        isIncrease: false,
        color: "bg-gradient-to-br from-orange-500 to-orange-600",
      },
      {
        title: "Table Occupancy",
        value: `${occupiedTables}/${tables.length || 0}`,
        percentage: "+15.0%",
        isIncrease: true,
        color: "bg-gradient-to-br from-purple-500 to-purple-600",
      },
    ];
  }, [ordersData, tablesData, isLoading]);

  // 2. MEMOIZED ITEM ANALYTICS
  const itemAnalytics = useMemo(() => {
    if (isLoading || !ordersData) return [];

    const orders = ordersData?.data || [];
    const itemMap = new Map();

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const existing = itemMap.get(item.name) || { value: 0 };
        itemMap.set(item.name, {
          title: item.name,
          value: existing.value + item.quantity,
        });
      });
    });

    return Array.from(itemMap.values())
      .sort((a, b) => b.value - a.value)
      .slice(0, 4)
      .map((item) => ({
        ...item,
        percentage: "+ " + (Math.floor(Math.random() * 15) + 5) + "%", // Stable random for demo
      }));
  }, [ordersData, isLoading]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-[2.5rem] p-8 bg-slate-100 dark:bg-white/5 animate-pulse h-36"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4 space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-black text-[#1A1D21] dark:text-white text-3xl uppercase tracking-tighter italic leading-none">
            Business Stats<span className="text-[#FF5C00]">.</span>
          </h2>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">
            Automated Financial Pulse
          </p>
        </div>

        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1A1D21] dark:text-white bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5 active:scale-95 transition-all">
          Operational Period: <span className="text-[#FF5C00]">30 Days</span>
          <FaChevronDown className="text-[10px]" />
        </button>
      </div>

      {/* TOP ROW: GLOBAL METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-[2.5rem] p-8 shadow-2xl border border-white/10 ${metric.color}`}
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-black text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {metric.title}
                </p>
                <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                  {metric.isIncrease ? (
                    <FaArrowUp className="text-[8px] text-white" />
                  ) : (
                    <FaArrowDown className="text-[8px] text-rose-300" />
                  )}
                  <p className="font-black text-[9px] text-white">
                    {metric.percentage}
                  </p>
                </div>
              </div>
              <p className="font-black text-3xl text-white tracking-tighter italic">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM ROW: TOP PRODUCTS */}
      <div>
        <div className="mb-8">
          <h3 className="font-black text-[#1A1D21] dark:text-white text-2xl uppercase tracking-tighter italic">
            Sales Leaders<span className="text-[#FF5C00]">.</span>
          </h3>
          <div className="h-1 w-12 bg-[#FF5C00] mt-2 rounded-full" />
        </div>

        {itemAnalytics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {itemAnalytics.map((item, index) => (
              <div
                key={index}
                className="group rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 bg-white dark:bg-[#16191D] hover:border-[#FF5C00]/40 transition-all duration-500 shadow-xl shadow-black/[0.02]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-2xl group-hover:bg-[#FF5C00]/10 transition-colors">
                    <p className="font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[#FF5C00]">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-black text-[10px]">
                    <FaArrowUp size={8} /> {item.percentage}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="font-black text-4xl text-[#1A1D21] dark:text-white tracking-tighter italic">
                    {item.value}
                  </p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Units Sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#16191D] rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-100 dark:border-white/5">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              No sales data available for items yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metrics;
