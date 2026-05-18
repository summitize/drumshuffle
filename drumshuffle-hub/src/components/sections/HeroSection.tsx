"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow opacity-60" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-brand-500/[0.06] blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-[10%] w-72 h-72 rounded-full bg-accent-purple/[0.05] blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-[30%] w-48 h-48 rounded-full bg-accent-cyan/[0.04] blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/[0.08] mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-xs font-medium text-brand-300 tracking-wide uppercase">
              Now with 26+ Sample Packs
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6"
          >
            Your Drumming{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">Starts Here</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-night-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            The Official Drumshuffle Wensite, DrumshuffleHub. Built from scratch with no experience of coding. Utilities for all drummers like metronome, drum simulator, drum covers, song notations and much more all in one place, that too for absolutely no fees.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/simulator" id="hero-cta-primary">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-brand text-base px-8 py-4 group"
              >
                <Play className="w-5 h-5 fill-current" />
                Launch Simulator
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Link>
            <Link href="/store" id="hero-cta-secondary">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost text-base px-8 py-4"
              >
                Browse Sample Packs
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night-950 to-transparent" />
    </section>
  );
}
