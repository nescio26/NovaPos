import React, { useState } from "react";
import { User, Mail, Lock, Phone, Briefcase } from "lucide-react";

const Register = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    role: "Waiter",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering Employee:", formData);
  };

  const inputContainerStyle = `flex items-center rounded-2xl p-4 px-5 transition-all shadow-inner border ${
    darkMode
      ? "bg-[#1f1f1f] border-white/10 group-focus-within:border-[#FF5C00]/50"
      : "bg-white border-slate-200 group-focus-within:border-[#FF5C00]"
  }`;

  const labelStyle = `block mb-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
    darkMode
      ? "text-[#ababab] group-focus-within:text-[#FF5C00]"
      : "text-slate-500 group-focus-within:text-[#FF5C00]"
  }`;

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="group">
          <label className={labelStyle}>Employee Name</label>
          <div className={inputContainerStyle}>
            <User
              className={`w-4 h-4 mr-3 transition-colors ${darkMode ? "text-slate-500" : "text-slate-400"} group-focus-within:text-[#FF5C00]`}
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Employee Name"
              autoComplete="name"
              className={`bg-transparent flex-1 text-sm focus:outline-none font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="group">
          <label className={labelStyle}>Employee Email</label>
          <div className={inputContainerStyle}>
            <Mail
              className={`w-4 h-4 mr-3 transition-colors ${darkMode ? "text-slate-500" : "text-slate-400"} group-focus-within:text-[#FF5C00]`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Employee Email"
              autoComplete="email"
              className={`bg-transparent flex-1 text-sm focus:outline-none font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
              required
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="group">
          <label className={labelStyle}>Employee Phone No</label>
          <div className={inputContainerStyle}>
            <Phone
              className={`w-4 h-4 mr-3 transition-colors ${darkMode ? "text-slate-500" : "text-slate-400"} group-focus-within:text-[#FF5C00]`}
            />
            <input
              type="number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              autoComplete="tel"
              className={`bg-transparent flex-1 text-sm focus:outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${darkMode ? "text-white" : "text-slate-900"}`}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="group">
          <label className={labelStyle}>Password</label>
          <div className={inputContainerStyle}>
            <Lock
              className={`w-4 h-4 mr-3 transition-colors ${darkMode ? "text-slate-500" : "text-slate-400"} group-focus-within:text-[#FF5C00]`}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              autoComplete="current-password"
              className={`bg-transparent flex-1 text-sm focus:outline-none font-medium tracking-widest ${darkMode ? "text-white" : "text-slate-900"}`}
              required
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-3 h-3 text-[#FF5C00]" />
            <label className={labelStyle}>Choose Your Role</label>
          </div>
          <div className="flex items-center gap-2">
            {["Waiter", "Cashier", "Admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border ${
                  formData.role === r
                    ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-lg shadow-orange-500/20"
                    : darkMode
                      ? "bg-[#1f1f1f] border-white/10 text-slate-500 hover:text-white"
                      : "bg-white border-slate-200 text-slate-500 hover:text-[#FF5C00]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF5C00] hover:bg-[#e65300] text-white py-4.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-500/20 active:scale-95 mt-6"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
