import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import profileImg from "@assets/profile-picture.jpg";
import "@css/landing.css";

const PYTHON_MODULES = [
  { key: "python", label: "Introduction" },
  { key: "pyIfElse", label: "If-Else" },
  { key: "pyLoops", label: "Loops" },
  { key: "pyArrays", label: "Arrays" },
  { key: "pyFunctions", label: "Functions" },
  { key: "pyExercise", label: "Exercise" }
];

const TOTAL_MODULES = PYTHON_MODULES.length;

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [progress, setProgress] = useState({}); // now object, not number

  // Fetch module progress from backend
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetch("https://code-x-pawm-s49d.vercel.app/api/progress", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setProgress(data))
        .catch(() => setProgress({}));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Progress counting
  const doneCount = PYTHON_MODULES.reduce(
    (acc, mod) => acc + (progress[mod.key] ? 1 : 0),
    0
  );
  const percent = Math.round((doneCount / TOTAL_MODULES) * 100);
  const circleAngle = (doneCount / TOTAL_MODULES) * 360;
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "Mulish, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", padding: "40px 0 0 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Profile Picture */}
        <img
          src={profileImg}
          alt="Profile"
          className="rounded-full border object-cover"
          style={{
            height: "110px",
            width: "110px",
            borderColor: "#fff",
            borderWidth: "2px",
            borderStyle: "solid",
            transition: "all 0.5s",
            marginBottom: "20px",
            boxShadow: "0 0 40px rgba(255,255,255,0.20)",
          }}
          draggable="false"
          onMouseOver={e =>
            (e.currentTarget.style.filter =
              "drop-shadow(2px 2px 1px rgba(255, 126, 185, 0.70)) drop-shadow(-2px -2px 1px rgba(123, 250, 255, 0.70)) drop-shadow(0 0 10px rgba(255,255,255,0.70))"
            )
          }
          onMouseOut={e => (e.currentTarget.style.filter = "none")}
        />

        {/* User Name */}
        <h1
          style={{
            fontFamily: "Mulish, sans-serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            letterSpacing: ".03em",
            textAlign: "center",
            margin: 0,
            background: "linear-gradient(90deg, #ffe29f, #ffaec9, #b5b9ff, #baffc9, #a0e7e5, #ffe29f)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundSize: "200% 100%",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            // optional animation, jika ingin gerak seperti di .title
            animation: "gradasi 3s ease-in-out infinite alternate"
          }}
        >
          {user?.name || "Pengguna"}
        </h1>
        <p style={{ color: "#aaa", marginBottom: "32px", marginTop: "8px", fontSize: "1.09rem" }}>
          {user?.email || ""}
        </p>

        {/* Progress Section */}
        <div style={{
          margin: "32px 0 40px 0",
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "14px",
          padding: "32px 18px 32px 18px",
          boxShadow: "0 0 24px rgba(255,255,255,0.09)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h2 style={{fontWeight: 700, fontSize: "1.3rem", color: "#ffffffff", marginBottom: "18px", letterSpacing: ".04em"}}>Progress Belajar</h2>
          {/* Progress Bar Lingkaran */}
          <div style={{
            position: "relative",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: `conic-gradient(#baffc9 ${circleAngle}deg, #fff ${circleAngle}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 32px rgba(255, 255, 255, 0.53)",
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "86px",
              height: "86px",
              borderRadius: "50%",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{color: "#e0ffe7ff", fontWeight: 700, fontSize: "1.5rem"}}>{percent}%</span>
            </div>
          </div>
          <div style={{marginTop: "8px", color: "#ffffffff", fontWeight: 400, fontSize: "1rem"}}>
            Python
          </div>
          {/* Detail Progress Modul */}
          <div style={{ marginTop: "18px", width: "100%", textAlign: "left", fontSize: "1.05rem", color: "#fff", letterSpacing: ".02em" }}>
            {PYTHON_MODULES.map((mod, i) => {
              const done = progress[mod.key];
              return (
                <div key={mod.key} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}>
                  <span style={{
                    color: done ? "#baffc9" : "#aaa",
                    fontWeight: done ? 700 : 400,
                  }}>
                    {done ? "✓" : "○"}
                  </span>
                  <span style={{ marginLeft: "8px" }}>{mod.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex row gap-12">
          {/* Logout Button */}
          <button
            className="sign-in"
            style={{
              marginTop: "auto",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              fontSize: "1.1rem",
              width: "140px",
              height: "40px",
              borderRadius: "20px",
              marginBottom: "38px",
              boxShadow: "0 0 12px rgba(255,126,185,0.37)",
              cursor: "pointer",
              transition: "all .3s"
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
            <button
            className="sign-in"
            style={{
              marginTop: "auto",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              fontSize: "1.1rem",
              width: "140px",
              height: "40px",
              borderRadius: "20px",
              marginBottom: "38px",
              boxShadow: "0 0 12px rgba(255,126,185,0.37)",
              cursor: "pointer",
              transition: "all .3s"
            }}
            onClick={() => navigate("/")}
          >
            Back
          </button>

        </div>
      </div>
      <footer
        style={{
          width: "100%",
          textAlign: "center",
          padding: "22px 0 16px 0",
          fontFamily: "Mulish, sans-serif",
          color: "#fff",
          fontSize: "12px",
          letterSpacing: "0.03em",
          marginTop: "0px"
        }}
      >
        © {new Date().getFullYear()} CodeX. All rights reserved.
      </footer>
    </div>
  );
};

export default Profile;