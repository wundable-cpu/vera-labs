"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Session } from "next-auth";
import { LandingPageClient } from "./landing-page-client";
import { ProcessingTerminal } from "@/components/ProcessingTerminal";

interface PageContentProps {
  session: Session | null;
}

export function PageContent({ session }: PageContentProps) {
  const [isAuditReady, setIsAuditReady] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {session?.user ? (
        <motion.div
          key="terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12"
        >
          <ProcessingTerminal 
            userName={session.user.name || "User"} 
            onComplete={() => setIsAuditReady(true)}
          />
          
          {/* View Full Audit Button */}
          <AnimatePresence>
            {isAuditReady && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-8 w-full max-w-4xl"
              >
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full inline-flex items-center justify-center gap-3 rounded-lg border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-shadow"
                  >
                    {/* Emerald glow effect */}
                    <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 via-emerald-500/40 to-emerald-400/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="relative flex items-center gap-3">
                      {/* Pulsing dot for "Live Data" */}
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      />
                      <span>View Narrative Briefing</span>
                      <span className="text-xl">→</span>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <LandingPageClient />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

