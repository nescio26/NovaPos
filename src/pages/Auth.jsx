import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import restaurantImg from "../assets/images/restuarant.png";
import logo from "../assets/images/Logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import LightLogo from "../assets/images/LightLogo.png";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`flex min-h-screen w-full font-sans overflow-hidden transition-colors duration-500 ${darkMode ? "dark bg-[#121417]" : "bg-[#F8FAFC]"}`}
    >
      {/* --- LEFT SECTION: Branding & Visuals --- */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <img
          src={restaurantImg}
          alt="Restaurant Interior"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? "bg-black/75" : "bg-orange-600/20"}`}
        ></div>

        <blockquote className="absolute bottom-20 px-12 text-3xl md:text-5xl font-black italic text-white tracking-tighter uppercase leading-[1.1] z-10">
          “Good food is the <br />
          <span className="text-[#FF5C00]">foundation</span> of <br />
          genuine happiness.”
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[3px] w-14 bg-[#FF5C00]"></div>
            <span className="text-xs not-italic font-black tracking-[0.4em] uppercase text-white/70">
              Auguste Escoffier
            </span>
          </div>
        </blockquote>
      </div>

      {/* --- RIGHT SECTION: Auth Form Container --- */}
      <div
        className={`w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-12 relative transition-colors duration-500`}
      >
        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className={`absolute top-8 right-8 p-3.5 rounded-2xl transition-all active:scale-90 shadow-sm border ${
            darkMode
              ? "bg-[#1f1f1f] border-white/5 text-yellow-400"
              : "bg-white border-slate-200 text-slate-600"
          }`}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* LOGO */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <img
            src={darkMode ? logo : LightLogo}
            alt="NovaPos Logo"
            className="w-20 h-20 object-contain transition-all duration-500"
          />
          <h1
            className={`text-4xl font-black italic tracking-tighter uppercase ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Nova<span className="text-[#FF5C00]">Pos.</span>
          </h1>
        </div>

        {/* Header Text */}
        <div className="text-center mb-10">
          <h2
            className={`text-3xl md:text-4xl font-black tracking-tighter uppercase ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            {isRegister ? (
              <>
                Employee <span className="text-[#FF5C00]">Registration</span>
              </>
            ) : (
              <>
                Employee <span className="text-[#FF5C00]">Login</span>
              </>
            )}
          </h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-3">
            {isRegister
              ? "Create your terminal access credentials"
              : "Enter your credentials to access the terminal"}
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          {isRegister ? (
            <Register darkMode={darkMode} setIsRegister={setIsRegister} />
          ) : (
            <Login darkMode={darkMode} />
          )}
        </div>

        {/* Footer Link */}
        <div className="mt-12">
          <div
            className={`flex items-center gap-3 text-sm font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            <span>
              {isRegister ? "Already have an account?" : "New to the team?"}
            </span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#FF5C00] hover:text-[#e65300] transition-all decoration-2 underline-offset-8 font-black border-b-2 border-[#FF5C00]/30 hover:border-[#FF5C00]"
            >
              {isRegister ? "Sign In" : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
