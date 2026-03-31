import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getTables } from "../https";
import { enqueueSnackbar } from "notistack";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrder from "../components/home/RecentOrder";
import PopularDishes from "../components/home/PopularDishes";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { HiTrendingUp } from "react-icons/hi";

const Home = () => {
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

  // Show error if any
  if (ordersError || tablesError) {
    enqueueSnackbar("Failed to load dashboard data", { variant: "error" });
  }

  const isLoading = ordersLoading || tablesLoading;

  // Calculate statistics from real data
  const calculateStats = () => {
    const orders = ordersData?.data || [];
    const tables = tablesData || [];

    // Total Revenue (sum of all paid orders)
    const totalRevenue = orders
      .filter(
        (order) =>
          order.orderStatus === "Paid" || order.orderStatus === "Completed",
      )
      .reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0);

    // Active Orders (orders that are not paid/completed)
    const activeOrders = orders.filter(
      (order) =>
        order.orderStatus !== "Paid" && order.orderStatus !== "Completed",
    ).length;

    // Efficiency Score (based on completed vs total orders)
    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (order) =>
        order.orderStatus === "Paid" || order.orderStatus === "Completed",
    ).length;
    const efficiencyScore =
      totalOrders === 0 ? 100 : (completedOrders / totalOrders) * 100;

    return {
      totalRevenue,
      activeOrders,
      efficiencyScore: Math.round(efficiencyScore),
    };
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00]"></div>
        <p className="mt-4 text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8F9FD] dark:bg-[#0B0E11] flex flex-col selection:bg-orange-500/30 overflow-hidden transition-all duration-500">
      <div className="flex flex-1 overflow-hidden justify-center px-4 sm:px-6">
        <div className="w-full max-w-[1440px] space-y-10 overflow-y-auto custom-scrollbar pt-10 pb-32">
          {/* GREETING: Glassmorphism + Gradient Ring */}
          <div className="relative group overflow-hidden bg-white/70 dark:bg-[#16191D]/70 backdrop-blur-xl p-8 sm:p-12 rounded-[3rem] border border-white dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 dark:ring-white/5 transition-all duration-500 hover:shadow-orange-500/5">
            <Greetings />
            {/* Animated Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] group-hover:bg-orange-500/20 transition-all duration-700"></div>
          </div>

          {/* STATS: Real Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MiniCard
              title="Revenue"
              icon={<BsCashCoin className="text-orange-500" />}
              number={`RM ${stats.totalRevenue.toFixed(2)}`}
              trend={`+${((stats.activeOrders / (stats.totalRevenue || 1)) * 100).toFixed(0)}%`}
            />
            <MiniCard
              title="Active Orders"
              icon={<GrInProgress className="text-blue-500" />}
              number={stats.activeOrders}
              trend={stats.activeOrders > 0 ? "Live" : "Idle"}
              footerNum={`${stats.activeOrders} orders in progress`}
            />
            <MiniCard
              title="Efficiency"
              icon={<HiTrendingUp className="text-emerald-500" />}
              number={`${stats.efficiencyScore}%`}
              trend={
                stats.efficiencyScore >= 90
                  ? "Optimal"
                  : stats.efficiencyScore >= 70
                    ? "Good"
                    : "Needs Improvement"
              }
              footerNum={`${stats.efficiencyScore}% completion rate`}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <div className="xl:col-span-7">
              <RecentOrder />
            </div>
            <div className="xl:col-span-5">
              <PopularDishes />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
