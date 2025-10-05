import React, { useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

// Pastikan Skulpt sudah dimuat di index.html dari CDN (window.Sk)
function runPython(code, setOutput) {
  window.Sk.configure({
    output: text => setOutput(prev => prev + text),
    read: x => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
      return window.Sk.builtinFiles["files"][x];
    }
  });
  window.Sk.misceval.asyncToPromise(() => window.Sk.importMainWithBody("<stdin>", false, code, true));
}

export default function PythonRunner({ defaultCode = 'print("Hello World")', label = "Try Python code:" }) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");

  return (
    <div className="code-runner">
      {label && <h3>{label}</h3>}
      <MonacoEditor
        height="220px"
        language="python"
        theme="vs-light"
        value={code}
        onChange={(v) => setCode(v)}
        options={{ fontSize: 16, fontFamily: "Consolas, 'Courier New', monospace", minimap: { enabled: false }, automaticLayout: true }}
      />
      <button onClick={() => { setOutput(""); runPython(code, setOutput); }}>
        Try it!
      </button>
      <pre>{output}</pre>
    </div>
  );
}