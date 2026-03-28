import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import restaurantImg from "../assets/images/restuarant.png";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import LightLogo from "../assets/images/LightLogo.png";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle theme class on the wrapper
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`${darkMode ? "dark" : "light"} flex min-h-screen w-full font-sans overflow-hidden transition-colors duration-500`}
    >
      {/* --- LEFT SECTION: Branding & Visuals --- */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <img
          src={restaurantImg}
          alt="Restaurant Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay adjusts based on theme */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? "bg-black/75" : "bg-orange-600/20"}`}
        ></div>

        <blockquote className="absolute bottom-20 px-12 text-3xl md:text-4xl font-black italic text-white tracking-tighter uppercase leading-tight z-10">
          “Good food is the <br />
          <span className="text-[#FF5C00]">foundation</span> of <br />
          genuine happiness.”
          <div className="mt-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#FF5C00]"></div>
            <span className="text-sm not-italic font-black tracking-[0.3em] uppercase text-white/80">
              Auguste Escoffier
            </span>
          </div>
        </blockquote>
      </div>

      {/* --- RIGHT SECTION: Auth Form Container --- */}
      <div
        className={`w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-12 relative transition-colors duration-500 ${darkMode ? "bg-[#121417]" : "bg-[#F8FAFC]"}`}
      >
        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className={`absolute top-10 right-10 p-3 rounded-2xl transition-all active:scale-95 shadow-sm border ${
            darkMode
              ? "bg-[#1f1f1f] border-white/5 text-yellow-400"
              : "bg-white border-slate-200 text-slate-600"
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* LOGO */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <img
            src={darkMode ? logo : LightLogo} // Dynamic Logo Switch
            alt="NovaPos Logo"
            className="w-16 h-16 object-contain transition-all duration-500"
          />
          <h1
            className={`text-3xl font-black italic tracking-tighter uppercase ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Nova<span className="text-[#FF5C00]">Pos.</span>
          </h1>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
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
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            {isRegister
              ? "Create your terminal access credentials"
              : "Enter your credentials to access the terminal"}
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          {/* Pass darkMode prop to children to adjust their internal styles */}
          {isRegister ? (
            <Register darkMode={darkMode} />
          ) : (
            <Login darkMode={darkMode} />
          )}
        </div>

        {/* Footer Link */}
        <div className="flex flex-col items-center gap-2 mt-8">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <span>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account yet?"}
            </span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#FF5C00] hover:underline decoration-2 underline-offset-4 font-black"
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
