import React, { useRef, useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "@context/ThemeProvider.jsx";

// Helper to run Python code with Skulpt (same as PythonRunner)
function runPython(code, push) {
  if (!window.Sk) {
    push("Skulpt not loaded.\n");
    return;
  }
  push("");
  window.Sk.configure({
    output: txt => push(txt),
    read: x => {
      if (!window.Sk.builtinFiles || !window.Sk.builtinFiles["files"][x]) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles["files"][x];
    }
  });
  window.Sk.misceval
    .asyncToPromise(() =>
      window.Sk.importMainWithBody("<stdin>", false, code, true)
    )
    .catch(err => push("\nError: " + err.toString()));
}

// --- Tambahan: storageKey & onSolved ---
export function PythonCodeChecker({
  initialCode,
  label,
  testcases,
  height = 220,
  internalBorders = false,
  onSolved,
  storageKey
}) {
  const { isDark } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [checking, setChecking] = useState(false);
  const outputRef = useRef(null);
  const monacoRef = useRef(null);
  const [alreadySolved, setAlreadySolved] = useState(false);

  // Load saved code on mount
  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) setCode(saved);
    }
  }, [storageKey]);

  // Save code on change
  const handleCodeChange = (v) => {
    setCode(v || "");
    if (storageKey) localStorage.setItem(storageKey, v || "");
  };

  const palette = isDark
    ? {
        outer: "border-[#b9b9b9ff] bg-[#18181b]",
        editorBg: "#23232799",
        outputBg: "#23232799",
        editorText: "#f6f6f6",
        outputText: "#f6f6f6"
      }
    : {
        outer: "border-[#525252ff] bg-[#f6f6f6]",
        editorBg: "#e1e1e7ff",
        outputBg: "#e1e1e7ff",
        editorText: "#18181b",
        outputText: "#18181b"
      };

  const defineThemes = (monaco) => {
    monaco.editor.defineTheme("codexLight", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": palette.editorBg,
        "editor.foreground": palette.editorText,
        "editorGutter.background": palette.editorBg,
        "editorLineNumber.foreground": "#7b7c80",
        "editorLineNumber.activeForeground": palette.editorText,
        "editorCursor.foreground": "#18181b",
        "editor.selectionBackground": "#b3b3b3ff",
        "editor.inactiveSelectionBackground": "#e4e4e799",
        "editor.lineHighlightBackground": "#e9e9ee",
        "editorIndentGuide.background": "#dfdfdf",
        "editorIndentGuide.activeBackground": "#b5bec7",
        "scrollbarSlider.background": "#d4d4d8ad",
        "scrollbarSlider.hoverBackground": "#d4d4d8d6"
      }
    });
    monaco.editor.defineTheme("codexDark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": palette.editorBg,
        "editor.foreground": palette.editorText,
        "editorGutter.background": palette.editorBg,
        "editorLineNumber.foreground": "#3f3f46",
        "editorLineNumber.activeForeground": "#f6f6f6",
        "editorCursor.foreground": "#f6f6f6",
        "editor.selectionBackground": "#6b6b6dcc",
        "editor.inactiveSelectionBackground": "#23232799",
        "editor.lineHighlightBackground": "#18181b",
        "editorIndentGuide.background": "#31313b",
        "editorIndentGuide.activeBackground": "#3f3f46",
        "scrollbarSlider.background": "#31313bad",
        "scrollbarSlider.hoverBackground": "#31313bd6"
      }
    });
  };

  const handleBeforeMount = (monaco) => {
    monacoRef.current = monaco;
    defineThemes(monaco);
  };

  const handleMount = (editor, monaco) => {
    monaco.editor.setTheme(isDark ? "codexDark" : "codexLight");
    window.monaco = monaco;
  };

  useEffect(() => {
    if (monacoRef.current) {
      defineThemes(monacoRef.current);
      monacoRef.current.editor.setTheme(isDark ? "codexDark" : "codexLight");
    }
  }, [isDark, palette.editorBg, palette.outputBg, palette.editorText]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const editorWrapperClass = internalBorders
    ? "rounded-md overflow-hidden border border-slate-300 dark:border-slate-600"
    : "rounded-md overflow-hidden";
  const outputWrapperClass = internalBorders
    ? "rounded-md border border-slate-300 dark:border-slate-600"
    : "rounded-md";

  // Test the code against all testcases
  const runCheck = async () => {
    setOutput("Checking...");
    setChecking(true);
    let pass = true, firstFail = null;
    for (let idx = 0; idx < testcases.length; idx++) {
      const tc = testcases[idx];
      const userCode = `${code}\nprint(solve(${tc.input}))`;
      let testcaseResult = "";
      await new Promise((resolve) => {
        runPython(userCode, txt => { testcaseResult += txt; });
        setTimeout(resolve, 400);
      });
      let actual = testcaseResult.trim();
      if (actual !== tc.expected && pass) {
        pass = false;
        firstFail = { idx, tc, actual };
      }
      if (!pass) break;
    }
    if (pass) {
      setOutput("✅ PASS: All testcases passed!");
      if (!alreadySolved && typeof onSolved === "function") {
        setAlreadySolved(true);
        onSolved();
      }
    } else {
      setOutput(`❌ FAIL\nTestcase #${firstFail.idx + 1} failed:\nInput: ${firstFail.tc.input}\nExpected: ${firstFail.tc.expected}\nGot: ${firstFail.actual}`);
    }
    setChecking(false);
  };

  return (
    <div className={`flex flex-col gap-4 rounded-lg border p-4 ${palette.outer}`}>
      {label && (
        <h3 className={`text-xl font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
          {label}
        </h3>
      )}

      <div
        className={editorWrapperClass}
        style={{ background: palette.editorBg, color: palette.editorText }}
      >
        <MonacoEditor
          height={height}
          language="python"
          value={code}
          onChange={handleCodeChange}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          theme={isDark ? "codexDark" : "codexLight"}
          options={{
            fontSize: 15,
            fontFamily:
              "'Cascadia Code','Fira Code','JetBrains Mono',Consolas,'Courier New',Menlo,monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            automaticLayout: true,
            smoothScrolling: true
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={runCheck}
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 active:translate-y-px dark:bg-blue-500 dark:hover:bg-blue-400"
          disabled={checking}
        >
          Check
        </button>
      </div>

      <pre
        ref={outputRef}
        className={`${outputWrapperClass} p-2 max-h-56 overflow-auto whitespace-pre-wrap font-mono text-sm leading-relaxed shadow-inner`}
        style={{
          background: palette.outputBg,
          color: palette.outputText
        }}
      >
        {output || (
          <span className={isDark ? "text-white-400 select-none" : "text-black-400 select-none"}>
            (output)
          </span>
        )}
      </pre>
    </div>
  );
}