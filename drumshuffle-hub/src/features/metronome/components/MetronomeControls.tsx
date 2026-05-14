import { motion } from "framer-motion";
import { Play, Square, Plus, Minus, MousePointerClick } from "lucide-react";
import { MetronomeState, SoundType, Subdivision } from "../types";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface MetronomeControlsProps {
  state: MetronomeState;
  setState: React.Dispatch<React.SetStateAction<MetronomeState>>;
  togglePlay: () => void;
}

export function MetronomeControls({ state, setState, togglePlay }: MetronomeControlsProps) {
  const lastTap = useRef<number>(0);

  const handleTapTempo = () => {
    const now = performance.now();
    if (lastTap.current) {
      const delta = now - lastTap.current;
      if (delta > 300 && delta < 2000) { // between 30 and 200 BPM
        const newBpm = Math.round(60000 / delta);
        setState(s => ({ ...s, bpm: newBpm }));
      }
    }
    lastTap.current = now;
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(s => ({ ...s, bpm: Number(e.target.value) }));
  };

  const adjustBpm = (amount: number) => {
    setState(s => ({ ...s, bpm: Math.max(30, Math.min(300, s.bpm + amount)) }));
  };

  return (
    <div className="glass-card p-6 sm:p-8 w-full max-w-2xl mx-auto space-y-8">
      
      {/* BPM Display and Controls */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-6 w-full">
          <button onClick={() => adjustBpm(-1)} className="p-3 rounded-full hover:bg-white/5 text-night-400 hover:text-white transition">
            <Minus className="w-6 h-6" />
          </button>
          
          <div className="text-center min-w-[120px]">
            <span className="font-display font-black text-6xl sm:text-7xl tracking-tighter text-white">
              {state.bpm}
            </span>
            <span className="block text-night-400 font-bold uppercase tracking-widest text-sm mt-1">
              BPM
            </span>
          </div>
          
          <button onClick={() => adjustBpm(1)} className="p-3 rounded-full hover:bg-white/5 text-night-400 hover:text-white transition">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <input 
          type="range" 
          min="30" max="300" 
          value={state.bpm} 
          onChange={handleBpmChange}
          className="w-full max-w-md accent-brand-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
        
        {/* Time Signature */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-semibold">Beats</label>
          <select 
            value={state.beatsPerMeasure} 
            onChange={(e) => setState(s => ({ ...s, beatsPerMeasure: Number(e.target.value) }))}
            className="bg-white/5 border border-white/10 text-white rounded-lg p-2.5 outline-none focus:border-brand-500 transition-colors"
          >
            {[2,3,4,5,6,7,8,9,12].map(n => (
              <option key={n} value={n} className="bg-night-900">{n} / 4</option>
            ))}
          </select>
        </div>

        {/* Subdivision */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-semibold">Subdivision</label>
          <select 
            value={state.subdivision} 
            onChange={(e) => setState(s => ({ ...s, subdivision: e.target.value as Subdivision }))}
            className="bg-white/5 border border-white/10 text-white rounded-lg p-2.5 outline-none focus:border-brand-500 transition-colors"
          >
            <option value="quarter" className="bg-night-900">Quarter (1)</option>
            <option value="eighth" className="bg-night-900">Eighth (2)</option>
            <option value="triplet" className="bg-night-900">Triplet (3)</option>
            <option value="sixteenth" className="bg-night-900">16th (4)</option>
          </select>
        </div>

        {/* Sound Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-semibold">Sound</label>
          <select 
            value={state.soundType} 
            onChange={(e) => setState(s => ({ ...s, soundType: e.target.value as SoundType }))}
            className="bg-white/5 border border-white/10 text-white rounded-lg p-2.5 outline-none focus:border-brand-500 transition-colors"
          >
            <option value="digital" className="bg-night-900">Digital</option>
            <option value="woodblock" className="bg-night-900">Woodblock</option>
            <option value="cowbell" className="bg-night-900">Cowbell</option>
          </select>
        </div>

        {/* Accent Toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-semibold">Accent</label>
          <button
            onClick={() => setState(s => ({ ...s, accentFirstBeat: !s.accentFirstBeat }))}
            className={cn(
              "w-full p-2.5 rounded-lg border font-semibold transition-colors",
              state.accentFirstBeat 
                ? "bg-brand-500/20 border-brand-500 text-brand-400" 
                : "bg-white/5 border-white/10 text-night-400 hover:text-white"
            )}
          >
            {state.accentFirstBeat ? "On" : "Off"}
          </button>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleTapTempo}
          className="flex-1 btn-ghost justify-center h-14"
        >
          <MousePointerClick className="w-5 h-5" />
          Tap
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={togglePlay}
          className={cn(
            "flex-[2] flex items-center justify-center gap-2 h-14 rounded-xl font-bold text-lg text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
            state.isPlaying 
              ? "bg-white/10 hover:bg-white/20 border border-white/10" 
              : "bg-brand-500 hover:bg-brand-600 shadow-[0_4px_20px_rgba(255,61,46,0.4)]"
          )}
        >
          {state.isPlaying ? (
            <>
              <Square className="w-5 h-5 fill-current" /> Stop
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" /> Play
            </>
          )}
        </motion.button>
      </div>

    </div>
  );
}
