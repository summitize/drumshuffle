import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeatVisualizerProps {
  beatsPerMeasure: number;
  currentBeat: number;
  currentSub: number;
  isPlaying: boolean;
  accentFirstBeat: boolean;
}

export function BeatVisualizer({ beatsPerMeasure, currentBeat, currentSub, isPlaying, accentFirstBeat }: BeatVisualizerProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 my-8 p-6 glass-card w-full max-w-2xl mx-auto overflow-hidden relative">
      {/* Background glow syncing with beat 1 */}
      {isPlaying && currentBeat === 0 && currentSub === 0 && accentFirstBeat && (
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-brand-500/20 blur-3xl rounded-full"
        />
      )}

      {Array.from({ length: beatsPerMeasure }).map((_, i) => {
        const isCurrentBeat = isPlaying && currentBeat === i;
        const isAccent = i === 0 && accentFirstBeat;
        
        return (
          <div key={i} className="flex flex-col items-center gap-2 relative z-10">
            <motion.div
              animate={{
                scale: isCurrentBeat && currentSub === 0 ? (isAccent ? 1.2 : 1.1) : 1,
                opacity: isCurrentBeat ? 1 : 0.3,
                y: isCurrentBeat && currentSub === 0 ? -4 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl sm:text-2xl transition-colors duration-200 border",
                isCurrentBeat
                  ? isAccent 
                    ? "bg-brand-500 text-white border-brand-400 shadow-[0_0_20px_rgba(255,61,46,0.5)]" 
                    : "bg-white/10 text-white border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.02] text-night-500 border-white/5"
              )}
            >
              {i + 1}
            </motion.div>
            
            {/* Subdivisions indicators (dots) - visible when active */}
            <div className="flex gap-1 h-2">
              {isCurrentBeat && currentSub > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
