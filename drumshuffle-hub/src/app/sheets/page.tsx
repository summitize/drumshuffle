'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Search, Download, ChevronRight } from 'lucide-react'

interface CustomSheet {
  id: string
  title: string
  artist: string
  genre: string
  difficulty: string
  archiveUrl: string
  uploadedAt: string
}

const DEFAULT_SHEETS = [
  // Linkin Park
  { id: "lp-1", title: "In The End", artist: "Linkin Park", genre: "Rock", difficulty: "Intermediate" },
  { id: "lp-2", title: "Numb", artist: "Linkin Park", genre: "Rock", difficulty: "Beginner" },
  { id: "lp-3", title: "Crawling", artist: "Linkin Park", genre: "Rock", difficulty: "Intermediate" },
  { id: "lp-4", title: "Faint", artist: "Linkin Park", genre: "Rock", difficulty: "Intermediate" },
  { id: "lp-5", title: "What I've Done", artist: "Linkin Park", genre: "Rock", difficulty: "Beginner" },
  { id: "lp-6", title: "One Step Closer", artist: "Linkin Park", genre: "Rock", difficulty: "Intermediate" },

  // Metallica
  { id: "met-1", title: "Enter Sandman", artist: "Metallica", genre: "Metal", difficulty: "Intermediate" },
  { id: "met-2", title: "Master Of Puppets", artist: "Metallica", genre: "Metal", difficulty: "Advanced" },
  { id: "met-3", title: "Nothing Else Matters", artist: "Metallica", genre: "Metal", difficulty: "Beginner" },
  { id: "met-4", title: "One", artist: "Metallica", genre: "Metal", difficulty: "Advanced" },
  { id: "met-5", title: "Sad But True", artist: "Metallica", genre: "Metal", difficulty: "Intermediate" },
  { id: "met-6", title: "Fade To Black", artist: "Metallica", genre: "Metal", difficulty: "Intermediate" },

  // Michael Jackson
  { id: "mj-1", title: "Billie Jean", artist: "Michael Jackson", genre: "Pop", difficulty: "Beginner" },
  { id: "mj-2", title: "Beat It", artist: "Michael Jackson", genre: "Pop", difficulty: "Intermediate" },
  { id: "mj-3", title: "Thriller", artist: "Michael Jackson", genre: "Pop", difficulty: "Intermediate" },
  { id: "mj-4", title: "Smooth Criminal", artist: "Michael Jackson", genre: "Pop", difficulty: "Intermediate" },
  { id: "mj-5", title: "Bad", artist: "Michael Jackson", genre: "Pop", difficulty: "Beginner" },

  // AC/DC
  { id: "acdc-1", title: "Back In Black", artist: "AC/DC", genre: "Rock", difficulty: "Beginner" },
  { id: "acdc-2", title: "Highway To Hell", artist: "AC/DC", genre: "Rock", difficulty: "Beginner" },
  { id: "acdc-3", title: "Thunderstruck", artist: "AC/DC", genre: "Rock", difficulty: "Intermediate" },
  { id: "acdc-4", title: "You Shook Me All Night Long", artist: "AC/DC", genre: "Rock", difficulty: "Beginner" },
  { id: "acdc-5", title: "T.N.T.", artist: "AC/DC", genre: "Rock", difficulty: "Beginner" },

  // Nirvana
  { id: "nir-1", title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Grunge", difficulty: "Intermediate" },
  { id: "nir-2", title: "Come As You Are", artist: "Nirvana", genre: "Grunge", difficulty: "Beginner" },
  { id: "nir-3", title: "Lithium", artist: "Nirvana", genre: "Grunge", difficulty: "Beginner" },

  // Queen
  { id: "q-1", title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", difficulty: "Advanced" },
  { id: "q-2", title: "We Will Rock You", artist: "Queen", genre: "Rock", difficulty: "Beginner" },
  { id: "q-3", title: "Another One Bites The Dust", artist: "Queen", genre: "Rock", difficulty: "Beginner" },

  // Green Day
  { id: "gd-1", title: "Boulevard Of Broken Dreams", artist: "Green Day", genre: "Rock", difficulty: "Beginner" },
  { id: "gd-2", title: "Basket Case", artist: "Green Day", genre: "Punk", difficulty: "Intermediate" },
  { id: "gd-3", title: "American Idiot", artist: "Green Day", genre: "Punk", difficulty: "Intermediate" },

  // Led Zeppelin
  { id: "lz-1", title: "Stairway To Heaven", artist: "Led Zeppelin", genre: "Rock", difficulty: "Intermediate" },
  { id: "lz-2", title: "Whole Lotta Love", artist: "Led Zeppelin", genre: "Rock", difficulty: "Intermediate" },

  // Slipknot
  { id: "slip-1", title: "Duality", artist: "Slipknot", genre: "Metal", difficulty: "Advanced" },
  { id: "slip-2", title: "Psychosocial", artist: "Slipknot", genre: "Metal", difficulty: "Advanced" },

  // Red Hot Chili Peppers
  { id: "rhcp-1", title: "Californication", artist: "Red Hot Chili Peppers", genre: "Rock", difficulty: "Beginner" },
  { id: "rhcp-2", title: "Dani California", artist: "Red Hot Chili Peppers", genre: "Rock", difficulty: "Intermediate" },
]

export default function SheetsPage() {
  const [customSheets, setCustomSheets] = useState<CustomSheet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('custom_sheets')
      if (local) {
        setCustomSheets(JSON.parse(local))
      }
    }
  }, [])

  // Combine default sheets and custom sheets
  const allSheets = [
    ...customSheets.map(s => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      genre: s.genre,
      difficulty: s.difficulty,
      archiveUrl: s.archiveUrl || `https://www.songsterr.com/?pattern=${encodeURIComponent(s.artist + " " + s.title)}`,
    })),
    ...DEFAULT_SHEETS.map(s => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      genre: s.genre,
      difficulty: s.difficulty,
      archiveUrl: `https://www.songsterr.com/?pattern=${encodeURIComponent(s.artist + " " + s.title)}`,
    }))
  ]

  // Filter sheets
  const filteredSheets = allSheets.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.artist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || s.genre === selectedGenre
    const matchesDifficulty = selectedDifficulty === 'All' || s.difficulty === selectedDifficulty
    return matchesSearch && matchesGenre && matchesDifficulty
  })

  const genres = ['All', 'Rock', 'Metal', 'Grunge', 'Pop', 'Punk', 'Jazz', 'Funk', 'Blues']
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-brand-500/30 relative overflow-hidden pt-28 pb-20">
      {/* Background Blurs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="bg-blue-500/10 p-2 rounded-2xl border border-blue-500/20">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-bold text-blue-400 tracking-[0.2em] uppercase">Sheet Music Library</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight"
          >
            Interactive <span className="gradient-text bg-gradient-to-r from-blue-400 to-purple-400">Drum Notations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-night-300 text-lg mt-4 max-w-xl mx-auto font-light"
          >
            Explore, preview and download studio-accurate drum sheet music PDFs for your favorite tracks — 100% free!
          </motion.p>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-md space-y-5 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search */}
            <div className="relative lg:col-span-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search drum sheets by song title or band..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Difficulty Dropdown */}
            <div className="relative lg:col-span-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="All">All Difficulties</option>
                {difficulties.slice(1).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Total count */}
            <div className="lg:col-span-3 text-right text-sm text-gray-400 font-semibold pr-2">
              Found {filteredSheets.length} drum sheets
            </div>
          </div>

          {/* Genre Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider shrink-0 mr-2">Genres:</span>
            {genres.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedGenre === g
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Sheets List Container */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredSheets.map((sheet, idx) => (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group relative"
              >
                {/* Subtle border glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
                
                <div className="relative glass-card bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-blue-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-extrabold text-lg text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {sheet.title}
                      </h3>
                      <p className="text-night-400 text-sm mt-0.5 font-medium">{sheet.artist}</p>
                    </div>
                  </div>

                  {/* Badges and Actions */}
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 md:justify-end">
                    {/* Genre Badge */}
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                      {sheet.genre}
                    </span>

                    {/* Difficulty Badge */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                      sheet.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      sheet.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {sheet.difficulty}
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 ml-auto md:ml-4">
                      <a
                        href={sheet.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/10 transition-all flex items-center justify-center"
                        title="Direct Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <a
                        href={sheet.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white text-sm transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/10"
                      >
                        View Sheet
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSheets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No drum sheet notations match your filters.</p>
          </div>
        )}

      </div>
    </div>
  )
}
