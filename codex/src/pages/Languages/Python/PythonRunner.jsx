import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "@context/ThemeProvider.jsx";

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

export function PythonRunner({
  initialCode = 'print("Hello, Python!")',
  label = "Try Python code:",
  height = 220,
  internalBorders = false
}) {
  const { isDark } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const outputRef = useRef(null);
  const monacoRef = useRef(null);

  const appendOutput = txt => setOutput(prev => prev + txt);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

const palette = isDark
  ? {
      outer: "border-[#b9b9b9ff] bg-[#18181b]",           // abu-abu gelap
      editorBg: "#23232799",                              // sama untuk editor/output
      outputBg: "#23232799",
      editorText: "#f6f6f6",                            // putih
      outputText: "#f6f6f6"
    }
  : {
      outer: "border-[#525252ff] bg-[#f6f6f6]",      // sidebar/container dasar
      editorBg: "#e1e1e7ff",                         // editor/output box, sedikit lebih gelap
      outputBg: "#e1e1e7ff",                         // sama
      editorText: "#18181b",                       // teks hitam
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
      "editorLineNumber.foreground": "#7b7c80",                   // abu-abu medium
      "editorLineNumber.activeForeground": palette.editorText,
      "editorCursor.foreground": "#18181b",                       // hitam
      "editor.selectionBackground": "#b3b3b3ff",                    // abu-abu terang
      "editor.inactiveSelectionBackground": "#e4e4e799",
      "editor.lineHighlightBackground": "#e9e9ee",                // lebih terang dari bg
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
      "editorLineNumber.foreground": "#3f3f46",                   // abu-abu gelap medium
      "editorLineNumber.activeForeground": "#f6f6f6",
      "editorCursor.foreground": "#f6f6f6",                       // putih
      "editor.selectionBackground": "#6b6b6dcc",                  // abu-abu gelap transparan
      "editor.inactiveSelectionBackground": "#23232799",
      "editor.lineHighlightBackground": "#18181b",                // lebih gelap dari bg
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
      defineThemes(monacoRef.current); // redefine sesuai palette sekarang
      monacoRef.current.editor.setTheme(isDark ? "codexDark" : "codexLight");
    }
  }, [isDark, palette.editorBg, palette.outputBg, palette.editorText]);

  const editorWrapperClass = internalBorders
    ? "rounded-md overflow-hidden border border-slate-300 dark:border-slate-600"
    : "rounded-md overflow-hidden";
  const outputWrapperClass = internalBorders
    ? "rounded-md border border-slate-300 dark:border-slate-600"
    : "rounded-md";

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
          onChange={(v) => setCode(v || "")}
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
          onClick={() => {
            setOutput("");
            runPython(code, appendOutput);
          }}
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 active:translate-y-px dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Run
        </button>
        <button
          onClick={() => setOutput("")}
          disabled={!output}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            output
              ? "border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              : "border border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700 dark:text-slate-600"
          }`}
        >
          Clear
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