import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { PythonRunner } from "./PythonRunner";
import { useTheme } from "@context/ThemeProvider.jsx";

export default function PythonHome() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const sidebarItems = [
    { to: "/python", label: "Introduction" },
    { to: "/pyIfElse", label: "Python If-Else" },
    { to: "/pyLoops", label: "Python Loops" },
    { to: "/pyArrays", label: "Python Arrays" },
    { to: "/pyFunctions", label: "Python Functions" },
    { to: "/pyExercise", label: "Python Exercise" }
  ];

  // Dynamic color palette
  const bgBase = isDark ? "bg-[#000]" : "bg-[#fff]";
  const textBase = isDark ? "text-white" : "text-[#18181b]";
  const runnerBg = isDark ? "bg-[#232327]" : "bg-[#e4e4e7]";
  const runnerBorder = isDark ? "border-[#232327]" : "border-[#e4e4e7]";
  const headingColor = isDark ? "text-white" : "text-[#18181b]";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      if (scrollPosition >= fullHeight - 10) {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        // Agar tidak double POST, pakai sessionStorage
        if (!sessionStorage.getItem("pythonIntroDone")) {
          fetch("https://code-x-pawm-s49d.vercel.app/api/progress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ modules: { python: true } })
          }).then(() => {
            window.dispatchEvent(new Event("progressUpdate"));
            sessionStorage.setItem("pythonIntroDone", "1");
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen ${bgBase} ${textBase} antialiased transition-colors duration-300`}
      style={{ fontFamily: '"Mulish", sans-serif' }}
    >
      <Navbar languageName="Python" />
      <Sidebar title="Python Tutorial" items={sidebarItems} />

      <main className="ml-56 mt-[65px] px-8 pb-24 pt-8 max-w-3xl">
        <section>
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>
            Welcome to Python Programming
          </h1>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>What is Python?</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Python is a popular, easy-to-learn programming language known for its readability and versatility.
            It is widely used for web development, data science, automation, artificial intelligence, and more.
            Python was created by Guido van Rossum and first released in 1991.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Why Learn Python?</h2>
          <ul className="mb-4 ml-5 list-disc text-base leading-loose">
            <li><span className="font-semibold">Easy to Read:</span> Clean syntax.</li>
            <li><span className="font-semibold">Versatile:</span> Web, data, AI, automation.</li>
            <li><span className="font-semibold">Large Community:</span> Banyak library.</li>
            <li><span className="font-semibold">In-Demand:</span> Dicari industri.</li>
          </ul>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>What Will You Learn?</h2>
          <ul className="mb-4 ml-5 list-disc text-base leading-loose">
            <li>Basic syntax</li>
            <li>Variables &amp; data types</li>
            <li>If-Else &amp; loops</li>
            <li>Lists &amp; functions</li>
          </ul>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Try Python Now!</h2>
            <PythonRunner
              initialCode={`print("Hello, Python!")`}
              label="Try your first Python code:"
            />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Ready to Start?</h2>
          <button
            onClick={() => navigate("/pyIfElse")}
            className={`mt-2 rounded-full px-6 py-2 text-base font-semibold shadow cursor-pointer
              ${isDark ? "bg-white text-[#18181b] hover:bg-[#e4e4e7]" : "bg-[#18181b] text-white hover:bg-[#232327]"}
              transition-all duration-300 active:translate-y-px`}
          >
            Start Python If-Else Tutorial
          </button>
        </section>
      </main>
    </div>
  );
}