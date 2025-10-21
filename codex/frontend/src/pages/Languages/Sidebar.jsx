import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@context/ThemeProvider.jsx";
import { AuthContext } from "@context/AuthContext";

export function Sidebar({ title, items }) {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState({});
  const { user } = useContext(AuthContext); // Ambil user dari context
  const token = localStorage.getItem("jwt"); // Atau dari context jika mau

  useEffect(() => {
    // Fetch progress dari backend
    const fetchProgress = async () => {
      if (!token) return;
      try {
        const res = await fetch("https://code-x-pawm-s49d.vercel.app/api/progress", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed fetch progress");
        const data = await res.json();
        setProgress(data);
        console.log("Progress data:", data);
      } catch (err) {
        setProgress({});
      }
    };

    fetchProgress();

    // Refresh progress jika ada event (misal setelah update)
    window.addEventListener("progressUpdate", fetchProgress);
    return () => window.removeEventListener("progressUpdate", fetchProgress);
  }, [token]);

  // Styling untuk link
  const base =
    "block rounded-md px-3 py-2 text-base font-medium transition-colors border border-transparent";
  const inactive =
    isDark
      ? "text-white hover:bg-white/10"
      : "text-black hover:bg-black/10";
  const active =
    isDark
      ? "bg-white text-black"
      : "bg-black text-white";

  return (
      <aside className={`fixed top-[65px] left-0 w-56 h-[calc(100vh-65px)] border-r
        ${isDark ? "bg-black border-white" : "bg-white border-black"}
        flex flex-col`} style={{ fontFamily: '"Mulish", sans-serif' }}>
        <div className="flex flex-col flex-1 px-4 py-4">
          {title && (
            <h3 className={`mb-3 ml-1 text-l font-semibold uppercase tracking-wide
              ${isDark ? "text-white" : "text-black"}`}>{title}</h3>
          )}
          <nav className="flex flex-col gap-1">
          {items.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
              style={{
                position: "relative",
                paddingRight: "28px"
              }}
            >
              {item.label}
              {progress[item.to.replace("/", "")] && (
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#00ff33ff",
                    fontWeight: "bold",
                    fontSize: "1.1em"
                  }}
                >✓</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={`${isDark ? "bg-black" : "bg-white"} flex-1`} />
    </aside>
  );
}