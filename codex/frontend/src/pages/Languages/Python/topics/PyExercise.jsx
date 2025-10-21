import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@pages/Languages/Navbar";
import { Sidebar } from "@pages/Languages/Sidebar";
import { PythonCodeChecker } from "@pages/Languages/Python/PythonCodeChecker";
import { useTheme } from "@context/ThemeProvider.jsx";

export default function PyExercise() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Track status setiap soal
  const [solved, setSolved] = useState([false, false, false, false]);

  // Cek jika semua soal sudah solved
  React.useEffect(() => {
    if (solved.every(Boolean)) {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      // Agar tidak double POST, pakai sessionStorage
      if (!sessionStorage.getItem("pyExerciseDone")) {
        fetch("https://code-x-pawm-s49d.vercel.app/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ modules: { pyExercise: true } })
        }).then(() => {
          window.dispatchEvent(new Event("progressUpdate"));
          sessionStorage.setItem("pyExerciseDone", "1");
        });
      }
    }
  }, [solved]);

  const bgBase = isDark ? "bg-[#000]" : "bg-[#fff]";
  const textBase = isDark ? "text-white" : "text-[#18181b]";
  const headingColor = isDark ? "text-white" : "text-[#18181b]";

  const sidebarItems = [
    { to: "/python", label: "Introduction" },
    { to: "/pyIfElse", label: "Python If-Else" },
    { to: "/pyLoops", label: "Python Loops" },
    { to: "/pyArrays", label: "Python Arrays" },
    { to: "/pyFunctions", label: "Python Functions" },
    { to: "/pyExercise", label: "Python Exercise" }
  ];

  // Handler dipanggil dari PythonCodeChecker jika soal selesai
  const handleSolved = idx => {
    setSolved(s => {
      if (s[idx]) return s; // sudah solved
      const updated = [...s];
      updated[idx] = true;
      return updated;
    });
  };

  return (
    <div className={`min-h-screen ${bgBase} ${textBase} antialiased transition-colors duration-300`} style={{ fontFamily: '"Mulish", sans-serif' }}>
      <Navbar languageName="Python" />
      <Sidebar title="Python Tutorial" items={sidebarItems} />

      <main className="ml-56 mt-[65px] px-8 pb-24 pt-8 max-w-3xl">
        <section>
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>Python Coding Exercises</h1>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>
            Exercise 1: If-Else Condition
            {solved[0] && <span style={{ color: "#baffc9", marginLeft: "12px", fontWeight: "bold", fontSize: "1.2em" }}>✓</span>}
          </h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            <b>Instruction:</b> Write a function <i>solve(n)</i> that returns "Positive" if <i>n</i> is greater than 0, "Zero" if <i>n</i> is 0, and "Negative" if <i>n</i> is less than 0.
          </p>
          <PythonCodeChecker
            initialCode={`def solve(n):\n    # Your code here\n    pass`}
            label="Implement solve(n):"
            testcases={[
              {input: "7", expected: "Positive"},
              {input: "0", expected: "Zero"},
              {input: "-5", expected: "Negative"}
            ]}
            onSolved={() => handleSolved(0)}
            storageKey="exerciseCode-0"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>
            Exercise 2: Loop (Sum 1 to n)
            {solved[1] && <span style={{ color: "#baffc9", marginLeft: "12px", fontWeight: "bold", fontSize: "1.2em" }}>✓</span>}
          </h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            <b>Instruction:</b> Write a function <i>solve(n)</i> that returns the sum of all integers from 1 to <i>n</i> (inclusive).
          </p>
          <PythonCodeChecker
            initialCode={`def solve(n):\n    # Your code here\n    pass`}
            label="Implement solve(n):"
            testcases={[
              {input: "3", expected: "6"},
              {input: "5", expected: "15"},
              {input: "1", expected: "1"}
            ]}
            onSolved={() => handleSolved(1)}
            storageKey="exerciseCode-1"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>
            Exercise 3: Array/List (Sum Elements)
            {solved[2] && <span style={{ color: "#baffc9", marginLeft: "12px", fontWeight: "bold", fontSize: "1.2em" }}>✓</span>}
          </h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            <b>Instruction:</b> Write a function <i>solve(lst)</i> that returns the sum of all elements in the list <i>lst</i>. The input is a Python list.
          </p>
          <PythonCodeChecker
            initialCode={`def solve(lst):\n    # Your code here\n    pass`}
            label="Implement solve(lst):"
            testcases={[
              {input: "[1,2,3]", expected: "6"},
              {input: "[5,5,5,5]", expected: "20"},
              {input: "[]", expected: "0"}
            ]}
            onSolved={() => handleSolved(2)}
            storageKey="exerciseCode-2"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>
            Exercise 4: Function (GCD)
            {solved[3] && <span style={{ color: "#baffc9", marginLeft: "12px", fontWeight: "bold", fontSize: "1.2em" }}>✓</span>}
          </h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            <b>Instruction:</b> Write a function <i>solve(a_b)</i> that receives a tuple <i>(a, b)</i> and returns the greatest common divisor (GCD) of <i>a</i> and <i>b</i>.
          </p>
          <PythonCodeChecker
            initialCode={`def solve(a,b):\n    # Your code here\n    pass`}
            label="Implement solve(a,b):"
            testcases={[
              {input: "12, 18", expected: "6"},
              {input: "7, 13", expected: "1"},
              {input: "20, 100", expected: "20"}
            ]}
            onSolved={() => handleSolved(3)}
            storageKey="exerciseCode-3"
          />

        </section>
      </main>
    </div>
  );
}