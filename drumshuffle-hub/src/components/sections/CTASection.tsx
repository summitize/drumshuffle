"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/[0.08] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/[0.08] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-xs font-medium text-brand-300 tracking-wide uppercase">
              Join the Rhythm
            </span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight mb-6">
            Ready to <span className="gradient-text">Drop the Beat?</span>
          </h2>

          <p className="text-lg text-night-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of drummers who are leveling up their skills with DrumShuffle Hub.
            Start for free — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/simulator" id="cta-simulator">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-brand text-base px-10 py-4 group"
              >
                Launch Simulator
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Link>
            <Link href="/sheets" id="cta-sheets">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost text-base px-10 py-4"
              >
                Browse Sheets
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
