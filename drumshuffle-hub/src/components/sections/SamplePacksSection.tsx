"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Music, Disc, ArrowRight } from "lucide-react";

const SAMPLE_PACKS = [
  { id: 1, title: "Vintage Funk Breakbeats", genre: "Funk", files: 124, size: "450MB", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Modern Metal Foundry", genre: "Metal", files: 350, size: "1.2GB", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Lo-Fi Hip-Hop Chops", genre: "Lo-Fi", files: 85, size: "210MB", image: "https://images.unsplash.com/photo-1600865768224-b52fcce0f423?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Electronic Synthwave Kit", genre: "Synthwave", files: 200, size: "680MB", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PACKS.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group glass-card overflow-hidden h-full flex flex-col hover:border-accent-purple/30 transition-all duration-500 hover:-translate-y-1">
                
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden bg-night-900">
                  <div className="absolute inset-0 bg-night-950/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={pack.image} 
                    alt={pack.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white uppercase tracking-wider">
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
                  
                  <div className="mt-auto pt-6 flex items-center justify-between text-xs font-medium text-night-400">
                    <span className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5" />
                      {pack.files} Sounds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      {pack.size}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
