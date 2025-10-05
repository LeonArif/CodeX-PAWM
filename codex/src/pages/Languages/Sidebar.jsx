import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@context/ThemeProvider.jsx";

export function Sidebar({ title, items }) {
  const { isDark } = useTheme();

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

  // Height full, flex column, items di atas, sisa bawah auto penuh
  return (
    <aside
      className={`fixed top-[65px] left-0 w-56 h-[calc(100vh-65px)] border-r
        ${isDark ? "bg-black border-white" : "bg-white border-black"}
        flex flex-col`}
      style={{ fontFamily: '"Mulish", sans-serif' }}
    >
      <div className="flex flex-col flex-1 px-4 py-4">
        {title && (
          <h3 className={`mb-3 ml-1 text-l font-semibold uppercase tracking-wide
            ${isDark ? "text-white" : "text-black"}
          `}>
            {title}
          </h3>
        )}
        <nav className="flex flex-col gap-1">
          {items.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Bawah Sidebar: full fill area */}
      <div className={`${isDark ? "bg-black" : "bg-white"} flex-1`} />
    </aside>
  );
}