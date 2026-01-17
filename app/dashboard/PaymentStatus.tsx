"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { verifyTransaction } from "@/app/actions/verifyTransaction";

export function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const status = searchParams.get("status");

  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "failed">(
    status === "success" || status === "pending" ? "pending" : "failed"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Poll transaction status if status is success or pending
  useEffect(() => {
    if ((status === "success" || status === "pending") && reference) {
      setIsVerifying(true);
      setVerificationStatus("pending");
      
      // Initial check
      const checkTransaction = async () => {
        try {
          const result = await verifyTransaction(reference);
          
          if (result.status === "success") {
            setVerificationStatus("success");
            setIsVerifying(false);
            // Redirect to Action Plan after a short delay
            setTimeout(() => {
              router.push("/dashboard/action-plan");
            }, 2000);
            return true; // Indicate we should stop polling
          } else if (result.status === "failed") {
            setVerificationStatus("failed");
            setErrorMessage(result.message || "Transaction verification failed");
            setIsVerifying(false);
            return true; // Indicate we should stop polling
          } else {
            // Still pending, continue polling
            setVerificationStatus("pending");
            return false; // Continue polling
          }
        } catch (error) {
          console.error("Error checking transaction:", error);
          setVerificationStatus("failed");
          setErrorMessage("An error occurred while verifying the transaction");
          setIsVerifying(false);
          return true; // Stop polling on error
        }
      };

      // Initial check
      checkTransaction();

      // Set up interval to poll every 3 seconds
      const interval = setInterval(async () => {
        const shouldStop = await checkTransaction();
        if (shouldStop) {
          clearInterval(interval);
        }
      }, 3000);

      // Cleanup interval
      return () => clearInterval(interval);
    }
  }, [status, reference, router]);

  const handleTryAgain = () => {
    setVerificationStatus("pending");
    setErrorMessage("");
    setIsVerifying(true);
    // Trigger immediate check
    if (reference) {
      verifyTransaction(reference).then((result) => {
        if (result.status === "success") {
          setVerificationStatus("success");
          setIsVerifying(false);
          setTimeout(() => {
            router.push("/dashboard/action-plan");
          }, 2000);
        } else if (result.status === "failed") {
          setVerificationStatus("failed");
          setErrorMessage(result.message || "Transaction verification failed");
          setIsVerifying(false);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-950/70 p-8 lg:p-10"
        >
          {/* Background glow effect */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-50/5" />

          <div className="relative flex flex-col items-center text-center space-y-6">
            <AnimatePresence mode="wait">
              {verificationStatus === "pending" && (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center space-y-6"
                >
                  {/* Pulsing circular progress bar */}
                  <div className="relative w-32 h-32">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full border-4 border-emerald-500/30"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                      className="absolute inset-0 rounded-full border-4 border-emerald-500/50"
                    />
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-2 rounded-full border-4 border-transparent border-t-emerald-500"
                    />
                  </div>

                  {/* Text content */}
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-slate-100">
                      Waiting for Mobile Money Authorization...
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Please check your phone for the push notification and enter your PIN.
                    </p>
                  </div>
                </motion.div>
              )}

              {verificationStatus === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center space-y-6"
                >
                  {/* Green checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                  </motion.div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-emerald-400">
                      Payment Successful!
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Redirecting to your Action Plan...
                    </p>
                  </div>
                </motion.div>
              )}

              {verificationStatus === "failed" && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center space-y-6"
                >
                  {/* Error icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center"
                  >
                    <XCircle className="w-16 h-16 text-red-500" />
                  </motion.div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-400">
                      Payment Failed
                    </h2>
                    {errorMessage && (
                      <p className="text-slate-400 text-sm">{errorMessage}</p>
                    )}
                    <motion.button
                      onClick={handleTryAgain}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Paystack logo at the bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-slate-700/50 w-full"
            >
              <p className="text-xs text-slate-500 mb-2">Secure Payment by</p>
              <div className="flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-400">
                  Paystack
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

