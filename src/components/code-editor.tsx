"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Token types for syntax highlighting
   ───────────────────────────────────────────── */
type TokenType = "keyword" | "string" | "function" | "variable" | "punctuation" | "comment" | "property" | "number" | "plain";

interface Token {
  type: TokenType;
  value: string;
}

/* ─────────────────────────────────────────────
   Each code line is a pre-tokenised array
   ───────────────────────────────────────────── */
const CODE_LINES: Token[][] = [
  // Line 1 — const developer = {
  [
    { type: "keyword", value: "const " },
    { type: "variable", value: "developer" },
    { type: "punctuation", value: " = {" },
  ],
  // Line 2 —   name: "Mostafa",
  [
    { type: "property", value: "  name" },
    { type: "punctuation", value: ": " },
    { type: "string", value: '"Mostafa"' },
    { type: "punctuation", value: "," },
  ],
  // Line 3 —   role: "Frontend Developer",
  [
    { type: "property", value: "  role" },
    { type: "punctuation", value: ": " },
    { type: "string", value: '"Frontend Developer"' },
    { type: "punctuation", value: "," },
  ],
  // Line 4 —   skills: ["React", "Next.js", "Tailwind"],
  [
    { type: "property", value: "  skills" },
    { type: "punctuation", value: ": [" },
    { type: "string", value: '"React"' },
    { type: "punctuation", value: ", " },
    { type: "string", value: '"Next.js"' },
    { type: "punctuation", value: ", " },
    { type: "string", value: '"Tailwind"' },
    { type: "punctuation", value: "]," },
  ],
  // Line 5 — };
  [{ type: "punctuation", value: "};" }],
  // Line 6 — blank
  [{ type: "plain", value: "" }],
  // Line 7 — function buildExperience() {
  [
    { type: "keyword", value: "function " },
    { type: "function", value: "buildExperience" },
    { type: "punctuation", value: "() {" },
  ],
  // Line 8 —   return "Modern & Interactive Web Apps";
  [
    { type: "keyword", value: "  return " },
    { type: "string", value: '"Modern & Interactive Web Apps"' },
    { type: "punctuation", value: ";" },
  ],
  // Line 9 — }
  [{ type: "punctuation", value: "}" }],
];

/* ─────────────────────────────────────────────
   Colour map per token type
   ───────────────────────────────────────────── */
const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:     "text-purple-600 dark:text-purple-400",
  string:      "text-emerald-600 dark:text-emerald-400",
  function:    "text-sky-600 dark:text-sky-400",
  variable:    "text-slate-800 dark:text-slate-100",
  punctuation: "text-slate-500 dark:text-slate-400",
  comment:     "text-slate-500 dark:text-slate-600 italic",
  property:    "text-amber-700 dark:text-amber-300",
  number:      "text-orange-600 dark:text-orange-400",
  plain:       "text-slate-500 dark:text-slate-400",
};

/* ─────────────────────────────────────────────
   Flatten tokens into a single character array
   with metadata so we can type one char at a time
   ───────────────────────────────────────────── */
interface CharMeta {
  char: string;
  type: TokenType;
  lineIndex: number;
  isNewline: boolean;
}

function buildCharStream(): CharMeta[] {
  const stream: CharMeta[] = [];
  CODE_LINES.forEach((tokens, lineIdx) => {
    if (lineIdx > 0) {
      stream.push({ char: "\n", type: "plain", lineIndex: lineIdx, isNewline: true });
    }
    tokens.forEach((token) => {
      for (const ch of token.value) {
        stream.push({ char: ch, type: token.type, lineIndex: lineIdx, isNewline: false });
      }
    });
  });
  return stream;
}

const CHAR_STREAM = buildCharStream();
const TYPING_SPEED = 28; // ms per character

/* ─────────────────────────────────────────────
   <CodeEditor />  — the full interactive widget
   ───────────────────────────────────────────── */
export default function CodeEditor() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  /* Typing animation */
  useEffect(() => {
    if (visibleCount >= CHAR_STREAM.length) {
      setIsComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [visibleCount]);

  /* Build rendered lines from the visible portion of the stream */
  const renderLines = useCallback(() => {
    const lines: { spans: { type: TokenType; text: string }[] }[] = [];
    let currentLine: { type: TokenType; text: string }[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const meta = CHAR_STREAM[i];
      if (meta.isNewline) {
        lines.push({ spans: currentLine });
        currentLine = [];
        continue;
      }
      // Group consecutive same-type chars into one span
      const last = currentLine[currentLine.length - 1];
      if (last && last.type === meta.type) {
        last.text += meta.char;
      } else {
        currentLine.push({ type: meta.type, text: meta.char });
      }
    }
    // Push the last line (the one being typed)
    lines.push({ spans: currentLine });
    return lines;
  }, [visibleCount]);

  const lines = renderLines();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative w-full max-w-[540px] mx-auto lg:mx-0"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-sky-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Editor card */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0F172A] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ring-1 ring-slate-200 dark:ring-transparent">
        
        {/* ── Title bar ── */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,.35)]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,.35)]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,.35)]" />
          </div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 tracking-wide select-none">
            app.js
          </span>
          <div className="w-[52px]" /> {/* spacer to center filename */}
        </div>

        {/* ── Code body ── */}
        <div className="p-5 font-mono text-[13px] sm:text-sm leading-[1.75] min-h-[280px] overflow-x-auto">
          {lines.map((line, lineIdx) => (
            <motion.div
              key={lineIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              {/* Line number */}
              <span className="inline-block w-8 flex-shrink-0 text-right mr-5 text-slate-400 dark:text-slate-600 select-none tabular-nums">
                {lineIdx + 1}
              </span>

              {/* Code tokens */}
              <span>
                {line.spans.map((span, spanIdx) => (
                  <span key={spanIdx} className={TOKEN_COLORS[span.type]}>
                    {span.text}
                  </span>
                ))}

                {/* Blinking cursor on the last visible line */}
                {lineIdx === lines.length - 1 && (
                  <span
                    className={`inline-block w-[2px] h-[1.1em] align-middle ml-px rounded-sm ${
                      isComplete
                        ? "bg-indigo-400 animate-blink"
                        : "bg-indigo-400"
                    }`}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-700/60 text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase select-none">
          <span>JavaScript</span>
          <span>{isComplete ? "Ready" : "Typing..."}</span>
        </div>
      </div>
    </motion.div>
  );
}
