'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Music, Search, Filter, Disc } from 'lucide-react'

interface CustomPack {
  id: string
  title: string
  creator: string
  genre: string
  description: string
  archiveUrl: string
  uploadedAt: string
}

const DEFAULT_PACKS = [
  { 
    id: "default-1", 
    title: "Infinite Sample Pack", 
    creator: "SoundPacks", 
    genre: "Hip Hop", 
    description: "Infinite Sample Pack contains a curated selection of 377 professional drum loops, atmospheric synths, deep baseline chops, and punchy drum shots.",
    archiveUrl: "https://soundpacks.com/free-sound-packs/infinite-sample-pack/",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "default-2", 
    title: "Nightmare Fantasia", 
    creator: "SoundPacks", 
    genre: "Metal", // Map to existing Metal category or Lo-Fi/Synthwave
    description: "Dark, cinematic, eerie and beautiful soundscapes, heavy industrial kicks, processed claps, and haunting phantom percussion.",
    archiveUrl: "https://soundpacks.com/free-sound-packs/nightmare-fantasia-sample-pack/",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "default-3", 
    title: "Let's Go to Space", 
    creator: "SoundPacks", 
    genre: "Synthwave", 
    description: "Cosmic, spacious atmospheric pads, futuristic synth leads, alien riser FXs, and cybernetic drum patterns.",
    archiveUrl: "https://soundpacks.com/free-sound-packs/lets-go-to-space-sample-pack/",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "default-4", 
    title: "377 Drum Loops", 
    creator: "SoundPacks", 
    genre: "Hip Hop", 
    description: "377 classic acoustic and electronic drum loops recorded across a range of tempos from 60 to 180 BPM.",
    archiveUrl: "https://soundpacks.com/free-sound-packs/377-drum-loops/",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" 
  },
]

export default function StorePage() {
  const [customPacks, setCustomPacks] = useState<CustomPack[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('custom_sample_packs')
      if (local) {
        setCustomPacks(JSON.parse(local))
      }
    }
  }, [])

  // Combine default and custom sample packs
  const allPacks = [
    ...customPacks.map(p => ({
      id: p.id,
      title: p.title,
      creator: p.creator,
      genre: p.genre,
      description: p.description,
      archiveUrl: p.archiveUrl,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" // Beautiful default for custom
    })),
    ...DEFAULT_PACKS
  ]

  // Filter packs
  const filteredPacks = allPacks.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || p.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const genres = ['All', 'Rock', 'Acoustic', 'Electronic', 'Metal', 'Lo-Fi', 'Hip Hop', 'Jazz', 'Synthwave', 'Funk']

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-brand-500/30 relative overflow-hidden pt-28 pb-20">
      {/* Background Blurs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="bg-red-500/10 p-2 rounded-2xl border border-red-500/20">
              <Disc className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-sm font-bold text-red-400 tracking-[0.2em] uppercase">Sound Vault</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight"
          >
            Premium <span className="gradient-text bg-gradient-to-r from-red-400 to-purple-400">Sample Packs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-night-300 text-lg mt-4 max-w-xl mx-auto font-light"
          >
            Download studio-grade drum sample packs, meticulously recorded and prepared for absolute zero fee. Powered entirely by Archive.org.
          </motion.p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 bg-white/[0.02] border border-white/5 p-4 rounded-3xl backdrop-blur-md">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search sample packs by name or creator..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>

          {/* Genre Filters scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar max-w-full md:max-w-xl">
            <Filter className="w-4 h-4 text-gray-500 shrink-0 hidden sm:block ml-2" />
            {genres.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedGenre === g
                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPacks.map((pack, idx) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative"
              >
                {/* Glow border on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                
                <div className="relative h-full glass-card bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-red-500/20 transition-all duration-300">
                  {/* Pack Cover Image */}
                  <div className="relative h-56 overflow-hidden bg-night-900">
                    <img 
                      src={pack.image} 
                      alt={pack.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Genre badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-red-600/90 text-white uppercase tracking-wider shadow-lg">
                        {pack.genre}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-red-400 font-semibold tracking-wider uppercase mb-1 block">
                        {pack.creator}
                      </span>
                      <h3 className="font-display font-extrabold text-xl text-white group-hover:text-red-400 transition-colors duration-300">
                        {pack.title}
                      </h3>
                      <p className="text-night-300 text-sm mt-3 leading-relaxed font-light">
                        {pack.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Music className="w-4 h-4 text-red-500" />
                        Royalty-Free
                      </span>
                      
                      <a
                        href={pack.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center gap-2 text-sm shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPacks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No sample packs match your search parameters.</p>
          </div>
        )}

      </div>
    </div>
  )
}
