import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@pages/Languages/Navbar";
import { Sidebar } from "@pages/Languages/Sidebar";
import { PythonCodeChecker } from "@pages/Languages/Python/PythonCodeChecker";
import { useTheme } from "@context/ThemeProvider.jsx";

export default function PyExercise() {
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

  const bgBase = isDark ? "bg-[#000]" : "bg-[#fff]";
  const textBase = isDark ? "text-white" : "text-[#18181b]";
  const headingColor = isDark ? "text-white" : "text-[#18181b]";

  return (
    <div className={`min-h-screen ${bgBase} ${textBase} antialiased transition-colors duration-300`} style={{ fontFamily: '"Mulish", sans-serif' }}>
      <Navbar languageName="Python" />
      <Sidebar title="Python Tutorial" items={sidebarItems} />

      <main className="ml-56 mt-[65px] px-8 pb-24 pt-8 max-w-3xl">
        <section>
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>Python Coding Exercises</h1>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Exercise 1: If-Else Condition</h2>
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
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Exercise 2: Loop (Sum 1 to n)</h2>
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
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Exercise 3: Array/List (Sum Elements)</h2>
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
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Exercise 4: Function (GCD)</h2>
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
          />

        </section>
      </main>
    </div>
  );
}