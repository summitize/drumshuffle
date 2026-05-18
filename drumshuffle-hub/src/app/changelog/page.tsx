'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, Search, ArrowUpDown, ChevronRight, GitBranch, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ChangelogEntry {
  version: string
  date: string
  title: string
  category: 'Feature' | 'Improvement' | 'Bug Fix' | 'UI Update'
  items: string[]
}

const changelogData: ChangelogEntry[] = [
  {
    version: '1.2.0',
    date: '2026-05-18',
    title: 'PDF Library Animations & Simulator Support',
    category: 'Feature',
    items: [
      'Added PDF Library hover animations to provide beautiful feedback on sheet music cards',
      'Improved metronome latency using low-level Web Audio API refinements',
      'Added mobile drum simulator support with optimized responsive touch zones',
      'Upgraded tone.js engine for richer audio sample playbacks'
    ]
  },
  {
    version: '1.1.0',
    date: '2026-05-10',
    title: 'DrumShuffle Hub Admin Dashboard',
    category: 'Feature',
    items: [
      'Introduced DrumShuffle Hub admin dashboard for modern sheet music management',
      'Added Supabase integration for secure and responsive data persistence',
      'Implemented collapsible administrative sidebar and statistics charts',
      'Added bulk drag-and-drop PDF upload system into Supabase Storage'
    ]
  },
  {
    version: '1.0.5',
    date: '2026-04-28',
    title: 'Metronome & UI Optimizations',
    category: 'Improvement',
    items: [
      'Optimized CSS rendering and layouts to achieve 100/100 Lighthouse performance',
      'Enhanced metronome audio context state persistence on page navigation',
      'Refined glassmorphism cards for more consistent blur and borders across devices'
    ]
  },
  {
    version: '1.0.1',
    date: '2026-04-15',
    title: 'Audio Latency Bug Fix',
    category: 'Bug Fix',
    items: [
      'Fixed audio sample latency issue on safari and older mobile devices',
      'Resolved metronome drift when tab is backgrounded'
    ]
  },
  {
    version: '1.0.0',
    date: '2026-04-01',
    title: 'Initial Release',
    category: 'UI Update',
    items: [
      'Launched DrumShuffle Hub platform',
      'Implemented fully-featured interactive virtual drum simulator',
      'Designed liquid glass dark UI design system'
    ]
  }
]

const categoryColors = {
  Feature: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]',
  Improvement: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
  'Bug Fix': 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
  'UI Update': 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]',
}

export default function ChangelogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const categories = ['All', 'Feature', 'Improvement', 'Bug Fix', 'UI Update']

  const filteredAndSortedEntries = useMemo(() => {
    const result = changelogData.filter(entry => {
      const matchesSearch = 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.version.includes(searchTerm) ||
        entry.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [searchTerm, selectedCategory, sortOrder])

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-brand-500/30 relative overflow-hidden pt-24 pb-20">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-2 text-night-400 hover:text-white transition-colors mb-8 group text-sm font-semibold">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center md:text-left mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-4"
          >
            <div className="bg-brand-500/10 p-2.5 rounded-2xl border border-brand-500/20">
              <Sparkles className="w-6 h-6 text-brand-400" />
            </div>
            <span className="text-sm font-bold text-brand-400 tracking-[0.2em] uppercase">Updates</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight"
          >
            Changelog & <span className="gradient-text">Product Updates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-night-300 text-lg mt-4 max-w-xl"
          >
            Stay up to date with the latest features, enhancements, and bug fixes added to the DrumShuffle Hub platform.
          </motion.p>
        </div>

        {/* Filters Toolbar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 border border-white/10 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-400" />
            <input
              type="text"
              placeholder="Search updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-night-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-500 border-brand-500 text-white shadow-brand-sm'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-night-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
              className="p-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-night-300 hover:text-white transition-colors"
              title={sortOrder === 'newest' ? 'Sort oldest first' : 'Sort newest first'}
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Timeline Updates */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-6 md:pl-8 space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedEntries.map((entry, index) => (
              <motion.div
                key={entry.version}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#050508] border-2 border-brand-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
                </span>

                {/* Left Side Version Info for larger screens */}
                <div className="hidden md:block absolute -left-40 top-0 text-right w-28">
                  <span className="font-display font-bold text-lg text-white">v{entry.version}</span>
                  <div className="text-xs text-night-400 mt-1 flex items-center justify-end gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {entry.date}
                  </div>
                </div>

                {/* Entry Card */}
                <div className="glass-card bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 p-6 sm:p-8 rounded-3xl hover:border-white/20 transition-all duration-300 group">
                  {/* Mobile header (hidden on desktop) */}
                  <div className="flex md:hidden items-center justify-between mb-4">
                    <span className="font-display font-bold text-lg text-white">v{entry.version}</span>
                    <span className="text-xs text-night-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.date}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-brand-400 transition-colors">
                      {entry.title}
                    </h3>
                    <span className={`self-start sm:self-auto px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[entry.category]}`}>
                      {entry.category}
                    </span>
                  </div>

                  {/* Descriptions List */}
                  <ul className="space-y-3.5">
                    {entry.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-night-200 text-sm sm:text-base leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredAndSortedEntries.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-night-400"
            >
              <GitBranch className="w-12 h-12 mx-auto mb-4 text-night-500 opacity-60" />
              <p className="text-lg font-medium">No updates found</p>
              <p className="text-sm mt-1">Try refining your search keyword or selected category filter.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
