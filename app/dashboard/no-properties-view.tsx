"use client";

import { motion } from "framer-motion";
import { AlertCircle, Database, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface NoPropertiesViewProps {
  onUseDemoData: () => void;
}

export function NoPropertiesView({ onUseDemoData }: NoPropertiesViewProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-8 lg:p-12 shadow-xl"
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 rounded-full bg-amber-500/10 border border-amber-500/20"
        >
          <AlertCircle className="h-12 w-12 text-amber-400" />
        </motion.div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
          No Active Properties Found
        </h2>

        {/* Description */}
        <p className="text-slate-400 mb-8 leading-relaxed">
          We couldn't find any Google Analytics 4 properties connected to your account.
          You can explore the dashboard with demo data, or set up a GA4 property to see
          your actual analytics insights.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <motion.button
            onClick={onUseDemoData}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:border-emerald-500/50"
          >
            <Database className="h-4 w-4" />
            <span>Use Demo Data for Audit</span>
          </motion.button>

          <motion.a
            href="https://support.google.com/analytics/answer/9304153"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700/50 hover:text-slate-100"
          >
            <span>Set Up GA4 Property</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Demo Account Link */}
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <p className="text-sm text-slate-500 mb-3">
            Want to test with sample data?
          </p>
          <motion.a
            href="https://support.google.com/analytics/answer/6367342"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
          >
            <span>Access Google Analytics Demo Account</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

