import { ShieldCheck, AlertCircle } from "lucide-react";

interface ConfidenceProps {
  score: number; // 0 to 100
  reason?: string;
}

export default function ConfidenceScore({ score, reason }: ConfidenceProps) {
  // Determine color and label based on score
  const isHigh = score >= 90;
  const isLow = score < 70;
  
  const statusColor = isHigh 
    ? "text-[#D1FF00] bg-[#D1FF00]/10 border-[#D1FF00]/20" 
    : isLow 
    ? "text-red-500 bg-red-500/10 border-red-500/20" 
    : "text-amber-500 bg-amber-500/10 border-amber-500/20";

  return (
    <div
      className={`group relative inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold transition-all hover:scale-105 cursor-help ${statusColor}`}
    >
      {isHigh ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
      
      <span>{score}% CONFIDENCE</span>

      {/* Modern 2026 Tooltip */}
      <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-3 bg-black text-white text-[10px] leading-relaxed rounded-xl shadow-2xl z-50">
        <p className="font-semibold mb-1 uppercase tracking-widest text-[#D1FF00]">AI Reasoning</p>
        <p className="opacity-80">{reason || "Analysis based on historical patterns and real-time data flow."}</p>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}