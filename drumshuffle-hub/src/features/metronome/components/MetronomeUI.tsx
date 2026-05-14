"use client";

import { useEffect, useCallback } from "react";
import { useMetronome } from "../hooks/useMetronome";
import { BeatVisualizer } from "./BeatVisualizer";
import { MetronomeControls } from "./MetronomeControls";
import { motion } from "framer-motion";

export function MetronomeUI() {
  const {
    state,
    setState,
    currentBeat,
    currentSub,
    togglePlay,
  } = useMetronome();

  // Keyboard Shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent triggering if typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    } else if (e.code === "ArrowUp") {
      e.preventDefault();
      setState(s => ({ ...s, bpm: Math.min(300, s.bpm + 1) }));
    } else if (e.code === "ArrowDown") {
      e.preventDefault();
      setState(s => ({ ...s, bpm: Math.max(30, s.bpm - 1) }));
    }
  }, [togglePlay, setState]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full">
          Pro Tool
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
          Smart Metronome
        </h1>
        <p className="text-night-400 text-sm sm:text-base max-w-lg mx-auto">
          Precision web-audio metronome. Press <kbd className="bg-white/10 px-1.5 rounded text-white">Space</kbd> to play/stop, and <kbd className="bg-white/10 px-1.5 rounded text-white">↑↓</kbd> for BPM.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <BeatVisualizer 
          beatsPerMeasure={state.beatsPerMeasure}
          currentBeat={currentBeat}
          currentSub={currentSub}
          isPlaying={state.isPlaying}
          accentFirstBeat={state.accentFirstBeat}
        />

        <MetronomeControls 
          state={state}
          setState={setState}
          togglePlay={togglePlay}
        />
      </motion.div>
    </div>
  );
}
