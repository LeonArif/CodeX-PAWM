import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@pages/Languages/Navbar";
import { Sidebar } from "@pages/Languages/Sidebar";
import { PythonRunner } from "@pages/Languages/Python/PythonRunner";
import { useTheme } from "@context/ThemeProvider.jsx";
import { useEffect, useRef } from "react";

export default function PyIfElse() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const mainRef = useRef(null);

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

    console.log('PyIfElse component mounted!');
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const fullHeight = document.body.scrollHeight;
        // console.log('SCROLL:', scrollPosition, fullHeight);
        const token = localStorage.getItem("jwt");
        // console.log('TOKEN:', token);
        // console.log('SESSION:', sessionStorage.getItem("pyIfElseDone"));
        if (scrollPosition >= fullHeight - 10) {
          // console.log('CONDITION MET!');
          if (!token) {
            console.log("No token, skip progress POST");
            return;
          }
          if (!sessionStorage.getItem("pyIfElseDone")) {
            // console.log('FETCHING progress...');
            fetch("http://localhost:3001/api/progress", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ modules: { pyIfElse: true } })
            })
            .then(res => {
              if (!res.ok) throw new Error("Progress POST failed");
              return res.json();
            })
            .then(() => {
              window.dispatchEvent(new Event("progressUpdate"));
              sessionStorage.setItem("pyIfElseDone", "1");
            })
            .catch(err => {
              console.error("Progress POST error:", err);
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
      <main ref={mainRef} className="ml-56 mt-[65px] px-8 pb-24 pt-8 max-w-3xl">
        <section>
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>
            Python If-Else Tutorial
          </h1>
          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>
            Basic structure of if-else in Python
          </h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            In Python, the <b>if</b> statement is used to test a condition: if the condition is True, the code inside the if block is executed. Otherwise, you can use <b>else</b> to run code when the condition is False.
          </p>
          <PythonRunner
            initialCode={`x = 10\nif x > 5:\n    print("x is greater than 5")`}
            label="Try basic if statement:"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>If-Else Example</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>else</b> block runs when the <b>if</b> condition is False.
          </p>
          <PythonRunner
            initialCode={`x = 3\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is not greater than 5")`}
            label="Try if-else statement:"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Example 1: Check Positive or Negative</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Check if a number is positive or negative.
          </p>
          <PythonRunner
            initialCode={`number = -7\nif number > 0:\n    print("Positive number")\nelse:\n    print("Negative number or zero")`}
            label="Try positive/negative check:"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Example 2: Determine Pass or Fail</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Check if the score is enough to pass.
          </p>
          <PythonRunner
            initialCode={`score = 75\nif score >= 60:\n    print("Pass")\nelse:\n    print("Fail")`}
            label="Try pass/fail:"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Nested if-else</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Sometimes, you need to make decisions inside other decisions. This is called nested if-else.
          </p>
          <PythonRunner
            initialCode={`number = 0\nif number > 0:\n    print("Positive number")\nelse:\n    if number == 0:\n        print("Zero")\n    else:\n        print("Negative number")`}
            label="Try nested if-else:"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>if-elif-else for Multiple Conditions</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use <b>elif</b> for more than two conditions.
          </p>
          <PythonRunner
            initialCode={`score = 85\nif score >= 90:\n    print("Grade A")\nelif score >= 80:\n    print("Grade B")\nelif score >= 70:\n    print("Grade C")\nelse:\n    print("Grade D")`}
            label="Try if-elif-else:"
          />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Summary</h2>
          <ul className="mb-4 ml-5 list-disc text-base leading-loose">
            <li><b>if</b> is for single condition checks.</li>
            <li><b>else</b> is for when the <b>if</b> condition is False.</li>
            <li><b>elif</b> is for multiple conditions.</li>
            <li>if-else can be nested for complex decision logic.</li>
          </ul>
          <p className="mb-4 text-lg font-bold">Happy learning Python!</p>

          <button
            onClick={() => navigate("/pyLoops")}
            className={`mt-6 rounded-full px-6 py-2 text-base font-semibold shadow cursor-pointer
              ${isDark ? "bg-white text-[#18181b] hover:bg-[#e4e4e7]" : "bg-[#18181b] text-white hover:bg-[#232327]"}
              transition-all duration-300 active:translate-y-px`}
          >
            Next: Loops
          </button>
        </section>
      </main>
    </div>
  );
}