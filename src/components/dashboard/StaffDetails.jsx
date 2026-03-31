import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import {
  FiSearch,
  FiPhone,
  FiCalendar,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiShield,
  FiActivity,
} from "react-icons/fi";
import { format } from "date-fns";
import { getAllUsers, deleteUser, updateUser } from "../../https";
import StaffModal from "./StaffModal";

const StaffDetails = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ search: "", role: "all" });

  const [modal, setModal] = useState(null);

  //Fetch

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = usersData?.data?.data || [];

  //  Delete mutation

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      enqueueSnackbar("Staff member deleted", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to delete staff",
        { variant: "error" },
      );
    },
  });

  // FIX: update mutation wired up and connected to modal onSubmit
  const updateMutation = useMutation({
    mutationFn: updateUser, // signature: ({ userId, ...data })
    onSuccess: () => {
      enqueueSnackbar("Staff updated successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setModal(null);
    },
    onError: (err) => {
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to update staff",
        { variant: "error" },
      );
    },
  });

  // FIX: add mutation — wire a createUser API call here when backend is ready
  const addMutation = useMutation({
    mutationFn: (data) =>
      fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) return r.json().then((e) => Promise.reject(e));
        return r.json();
      }),
    onSuccess: () => {
      enqueueSnackbar("Staff member added", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setModal(null);
    },
    onError: (err) => {
      enqueueSnackbar(err?.message || "Failed to add staff", {
        variant: "error",
      });
    },
  });

  // ── Filtered list ────────────────────────────────────────────────────────

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !filters.search ||
        user.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.phone?.includes(filters.search);
      const matchesRole =
        filters.role === "all" || user.role?.toLowerCase() === filters.role;
      return matchesSearch && matchesRole;
    });
  }, [users, filters]);

  //  Handlers

  const handleAdd = () => setModal({ mode: "add", user: null });

  const handleEdit = (user) => setModal({ mode: "edit", user });

  // FIX: delete now confirms before firing, and is guarded with isPending
  const handleDelete = (userId, userName) => {
    if (window.confirm(`Delete ${userName}? This cannot be undone.`)) {
      deleteMutation.mutate(userId);
    }
  };

  // FIX: modal submit routes to add or update depending on mode
  const handleModalSubmit = (formData) => {
    if (modal.mode === "edit") {
      updateMutation.mutate({ userId: modal.user._id, ...formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const isModalLoading = updateMutation.isPending || addMutation.isPending;

  //  Render

  if (isLoading) return <LoadingState />;

  return (
    <>
      <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#1A1D21] dark:text-white">
              Personnel<span className="text-[#FF5C00]">.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2 flex items-center gap-2">
              <FiActivity className="text-[#FF5C00]" /> {users.length} Verified
              System Operators
            </p>
          </div>

          {/* FIX: was onClick={()=> ()} — now calls handleAdd */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-3 bg-[#1A1D21] dark:bg-white text-white dark:text-[#1A1D21] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#FF5C00] dark:hover:bg-[#FF5C00] dark:hover:text-white transition-all shadow-2xl shadow-black/10 active:scale-95"
          >
            <FiPlus strokeWidth={3} /> Onboard Staff
          </button>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MiniStat label="Total Seats" value={users.length} />
          <MiniStat
            label="Admins"
            value={users.filter((u) => u.role === "admin").length}
            isHighlight
          />
          <MiniStat
            label="Management"
            value={users.filter((u) => u.role === "manager").length}
          />
          <MiniStat
            label="Service"
            value={users.filter((u) => u.role === "cashier").length}
          />
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col lg:flex-row gap-0 items-center bg-white dark:bg-[#16191D] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden p-1">
          <div className="relative flex-[2] w-full group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF5C00] transition-colors" />
            <input
              type="text"
              placeholder="Search by identity or credentials..."
              value={filters.search}
              className="w-full pl-16 pr-6 py-5 bg-transparent outline-none text-sm font-bold dark:text-white placeholder:text-slate-300 placeholder:font-normal"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div className="h-10 w-[1px] bg-slate-100 dark:bg-white/10 hidden lg:block" />
          <div className="relative flex-1 w-full lg:w-auto">
            <select
              value={filters.role}
              className="w-full bg-transparent border-none outline-none text-[11px] font-semibold uppercase tracking-[0.2em] px-10 py-5 cursor-pointer dark:text-[#FF5C00] appearance-none transition-colors"
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="all">Global Access</option>
              <option value="admin">Administrative</option>
              <option value="manager">Management</option>
              <option value="cashier">Point of Sale</option>
              <option value="kitchen">Kitchen Unit</option>
            </select>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
              <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-current rotate-45" />
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredUsers.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-5xl">👥</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              No staff members found
            </p>
          </div>
        )}

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="group relative bg-white dark:bg-[#16191D] border border-slate-100 dark:border-white/5 rounded-[3rem] p-8 transition-all hover:border-[#FF5C00]/30 hover:shadow-2xl hover:shadow-black/[0.02]"
            >
              {/* Top Row: Avatar & Role */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-[1.8rem] bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:bg-[#FF5C00]/5 transition-all">
                  <span className="text-xl font-black italic text-[#1A1D21] dark:text-white group-hover:text-[#FF5C00]">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <RoleBadge role={user.role} />
              </div>

              {/* Identity */}
              <div className="mb-8">
                <h4 className="text-2xl font-black italic tracking-tighter text-[#1A1D21] dark:text-white uppercase leading-none truncate">
                  {user.name}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 truncate">
                  {user.email}
                </p>
              </div>

              {/* Contact strip */}
              <div className="flex flex-wrap gap-4 py-6 border-y border-slate-50 dark:border-white/5 mb-8">
                <InfoItem
                  icon={<FiPhone size={10} />}
                  label={user.phone || "—"}
                />
                <InfoItem
                  icon={<FiCalendar size={10} />}
                  label={
                    user.createdAt
                      ? format(new Date(user.createdAt), "dd MMM yy")
                      : "—"
                  }
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                {/* FIX: was a dead button with no onClick — now opens edit modal */}
                <button
                  onClick={() => handleEdit(user)}
                  className="flex items-center justify-center gap-2 py-4 bg-[#1A1D21] dark:bg-white/5 text-white dark:text-slate-300 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#FF5C00] dark:hover:bg-white dark:hover:text-[#1A1D21] transition-all"
                >
                  <FiEdit3 size={11} /> Edit
                </button>

                {/* FIX: now confirms + isPending guard */}
                <button
                  onClick={() => handleDelete(user._id, user.name)}
                  disabled={deleteMutation.isPending}
                  className="flex items-center justify-center gap-2 py-4 bg-rose-50 dark:bg-rose-500/5 text-rose-500 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FiTrash2 size={11} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FIX: modal rendered outside the scroll container so it overlays everything */}
      {modal && (
        <StaffModal
          mode={modal.mode}
          user={modal.user}
          isLoading={isModalLoading}
          onSubmit={handleModalSubmit}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const MiniStat = ({ label, value, isHighlight }) => (
  <div
    className={`p-6 rounded-[2.5rem] border transition-all ${
      isHighlight
        ? "bg-[#1A1D21] border-[#1A1D21] dark:bg-white dark:border-white"
        : "bg-white dark:bg-[#16191D] border-slate-100 dark:border-white/5 shadow-sm"
    }`}
  >
    <p
      className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 ${
        isHighlight ? "text-slate-400 dark:text-slate-500" : "text-slate-400"
      }`}
    >
      {label}
    </p>
    <p
      className={`text-3xl font-black italic tracking-tighter ${
        isHighlight
          ? "text-white dark:text-[#1A1D21]"
          : "text-[#1A1D21] dark:text-white"
      }`}
    >
      {value}
    </p>
  </div>
);

const RoleBadge = ({ role }) => {
  const isAdmin = role?.toLowerCase() === "admin";
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-[0.15em] ${
        isAdmin
          ? "bg-[#FF5C00]/10 border-[#FF5C00]/20 text-[#FF5C00]"
          : "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500"
      }`}
    >
      {isAdmin && <FiShield size={10} />}
      {role}
    </div>
  );
};

const InfoItem = ({ icon, label }) => (
  <div className="flex items-center gap-2 text-slate-400">
    <span className="text-[#FF5C00]">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-tighter">
      {label}
    </span>
  </div>
);

const LoadingState = () => (
  <div className="h-96 flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 border-4 border-[#1A1D21] dark:border-white border-t-[#FF5C00] animate-spin rounded-[1rem]" />
    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">
      Initializing Directory
    </p>
  </div>
);

export default StaffDetails;
