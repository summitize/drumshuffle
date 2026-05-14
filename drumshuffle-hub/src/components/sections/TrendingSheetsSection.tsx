"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Download, TrendingUp, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const TRENDING_SHEETS = [
  { id: 1, title: "Rosanna Half-Time Shuffle", artist: "Toto", difficulty: "Advanced", downloads: "12.5k", tag: "Groove" },
  { id: 2, title: "Fool in the Rain", artist: "Led Zeppelin", difficulty: "Advanced", downloads: "9.2k", tag: "Shuffle" },
  { id: 3, title: "Seven Nation Army", artist: "The White Stripes", difficulty: "Beginner", downloads: "24.1k", tag: "Rock" },
  { id: 4, title: "Tom Sawyer", artist: "Rush", difficulty: "Expert", downloads: "8.7k", tag: "Prog" },
];

export function TrendingSheetsSection() {
  return (
    <section id="trending-sheets" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan mb-4">
              <TrendingUp className="w-4 h-4" /> Trending Now
            </span>
            <h2 className="section-title mb-4">
              Premium <span className="text-accent-cyan">Drum Sheets</span>
            </h2>
            <p className="section-subtitle">
              Download high-quality, accurate transcriptions for your favorite tracks.
              Perfectly formatted for digital viewing or printing.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/sheets" className="btn-ghost whitespace-nowrap">
              View All Sheets
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_SHEETS.map((sheet, i) => (
            <motion.div
              key={sheet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group glass-card p-6 h-full flex flex-col relative overflow-hidden hover:border-accent-cyan/30 transition-colors duration-500">
                {/* Glow effect on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-1/2 -translate-y-1/2" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.05] text-night-300">
                    {sheet.tag}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-accent-cyan transition-colors">
                  {sheet.title}
                </h3>
                <p className="text-sm text-night-400 mb-6 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  {sheet.artist}
                </p>
                
                <div className="mt-auto pt-5 border-t border-white/[0.05] flex items-center justify-between text-xs text-night-400">
                  <span className={cn(
                    "font-semibold",
                    sheet.difficulty === "Beginner" ? "text-emerald-400" :
                    sheet.difficulty === "Advanced" ? "text-amber-400" :
                    sheet.difficulty === "Expert" ? "text-brand-400" : "text-night-300"
                  )}>
                    {sheet.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {sheet.downloads}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
