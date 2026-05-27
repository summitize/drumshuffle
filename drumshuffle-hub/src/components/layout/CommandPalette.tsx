'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, FileText, Music, Drum, Play, HelpCircle, Terminal, RefreshCw, X, ArrowRight, User } from 'lucide-react'
import * as Tone from 'tone'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchItem {
  title: string
  subtitle: string
  category: 'changelog' | 'sheets' | 'packs' | 'simulator' | 'metronome' | 'about'
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const SEARCH_DATABASE: SearchItem[] = [
  { title: 'Changelog & Updates', subtitle: 'View the latest platform releases and improvements', category: 'changelog', href: '/changelog', icon: Sparkles },
  { title: 'Drum Sheets & Notations', subtitle: 'Practice with studio-grade drum sheets', category: 'sheets', href: '/sheets', icon: FileText },
  { title: 'Sample Store', subtitle: 'Download studio-grade WAV drum samples', category: 'packs', href: '/store', icon: Music },
  { title: 'Interactive Drum Simulator', subtitle: 'Play realistic e-drums directly in browser', category: 'simulator', href: '/simulator', icon: Drum },
  { title: 'Smart Metronome', subtitle: 'High-accuracy metronome with subdivisions', category: 'metronome', href: '/metronome', icon: Play },
  { title: 'About Ved (Founder)', subtitle: 'Learn about the story, goals, and Nitro Max E-Drum setup', category: 'about', href: '/about', icon: User },
]

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [easterEgg, setEasterEgg] = useState<'antigravity' | 'matrix' | 'boss' | 'solo' | null>(null)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Toggle global key bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Filter search items & trigger Easter Eggs
  useEffect(() => {
    if (!query) {
      setResults([])
      setEasterEgg(null)
      return
    }

    const lowercase = query.toLowerCase().trim()

    // 1. Check Easter Eggs
    if (lowercase === 'antigravity') {
      setEasterEgg('antigravity')
      triggerAntigravityFloat()
      return
    } else if (lowercase === 'matrix' || lowercase === 'code') {
      setEasterEgg('matrix')
      return
    } else if (lowercase === 'ved' || lowercase === 'founder' || lowercase === 'boss') {
      setEasterEgg('boss')
      return
    } else if (lowercase === 'solo' || lowercase === 'rock' || lowercase === 'drumroll') {
      setEasterEgg('solo')
      triggerDrumSolo()
      return
    }

    // 2. Perform normal search
    const filtered = SEARCH_DATABASE.filter(item =>
      item.title.toLowerCase().includes(lowercase) ||
      item.subtitle.toLowerCase().includes(lowercase) ||
      item.category.toLowerCase().includes(lowercase)
    )
    setResults(filtered)
    setEasterEgg(null)
  }, [query])

  // Antigravity gravity-free rotation & float trigger
  const triggerAntigravityFloat = () => {
    if (typeof window === 'undefined') return

    // Prevent duplicates
    if (document.getElementById('antigravity-kill-btn')) return

    document.body.classList.add('antigravity-floating')

    const killBtn = document.createElement('button')
    killBtn.id = 'antigravity-kill-btn'
    killBtn.innerHTML = `
      <span style="display:flex; align-items:center; gap:8px;">
        <span style="width: 8px; height: 8px; background: #ff3b30; border-radius: 50%; animation: kill-pulse 1s infinite alternate;"></span>
        <span>Restore Gravity (Kill Process)</span>
      </span>
      <span style="font-weight: 800; font-size: 1.1rem; line-height: 1;">&times;</span>
    `
    
    Object.assign(killBtn.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '99999',
      background: 'rgba(28, 28, 30, 0.85)',
      backdropFilter: 'blur(20px)',
      webkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '30px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      align-items: 'center',
      justify-content: 'space-between',
      gap: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255, 59, 48, 0.2)',
      transition: 'all 0.3s ease',
    })

    if (!document.getElementById('kill-pulse-style')) {
      const style = document.createElement('style')
      style.id = 'kill-pulse-style'
      style.innerHTML = `
        @keyframes kill-pulse {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `
      document.head.appendChild(style)
    }

    const cleanUp = () => {
      document.body.classList.remove('antigravity-floating')
      const el = document.getElementById('antigravity-kill-btn')
      if (el) el.remove()
    }

    killBtn.addEventListener('click', cleanUp)
    
    // Hover effects
    killBtn.addEventListener('mouseenter', () => {
      killBtn.style.transform = 'translateX(-50%) translateY(-2px) scale(1.05)'
      killBtn.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6), 0 0 30px rgba(255, 59, 48, 0.4)'
      killBtn.style.borderColor = 'rgba(255, 59, 48, 0.5)'
    })
    killBtn.addEventListener('mouseleave', () => {
      killBtn.style.transform = 'translateX(-50%)'
      killBtn.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255, 59, 48, 0.2)'
      killBtn.style.borderColor = 'rgba(255, 255, 255, 0.15)'
    })

    document.body.appendChild(killBtn)

    // Run floating timer
    setTimeout(cleanUp, 30000)
  }

  // Trigger synthesized Tone.js Drum Solo / Roll
  const triggerDrumSolo = async () => {
    await Tone.start()
    const synth = new Tone.MembraneSynth().toDestination()
    const now = Tone.now()
    
    // Quick energetic snare-drum / tom-drum roll
    synth.triggerAttackRelease("C2", "16n", now)
    synth.triggerAttackRelease("E2", "16n", now + 0.1)
    synth.triggerAttackRelease("G2", "16n", now + 0.2)
    synth.triggerAttackRelease("C3", "16n", now + 0.3)
    synth.triggerAttackRelease("E3", "16n", now + 0.4)
    synth.triggerAttackRelease("G3", "8n", now + 0.5)
    synth.triggerAttackRelease("C1", "4n", now + 0.7) // Fat bass crash
  }

  // Handle click on items
  const handleSelect = (href: string) => {
    router.push(href)
    onClose()
  }

  // Trigger Matrix falling code canvas
  useEffect(() => {
    if (easterEgg !== 'matrix' || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 600
    canvas.height = canvas.parentElement?.clientHeight || 400

    const columns = Math.floor(canvas.width / 15)
    const yPositions = Array(columns).fill(0)

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#10b981' // Emerald brand green
      ctx.font = '14px monospace'

      for (let i = 0; i < yPositions.length; i++) {
        const text = String.fromCharCode(33 + Math.random() * 93)
        const x = i * 15
        const y = yPositions[i]

        ctx.fillText(text, x, y)

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0
        } else {
          yPositions[i] += 15
        }
      }
    }

    const interval = setInterval(drawMatrix, 40)
    return () => clearInterval(interval)
  }, [easterEgg])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-12 selection:bg-brand-500/30"
        >
          {/* Intense Liquid Glass card container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.01] border border-white/[0.15] rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(255,255,255,0.05)] overflow-hidden backdrop-blur-3xl"
          >
            {/* Liquid overlay lighting glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Matrix Canvas backdrop */}
            {easterEgg === 'matrix' && (
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 z-0" 
              />
            )}

            {/* Title / Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between relative z-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-400" />
                Command Center
              </span>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input field */}
            <div className="p-6 border-b border-white/10 relative z-10 bg-black/10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search updates, sheets, sample packs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-500/50 rounded-2xl text-base text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Display panel */}
            <div className="max-h-[350px] overflow-y-auto p-6 relative z-10 custom-scrollbar">
              <AnimatePresence mode="wait">
                
                {/* 1. Easter Egg displays */}
                {easterEgg === 'antigravity' && (
                  <motion.div
                    key="antigravity"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto text-brand-400 animate-bounce">
                      <RefreshCw className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">Antigravity Activated! 🚀</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                      You unlocked the secret code. Gravity is disabled! Enjoy floating across the DrumShuffle pages.
                    </p>
                  </motion.div>
                )}

                {easterEgg === 'matrix' && (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <Terminal className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400 tracking-wide font-mono">system_override.sh</h3>
                    <p className="text-sm text-emerald-500/70 max-w-sm mx-auto font-mono leading-relaxed">
                      Entering the matrix code. Reading sample vault digital signatures. All systems initialized.
                    </p>
                  </motion.div>
                )}

                {easterEgg === 'boss' && (
                  <motion.div
                    key="boss"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 space-y-5"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto text-brand-400 animate-pulse">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white tracking-wide">WELCOME BACK, CHIEF VED! 🥁</h3>
                      <p className="text-sm text-brand-400 font-bold mt-1 uppercase tracking-wider animate-pulse">
                        Launching Admin CMS Dashboard...
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelect('/admin/login')}
                      className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-brand-500/25 inline-flex items-center gap-2"
                    >
                      Bypass to Login Panel
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {easterEgg === 'solo' && (
                  <motion.div
                    key="solo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400 animate-spin" style={{ animationDuration: '3s' }}>
                      <Drum className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">Heavy Drum Solo Triggered! 🥁🔥</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                      Rock on! You activated the custom synthesized drum roll easter egg! Listen to that pulse.
                    </p>
                  </motion.div>
                )}

                {/* 2. Normal Search Results */}
                {!easterEgg && results.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {results.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleSelect(item.href)}
                        className="w-full text-left p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-500/30 hover:bg-white/[0.06] transition-all flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/5 text-gray-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 rounded-xl transition-all">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm sm:text-base group-hover:text-brand-400 transition-colors">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 3. Empty Search / Help State */}
                {!easterEgg && query && results.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-gray-500 text-sm"
                  >
                    No direct results for &quot;{query}&quot;. Try typing &quot;ved&quot;, &quot;antigravity&quot;, or &quot;solo&quot;!
                  </motion.div>
                )}

                {/* 4. Default State (Initial Tip list) */}
                {!query && !easterEgg && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest block mb-2">
                      Popular Commands / Quick Links
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SEARCH_DATABASE.map(item => (
                        <button
                          key={item.href}
                          onClick={() => handleSelect(item.href)}
                          className="text-left p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-500/20 hover:bg-white/[0.05] transition-all flex items-center gap-3 group"
                        >
                          <div className="p-2.5 bg-white/5 text-gray-500 group-hover:text-brand-400 rounded-lg shrink-0">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-brand-400 transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5">{item.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="p-4 bg-brand-500/5 border border-brand-500/10 rounded-2xl mt-6 flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider">Secret Codes & Easter Eggs</p>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                          Try entering secret codes into the search bar above to unlock Easter Eggs! Try &quot;antigravity&quot;, &quot;solo&quot;, or &quot;ved&quot;.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer tips */}
            <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center text-[10px] text-gray-500 uppercase tracking-widest relative z-10 flex items-center justify-center gap-2">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] border border-white/10">Esc</kbd> to close</span>
              <span>&bull;</span>
              <span>Search index: v2.1.0</span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
