import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { DrumType } from "../types";
import { cn } from "@/lib/utils";

interface DrumPadProps {
  id: DrumType;
  label: string;
  keybind: string;
  type: "drum" | "cymbal";
  color: string;
  onPlay: (id: DrumType, velocity: number) => void;
  isReady: boolean;
}

export function DrumPad({ id, label, keybind, type, color, onPlay, isReady }: DrumPadProps) {
  const controls = useAnimation();
  const padRef = useRef<HTMLButtonElement>(null);

  const hitPad = (velocity: number = 1) => {
    if (!isReady) return;
    
    // Trigger sound
    onPlay(id, velocity);

    // Trigger visual animation based on type
    if (type === "cymbal") {
      controls.start({
        rotate: [0, -10, 8, -5, 3, 0],
        scale: [1, 1.05, 1],
        transition: { duration: 0.6, ease: "easeOut" }
      });
    } else {
      controls.start({
        scale: [1, 0.9, 1],
        boxShadow: [
          `0 0 0 rgba(0,0,0,0)`,
          `0 0 30px ${color}`,
          `0 0 0 rgba(0,0,0,0)`
        ],
        transition: { duration: 0.2 }
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.toLowerCase() === keybind.toLowerCase()) {
        e.preventDefault();
        hitPad(1); // Full velocity for keyboard
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keybind, isReady, onPlay, id]);

  return (
    <motion.button
      ref={padRef}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onPointerDown={(e) => {
        // Simple velocity approximation based on pointer pressure if supported, else 0.8
        const velocity = e.pressure && e.pressure > 0 ? e.pressure : 0.8;
        hitPad(velocity);
      }}
      className={cn(
        "relative flex flex-col items-center justify-center p-4 rounded-full aspect-square touch-none select-none transition-colors",
        type === "cymbal" 
          ? "bg-gradient-to-br from-amber-200/20 to-amber-600/20 border-2 border-amber-500/30 shadow-[inset_0_0_20px_rgba(251,191,36,0.1)] hover:border-amber-500/50"
          : "bg-night-900 border border-white/10 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] hover:bg-night-800"
      )}
      style={type === "drum" ? { borderTop: `4px solid ${color}` } : {}}
    >
      <span className="font-display font-bold text-sm sm:text-base text-white tracking-wider mb-1">
        {label}
      </span>
      <span className="absolute bottom-4 px-2 py-0.5 rounded bg-black/50 text-[10px] font-mono text-night-400 font-bold uppercase">
        {keybind}
      </span>
    </motion.button>
  );
}
