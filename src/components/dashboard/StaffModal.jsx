import React, { useState, useEffect } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiShield,
  FiCheck,
} from "react-icons/fi";

const ROLES = ["admin", "cashier", "kitchen", "manager"];

const StaffModal = ({ mode, user, isLoading, onSubmit, onClose }) => {
  const isEdit = mode === "edit";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "cashier",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        role: user.role || "cashier",
      });
    }
  }, [isEdit, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (isEdit && !payload.password) delete payload.password;
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#1A1D21]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="bg-white dark:bg-[#16191D] rounded-[3.5rem] w-full max-w-xl shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER SECTION */}
        <div className="relative px-10 pt-12 pb-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-[#FF5C00]/10 text-[#FF5C00] mb-4 border border-[#FF5C00]/20">
            <FiUser size={32} />
          </div>

          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1D21] dark:text-white leading-none">
            {isEdit ? "Update Profile" : "New Personnel"}
            <span className="text-[#FF5C00]">.</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-3">
            {isEdit
              ? `ID Reference: ${user?._id?.slice(-8)}`
              : "Configure Access Credentials"}
          </p>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="px-12 pb-12 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Legal Name"
              icon={<FiUser />}
              placeholder="Ahmad Rizal"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
            />
            <InputField
              label="Contact Phone"
              icon={<FiPhone />}
              placeholder="+60..."
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
          </div>

          <InputField
            label="Email Address"
            icon={<FiMail />}
            placeholder="staff@system.com"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            error={errors.email}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label={isEdit ? "Reset Password" : "Password"}
              icon={<FiLock />}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
              error={errors.password}
            />

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
                Access Level
              </label>
              <div className="relative">
                <select
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-[#FF5C00]/50 rounded-2xl text-sm font-bold dark:text-white appearance-none outline-none transition-all"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r.toUpperCase()}
                    </option>
                  ))}
                </select>
                <FiShield className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#1A1D21] dark:hover:text-white transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] py-5 rounded-[1.5rem] bg-[#1A1D21] dark:bg-white text-white dark:text-[#1A1D21] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:bg-[#FF5C00] dark:hover:bg-[#FF5C00] dark:hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                "Syncing..."
              ) : (
                <>
                  <FiCheck strokeWidth={4} />{" "}
                  {isEdit ? "Confirm Changes" : "Initialize Member"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Inner Field
const InputField = ({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="space-y-2 group">
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2 group-focus-within:text-[#FF5C00] transition-colors">
      {icon} {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border ${error ? "border-rose-500" : "border-transparent"} focus:border-[#FF5C00]/50 rounded-2xl text-sm font-bold dark:text-white outline-none transition-all placeholder:text-slate-300 placeholder:font-normal`}
    />
    {error && (
      <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest px-1">
        {error}
      </p>
    )}
  </div>
);

export default StaffModal;
