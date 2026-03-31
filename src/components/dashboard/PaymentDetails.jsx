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

  if (isError)
    enqueueSnackbar("Failed to load payment data", { variant: "error" });

  const orders = ordersData?.data || [];
  const paidOrders = orders.filter(
    (order) =>
      order.orderStatus === "Paid" || order.orderStatus === "Completed",
  );

  // Filter logic
  const filteredPayments = useMemo(() => {
    console.log("=== FILTER DEBUG ===");
    console.log("All paid orders:", paidOrders);
    console.log("Current filters:", filters);

    return paidOrders.filter((payment) => {
      console.log(
        `Order ${payment._id.slice(-6)} | method in DB: "${payment.paymentMethod}"`,
      );

      const matchesSearch =
        !filters.search ||
        payment._id?.includes(filters.search) ||
        payment.customerDetails?.name
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        payment.table?.tableNo?.toString().includes(filters.search);

      const matchesMethod =
        filters.method === "all" ||
        payment.paymentMethod?.toLowerCase() === filters.method;

      console.log(
        `  → matchesMethod: ${matchesMethod} (filter="${filters.method}", db="${payment.paymentMethod?.toLowerCase()}")`,
      );

      const paymentDate = new Date(payment.createdAt || payment.orderDate);
      const today = new Date();
      let matchesDate = true;

      if (filters.dateRange === "today")
        matchesDate = paymentDate.toDateString() === today.toDateString();
      else if (filters.dateRange === "week")
        matchesDate =
          paymentDate >= new Date(new Date().setDate(new Date().getDate() - 7));
      else if (filters.dateRange === "month")
        matchesDate =
          paymentDate >=
          new Date(new Date().setMonth(new Date().getMonth() - 1));

      console.log(
        `  → matchesDate: ${matchesDate} (filter="${filters.dateRange}", date="${paymentDate.toDateString()}")`,
      );

      return matchesSearch && matchesMethod && matchesDate;
    });
  }, [paidOrders, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredPayments.reduce(
      (sum, p) => sum + (p.bills?.totalWithTax || 0),
      0,
    );
    const methods = {
      cash: filteredPayments.filter(
        (p) => p.paymentMethod?.toLowerCase() === "cash",
      ).length,
      card: filteredPayments.filter(
        (p) => p.paymentMethod?.toLowerCase() === "card",
      ).length,
      qr: filteredPayments.filter(
        (p) => p.paymentMethod?.toLowerCase() === "qr",
      ).length,
    };
    return {
      total,
      methods,
      avg: filteredPayments.length ? total / filteredPayments.length : 0,
    };
  }, [filteredPayments]);

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Table",
      "Amount",
      "Method",
      "Date",
      "Status",
    ];
    const data = filteredPayments.map((p) => [
      p._id.slice(-6),
      p.customerDetails?.name || "Guest",
      `Table ${p.table?.tableNo || "N/A"}`,
      p.bills?.totalWithTax?.toFixed(2) || "0.00",
      p.paymentMethod || "Cash",
      format(new Date(p.createdAt || p.orderDate), "dd/MM/yyyy hh:mm a"),
      "Completed",
    ]);

    const csv = [headers, ...data].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getMethodInfo = (method) => {
    const map = {
      cash: {
        Icon: FaMoneyBillWave,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-500/10",
      },
      card: {
        Icon: FaCreditCard,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-500/10",
      },
      qr: {
        Icon: FaQrcode,
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-500/10",
      },
    };
    const { Icon, color, bg } = map[method?.toLowerCase()] || {
      Icon: FaMoneyBillWave,
      color: "text-slate-600",
      bg: "bg-slate-100",
    };
    return { icon: <Icon />, color, bg };
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="font-black text-[#1A1D21] dark:text-white text-2xl uppercase italic">
            Payment Details<span className="text-[#FF5C00]">.</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
            Transaction history & analytics
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black bg-white dark:bg-[#16191D] border shadow-sm"
        >
          <FaDownload size={12} /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`RM ${stats.total.toFixed(2)}`}
          icon={<FaChartLine />}
        />
        <StatCard title="Transactions" value={filteredPayments.length} />
        <StatCard title="Average Order" value={`RM ${stats.avg.toFixed(2)}`} />
        <StatCard
          title="Payment Methods"
          value={`${stats.methods.cash} | ${stats.methods.card} | ${stats.methods.qr}`}
          small
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <SearchInput
          value={filters.search}
          onChange={(v) => setFilters({ ...filters, search: v })}
        />
        <FilterSelect
          value={filters.method}
          onChange={(v) => setFilters({ ...filters, method: v })}
          options={[
            { value: "all", label: "All Methods" },
            { value: "cash", label: "Cash" },
            { value: "card", label: "Card" },
            { value: "qr", label: "QR / E-Wallet" },
          ]}
        />
        <FilterSelect
          value={filters.dateRange}
          onChange={(v) => setFilters({ ...filters, dateRange: v })}
          options={[
            { value: "today", label: "Today" },
            { value: "week", label: "Last 7 Days" },
            { value: "month", label: "Last 30 Days" },
            { value: "all", label: "All Time" },
          ]}
        />
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-[#16191D] rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-white/5">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Table",
                  "Amount",
                  "Method",
                  "Date",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left p-4 text-[10px] font-black text-slate-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="text-6xl mb-4">💰</div>
                    <p>No payments found</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => {
                  const method = getMethodInfo(p.paymentMethod);
                  return (
                    <tr
                      key={p._id}
                      className="border-t hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <td className="p-4 text-sm font-mono font-bold">
                        #{p._id.slice(-6)}
                      </td>
                      <td className="p-4 text-sm">
                        {p.customerDetails?.name || "Guest"}
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        Table {p.table?.tableNo || "N/A"}
                      </td>
                      <td className="p-4 text-sm font-bold text-[#FF5C00]">
                        RM {p.bills?.totalWithTax?.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${method.bg} ${method.color}`}
                        >
                          {method.icon} {p.paymentMethod || "Cash"}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-500">
                        {format(
                          new Date(p.createdAt || p.orderDate),
                          "dd/MM/yyyy hh:mm a",
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-600">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const LoadingSpinner = () => (
  <div className="bg-white dark:bg-[#16191D] rounded-2xl p-6 flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5C00]"></div>
  </div>
);

const StatCard = ({ title, value, icon, small }) => (
  <div className="bg-white dark:bg-[#16191D] rounded-2xl p-4 border">
    <div className="flex justify-between mb-2">
      <p className="text-[9px] font-black text-slate-400 uppercase">{title}</p>
      {icon && <span className="text-[#FF5C00]">{icon}</span>}
    </div>
    <p
      className={`font-black text-[#1A1D21] dark:text-white ${small ? "text-sm" : "text-2xl"}`}
    >
      {value}
    </p>
  </div>
);

const SearchInput = ({ value, onChange }) => (
  <div className="flex-1 relative">
    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
    <input
      type="text"
      placeholder="Search by order ID, customer name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#16191D] border rounded-xl text-sm focus:border-[#FF5C00] outline-none"
    />
  </div>
);

const FilterSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-3 bg-white dark:bg-[#16191D] border rounded-xl text-sm focus:border-[#FF5C00] outline-none"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default PaymentDetails;
