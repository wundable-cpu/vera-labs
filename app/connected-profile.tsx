"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface ConnectedProfileProps {
  session: Session;
}

export function ConnectedProfile({ session }: ConnectedProfileProps) {
  const userName = session.user?.name || null;
  const userImage = session.user?.image || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative inline-flex items-center gap-4 rounded-xl border border-emerald-500/40 bg-gradient-to-r from-slate-900/90 to-slate-950/90 px-5 py-3 backdrop-blur-sm shadow-lg shadow-emerald-500/30"
    >
      {/* Emerald border glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/30 via-emerald-500/20 to-emerald-400/30 blur-lg animate-pulse" />
      
      <div className="relative flex items-center gap-4">
        {userImage && (
          <img
            src={userImage}
            alt={userName || "User"}
            className="h-10 w-10 rounded-full ring-2 ring-emerald-400/60"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-100">
            {userName}
          </span>
          <span className="text-xs text-emerald-400/80">Connected</span>
        </div>
        <motion.button
          onClick={() => signOut({ callbackUrl: window.location.href })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2"
        >
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
}

