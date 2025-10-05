import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@pages/Languages/Navbar";
import { Sidebar } from "@pages/Languages/Sidebar";
import { PythonRunner } from "@pages/Languages/Python/PythonRunner";
import { useTheme } from "@context/ThemeProvider.jsx";

export default function PyLoops() {
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
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>Python Loops Tutorial</h1>
          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Introduction to Loops</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Loops are used to repeat a block of code multiple times. Python mainly provides two types of loops: <b>for</b> loops and <b>while</b> loops.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>For Loop</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>for</b> loop is used for iterating over a sequence (like a list, tuple, string, or range).
          </p>
          <PythonRunner initialCode={`for i in range(5):\n    print(i)`} label="Try for loop with range:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>For Loop over a List</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            You can use a for loop to iterate through each item in a list.
          </p>
          <PythonRunner initialCode={`fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)`} label="Try for loop over a list:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>For Loop with break</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>break</b> statement can be used to stop the loop before it has looped through all the items.
          </p>
          <PythonRunner initialCode={`for i in range(10):\n    if i == 5:\n        break\n    print(i)`} label="Try for loop with break:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>For Loop with continue</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>continue</b> statement can be used to skip the current iteration of the loop and continue with the next.
          </p>
          <PythonRunner initialCode={`for i in range(6):\n    if i == 3:\n        continue\n    print(i)`} label="Try for loop with continue:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>While Loop</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>while</b> loop repeats as long as a condition is True.
          </p>
          <PythonRunner initialCode={`count = 0\nwhile count < 5:\n    print(count)\n    count += 1`} label="Try basic while loop:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>While Loop with break</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>break</b> statement can also be used in while loops.
          </p>
          <PythonRunner initialCode={`count = 0\nwhile True:\n    print(count)\n    count += 1\n    if count == 5:\n        break`} label="Try while loop with break:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>While Loop with continue</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            The <b>continue</b> statement skips the current iteration and continues with the next.
          </p>
          <PythonRunner initialCode={`count = 0\nwhile count < 6:\n    count += 1\n    if count == 3:\n        continue\n    print(count)`} label="Try while loop with continue:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Nested Loops</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            You can use loops inside loops. This is called nesting.
          </p>
          <PythonRunner initialCode={`for i in range(1, 4):\n    for j in range(1, 4):\n        print("i =", i, ", j =", j)`} label="Try nested loops:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Loop with else</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Python allows an <b>else</b> clause after a loop that runs if the loop was not terminated by <b>break</b>.
          </p>
          <PythonRunner initialCode={`for i in range(3):\n    print(i)\nelse:\n    print("Loop finished!")`} label="Try loop with else:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Summary</h2>
          <ul className="mb-4 ml-5 list-disc text-base leading-loose">
            <li><b>for</b> loops are for iterating over sequences.</li>
            <li><b>while</b> loops run as long as a condition is True.</li>
            <li>Use <b>break</b> to exit a loop early.</li>
            <li>Use <b>continue</b> to skip to the next iteration.</li>
            <li>Loops can be nested.</li>
            <li>Loops can have an <b>else</b> clause.</li>
          </ul>
          <p className="mb-4 text-lg font-bold">Ready for more Python? Happy coding!</p>

          <button
            onClick={() => navigate("/pyArrays")}
            className={`mt-6 rounded-full px-6 py-2 text-base font-semibold shadow cursor-pointer
              ${isDark ? "bg-white text-[#18181b] hover:bg-[#e4e4e7]" : "bg-[#18181b] text-white hover:bg-[#232327]"}
              transition-all duration-300 active:translate-y-px`}
          >
            Next: Arrays
          </button>
        </section>
      </main>
    </div>
  );
}