import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";

const Login = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", formData);
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
              autoComplete="email"
              placeholder="Enter Employee Email"
              className={`bg-transparent flex-1 text-sm focus:outline-none font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
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

        <button
          type="submit"
          className="w-full bg-[#FF5C00] hover:bg-[#e65300] text-white py-4.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-500/20 active:scale-95 mt-6"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
