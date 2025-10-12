import React, { useState } from "react";

export default function ProgressBar({ percent = 0, width = "80%", isHovered = false }) {
  const normalGradient = "linear-gradient(90deg, #a0e7e5, #baffc9, #f9f7d9, #d0f4de, #a0e7e5)";
  const hoverGradient  = "linear-gradient(90deg, #bdbdbd, #757575, #484848ff, #212121)";
  const normalColor = "white";
  const hoverColor = "black";
  const normalBG = "#bababaff";
  const hoverBg = "#cececeff";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px", width }}>
      {/* Bar */}
      <div style={{
        flex: 1,
        height: "8px",
        borderRadius: "8px",
        background: isHovered ? hoverBg : normalBG,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 1px 8px rgba(0,0,0,0.12)"
      }}>
        <div style={{
          width: `${percent}%`,
          height: "100%",
          background: isHovered ? hoverGradient : normalGradient,
          borderRadius: "8px",
          transition: "width .5s, background .3s"
        }} />
      </div>
      {/* Persen */}
      <span style={{
        fontWeight: 700,
        color: isHovered ? hoverColor : normalColor,
        fontFamily: "Mulish, sans-serif",
        fontSize: "1.1em",
        fontWeight: 200,
        marginLeft: "2px",
        minWidth: "34px",
        textAlign: "right"
      }}>
        {percent}%
      </span>
    </div>
  );
}