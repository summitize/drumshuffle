'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Plus, Minus, Music } from 'lucide-react'
import { MetronomeState, SoundType, Subdivision } from '../types'
import { cn } from '@/lib/utils'

interface MetronomeControlsProps {
  state: MetronomeState
  setState: React.Dispatch<React.SetStateAction<MetronomeState>>
  togglePlay: () => void
}

export function MetronomeControls({ state, setState, togglePlay }: MetronomeControlsProps) {
  const lastTap = useRef<number>(0)
  const [isTapping, setIsTapping] = useState(false)
  const tappingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const knobRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startAngle = useRef(0)
  const startBpm = useRef(120)

  // Handle Tap Tempo
  const handleTapTempo = () => {
    const now = performance.now()
    setIsTapping(true)
    
    if (tappingTimeoutRef.current) {
      clearTimeout(tappingTimeoutRef.current)
    }
    
    tappingTimeoutRef.current = setTimeout(() => {
      setIsTapping(false)
    }, 1800)

    if (lastTap.current) {
      const delta = now - lastTap.current
      if (delta > 200 && delta < 2000) { // between 30 and 300 BPM
        const newBpm = Math.round(60000 / delta)
        setState(s => ({ ...s, bpm: Math.max(30, Math.min(300, newBpm)) }))
      }
    }
    lastTap.current = now
  }

  // Adjust BPM
  const adjustBpm = (amount: number) => {
    setState(s => ({ ...s, bpm: Math.max(30, Math.min(300, s.bpm + amount)) }))
  }

  // Pointer/Mouse Drag for Rotary Knob
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!knobRef.current) return
    isDragging.current = true
    knobRef.current.setPointerCapture(e.pointerId)

    const rect = knobRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    startAngle.current = angleRad * (180 / Math.PI)
    startBpm.current = state.bpm
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !knobRef.current) return

    const rect = knobRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    const currentAngle = angleRad * (180 / Math.PI)

    // Calculate difference in degrees
    let angleDiff = currentAngle - startAngle.current
    if (angleDiff > 180) angleDiff -= 360
    if (angleDiff < -180) angleDiff += 360

    // Map degrees to BPM change (1 degree = ~1.2 BPM)
    const bpmChange = Math.round(angleDiff * 0.8)
    const nextBpm = Math.max(30, Math.min(300, startBpm.current + bpmChange))
    
    setState(s => ({ ...s, bpm: nextBpm }))
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false
    if (knobRef.current) {
      knobRef.current.releasePointerCapture(e.pointerId)
    }

    // If it was just a quick tap without drag
    const rect = knobRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dragDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY)
      
      // Tap detected if user clicks inside the center of the knob
      if (dragDistance < 80) {
        handleTapTempo()
      }
    }
  }

  // Visual subdivision details
  const getSubdivisionDetails = (sub: Subdivision) => {
    switch (sub) {
      case 'quarter':
        return { label: '1/4', beats: 1 }
      case 'eighth':
        return { label: '1/8', beats: 2 }
      case 'triplet':
        return { label: 'Triplet', beats: 3 }
      case 'sixteenth':
        return { label: '1/16', beats: 4 }
    }
  }

  const subDetails = getSubdivisionDetails(state.subdivision)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tappingTimeoutRef.current) clearTimeout(tappingTimeoutRef.current)
    }
  }, [])

  // Calculate circular stroke details
  const radius = 100
  const circumference = 2 * Math.PI * radius
  const bpmPercent = (state.bpm - 30) / 270
  const strokeDashoffset = circumference - bpmPercent * circumference

  return (
    <div className="glass-card p-8 sm:p-10 w-full max-w-2xl mx-auto space-y-10 relative overflow-hidden">
      {/* Background glow behind knob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Rotary Knob Section */}
      <div className="flex flex-col items-center gap-6 select-none">
        
        <div className="flex items-center gap-8 w-full justify-center">
          
          {/* Decrement Button */}
          <button 
            onClick={() => adjustBpm(-1)} 
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-night-400 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all"
            title="Decrease 1 BPM"
          >
            <Minus className="w-5 h-5" />
          </button>

          {/* Interactive Rotary Dial */}
          <div
            ref={knobRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-64 h-64 rounded-full bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] touch-none group hover:border-brand-500/30 transition-all duration-300"
          >
            {/* Liquid glass ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              {/* Background Track */}
              <circle
                cx="128"
                cy="128"
                r={radius}
                className="stroke-white/[0.03] fill-none"
                strokeWidth="10"
              />
              {/* Glowing Active Track */}
              <circle
                cx="128"
                cy="128"
                r={radius}
                className="stroke-brand-500 fill-none transition-all duration-150"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Notch indicator wheel */}
            <div 
              className="absolute inset-0 transition-transform duration-100 pointer-events-none"
              style={{ transform: `rotate(${(state.bpm - 30) / 270 * 270 - 135}deg)` }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(255,61,46,0.8)]" />
            </div>

            {/* Inner Dashboard */}
            <div className="absolute inset-8 rounded-full bg-night-950/60 border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-md">
              {/* Time signature & Subdivision Info */}
              <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                <Music className="w-3 h-3" />
                {state.beatsPerMeasure}/4 &bull; {subDetails?.label}
              </span>

              {/* Large BPM value */}
              <span className="font-display font-black text-6xl sm:text-7xl tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                {state.bpm}
              </span>

              {/* Tapping feature label */}
              <span className="text-xs font-bold text-night-400 uppercase tracking-widest mt-1.5 min-h-[16px]">
                {isTapping ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-brand-400 animate-pulse"
                  >
                    Keep tapping...
                  </motion.span>
                ) : (
                  'BPM'
                )}
              </span>
            </div>
          </div>

          {/* Increment Button */}
          <button 
            onClick={() => adjustBpm(1)} 
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-night-400 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all"
            title="Increase 1 BPM"
          >
            <Plus className="w-5 h-5" />
          </button>

        </div>

        {/* Info drag prompt */}
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-2">
          Drag wheel to rotate &bull; Tap center to set tempo
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-6 border-t border-white/10 relative z-10">
        
        {/* Time Signature */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-bold">Beats</label>
          <select 
            value={state.beatsPerMeasure} 
            onChange={(e) => setState(s => ({ ...s, beatsPerMeasure: Number(e.target.value) }))}
            className="bg-white/5 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-brand-500 transition-colors"
          >
            {[2,3,4,5,6,7,8,9,12].map(n => (
              <option key={n} value={n} className="bg-night-950">{n} / 4</option>
            ))}
          </select>
        </div>

        {/* Subdivision */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-bold">Subdivision</label>
          <select 
            value={state.subdivision} 
            onChange={(e) => setState(s => ({ ...s, subdivision: e.target.value as Subdivision }))}
            className="bg-white/5 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-brand-500 transition-colors"
          >
            <option value="quarter" className="bg-night-950">Quarter (1)</option>
            <option value="eighth" className="bg-night-950">Eighth (2)</option>
            <option value="triplet" className="bg-night-950">Triplet (3)</option>
            <option value="sixteenth" className="bg-night-950">16th (4)</option>
          </select>
        </div>

        {/* Sound Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-bold">Sound</label>
          <select 
            value={state.soundType} 
            onChange={(e) => setState(s => ({ ...s, soundType: e.target.value as SoundType }))}
            className="bg-white/5 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-brand-500 transition-colors"
          >
            <option value="digital" className="bg-night-950">Digital</option>
            <option value="woodblock" className="bg-night-950">Woodblock</option>
            <option value="cowbell" className="bg-night-950">Cowbell</option>
          </select>
        </div>

        {/* Accent Toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-night-400 font-bold">Accent</label>
          <button
            onClick={() => setState(s => ({ ...s, accentFirstBeat: !s.accentFirstBeat }))}
            className={cn(
              "w-full p-3 rounded-xl border font-bold transition-all",
              state.accentFirstBeat 
                ? "bg-brand-500/20 border-brand-500 text-brand-400" 
                : "bg-white/5 border-white/10 text-night-400 hover:text-white"
            )}
          >
            {state.accentFirstBeat ? "On" : "Off"}
          </button>
        </div>

      </div>

      {/* Play/Pause Circle Button */}
      <div className="flex justify-center pt-4">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={togglePlay}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-[0_6px_25px_rgba(0,0,0,0.4)] relative overflow-hidden",
            state.isPlaying 
              ? "bg-white/10 hover:bg-white/20 border border-white/10" 
              : "bg-brand-500 hover:bg-brand-600 shadow-[0_6px_25px_rgba(255,61,46,0.35)]"
          )}
          aria-label={state.isPlaying ? "Pause Metronome" : "Play Metronome"}
        >
          {state.isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </motion.button>
      </div>

    </div>
  )
}
