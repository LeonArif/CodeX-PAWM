import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@context/ThemeProvider.jsx";
import { useNavigate } from "react-router-dom";
import logoLight from "@assets/codeX-removebg-preview1.png";
import logoDark from "@assets/codeX-removebg-preview.png";
import profileImg from "@assets/profile-picture.jpg";


export function Navbar({ languageName }) {
  const { theme, isDark, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        fontFamily: '"Mulish", sans-serif',
        height: "65px",
      }}
    >
      <nav
        className={`flex items-center justify-between px-[60px] py-[20px] h-[65px] w-full
          ${isDark ? "bg-black text-white border-b border-white" : "bg-white text-black border-b border-black"}
        `}
        style={{ position: "relative" }}
      >
        {/* Kiri: Logo */}
        <div className="nav-kiri flex items-center justify-start w-[210px] h-[54.8px]">
          <Link to="/">
            <img
              src={isDark ? logoDark : logoLight}
              alt="Logo"
              className="logo h-[60px] w-[60px] rounded-full cursor-pointer transition-all duration-500"
              draggable="false"
              onMouseOver={e =>
                (e.currentTarget.style.filter =
                  "drop-shadow(2px 2px 1px rgba(255, 126, 185, 0.70)) drop-shadow(-2px -2px 1px rgba(123, 250, 255, 0.70)) drop-shadow(0 0 10px rgba(255,255,255,0.70))"
              )}
              onMouseOut={e => (e.currentTarget.style.filter = "none")}
            />
          </Link>
        </div>

        {/* Tengah: Nama Bahasa */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit pointer-events-none select-none">
          <h1 className="text-[20px] font-medium text-center">
            {languageName}
          </h1>
        </div>

        {/* Kanan: Theme switch & Profile */}
        <div className="nav-tulisan flex flex-row items-center">
          {/* Theme Switch */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`cursor-pointer flex items-center justify-center h-[40px] w-[40px] rounded-full border
              ${isDark ? "border-white hover:bg-white hover:text-black transition-all duration-300" : "border-black hover:bg-black hover:text-white transition-all duration-300"}
              transition-all duration-300
            `}
            style={{ fontSize: "1.2rem" }}
          >
            <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          {/* Profile Picture */}
          <img
            src={profileImg}
            alt="Profile"
            className="h-[40px] w-[40px] rounded-full border object-cover cursor-pointer transition-all duration-500"
            style={{
              borderColor: isDark ? "#fff" : "#000",
            }}
            draggable="false"
            onClick={() => navigate("/profile")}
            onMouseOver={e =>
              (e.currentTarget.style.filter =
                "drop-shadow(2px 2px 1px rgba(255, 126, 185, 0.70)) drop-shadow(-2px -2px 1px rgba(123, 250, 255, 0.70)) drop-shadow(0 0 10px rgba(255,255,255,0.70))"
            )}
            onMouseOut={e => (e.currentTarget.style.filter = "none")}
          />
        </div>
      </nav>
    </header>
  );
}