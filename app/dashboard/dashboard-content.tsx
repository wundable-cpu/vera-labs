"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { Mic2, AlertTriangle, Waves, Loader2, ExternalLink, Download } from "lucide-react";
import type { Session } from "next-auth";
import { PropertySelector } from "./property-selector";
import { generateVoiceBriefing } from "@/app/actions/generateVoiceBriefing";
import { generateBusinessInsights } from "@/app/actions/generateBusinessInsights";
import { initializePayment } from "@/app/actions/paystack";
import { NoPropertiesView } from "./no-properties-view";
import { useRouter, useSearchParams } from "next/navigation";
import { generateAuditPDF } from "@/utils/generateAuditPDF";
import { SuccessReveal } from "./SuccessReveal";
import ConfidenceScore from "@/components/ConfidenceScore";
import { getAuditedStats } from "@/utils/getAuditedStats";
import confetti from "canvas-confetti";

interface BusinessInsight {
  plainExplanation: string;
  quantifiedRevenueLoss: string;
  nonTechnicalSteps: string[];
}

interface AnalyticsData {
  activeUsers?: number;
  conversions?: number;
  sessions?: number;
  leakingRevenue?: number;
  topCulprit?: string;
  recoveryPotential?: string;
  businessInsights?: BusinessInsight;
  error?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

interface Property {
  id: string;
  displayName: string;
}

interface DashboardContentProps {
  session: Session;
  analyticsData: AnalyticsData;
  properties: Property[];
  currentPropertyId?: string;
  isDemoMode?: boolean;
  hasPropertiesError?: boolean;
}

// Equalizer animation component
function EqualizerIcon() {
  const bars = [
    [0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.3], // Bar 1 keyframes
    [0.5, 0.9, 0.4, 0.8, 0.6, 0.7, 0.5], // Bar 2 keyframes
    [0.7, 1, 0.6, 0.9, 0.8, 0.95, 0.7],  // Bar 3 keyframes (tallest)
    [0.4, 0.6, 0.5, 0.7, 0.45, 0.65, 0.4], // Bar 4 keyframes
    [0.3, 0.5, 0.4, 0.6, 0.35, 0.55, 0.3], // Bar 5 keyframes
  ];

  return (
    <div className="flex items-end gap-0.5 h-4">
      {bars.map((keyframes, index) => (
        <motion.div
          key={index}
          className="w-0.5 bg-purple-400 rounded-sm"
          animate={{
            scaleY: keyframes,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
          style={{ height: "100%" }}
        />
      ))}
    </div>
  );
}

export function DashboardContent({
  session,
  analyticsData,
  properties,
  currentPropertyId,
  isDemoMode = false,
  hasPropertiesError = false,
}: DashboardContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = session.user?.name || "User";
  
  // Check payment status from URL params
  const status = searchParams.get("status");
  const [isPaid, setIsPaid] = useState(status === "success" || status === "successful");
  const hasTriggeredConfetti = useRef(false);

  // Check payment status and trigger unlock
  useEffect(() => {
    if (status === "success" || status === "successful") {
      setIsPaid(true);

      // Trigger confetti explosion (only once)
      if (!hasTriggeredConfetti.current) {
        hasTriggeredConfetti.current = true;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"], // Emerald theme
        });

        // Clean up URL after 3 seconds
        const cleanupTimer = setTimeout(() => {
          router.replace("/dashboard");
        }, 3000);

        return () => clearTimeout(cleanupTimer);
      }
    }
    // Note: Once paid, keep it paid (don't reset when URL is cleaned)
  }, [status, router]);

  const handleUseDemoData = () => {
    router.push("/dashboard?demo=true");
  };

  // Show no properties view if we have no properties and not in demo mode
  const shouldShowNoPropertiesView = properties.length === 0 && !isDemoMode;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format numbers with commas
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "N/A";
    return num.toLocaleString();
  };

  // Calculate estimated revenue loss (example calculation based on conversions drop)
  const activeUsers = analyticsData.activeUsers || 0;
  const conversions = analyticsData.conversions || 0;
  const sessions = analyticsData.sessions || 0;
  
  const auditedStats = getAuditedStats({
    activeUsers: analyticsData.activeUsers,
    error: analyticsData.error,
    isDemoMode,
  });

  // Calculate conversion rate percentage
  const conversionRate = activeUsers > 0 ? ((conversions / activeUsers) * 100).toFixed(1) : "0.0";
  
  // Calculate leaking revenue (use demo data if available, otherwise calculate)
  const leakingRevenue = analyticsData.leakingRevenue || (isDemoMode 
    ? 12450 
    : (activeUsers - conversions) * 45); // Estimate based on lost conversions
  
  // Get demo mode specific data
  const topCulprit = analyticsData.topCulprit || "Mobile checkout abandonment";
  const recoveryPotential = analyticsData.recoveryPotential || "+18% Conversion lift";
  
  // Last updated timestamp
  const lastUpdated = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // AI Insight text for voice briefing (uses specific demo script in demo mode)
  const insightText = isDemoMode
    ? `Hello ${userName.split(" ")[0] || "there"}, I've analyzed your store data. I've found a $12,000 monthly leak caused by mobile checkout drops. I recommend optimizing your image payloads immediately.`
    : `AI Insight: Mobile checkout abandonment increased by 18% following a recent site update on December 23rd. High-intent users with 3 or more page views are leaving at a 34% higher rate than last month. Payment form load time increased to 3.2 seconds, up from 1.1 seconds, directly correlating with the drop.`;

  // Audio playback state
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // PDF generation state
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePlayBriefing = async () => {
    try {
      // If already playing, stop it
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
        return;
      }

      setIsLoadingAudio(true);
      setIsPlaying(false);

      // Generate voice briefing
      const result = await generateVoiceBriefing(insightText, "onyx");

      if (result.error || !result.audioBase64) {
        console.error("Error generating voice briefing:", result.error);
        setIsLoadingAudio(false);
        return;
      }

      // Create audio element with Base64 data
      const audioSrc = `data:audio/mpeg;base64,${result.audioBase64}`;
      const audio = new Audio(audioSrc);

      // Set up event listeners
      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        audioRef.current = null;
      });
      audio.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
        setIsLoadingAudio(false);
        audioRef.current = null;
      });

      audioRef.current = audio;
      setIsLoadingAudio(false);

      // Play the audio
      await audio.play();
    } catch (error) {
      console.error("Error playing briefing:", error);
      setIsLoadingAudio(false);
      setIsPlaying(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-trigger AI briefing in demo mode
  useEffect(() => {
    if (isDemoMode && !isLoadingAudio && !isPlaying && !audioRef.current) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        handlePlayBriefing();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDemoMode]); // Only run when demo mode changes

  // Handle payment initialization
  const handleUnlockPayment = async () => {
    try {
      const userEmail = session.user?.email;
      if (!userEmail) {
        console.error("User email not found");
        return;
      }

      const paystackUrl = await initializePayment(userEmail, 50); // 50 GHS
      
      if (paystackUrl) {
        window.location.href = paystackUrl;
      } else {
        console.error("Failed to initialize payment");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  // Handle PDF generation
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    // Generate PDF with current data
    try {
      // Generate business insights if not already available
      let businessInsights = analyticsData.businessInsights;
      if (!businessInsights && topCulprit) {
        const insightResult = await generateBusinessInsights(
          `${topCulprit}. ${insightText}`,
          leakingRevenue
        );
        if (insightResult.insights) {
          businessInsights = insightResult.insights;
        }
      }
      
      await generateAuditPDF(
        { name: userName },
        {
          leakingRevenue: leakingRevenue,
          activeUsers: analyticsData.activeUsers,
          conversions: analyticsData.conversions,
          sessions: analyticsData.sessions,
          topCulprit: topCulprit,
          recoveryPotential: recoveryPotential,
          insightText: insightText,
          businessInsights: businessInsights,
        },
        isPaid
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Small delay to ensure PDF download starts
      setTimeout(() => {
        setIsGeneratingPDF(false);
      }, 500);
    }
  };

  // Show no properties view if we have no properties and not in demo mode
  if (shouldShowNoPropertiesView) {
    return (
      <div className="min-h-screen bg-background p-6 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
                  Diagnostic Report for {userName}
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <motion.button
                onClick={() => signOut({ callbackUrl: "/" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition-colors text-sm font-medium"
              >
                Sign Out
              </motion.button>
            </div>
          </div>

          {/* No Properties View */}
          <NoPropertiesView onUseDemoData={handleUseDemoData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
                    Diagnostic Report for {userName}
                  </h1>
                  {isDemoMode && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Demo Mode Active
                    </motion.span>
                  )}
                </div>
                <p className="text-slate-400 text-sm sm:text-base">{currentDate}</p>
              </div>
              {!isDemoMode && (
                <PropertySelector
                  properties={properties}
                  currentPropertyId={currentPropertyId}
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                whileHover={!isGeneratingPDF ? { scale: 1.05 } : {}}
                whileTap={!isGeneratingPDF ? { scale: 0.95 } : {}}
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download PDF Report</span>
                  </>
                )}
              </motion.button>
              {isDemoMode && (
                <motion.a
                  href="https://support.google.com/analytics/answer/9304153"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:border-emerald-500/50"
                >
                  <span>Add Your First Site</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
              <motion.button
                onClick={() => signOut({ callbackUrl: "/" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition-colors text-sm font-medium"
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-[#D1FF00]/20 bg-black/80 p-6 sm:p-8 shadow-[0_0_40px_rgba(209,255,0,0.12)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                  Current Active Users
                </h2>
                <ConfidenceScore
                  score={auditedStats.confidenceScore}
                  reason={auditedStats.confidenceReason}
                />
              </div>
              <p className="text-sm text-slate-400">
                Real-time signal from your connected analytics property.
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#D1FF00]">
                {analyticsData.error ? "—" : formatNumber(auditedStats.activeUsers)}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D1FF00]/70 mt-2">
                Active Users
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Leaking Revenue Card - Large, spans 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 lg:p-8 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-slate-200">
                    Leaking Revenue
                  </h2>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Diagnostic Complete
                  </motion.span>
                </div>
                <p className="text-sm text-slate-400">Estimated monthly loss</p>
              </div>
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500/30 rounded-full blur-xl"
                />
                <AlertTriangle className="h-6 w-6 text-red-400 relative z-10" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl lg:text-6xl font-bold text-red-400">
                  {analyticsData.error ? (
                    "Error"
                  ) : (
                    `-$${leakingRevenue.toLocaleString()}`
                  )}
                </span>
                <span className="text-lg text-slate-400">/month</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-red-500"
                />
                <span className="text-sm font-medium text-red-400">
                  High Alert
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                {analyticsData.error
                  ? analyticsData.error
                  : isDemoMode
                  ? `Identified Leaks: $12,450 / month. Top Culprit: ${topCulprit}. Recovery Potential: ${recoveryPotential}.`
                  : `Estimated revenue loss based on ${formatNumber(activeUsers)} active users and ${formatNumber(conversions)} conversions`}
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Last updated: {lastUpdated}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-slate-200">Revenue Leak Detected</h3>
              <ConfidenceScore
                score={94}
                reason="Pattern matches 8 previous drop-offs in the 'Checkouts' funnel."
              />
            </div>
            <p className="text-sm text-slate-400">
              GHS 1,200 is being lost daily due to a broken Mobile Money callback URL.
            </p>
          </motion.div>

          {/* AI Insight Card - Medium size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 lg:p-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                  <Mic2 className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-200">
                  AI Insight
                </h2>
              </div>
              <motion.button
                onClick={handlePlayBriefing}
                disabled={isLoadingAudio}
                whileHover={!isLoadingAudio ? { scale: 1.05 } : {}}
                whileTap={!isLoadingAudio ? { scale: 0.95 } : {}}
                className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-500/20 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingAudio ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <EqualizerIcon />
                    <span>Playing...</span>
                  </>
                ) : (
                  <>
                    <Waves className="h-4 w-4" />
                    <span>Play Briefing</span>
                  </>
                )}
              </motion.button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Mobile checkout abandonment increased by 18% following a
                  recent site update on December 23rd.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  High-intent users (3+ page views) are leaving at a 34% higher
                  rate than last month.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Payment form load time increased to 3.2s (was 1.1s), directly
                  correlating with the drop.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          {/* GA4 Raw Data Card - Spans full width on large screens, 2 columns on medium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 md:col-span-2 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 lg:p-8 shadow-xl"
          >
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              GA4 Raw Data
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">
                      Metric
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-300">
                      Value
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-300">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  <tr>
                    <td className="py-4 px-4 text-sm text-slate-400">
                      Active Users
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-slate-200 text-right">
                      {formatNumber(analyticsData.activeUsers)}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 text-right">
                      Last 7 days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm text-slate-400">Sessions</td>
                    <td className="py-4 px-4 text-sm font-semibold text-slate-200 text-right">
                      {formatNumber(analyticsData.sessions)}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 text-right">
                      Last 7 days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm text-slate-400">
                      Conversions
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-slate-200 text-right">
                      {formatNumber(analyticsData.conversions)}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 text-right">
                      Last 7 days
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-slate-500 mt-4">
                Last updated: {lastUpdated}
              </p>
            </div>
          </motion.div>
          
          {/* Action Plan Card - Premium (wrapped in SuccessReveal) */}
          <SuccessReveal isUnlocked={isPaid}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 lg:p-8 shadow-xl"
            >
              <h2 className="text-lg font-semibold text-slate-200 mb-6">
                Action Plan
              </h2>
              {!isPaid ? (
                // Teaser content (locked state)
                <div className="relative space-y-4">
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      AI has identified a specific database query causing your 4s delay...
                    </p>
                    {/* Blurred Code Block */}
                    <div className="relative rounded-lg border border-slate-700/50 bg-slate-950/60 p-4 overflow-hidden">
                      <pre className="text-xs font-mono text-slate-400 select-none blur-sm">
                        <code>{`SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE o.status = 'pending'
  AND o.created_at > NOW() - INTERVAL '30 days'
  AND c.subscription_tier IN ('premium', 'enterprise')
ORDER BY o.created_at DESC
LIMIT 100;`}</code>
                      </pre>
                      {/* Overlay to enhance blur effect */}
                      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md pointer-events-none" />
                    </div>
                    {/* Value Tag */}
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Estimated Revenue Recovery: +GHS 2,400/mo.
                    </div>
                  </div>
                  {/* Unlock Button */}
                  <motion.button
                    onClick={handleUnlockPayment}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-lg border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-shadow flex items-center justify-center gap-2"
                  >
                    <span>Unlock Full Report (GHS 50)</span>
                    <span className="text-lg">→</span>
                  </motion.button>
                </div>
              ) : (
                // Full content (unlocked state)
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <h3 className="text-sm font-semibold text-emerald-400 mb-2">
                      Priority 1: Mobile Checkout Optimization
                    </h3>
                    <p className="text-sm text-slate-300">
                      Reduce mobile checkout latency from 4.2s to under 2s. Expected impact: +18% conversion lift.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h3 className="text-sm font-semibold text-blue-400 mb-2">
                      Priority 2: Image Payload Optimization
                    </h3>
                    <p className="text-sm text-slate-300">
                      Optimize product images to reduce load time. Target: 50% reduction in image payload size.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h3 className="text-sm font-semibold text-purple-400 mb-2">
                      Priority 3: Form Validation Optimization
                    </h3>
                    <p className="text-sm text-slate-300">
                      Streamline checkout form validation to reduce submission latency from 3.2s to 1.1s.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <h3 className="text-sm font-semibold text-amber-400 mb-2">
                      Priority 4: Payment Method Caching
                    </h3>
                    <p className="text-sm text-slate-300">
                      Implement payment method caching to improve repeat checkout experience.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-2">
                      Priority 5: Mobile-Specific Optimizations
                    </h3>
                    <p className="text-sm text-slate-300">
                      Apply mobile-specific performance optimizations to reduce overall page load time by 40%.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </SuccessReveal>

          {/* Technical Fixes Card - Premium (wrapped in SuccessReveal) */}
          <SuccessReveal isUnlocked={isPaid}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 lg:p-8 shadow-xl"
            >
              <h2 className="text-lg font-semibold text-slate-200 mb-6">
                Technical Fixes
              </h2>
              {!isPaid ? (
                // Teaser content (locked state) - titles visible, details blurred
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">1.</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">Optimize Image Payloads</p>
                      <div className="relative mt-1">
                        <p className="text-xs text-slate-400 blur-sm select-none">
                          Implement lazy loading with intersection observer API. Use WebP format with fallbacks. Target: 50% reduction in payload size. Code: const observer = new IntersectionObserver(configure callback handlers)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">2.</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">Reduce Checkout Form Latency</p>
                      <div className="relative mt-1">
                        <p className="text-xs text-slate-400 blur-sm select-none">
                          Debounce validation calls. Use requestIdleCallback for non-critical validations. Optimize regex patterns. Expected: 3.2s → 1.1s. Implementation: async function validateForm() with validation logic
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">3.</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">Implement Payment Method Caching</p>
                      <div className="relative mt-1">
                        <p className="text-xs text-slate-400 blur-sm select-none">
                          Cache payment methods in localStorage with 24h TTL. Use indexedDB for larger datasets. Reduces API calls by 70%. Code: const cachePaymentMethods = () with caching implementation
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Unlock Button */}
                  <motion.button
                    onClick={handleUnlockPayment}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 rounded-lg border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-shadow flex items-center justify-center gap-2"
                  >
                    <span>Unlock Full Report (GHS 50)</span>
                    <span className="text-lg">→</span>
                  </motion.button>
                </div>
              ) : (
                // Full content (unlocked state)
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">1.</span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Optimize Image Payloads</p>
                      <p className="text-xs text-slate-400 mt-1">Implement lazy loading with intersection observer API. Use WebP format with fallbacks. Target: 50% reduction in payload size.</p>
                      <pre className="text-xs text-slate-500 mt-2 p-2 bg-slate-800/50 rounded border border-slate-700/50 overflow-x-auto">
                        <code>{`const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
      }
    });
  }
);`}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">2.</span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Reduce Checkout Form Latency</p>
                      <p className="text-xs text-slate-400 mt-1">Debounce validation calls. Use requestIdleCallback for non-critical validations. Optimize regex patterns. Expected: 3.2s → 1.1s.</p>
                      <pre className="text-xs text-slate-500 mt-2 p-2 bg-slate-800/50 rounded border border-slate-700/50 overflow-x-auto">
                        <code>{`async function validateForm() {
  await requestIdleCallback(() => {
    // Non-critical validation
  });
  // Critical validation runs immediately
}`}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">3.</span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Implement Payment Method Caching</p>
                      <p className="text-xs text-slate-400 mt-1">Cache payment methods in localStorage with 24h TTL. Use indexedDB for larger datasets. Reduces API calls by 70%.</p>
                      <pre className="text-xs text-slate-500 mt-2 p-2 bg-slate-800/50 rounded border border-slate-700/50 overflow-x-auto">
                        <code>{`const cachePaymentMethods = () => {
  const cached = localStorage.getItem('paymentMethods');
  if (cached && isCacheValid(cached)) {
    return JSON.parse(cached);
  }
  // Fetch and cache new data
};`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </SuccessReveal>
        </div>
      </div>
    </div>
  );
}

