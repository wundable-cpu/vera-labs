"use client";

import { motion } from "framer-motion";
import { ArrowRight, Waves, Mic2, ListChecks } from "lucide-react";
import { signIn } from "next-auth/react";

const terminalLines = [
  "Initializing Insight Engine core...",
  "Connecting to GA4 property...",
  "Scanning funnel leaks across key journeys...",
  "Detecting mobile bounce rate spikes on paid campaigns...",
  "Cross-referencing anomaly windows with ad spend surges...",
  "Flagging under-monetized high-intent segments...",
  "Preparing 60-second executive briefing transcript...",
  "Generating dev-ready backlog with impact scores..."
];

function GoogleGlyph() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/10 ring-1 ring-slate-900/40">
      <span className="text-[11px] font-bold tracking-tight text-slate-900">
        G
      </span>
    </span>
  );
}

function FeaturePill({
  icon,
  title,
  body
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/90 bg-slate-950/60 px-3.5 py-3 shadow-sm shadow-slate-950/70">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 ring-1 ring-slate-700/80">
          {icon}
        </div>
        <span className="text-xs font-medium text-slate-100">
          {title}
        </span>
      </div>
      <p className="text-[11px] leading-relaxed text-slate-500">
        {body}
      </p>
    </div>
  );
}

export function LandingPageClient() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative text-center space-y-6 px-6 py-12 sm:py-16 lg:py-20"
      >
        {/* Trusted Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-xs font-medium text-slate-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          Trusted by Vera Labs
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 max-w-4xl mx-auto"
        >
          Stop Your Website Revenue Leaks in 60 Seconds.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed"
        >
          Vera Labs connects to your Google Analytics, identifies exactly where you&apos;re losing money, and provides the step-by-step code to fix it.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center pt-4"
        >
          <motion.button
            onClick={() => {
              signIn("google", { 
                callbackUrl: window.location.href 
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-3 rounded-lg border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-shadow"
          >
            {/* Emerald glow effect */}
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 via-emerald-500/40 to-emerald-400/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <GoogleGlyph />
              <span>Get Your Free Audit</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Visual: Magnifying Glass SVG Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center pt-8"
        >
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Dashboard Preview / Magnifying Glass Animation */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background dashboard mockup */}
              <rect
                x="20"
                y="20"
                width="360"
                height="260"
                rx="8"
                fill="rgb(15, 23, 42)"
                stroke="rgb(51, 65, 85)"
                strokeWidth="2"
              />
              
              {/* Chart bars */}
              <rect x="40" y="200" width="30" height="50" fill="rgb(16, 185, 129)" opacity="0.8" />
              <rect x="80" y="180" width="30" height="70" fill="rgb(16, 185, 129)" opacity="0.8" />
              <rect x="120" y="160" width="30" height="90" fill="rgb(239, 68, 68)" opacity="0.8" />
              <rect x="160" y="190" width="30" height="60" fill="rgb(16, 185, 129)" opacity="0.8" />
              <rect x="200" y="150" width="30" height="100" fill="rgb(239, 68, 68)" opacity="0.8" />
              <rect x="240" y="170" width="30" height="80" fill="rgb(16, 185, 129)" opacity="0.8" />
              <rect x="280" y="140" width="30" height="110" fill="rgb(239, 68, 68)" opacity="0.8" />
              <rect x="320" y="160" width="30" height="90" fill="rgb(16, 185, 129)" opacity="0.8" />

              {/* Magnifying glass */}
              <g>
                {/* Glass circle */}
                <circle
                  cx="200"
                  cy="120"
                  r="40"
                  fill="none"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="3"
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="40;45;40"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Magnifying glass handle */}
                <line
                  x1="230"
                  y1="150"
                  x2="260"
                  y2="180"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                
                {/* Scanning line */}
                <line
                  x1="160"
                  y1="120"
                  x2="240"
                  y2="120"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="2"
                  opacity="0.6"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>

              {/* Text labels */}
              <text
                x="200"
                y="250"
                textAnchor="middle"
                fill="rgb(148, 163, 184)"
                fontSize="14"
                fontFamily="system-ui, sans-serif"
              >
                Revenue Leak Detection
              </text>
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Original Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="relative grid gap-10 px-6 py-10 sm:px-10 lg:px-14 lg:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center"
      >
        {/* Left: Hero copy & CTA */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
            Live anomaly detection · GA4 native
          </div>

          <div className="space-y-4">
            <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
              Your Data is Talking.
              <span className="block text-slate-300">
                You&apos;re Just Not Listening.
              </span>
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">
              Stop staring at dashboards. Get a{" "}
              <span className="font-semibold text-slate-100">
                60-second AI-narrated audit
              </span>{" "}
              that identifies exactly where you&apos;re leaking revenue —
              and what to fix first.
            </p>
          </div>

        <div className="space-y-3">
          <motion.button
            onClick={() => {
              signIn("google", { 
                callbackUrl: window.location.href 
              });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-glow-blue"
          >
            {/* Pulsing halo */}
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full bg-emerald-400/30 blur-xl"
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.95, 1.08, 0.95] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <span className="relative flex items-center gap-2">
              <GoogleGlyph />
              <span>Connect Google Analytics</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Read-only GA4 access. No ads or billing changes.
            </span>
            <span> SOC2-ready infrastructure · EU data residency optional</span>
          </div>
        </div>

        {/* Feature trio */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <FeaturePill
            icon={<Waves className="h-4 w-4 text-emerald-300" />}
            title="Funnel Leak Detector"
            body="Surfaces breakpoints in your acquisition, activation, and revenue flows in one pass."
          />
          <FeaturePill
            icon={<Mic2 className="h-4 w-4 text-sky-300" />}
            title="Voice Briefing"
            body="A 60-second AI voiceover that explains what changed, why, and what it costs you."
          />
          <FeaturePill
            icon={<ListChecks className="h-4 w-4 text-emerald-300" />}
            title="Dev-Ready Orders"
            body="Prioritized, impact-ranked tickets your product and dev teams can ship next sprint."
          />
        </div>
      </div>

      {/* Right: Terminal simulation */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <div className="pointer-events-none absolute -top-12 -right-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950/90 shadow-2xl shadow-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              insight-engine ▹ audit --ga4
            </span>
          </div>

          <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-b from-slate-950/80 to-slate-950 px-4 py-3 font-mono text-xs text-slate-300">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: ["0%", "-40%"] }}
              transition={{
                ease: "linear",
                duration: 26,
                repeat: Infinity
              }}
              className="space-y-1.5"
            >
              {terminalLines.map((line, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-slate-500">›</span>
                  <span
                    className={
                      idx === 2 || idx === 3 || idx === 5
                        ? "text-emerald-300"
                        : idx === 6
                          ? "text-sky-300"
                          : "text-slate-200"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}

              {/* Duplicate for seamless scroll illusion */}
              {terminalLines.map((line, idx) => (
                <div key={`dup-${idx}`} className="flex gap-2">
                  <span className="text-slate-500">›</span>
                  <span
                    className={
                      idx === 2 || idx === 3 || idx === 5
                        ? "text-emerald-300"
                        : idx === 6
                          ? "text-sky-300"
                          : "text-slate-200"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Bottom gradient mask & caret */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute left-4 bottom-3 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>Analyzing live traffic patterns…</span>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
}

