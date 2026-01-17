"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ProcessingTerminal({ userName }: { userName: string }) {
  const processingLogs = [
    `Welcome, ${userName}. Accessing your GA4 properties...`,
    "Establishing secure OAuth 2.0 connection...",
    "Fetching GA4 Property ID: 458219...",
    "Analyzing traffic delta (Last 7 Days)...",
    "IDENTIFIED: 22% drop in mobile checkout conversion.",
    "Generating AI Narrative Briefing...",
  ];

  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showButton, setShowButton] = useState(false);

  // Typing effect for current log
  useEffect(() => {
    if (currentLogIndex < processingLogs.length) {
      const targetText = processingLogs[currentLogIndex];
      setCurrentText(""); // Reset text when starting new log
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex < targetText.length) {
          setCurrentText(targetText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          // Move to next log after a short delay
          setTimeout(() => {
            setDisplayedLogs((prev) => [...prev, targetText]);
            setCurrentText("");
            setCurrentLogIndex((prev) => prev + 1);
          }, 800);
        }
      }, 50); // Typing speed

      return () => clearInterval(typingInterval);
    } else if (currentLogIndex === processingLogs.length && !showButton) {
      // Show button after all logs finish (approximately 5 seconds total)
      const buttonTimeout = setTimeout(() => {
        setShowButton(true);
      }, 1000);
      return () => clearTimeout(buttonTimeout);
    }
  }, [currentLogIndex, showButton, processingLogs.length]);

  return (
    <div className="relative w-full max-w-4xl">
      {/* Blur effect on edges */}
      <div className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 blur-2xl opacity-50" />
      <div className="pointer-events-none absolute -inset-2 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 blur-xl opacity-30" />

      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-slate-950/95 to-slate-950 shadow-2xl shadow-emerald-500/10">
        {/* Terminal header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-slate-950/90 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[11px] font-mono text-emerald-400/60">
            insight-engine ▹ processing --oauth
          </span>
        </div>

        {/* Terminal content */}
        <div className="relative min-h-[400px] overflow-hidden bg-slate-950 px-6 py-5 font-mono text-sm">
          <div className="space-y-2.5">
            {/* Displayed logs */}
            {displayedLogs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2"
              >
                <span className="text-emerald-500/60">›</span>
                <span className="text-emerald-400">{log}</span>
              </motion.div>
            ))}

            {/* Currently typing log */}
            {currentLogIndex < processingLogs.length && (
              <div className="flex gap-2">
                <span className="text-emerald-500/60">›</span>
                <span className="text-emerald-400">
                  {currentText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-emerald-400 ml-1 align-middle"
                  />
                </span>
              </div>
            )}

            {/* View My Audit Button */}
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 pt-6 border-t border-emerald-500/20 flex justify-center"
              >
                <div className="relative group">
                  <motion.button
                    disabled
                    className="relative inline-flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/50 px-10 py-4 text-lg font-semibold text-slate-400 cursor-not-allowed opacity-60"
                  >
                    <span>View My Audit</span>
                  </motion.button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                    Coming Soon
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom gradient mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}

