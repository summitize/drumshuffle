"use client";

import { motion } from "framer-motion";
import { Drum, Music, BookOpen, Users, Activity, Timer } from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Drum, Music, BookOpen, Users, Activity, Metronome: Timer,
};

const colorMap: Record<string, string> = {
  brand:  "from-brand-500/20 to-brand-600/5 border-brand-500/15 text-brand-400",
  cyan:   "from-accent-cyan/20 to-accent-cyan/5 border-accent-cyan/15 text-accent-cyan",
  purple: "from-accent-purple/20 to-accent-purple/5 border-accent-purple/15 text-accent-purple",
  gold:   "from-accent-gold/20 to-accent-gold/5 border-accent-gold/15 text-accent-gold",
};

const glowMap: Record<string, string> = {
  brand:  "bg-brand-500/10",
  cyan:   "bg-accent-cyan/10",
  purple: "bg-accent-purple/10",
  gold:   "bg-accent-gold/10",
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-400 mb-4">
            Everything You Need
          </span>
          <h2 className="section-title mb-4">
            Built for <span className="gradient-text">Drummers</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            From your first beat to studio-ready productions — every tool, lesson,
            and resource in one powerful platform.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Drum;
            const colors = colorMap[feature.color] || colorMap.brand;
            const glow = glowMap[feature.color] || glowMap.brand;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="group relative glass-card p-6 sm:p-8 h-full hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                  {/* Hover glow */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${colors} border mb-5`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-semibold text-lg text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-night-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Card shine effect */}
                  <div className="absolute inset-0 bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
