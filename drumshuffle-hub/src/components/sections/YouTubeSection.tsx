"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Youtube } from "lucide-react";

// Videos section for playlists

const playTing = () => {
  try {
    // @ts-expect-error - webkitAudioContext is not in standard types but needed for Safari
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Ignore audio errors
  }
};

export function YouTubeSection() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network fetch for skeletons
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="youtube-integration" className="relative py-24 sm:py-32 overflow-hidden bg-night-950">
      {/* Dynamic light background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff0000]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff0000] mb-4">
              <Youtube className="w-4 h-4" /> Latest & Greatest
            </span>
            <h2 className="section-title mb-4">
              DrumShuffle <span className="text-[#ff0000]">Showcase</span>
            </h2>
            <p className="section-subtitle">
              Experience our latest drum covers and practice visualizers directly from our YouTube channel.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a 
              href="https://www.youtube.com/@Drumshuffle"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTing}
              className="inline-flex items-center gap-2 bg-[#ff0000] text-white font-bold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:bg-[#ff1a1a] transition-all hover:scale-105 active:scale-95 group"
            >
              <Youtube className="w-5 h-5 group-hover:animate-pulse" />
              Subscribe Now
            </a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          
          {/* Playlist 1: Visualizers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group"
          >
            <div className="relative aspect-video rounded-[2rem] p-1.5 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 shadow-2xl backdrop-blur-xl mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[#ff0000]/5 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-night-900 ring-1 ring-white/10">
                {isLoading ? (
                  <div className="w-full h-full bg-white/[0.02] animate-pulse flex items-center justify-center">
                    <Youtube className="w-12 h-12 text-white/10" />
                  </div>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/videoseries?list=PLK_X4Ox3HYjAKTWhvXjpfxnXsi4eh5L2s" 
                    title="Drumless Visualisers Playlist" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                  ></iframe>
                )}
              </div>
            </div>
            <div className="px-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#ff0000]/20 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-[#ff0000]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Top Drumless Visualizers
                </h3>
              </div>
              <p className="text-night-400 text-sm sm:text-base leading-relaxed">
                HD quality 360kbps drumless stemmed audio edited through Moises and Bandlab with startup count 
                down in some, providing seamless audio for clean drum practice, along with interactive audio 
                spectrum and visualizers with striking designs.
              </p>
            </div>
          </motion.div>

          {/* Playlist 2: Drum Covers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group"
          >
            <div className="relative aspect-video rounded-[2rem] p-1.5 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 shadow-2xl backdrop-blur-xl mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-brand-500/5 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-night-900 ring-1 ring-white/10">
                {isLoading ? (
                  <div className="w-full h-full bg-white/[0.02] animate-pulse flex items-center justify-center">
                    <Youtube className="w-12 h-12 text-white/10" />
                  </div>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/videoseries?list=PLK_X4Ox3HYjCRUz9um7qoFLIMNuaJ6yfu" 
                    title="Drum Covers Playlist" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                  ></iframe>
                )}
              </div>
            </div>
            <div className="px-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Drum Covers
                </h3>
              </div>
              <p className="text-night-400 text-sm sm:text-base leading-relaxed">
                Complete set of videos of drum covers of my favorite songs. Watch my progress 
                as I tackle everything from classic rock anthems to modern pop tracks on the Alesis Nitro Max.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

