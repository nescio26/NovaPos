import React, { useState } from "react";
import { BiSolidDish, BiPlus } from "react-icons/bi";
import { MdCategory, MdTableBar, MdPayment, MdPeople } from "react-icons/md";

// Component Imports
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import PaymentDetails from "../components/dashboard/PaymentDetails";
import StaffDetails from "../components/dashboard/StaffDetails";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = [
  { id: "Metrics", label: "Metrics", icon: <BiSolidDish /> },
  { id: "Orders", label: "Orders", icon: <MdTableBar /> },
  { id: "Payments", label: "Payments", icon: <MdPayment /> },
  { id: "Staff", label: "Staff", icon: <MdPeople /> },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Metrics");
  const [modalType, setModalType] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "Metrics":
        return <Metrics />;
      case "Orders":
        return <RecentOrders />;
      case "Payments":
        return <PaymentDetails />;
      case "Staff":
        return <StaffDetails />;
      default:
        return <Metrics />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F8F9FD] dark:bg-[#0B0E11] transition-colors duration-300 pb-20">
      <div className="container mx-auto py-8 md:py-14 px-4 sm:px-6 lg:px-10">
        {/* ACTION BUTTONS & TABS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full lg:w-auto">
            {buttons.map(({ label, icon, action }) => (
              <button
                key={action}
                onClick={() => setModalType(action)}
                className="flex items-center justify-center lg:justify-start gap-3 bg-white dark:bg-[#16191D] text-[#1A1D21] dark:text-white py-4 px-6 rounded-2xl font-black uppercase text-[11px] tracking-widest border border-slate-100 dark:border-white/5 shadow-sm hover:border-[#FF5C00] active:scale-95 transition-all group"
              >
                <span className="text-[#FF5C00] text-xl group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-[1.8rem] border border-slate-100 dark:border-white/5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 flex-1 lg:flex-none py-3 px-6 rounded-[1.3rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#FF5C00] text-white shadow-lg shadow-orange-500/20"
                    : "text-slate-400 hover:text-[#FF5C00]"
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="mt-10 lg:mt-14">{renderContent()}</div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </div>
  );
};

export default Dashboard;
