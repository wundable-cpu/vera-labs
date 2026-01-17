"use client";

import { motion } from "framer-motion";
import type { Session } from "next-auth";
import { ConnectedProfile } from "./connected-profile";
import { ProcessingTerminal } from "./processing-terminal";

interface AuthenticatedViewProps {
  session: Session;
}

export function AuthenticatedView({ session }: AuthenticatedViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-12"
    >
      {/* Connected Profile Card */}
      <div className="mb-8">
        <ConnectedProfile session={session} />
      </div>

      {/* Processing Terminal */}
      <div className="flex items-center justify-center">
        <ProcessingTerminal userName={session.user?.name || "User"} />
      </div>
    </motion.div>
  );
}

