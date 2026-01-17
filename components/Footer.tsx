"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50" />
              <span className="relative text-lg font-bold text-emerald-400">
                Vera Labs
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Privacy
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            © {currentYear} Vera Labs. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

