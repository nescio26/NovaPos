import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ darkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (res) => {
      const { data, accessToken } = res.data;
      const { _id, name, email, phone, role } = data;

      // Save token to localStorage — fallback for Safari iOS which blocks
      // cross-origin cookies (ITP). The axios interceptor sends this as
      // Authorization: Bearer <token> on every request.
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      dispatch(setUser({ _id, name, email, phone, role }));
      enqueueSnackbar(`Welcome back, ${name}!`, { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.message || "Login failed", {
        variant: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const inputContainerStyle = `flex items-center rounded-2xl p-4 px-5 transition-all border ${
    darkMode
      ? "bg-[#1f1f1f] border-white/10 group-focus-within:border-[#FF5C00]/50 shadow-inner"
      : "bg-white border-slate-200 group-focus-within:border-[#FF5C00] shadow-sm"
  }`;

  const labelStyle = `block mb-2 text-xs font-black uppercase tracking-[0.15em] transition-colors ${
    darkMode
      ? "text-slate-400 group-focus-within:text-[#FF5C00]"
      : "text-slate-500 group-focus-within:text-[#FF5C00]"
  }`;

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="group">
          <label className={labelStyle}>Employee Email</label>
          <div className={inputContainerStyle}>
            <Mail
              className={`w-5 h-5 mr-3 transition-colors ${darkMode ? "text-slate-500" : "text-slate-400"} group-focus-within:text-[#FF5C00]`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              autoComplete="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter Email"
              className={`bg-transparent flex-1 text-base focus:outline-none font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="group">
          <label className={labelStyle}>Password</label>
          <div className={inputContainerStyle}>
            <Lock
              className={`w-5 h-5 mr-3 transition-colors ${darkMode ? "text-slate-500" : "text-slate-400"} group-focus-within:text-[#FF5C00]`}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              autoComplete="new-password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter Password"
              className={`bg-transparent flex-1 text-base focus:outline-none font-bold tracking-widest ${darkMode ? "text-white" : "text-slate-900"}`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-[#FF5C00] hover:bg-[#e65300] disabled:opacity-70 text-white py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Log In to Terminal"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
