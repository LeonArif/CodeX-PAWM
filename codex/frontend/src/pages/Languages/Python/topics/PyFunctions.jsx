import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@pages/Languages/Navbar";
import { Sidebar } from "@pages/Languages/Sidebar";
import { PythonRunner } from "@pages/Languages/Python/PythonRunner";
import { useTheme } from "@context/ThemeProvider.jsx";

export default function PyFunctions() {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      if (scrollPosition >= fullHeight - 10) {
        const token = localStorage.getItem("jwt");
        if (!token) return;
        if (!sessionStorage.getItem("pyFunctionsDone")) {
          fetch("http://localhost:3001/api/progress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ modules: { pyFunctions: true } })
          }).then(() => {
            window.dispatchEvent(new Event("progressUpdate"));
            sessionStorage.setItem("pyFunctionsDone", "1");
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${bgBase} ${textBase} antialiased transition-colors duration-300`} style={{ fontFamily: '"Mulish", sans-serif' }}>
      <Navbar languageName="Python" />
      <Sidebar title="Python Tutorial" items={sidebarItems} />

      <main className="ml-56 mt-[65px] px-8 pb-24 pt-8 max-w-3xl">
        <section>
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>Python Functions Tutorial</h1>
          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Introduction</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Functions are reusable blocks of code that perform a specific task. They help organize code, avoid repetition, and make programs easier to understand.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Defining a Function</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use <code>def</code> to define a function.
          </p>
          <PythonRunner initialCode={`def say_hello():\n    print("Hello!")\nsay_hello()`} label="Try defining and calling a function:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Function Parameters</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Pass data into functions using parameters.
          </p>
          <PythonRunner initialCode={`def greet(name):\n    print("Hello", name)\ngreet("Python")`} label="Try function with parameters:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Returning a Value</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use <code>return</code> to send a result back to the caller.
          </p>
          <PythonRunner initialCode={`def add(a, b):\n    return a + b\nresult = add(5, 7)\nprint(result)`} label="Try function with return value:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Default Parameter Values</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            You can set default values for parameters.
          </p>
          <PythonRunner initialCode={`def greet(name="World"):\n    print("Hello", name)\ngreet()\ngreet("Alice")`} label="Try default parameter values:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Multiple Parameters</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Functions can take multiple arguments.
          </p>
          <PythonRunner initialCode={`def multiply(x, y):\n    print(x * y)\nmultiply(3, 4)`} label="Try multiple parameters:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Function with a List Argument</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            You can pass lists to functions.
          </p>
          <PythonRunner initialCode={`def print_items(items):\n    for item in items:\n        print(item)\nprint_items(["apple", "banana", "cherry"])`} label="Try passing a list to a function:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Returning Multiple Values</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            A function can return more than one value using tuples.
          </p>
          <PythonRunner initialCode={`def min_max(numbers):\n    return min(numbers), max(numbers)\nresult = min_max([4, 7, 2, 9])\nprint("Min:", result[0])\nprint("Max:", result[1])`} label="Try returning multiple values:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Summary</h2>
          <ul className="mb-4 ml-5 list-disc text-base leading-loose">
            <li>Functions help organize code and reduce repetition.</li>
            <li>Parameters let you pass data to functions.</li>
            <li><i>return</i> sends results back to the caller.</li>
            <li>Functions can take lists and return multiple values.</li>
          </ul>
          <p className="mb-4 text-lg font-bold">Practice writing your own functions to master Python programming!</p>
          <p className="mb-4 text-lg font-bold">Now Let's do a quick review for all the things we've learned.</p>

          <button
            onClick={() => navigate("/pyExercise")}
            className={`mt-6 rounded-full px-6 py-2 text-base font-semibold shadow cursor-pointer
              ${isDark ? "bg-white text-[#18181b] hover:bg-[#e4e4e7]" : "bg-[#18181b] text-white hover:bg-[#232327]"}
              transition-all duration-300 active:translate-y-px`}
          >
            Next: Exercise
          </button>
        </section>
      </main>
    </div>
  );
}