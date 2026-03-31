import React, { useState } from "react";
import { User, Mail, Lock, Phone, Briefcase, Loader2 } from "lucide-react";
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Register = ({ darkMode, setIsRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Waiter",
  });

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: () => {
      enqueueSnackbar("Employee Registered Successfully!", {
        variant: "success",
      });
      setTimeout(() => setIsRegister(false), 1500);
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.message || "Registration failed", {
        variant: "error",
      });
    },
  });

  const labelStyle = `block mb-2 text-xs font-black uppercase tracking-[0.15em] transition-colors ${
    darkMode
      ? "text-slate-400 group-focus-within:text-[#FF5C00]"
      : "text-slate-500 group-focus-within:text-[#FF5C00]"
  }`;

  const inputContainerStyle = `flex items-center rounded-2xl p-4 px-5 transition-all border ${
    darkMode
      ? "bg-[#1f1f1f] border-white/10 group-focus-within:border-[#FF5C00]/50"
      : "bg-white border-slate-200 group-focus-within:border-[#FF5C00]"
  }`;

  return (
    <div className="w-full">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          registerMutation.mutate(formData);
        }}
      >
        {/* Name */}
        <div className="group">
          <label className={labelStyle}>Full Name</label>
          <div className={inputContainerStyle}>
            <User className="w-5 h-5 mr-3 text-slate-400 group-focus-within:text-[#FF5C00]" />
            <input
              type="text"
              name="name"
              autoComplete="name"
              className={`bg-transparent flex-1 text-base focus:outline-none font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              placeholder="Ahmad Ali"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label className={labelStyle}>Email Address</label>
          <div className={inputContainerStyle}>
            <Mail className="w-5 h-5 mr-3 text-slate-400 group-focus-within:text-[#FF5C00]" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              className={`bg-transparent flex-1 text-base focus:outline-none font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              placeholder="ahmad@restaurant.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="group">
          <label className={labelStyle}>Phone Number</label>
          <div className={inputContainerStyle}>
            <Phone className="w-5 h-5 mr-3 text-slate-400 group-focus-within:text-[#FF5C00]" />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              className={`bg-transparent flex-1 text-base focus:outline-none font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              placeholder="0123456789"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="group">
          <label className={labelStyle}>Password</label>
          <div className={inputContainerStyle}>
            <Lock className="w-5 h-5 mr-3 text-slate-400 group-focus-within:text-[#FF5C00]" />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className={`bg-transparent flex-1 text-base focus:outline-none font-bold tracking-widest ${darkMode ? "text-white" : "text-slate-900"}`}
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="pt-2">
          <label className={labelStyle}>Assign Role</label>
          <div className="grid grid-cols-4 gap-3">
            {["Waiter", "Cashier", "Admin", "Kitchen Staff"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`py-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${
                  formData.role === r
                    ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-lg shadow-orange-500/20"
                    : darkMode
                      ? "bg-[#1f1f1f] border-white/10 text-slate-500"
                      : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-[#FF5C00] hover:bg-[#e65300] text-white py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-orange-500/20 active:scale-95 mt-4 flex items-center justify-center gap-2"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Register Employee"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
