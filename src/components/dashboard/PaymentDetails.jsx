import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../https";
import { enqueueSnackbar } from "notistack";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaQrcode,
  FaSearch,
  FaDownload,
  FaChartLine,
  FaCalendarAlt,
  FaWallet,
  FaChevronDown,
} from "react-icons/fa";
import { format } from "date-fns";

const PaymentDetails = () => {
  const [filters, setFilters] = useState({
    search: "",
    method: "all",
    dateRange: "today",
  });

  const {
    data: ordersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await getOrders();
      return res.data;
    },
  });

  if (isError) {
    enqueueSnackbar("Failed to load payment data", { variant: "error" });
  }

  const orders = ordersData?.data || [];
  const paidOrders = orders.filter(
    (order) =>
      order.orderStatus === "Paid" || order.orderStatus === "Completed",
  );

  const filteredPayments = useMemo(() => {
    return paidOrders.filter((payment) => {
      const paymentMethod = payment.paymentMethod?.toLowerCase() || "cash";
      const matchesSearch =
        !filters.search ||
        payment._id?.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.customerDetails?.name
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        payment.table?.tableNo?.toString().includes(filters.search);

      const matchesMethod =
        filters.method === "all" || paymentMethod === filters.method;

      const paymentDate = new Date(payment.createdAt || payment.orderDate);
      const today = new Date();
      let matchesDate = true;

      if (filters.dateRange === "today") {
        matchesDate = paymentDate.toDateString() === today.toDateString();
      } else if (filters.dateRange === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = paymentDate >= weekAgo;
      } else if (filters.dateRange === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesDate = paymentDate >= monthAgo;
      }

      return matchesSearch && matchesMethod && matchesDate;
    });
  }, [paidOrders, filters]);

  const stats = useMemo(() => {
    const total = filteredPayments.reduce(
      (sum, p) => sum + (p.bills?.totalWithTax || 0),
      0,
    );
    return {
      total,
      count: filteredPayments.length,
      avg: filteredPayments.length ? total / filteredPayments.length : 0,
      methods: {
        cash: filteredPayments.filter(
          (p) => (p.paymentMethod?.toLowerCase() || "cash") === "cash",
        ).length,
        card: filteredPayments.filter(
          (p) => p.paymentMethod?.toLowerCase() === "card",
        ).length,
        qr: filteredPayments.filter(
          (p) => p.paymentMethod?.toLowerCase() === "qr",
        ).length,
      },
    };
  }, [filteredPayments]);

  const getMethodStyle = (method) => {
    const normalized = method?.toLowerCase() || "cash";
    const config = {
      cash: {
        icon: <FaMoneyBillWave />,
        color: "text-emerald-600",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        label: "Cash",
      },
      card: {
        icon: <FaCreditCard />,
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        label: "Card",
      },
      qr: {
        icon: <FaQrcode />,
        color: "text-violet-600",
        bg: "bg-violet-50 dark:bg-violet-500/10",
        label: "E-Wallet",
      },
    };
    return config[normalized] || config.cash;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-none">
            Finance<span className="text-[#FF5C00]">.</span>
          </h1>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Transaction Analytics
          </p>
        </div>
        <button
          onClick={() => {}}
          className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-black tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-slate-200 dark:shadow-none uppercase"
        >
          <FaDownload className="group-hover:translate-y-0.5 transition-transform" />
          Export Report
        </button>
      </header>

      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Gross Revenue"
          value={`RM ${stats.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          icon={<FaChartLine size={20} />}
          isPrimary
        />
        <StatCard
          title="Transaction Count"
          value={stats.count}
          icon={<FaSearch size={18} className="opacity-20" />}
        />
        <StatCard
          title="Average Ticket"
          value={`RM ${stats.avg.toFixed(2)}`}
          icon={<FaWallet size={18} />}
        />
        <div className="bg-white dark:bg-[#16191D] p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Method Breakdown
          </p>
          <div className="space-y-3">
            <ProgressBar
              label="Cash"
              count={stats.methods.cash}
              total={stats.count}
              color="bg-emerald-500"
            />
            <ProgressBar
              label="Card"
              count={stats.methods.card}
              total={stats.count}
              color="bg-blue-500"
            />
            <ProgressBar
              label="QR"
              count={stats.methods.qr}
              total={stats.count}
              color="bg-violet-500"
            />
          </div>
        </div>
      </section>

      {/* --- FILTERS --- */}
      <section className="flex flex-col lg:flex-row gap-4 p-2 bg-slate-100/50 dark:bg-white/5 rounded-[2rem]">
        <div className="relative flex-1 group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF5C00] transition-colors" />
          <input
            type="text"
            placeholder="Filter by Order ID, Customer, or Table..."
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-[#0D0F12] border-none rounded-[1.5rem] text-sm focus:ring-2 focus:ring-[#FF5C00]/20 transition-all shadow-sm"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="flex gap-4 p-1">
          <FilterDropdown
            icon={<FaWallet />}
            value={filters.method}
            onChange={(v) => setFilters({ ...filters, method: v })}
            options={[
              { label: "All Methods", value: "all" },
              { label: "Cash Payment", value: "cash" },
              { label: "Bank Card", value: "card" },
              { label: "E-Wallet", value: "qr" },
            ]}
          />
          <FilterDropdown
            icon={<FaCalendarAlt />}
            value={filters.dateRange}
            onChange={(v) => setFilters({ ...filters, dateRange: v })}
            options={[
              { label: "Today", value: "today" },
              { label: "Last 7 Days", value: "week" },
              { label: "Last 30 Days", value: "month" },
              { label: "Lifetime", value: "all" },
            ]}
          />
        </div>
      </section>

      {/* --- TABLE --- */}
      <section className="bg-white dark:bg-[#16191D] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5">
                {[
                  "Order ID",
                  "Customer Details",
                  "Table",
                  "Amount",
                  "Method",
                  "Date & Time",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-left border-b border-slate-100 dark:border-white/5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {filteredPayments.length === 0 ? (
                <EmptyTableState />
              ) : (
                filteredPayments.map((p) => (
                  <TableRow
                    key={p._id}
                    p={p}
                    style={getMethodStyle(p.paymentMethod)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

/* --- REUSABLE UI COMPONENTS --- */

const TableRow = ({ p, style }) => (
  <tr className="group hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors">
    <td className="p-6">
      <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">
        #{p._id.slice(-6).toUpperCase()}
      </span>
    </td>
    <td className="p-6">
      <p className="text-sm font-black text-slate-800 dark:text-slate-200 line-clamp-1">
        {p.customerDetails?.name || "Guest User"}
      </p>
      <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
        ID: {p._id.slice(0, 8)}
      </p>
    </td>
    <td className="p-6">
      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
        T-{p.table?.tableNo || "00"}
      </span>
    </td>
    <td className="p-6">
      <span className="text-sm font-black text-[#FF5C00]">
        RM {p.bills?.totalWithTax?.toFixed(2)}
      </span>
    </td>
    <td className="p-6">
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${style.bg} ${style.color}`}
      >
        {style.icon} {style.label}
      </span>
    </td>
    <td className="p-6">
      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
        {format(new Date(p.createdAt || p.orderDate), "MMM dd, yyyy")}
      </p>
      <p className="text-[10px] font-medium text-slate-400 uppercase mt-1">
        {format(new Date(p.createdAt || p.orderDate), "hh:mm a")}
      </p>
    </td>
    <td className="p-6">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 w-fit px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
        Success
      </div>
    </td>
  </tr>
);

const StatCard = ({ title, value, icon, isPrimary }) => (
  <div
    className={`p-8 rounded-[2.5rem] border transition-all ${isPrimary ? "bg-slate-900 dark:bg-white border-transparent" : "bg-white dark:bg-[#16191D] border-slate-100 dark:border-white/5 shadow-sm"}`}
  >
    <div
      className={`mb-6 w-10 h-10 rounded-2xl flex items-center justify-center ${isPrimary ? "bg-white/10 dark:bg-slate-900/5 text-[#FF5C00]" : "bg-slate-50 dark:bg-white/5 text-[#FF5C00]"}`}
    >
      {icon}
    </div>
    <p
      className={`text-[10px] font-black uppercase tracking-widest ${isPrimary ? "text-slate-400 dark:text-slate-500" : "text-slate-400"}`}
    >
      {title}
    </p>
    <h3
      className={`text-3xl font-black mt-2 leading-none ${isPrimary ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-white"}`}
    >
      {value}
    </h3>
  </div>
);

const ProgressBar = ({ label, count, total, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-400">{count}</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-1000`}
        style={{ width: `${(count / total) * 100 || 0}%` }}
      />
    </div>
  </div>
);

const FilterDropdown = ({ icon, value, onChange, options }) => (
  <div className="relative group min-w-[160px]">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#FF5C00] transition-colors">
      {icon}
    </div>
    <select
      className="w-full pl-10 pr-10 py-4 bg-white dark:bg-[#0D0F12] border-none rounded-2xl text-xs font-bold appearance-none focus:ring-2 focus:ring-[#FF5C00]/20 cursor-pointer shadow-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] pointer-events-none" />
  </div>
);

const EmptyTableState = () => (
  <tr>
    <td colSpan="7" className="py-32 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 dark:bg-white/5 mb-6">
        <FaWallet className="text-slate-200 dark:text-white/10" size={32} />
      </div>
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
        No Transactions Found
      </h3>
      <p className="text-xs text-slate-400 mt-2">
        Adjust your filters to see more results
      </p>
    </td>
  </tr>
);

const LoadingSpinner = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center space-y-6">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-[6px] border-[#FF5C00]/10 rounded-full" />
      <div className="absolute inset-0 border-[6px] border-[#FF5C00] border-t-transparent rounded-full animate-spin" />
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">
      Initializing Dashboard
    </p>
  </div>
);

export default PaymentDetails;
