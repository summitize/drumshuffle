'use client'

import { motion } from 'framer-motion'
import { Sparkles, Calendar, CheckCircle2, Circle, Target, Music, Video, Star, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const milestones = [
    { text: '50 Subscribers', completed: true },
    { text: '100 Subscribers', completed: true },
    { text: '500 Subscribers', completed: false },
    { text: '1000 Subscribers', completed: false },
  ]

  const passions = [
    {
      icon: Music,
      title: 'Dynamic Covers',
      desc: 'Creating energetic drum covers of various songs, especially focusing on rock classics and modern hits.',
      color: 'from-blue-500/20 to-blue-600/20 text-blue-400'
    },
    {
      icon: Video,
      title: 'Video Progress',
      desc: 'Documenting the practice journey through high-quality video content to share inspiration and keep practice fun.',
      color: 'from-purple-500/20 to-purple-600/20 text-purple-400'
    },
    {
      icon: Star,
      title: 'Nitro Max Power',
      desc: 'Harnessing the Alesis Nitro Max Electronic Drum Kit to fuel the rhythm and precision of every beat.',
      color: 'from-amber-500/20 to-amber-600/20 text-amber-400'
    }
  ]

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-brand-500/30 relative overflow-hidden pt-28 pb-20">
      {/* Background Neon Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="bg-brand-500/10 p-2 rounded-2xl border border-brand-500/20">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-sm font-bold text-brand-400 tracking-[0.2em] uppercase">About Me</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight"
          >
            The Rhythm Behind <span className="gradient-text">DrumShuffle</span>
          </motion.h1>
        </div>

        {/* Main Grid: Info & Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Photo Frame Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group">
              {/* Outer Neon Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-500 via-purple-600 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              
              {/* Main Photo Container */}
              <div className="relative w-80 h-96 sm:w-96 sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl">
                <Image
                  src="/about_me_drummer.png"
                  alt="Drummer profile"
                  fill
                  sizes="(max-w-768px) 100vw, 384px"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
                
                {/* Kit Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10">
                  <p className="text-xs text-brand-300 font-semibold tracking-wider uppercase mb-1">Alesis Nitro Max</p>
                  <p className="text-sm font-bold text-white">Full 8-Piece Mesh Setup</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Text details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Hey, I&apos;m Sumeet <span className="text-brand-400">👋</span>
              </h2>
              <p className="text-night-200 text-base sm:text-lg leading-relaxed font-light">
                I am an enthusiastic drummer utilizing the Alesis Nitro Max E-Drum Kit to fuel my passion for creating music. As a hobbyist, I love capturing my progress through engaging videos, turning my practice sessions into fun and inspiring visual content. Additionally, I enjoy making dynamic drum covers of a wide range of songs, especially within the rock genre, to showcase my skills and share my love for music with a broader audience.
              </p>
            </div>

            {/* Launch Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-purple-500/5 to-transparent border border-brand-500/20 flex items-center gap-4">
              <div className="p-3 bg-brand-500/20 text-brand-400 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-brand-300 font-semibold uppercase tracking-wider">DrumShuffle Launch</p>
                <p className="text-base font-bold text-white mt-0.5">Launched on 31st December, 2025</p>
              </div>
            </div>

            {/* Subscribers Goals checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Subscriber Milestones
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {milestones.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                      m.completed 
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' 
                        : 'bg-white/5 border-white/5 text-night-400'
                    }`}
                  >
                    {m.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-night-500 shrink-0" />
                    )}
                    <span className="font-medium text-sm sm:text-base">{m.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Passion Grid */}
        <div className="border-t border-white/5 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Core Pillars</h3>
            <p className="text-night-400 max-w-lg mx-auto">Behind every session, upload, and rudiment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {passions.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="glass-card bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 rounded-3xl hover:border-brand-500/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <p.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{p.title}</h4>
                <p className="text-night-300 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action to YouTube / Contact */}
        <div className="mt-20 text-center glass-card bg-gradient-to-br from-brand-500/10 via-transparent to-transparent border border-brand-500/10 p-8 sm:p-12 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-4">Want to collaborate or chat drums?</h3>
          <p className="text-night-300 text-base max-w-xl mx-auto mb-8">
            Check out my drum covers, drop a comment, or reach out directly via our contact channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20"
            >
              <Youtube className="w-5 h-5 fill-current" />
              Subscribe on YouTube
            </a>
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
