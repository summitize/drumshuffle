"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Music, Disc, ArrowRight } from "lucide-react";

const SAMPLE_PACKS = [
  {
    id: 1,
    title: "Infinite Sample Pack",
    genre: "Hip-Hop",
    files: 377,
    size: "580MB",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    url: "https://soundpacks.com/free-sound-packs/infinite-sample-pack/"
  },
  {
    id: 2,
    title: "Nightmare Fantasia",
    genre: "Cinematic",
    files: 150,
    size: "420MB",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop",
    url: "https://soundpacks.com/free-sound-packs/nightmare-fantasia-sample-pack/"
  },
  {
    id: 3,
    title: "Let's Go to Space",
    genre: "Ambient",
    files: 220,
    size: "650MB",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    url: "https://soundpacks.com/free-sound-packs/lets-go-to-space-sample-pack/"
  },
  {
    id: 4,
    title: "377 Drum Loops",
    genre: "Loops",
    files: 377,
    size: "340MB",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    url: "https://soundpacks.com/free-sound-packs/377-drum-loops/"
  }
];

export function SamplePacksSection() {
  return (
    <section id="sample-packs" className="relative py-24 sm:py-32 bg-night-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple mb-4">
              <Disc className="w-4 h-4" /> Download Hub
            </span>
            <h2 className="section-title mb-4">
              Studio-Grade <span className="text-accent-purple">Sample Packs</span>
            </h2>
            <p className="section-subtitle">
              Expand your sonic arsenal. Download meticulously recorded, royalty-free drum samples ready for your next production.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/store" className="group flex items-center gap-2 text-sm font-bold text-accent-purple hover:text-white transition-colors">
              Browse All Packs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PACKS.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <a href={pack.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
                <div className="glass-card overflow-hidden h-full flex flex-col hover:border-accent-purple/35 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-accent-purple/5">
                  
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden bg-night-900">
                    <div className="absolute inset-0 bg-night-950/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={pack.image} 
                      alt={pack.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white uppercase tracking-wider">
                        {pack.genre}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    
                    <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight group-hover:text-accent-purple transition-colors">
                      {pack.title}
                    </h3>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between text-xs font-semibold text-night-400 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-accent-purple" />
                        {pack.files} Sounds
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Download className="w-3.5 h-3.5 text-accent-purple" />
                        {pack.size}
                      </span>
                    </div>
                  </div>

                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
