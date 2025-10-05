import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import '../css/content.css';

// Python code runner using Skulpt
function runPython(code, setOutput) {
  setOutput('');
  window.Sk.configure({
    output: text => setOutput(prev => prev + text),
    read: function(x) {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
      return window.Sk.builtinFiles["files"][x];
    }
  });
  window.Sk.misceval.asyncToPromise(() => window.Sk.importMainWithBody("<stdin>", false, code, true));
}

function PythonEditor({ defaultCode, label }) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  return (
    <div className="code-runner">
      {label && <h3>{label}</h3>}
      <MonacoEditor
        height="220px"
        language="python"
        theme="vs-light"
        value={code}
        onChange={value => setCode(value)}
        options={{ fontSize: 16, minimap: { enabled: false }, automaticLayout: true }}
      />
      <button onClick={() => runPython(code, setOutput)}>Try it!</button>
      <pre>{output}</pre>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h3><a href="/pyHome">Python Tutorial</a></h3>
      <a className="python-tutorial" href="/pyIfElse" id="sidebar-if-else">Python If-Else</a>
      <a className="python-tutorial" href="/pyLoops">Python Loops</a>
      <a className="python-tutorial" href="/pyArrays">Python Arrays</a>
      <a className="python-tutorial" href="/pyFunctions">Python Functions</a>
      <a className="python-tutorial" href="/pyExcercise">Python Exercise</a>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="nav">
      <a href="/"><img className="logo" src="/assets/codeX-removebg-preview1.png" alt="CodeX Logo" /></a>
      <p className="nav-title">Python</p>
      <img className="nav-profile" src="/assets/profile-pricture.jpg" alt="Profile" />
    </nav>
  );
}

export default function PythonIfElse() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <section className="content" id="tutorial-content">
        <div className="tutorial" id="if-else">
          <h1>Python If-Else Tutorial</h1>
          <h2>Basic structure of if-else in Python</h2>
          <p>
            In Python, the <b>if</b> statement is used to test a condition: if the condition is True, the code inside the if block is executed. Otherwise, you can use <b>else</b> to run code when the condition is False.<br />
          </p>
          <PythonEditor
            defaultCode={`x = 10\nif x > 5:\n    print("x is greater than 5")`}
            label="Try basic if statement:"
          />

          <h2>If-Else Example</h2>
          <p>
            The <b>else</b> block runs when the <b>if</b> condition is False.
          </p>
          <PythonEditor
            defaultCode={`x = 3\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is not greater than 5")`}
            label="Try if-else statement:"
          />

          <h2>Example 1: Check Positive or Negative</h2>
          <p>
            Check if a number is positive or negative.
          </p>
          <PythonEditor
            defaultCode={`number = -7\nif number > 0:\n    print("Positive number")\nelse:\n    print("Negative number or zero")`}
            label="Try positive/negative check:"
          />

          <h2>Example 2: Determine Pass or Fail</h2>
          <p>
            Check if the score is enough to pass.
          </p>
          <PythonEditor
            defaultCode={`score = 75\nif score >= 60:\n    print("Pass")\nelse:\n    print("Fail")`}
            label="Try pass/fail:"
          />

          <h2>Nested if-else</h2>
          <p>
            Sometimes, you need to make decisions inside other decisions. This is called nested if-else.
          </p>
          <PythonEditor
            defaultCode={`number = 0\nif number > 0:\n    print("Positive number")\nelse:\n    if number == 0:\n        print("Zero")\n    else:\n        print("Negative number")`}
            label="Try nested if-else:"
          />

          <h2>if-elif-else for Multiple Conditions</h2>
          <p>
            Use <b>elif</b> for more than two conditions.
          </p>
          <PythonEditor
            defaultCode={`score = 85\nif score >= 90:\n    print("Grade A")\nelif score >= 80:\n    print("Grade B")\nelif score >= 70:\n    print("Grade C")\nelse:\n    print("Grade D")`}
            label="Try if-elif-else:"
          />

          <h2>Summary</h2>
          <p>
            <ul>
              <li><b>if</b> is for single condition checks.</li>
              <li><b>else</b> is for when the <b>if</b> condition is False.</li>
              <li><b>elif</b> is for multiple conditions.</li>
              <li>if-else can be nested for complex decision logic.</li>
            </ul>
            <b>Happy learning Python!</b>
          </p>
          <button className="next-button" onClick={() => window.location.href = '/pyLoops'}>
            Next: Loops
          </button>
        </div>
      </section>
    </>
  );
}