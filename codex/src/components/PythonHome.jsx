import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import '../css/content.css';
import { useNavigate } from 'react-router-dom';

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

export default function PythonHome() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Sidebar />
      <section className="py-content" id="tutorial-content">
        <div className="py-tutorial-section" id="python-intro">
          <h1>Welcome to Python Programming</h1>
          <h2>What is Python?</h2>
          <p>
            Python is a popular, easy-to-learn programming language known for its readability and versatility. It is widely used for web development, data science, automation, artificial intelligence, and more.<br />
            Python was created by Guido van Rossum and first released in 1991. Its simple syntax makes it ideal for beginners and professionals alike.
          </p>

          <h2>Why Learn Python?</h2>
          <ul>
            <li><b>Easy to Read:</b> Python code is clean and straightforward, making it accessible for new programmers.</li>
            <li><b>Versatile:</b> Python can be used for building websites, analyzing data, automating tasks, creating games, and much more.</li>
            <li><b>Large Community:</b> Python has a huge community and countless resources for learning and troubleshooting.</li>
            <li><b>In-Demand:</b> Python is one of the most sought-after programming languages in tech jobs today.</li>
          </ul>

          <h2>What Will You Learn?</h2>
          <ul>
            <li>Basic Python syntax</li>
            <li>Variables and data types</li>
            <li>Control flow: if-else statements, loops</li>
            <li>Working with lists (arrays), functions</li>
            <li>And much more!</li>
          </ul>

          <h2>Try Python Now!</h2>
          <p>
            Here is a simple example. Click "Try it!" to run the code:
          </p>
          <PythonEditor
            defaultCode={`print("Hello, Python!")`}
            label="Try your first Python code:"
          />

          <h2>Ready to Start?</h2>
          <p>
            Click the button below to start with <b>Python If-Else</b> basics!
          </p>
          <button className="py-next-button" onClick={() => navigate('/pyIfElse')}>
            Start Python If-Else Tutorial
          </button>
        </div>
      </section>
    </>
  );
}