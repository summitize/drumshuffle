"use client";

import { useDrumKit } from "../hooks/useDrumKit";
import { DrumPad } from "./DrumPad";
import { DrumPadConfig } from "../types";
import { Play, Square, Circle, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const KIT_CONFIG: DrumPadConfig[] = [
  { id: "crash", label: "Crash", keybind: "q", type: "cymbal", color: "#fbbf24" },
  { id: "splash", label: "Splash", keybind: "w", type: "cymbal", color: "#fbbf24" },
  { id: "ride", label: "Ride", keybind: "e", type: "cymbal", color: "#fbbf24" },
  { id: "china", label: "China", keybind: "r", type: "cymbal", color: "#fbbf24" },
  { id: "hihatOpen", label: "Hi-Hat (O)", keybind: "a", type: "cymbal", color: "#fbbf24" },
  { id: "tom1", label: "Tom 1", keybind: "s", type: "drum", color: "#38bdf8" },
  { id: "tom2", label: "Tom 2", keybind: "d", type: "drum", color: "#38bdf8" },
  { id: "cowbell", label: "Cowbell", keybind: "f", type: "cymbal", color: "#a8a29e" },
  { id: "hihatClosed", label: "Hi-Hat (C)", keybind: "z", type: "cymbal", color: "#fbbf24" },
  { id: "snare", label: "Snare", keybind: "x", type: "drum", color: "#ff3d2e" },
  { id: "kick", label: "Kick", keybind: "c", type: "drum", color: "#a855f7" },
  { id: "floorTom", label: "Floor Tom", keybind: "v", type: "drum", color: "#38bdf8" },
];

export function DrumKitUI() {
  const {
    isReady,
    initAudio,
    playDrum,
    isRecording,
    startRecording,
    stopRecording,
    isPlaying,
    togglePlayback,
    currentRecording
  } = useDrumKit();

  const handleDownload = () => {
    if (currentRecording.length === 0) return;
    const json = JSON.stringify(currentRecording, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drum-loop-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isReady) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center max-w-md w-full"
        >
          <h2 className="font-display font-bold text-3xl text-white mb-4">Pro Drum Simulator</h2>
          <p className="text-night-400 mb-8">
            Experience ultra-low latency, velocity-sensitive drum synthesis right in your browser.
          </p>
          <button 
            onClick={initAudio}
            className="btn-brand w-full justify-center py-4"
          >
            <Play className="w-5 h-5 fill-current" />
            Initialize Audio Engine
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all",
                isRecording 
                  ? "bg-brand-500/20 text-brand-400 border border-brand-500/50 animate-pulse" 
                  : "bg-white/5 text-night-300 hover:text-white hover:bg-white/10"
              )}
            >
              {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Circle className="w-4 h-4 fill-current text-brand-500" />}
              {isRecording ? "Stop Rec" : "Record"}
            </button>
            
            <button
              onClick={() => togglePlayback(currentRecording)}
              disabled={currentRecording.length === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all",
                currentRecording.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10 text-night-300 hover:text-white",
                isPlaying && "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50"
              )}
            >
              {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? "Stop Loop" : "Play Loop"}
            </button>
          </div>

          <button
            onClick={handleDownload}
            disabled={currentRecording.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-night-300 hover:text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
        </div>

        {/* Drum Kit Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-10 glass-card bg-night-950/80 rounded-3xl border-t border-white/10 shadow-2xl relative overflow-hidden">
          {/* Ambient studio glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

          {KIT_CONFIG.map(pad => (
            <DrumPad 
              key={pad.id}
              {...pad}
              onPlay={playDrum}
              isReady={isReady}
            />
          ))}
        </div>

      </motion.div>
    </div>
  );
}
