import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@pages/Languages/Navbar";
import { Sidebar } from "@pages/Languages/Sidebar";
import { PythonRunner } from "@pages/Languages/Python/PythonRunner";
import { useTheme } from "@context/ThemeProvider.jsx";

export default function PyArrays() {
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
          <h1 className={`text-4xl font-extrabold mb-2 leading-snug tracking-tight ${headingColor}`}>Python Arrays (Lists) Tutorial</h1>
          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Introduction</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            In Python, the most common way to store sequences of items is by using <b>lists</b>. Lists can hold any data type, are ordered, and can be changed after creation.
          </p>

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Creating a List</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use square brackets <code>[]</code> to create a list.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30, 40]\nprint(numbers)`} label="Try creating a list:" />
          
          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Accessing Elements</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Access list items by their index. Indexing starts from 0.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30, 40]\nprint(numbers[0])\nprint(numbers[2])`} label="Try accessing list elements:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Changing Elements</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Lists are mutable, so you can change individual elements.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30, 40]\nnumbers[1] = 99\nprint(numbers)`} label="Try changing list elements:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Adding Elements</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use <code>append()</code> to add an element at the end.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30]\nnumbers.append(40)\nprint(numbers)`} label="Try appending to a list:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Removing Elements</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use <code>remove()</code> to remove a specific element.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30, 40]\nnumbers.remove(20)\nprint(numbers)`} label="Try removing from a list:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>List Length</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use <code>len()</code> to get the number of elements in a list.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30, 40]\nprint(len(numbers))`} label="Try getting list length:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Looping Through a List</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Use a for loop to process every element.
          </p>
          <PythonRunner initialCode={`numbers = [10, 20, 30]\nfor n in numbers:\n    print(n)`} label="Try looping through a list:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>List Slicing</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Get a part of the list by slicing: <code>list[start:end]</code>
          </p>
          <PythonRunner initialCode={`numbers = [0, 1, 2, 3, 4, 5]\nprint(numbers[2:5])`} label="Try list slicing:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Nesting Lists</h2>
          <p className="mb-4 text-lg leading-relaxed font-normal">
            Lists can contain other lists (nested lists).
          </p>
          <PythonRunner initialCode={`matrix = [[1, 2], [3, 4], [5, 6]]\nprint(matrix[1][0])`} label="Try nested lists:" />

          <h2 className={`text-2xl font-bold mt-8 mb-2 ${headingColor}`}>Summary</h2>
          <ul className="mb-4 ml-5 list-disc text-base leading-loose">
            <li>Lists store ordered, mutable collections.</li>
            <li>Elements can be accessed, changed, added, and removed.</li>
            <li>Lists can be sliced and nested.</li>
          </ul>
          <p className="mb-4 text-lg font-bold">Practice with lists to master Python data handling!</p>

          <button
            onClick={() => navigate("/pyFunctions")}
            className={`mt-6 rounded-full px-6 py-2 text-base font-semibold shadow cursor-pointer
              ${isDark ? "bg-white text-[#18181b] hover:bg-[#e4e4e7]" : "bg-[#18181b] text-white hover:bg-[#232327]"}
              transition-all duration-300 active:translate-y-px`}
          >
            Next: Functions Tutorial
          </button>
        </section>
      </main>
    </div>
  );
}