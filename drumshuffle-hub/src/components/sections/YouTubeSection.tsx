"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder data for YouTube integration
const MOCK_VIDEOS = [
  { id: "vid_1", title: "5 Essential Ghost Note Patterns", duration: "8:24", views: "14k", thumbnail: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop" },
  { id: "vid_2", title: "How to Tune Your Snare Drum Like a Pro", duration: "12:10", views: "32k", thumbnail: "https://images.unsplash.com/photo-1595069906974-f8fa7dc918d2?q=80&w=800&auto=format&fit=crop" },
  { id: "vid_3", title: "Mastering the Moeller Technique in 10 Mins", duration: "10:05", views: "8k", thumbnail: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=800&auto=format&fit=crop" },
  { id: "vid_4", title: "Drum Fills That Will Blow Minds", duration: "15:30", views: "45k", thumbnail: "https://images.unsplash.com/photo-1543443374-16281dc3d706?q=80&w=800&auto=format&fit=crop" },
];

const playTing = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
  } catch (e) {
    // Ignore audio errors
  }
};

export function YouTubeSection() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network fetch for skeletons
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="youtube-integration" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff0000] mb-4">
              <Youtube className="w-4 h-4" /> Latest Uploads
            </span>
            <h2 className="section-title mb-4">
              DrumShuffle <span className="text-[#ff0000]">Channel</span>
            </h2>
            <p className="section-subtitle">
              Watch our latest drum lessons, gear reviews, and studio sessions directly from YouTube.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <a 
              href="https://www.youtube.com/@Drumshuffle"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTing}
              className="inline-flex items-center gap-2 bg-[#ff0000] text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] hover:bg-[#ff1a1a] transition-all hover:scale-105 active:scale-95"
            >
              <Youtube className="w-5 h-5" />
              Subscribe
            </a>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Featured Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-2/3"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton-main"
                  exit={{ opacity: 0 }}
                  className="aspect-video w-full rounded-3xl bg-white/[0.02] border border-white/[0.05] animate-pulse flex items-center justify-center shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-white/[0.05]" />
                </motion.div>
              ) : (
                <motion.div
                  key="video-main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group aspect-video rounded-3xl p-2 bg-white/[0.02] border border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                  {/* Ambient glow behind main video */}
                  <div className="absolute inset-0 bg-[#ff0000]/10 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-night-900 ring-1 ring-white/10 shadow-2xl">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" 
                      title="Featured Drum Lesson" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full object-cover"
                    ></iframe>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-6 ml-2">
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Mastering the Groove: The Ultimate Guide
              </h3>
              <p className="text-night-400 text-sm flex items-center gap-4">
                <span>124k views</span>
                <span className="w-1 h-1 rounded-full bg-night-600" />
                <span>2 days ago</span>
              </p>
            </div>
          </motion.div>

          {/* Recent Uploads Sidebar / Carousel */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <h4 className="font-display font-semibold text-lg text-white mb-2 pl-2">Up Next</h4>
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 hide-scrollbar">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  // Skeletons
                  Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={`skeleton-side-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 min-w-[280px] lg:min-w-0 glass-card p-3 animate-pulse"
                    >
                      <div className="w-32 h-20 rounded-xl bg-white/[0.05] shrink-0" />
                      <div className="flex flex-col gap-2 w-full pt-1">
                        <div className="h-4 w-3/4 rounded bg-white/[0.05]" />
                        <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // Loaded Videos
                  MOCK_VIDEOS.map((video, i) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="group flex gap-4 min-w-[280px] lg:min-w-0 glass-card p-3 hover:border-white/10 cursor-pointer transition-all hover:bg-white/[0.03]"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0 bg-night-800">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-white">
                          {video.duration}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex flex-col justify-start py-1 pr-2">
                        <h5 className="font-display font-semibold text-sm text-white line-clamp-2 leading-snug group-hover:text-[#ff0000] transition-colors">
                          {video.title}
                        </h5>
                        <p className="text-xs text-night-400 mt-1.5">
                          {video.views} views
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
