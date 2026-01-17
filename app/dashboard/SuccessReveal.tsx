"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";

interface SuccessRevealProps {
  children: React.ReactNode;
  isUnlocked: boolean;
  className?: string;
}

export function SuccessReveal({ children, isUnlocked, className = "" }: SuccessRevealProps) {
  const [showOverlay, setShowOverlay] = useState(!isUnlocked);
  const [hasPlayedSound, setHasPlayedSound] = useState(false);
  const [showShatter, setShowShatter] = useState(false);
  const prevUnlockedRef = useRef(isUnlocked);

  // Handle unlock transition
  useEffect(() => {
    // Detect when isUnlocked changes from false to true
    if (isUnlocked && !prevUnlockedRef.current && showOverlay) {
      // Play sound effect once
      if (!hasPlayedSound) {
        try {
          // Create a simple unlock sound using Web Audio API
          // This creates a brief electronic unlock sound
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);

          setHasPlayedSound(true);
        } catch (error) {
          console.log("Audio not available:", error);
        }
      }

      // Show shatter animation
      setShowShatter(true);

      // Delay hiding overlay to show animation
      const timer = setTimeout(() => {
        setShowOverlay(false);
        setShowShatter(false);
      }, 600); // Hide after shatter animation completes

      return () => clearTimeout(timer);
    }

    // Update previous value
    prevUnlockedRef.current = isUnlocked;
  }, [isUnlocked, showOverlay, hasPlayedSound]);

  // Shatter pieces animation variants
  const shatterVariants = {
    hidden: { opacity: 1, scale: 1, rotate: 0 },
    visible: (index: number) => {
      const positions = [
        { x: -2000, y: -2000, rotate: -180 }, // Top-left
        { x: 2000, y: -2000, rotate: 180 }, // Top-right
        { x: -2000, y: 2000, rotate: -180 }, // Bottom-left
        { x: 2000, y: 2000, rotate: 180 }, // Bottom-right
      ];
      return {
        opacity: 0,
        x: positions[index].x,
        y: positions[index].y,
        rotate: positions[index].rotate,
        scale: 0.5,
        transition: {
          duration: 0.6,
          ease: "easeIn",
        },
      };
    },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Content with scale and glow effect */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{
          scale: isUnlocked ? 1 : 0.95,
          opacity: isUnlocked ? 1 : 0.7,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className={`relative transition-shadow duration-600 ${
          isUnlocked ? "drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]" : ""
        }`}
      >
        {children}
      </motion.div>

      {/* Frosted glass overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 z-10 overflow-hidden rounded-2xl"
          >
            {/* Shatter pieces - only show when unlocking */}
            {showShatter && (
              <>
                {/* Top-left piece */}
                <motion.div
                  custom={0}
                  variants={shatterVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-0 left-0 w-1/2 h-1/2 bg-slate-900/80 backdrop-blur-xl border-r border-b border-slate-700/50"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  }}
                />
                {/* Top-right piece */}
                <motion.div
                  custom={1}
                  variants={shatterVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-0 right-0 w-1/2 h-1/2 bg-slate-900/80 backdrop-blur-xl border-l border-b border-slate-700/50"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                  }}
                />
                {/* Bottom-left piece */}
                <motion.div
                  custom={2}
                  variants={shatterVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-slate-900/80 backdrop-blur-xl border-r border-t border-slate-700/50"
                  style={{
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                  }}
                />
                {/* Bottom-right piece */}
                <motion.div
                  custom={3}
                  variants={shatterVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-slate-900/80 backdrop-blur-xl border-l border-t border-slate-700/50"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  }}
                />
              </>
            )}

            {/* Overlay content with lock icon - more transparent to show teaser */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: showShatter ? 0 : 1 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm rounded-2xl flex items-center justify-center pointer-events-none"
            >
              {/* Lock/Unlock Icon - smaller badge style */}
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={
                  isUnlocked && !showShatter
                    ? {
                        scale: [1, 1.3, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <AnimatePresence mode="wait">
                  {isUnlocked && !showShatter ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="p-3 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lock"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="p-3 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30"
                    >
                      <Lock className="w-8 h-8 text-amber-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

