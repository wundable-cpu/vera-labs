"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProcessingTerminalProps {
  userName: string;
  onComplete?: () => void;
}

export function ProcessingTerminal({ userName, onComplete }: ProcessingTerminalProps) {
  const processingLogs = [
    `> [SYSTEM]: Connection established for ${userName}...`,
    "> [QUERY]: Fetching Google Analytics 4 Property IDs...",
    "> [AI]: Identifying conversion leaks in the checkout funnel...",
    "> [AI]: Scanning for 2026 search intent anomalies...",
    "> [SUCCESS]: Audit Complete. Preparing Narrative Briefing.",
  ];

  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

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
    } else if (currentLogIndex === processingLogs.length && onComplete) {
      // All logs displayed, wait 1 second then call onComplete
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(completeTimeout);
    }
  }, [currentLogIndex, processingLogs.length, onComplete]);

  return (
    <div className="relative w-full max-w-4xl">
      {/* Hacker-style dark box with green glow */}
      <div className="relative overflow-hidden rounded-lg border-2 border-emerald-500/40 bg-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        {/* Green glow effect */}
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/10 blur-xl" />
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-400/20 via-emerald-500/30 to-emerald-400/20 blur opacity-75 animate-pulse" />

        {/* Terminal content */}
        <div className="relative bg-black/95 px-6 py-5 font-mono text-sm" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
          <div className="space-y-3">
            {/* Displayed logs */}
            {displayedLogs.map((log, idx) => {
              // Determine color based on log prefix
              let logColor = "text-emerald-400";
              if (log.includes("[SYSTEM]")) {
                logColor = "text-emerald-300";
              } else if (log.includes("[QUERY]")) {
                logColor = "text-cyan-400";
              } else if (log.includes("[AI]")) {
                logColor = "text-purple-400";
              } else if (log.includes("[SUCCESS]")) {
                logColor = "text-green-400";
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <span className={logColor}>{log}</span>
                </motion.div>
              );
            })}

            {/* Currently typing log */}
            {currentLogIndex < processingLogs.length && (
              <div className="flex items-start gap-2">
                <span className="text-emerald-400">
                  {currentText}
                  {/* Pulsing green cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle"
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

