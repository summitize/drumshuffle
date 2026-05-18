'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Music, Sparkles, Send, CheckCircle } from 'lucide-react'

type UploadType = 'sheet' | 'sample'

export default function UploadPage() {
  const [uploadType, setUploadType] = useState<UploadType>('sheet')
  const [success, setSuccess] = useState(false)
  
  // Sheet Form State
  const [sheetData, setSheetData] = useState({
    title: '',
    artist: '',
    genre: 'Rock',
    difficulty: 'Intermediate',
    archiveUrl: '',
  })

  // Sample Pack Form State
  const [sampleData, setSampleData] = useState({
    title: '',
    creator: '',
    genre: 'Rock',
    description: '',
    archiveUrl: '',
  })

  const handleSheetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sheetData.title || !sheetData.artist || !sheetData.archiveUrl) return

    // Get current local sheets
    const existing = localStorage.getItem('custom_sheets')
    const sheets = existing ? JSON.parse(existing) : []
    
    // Add new sheet
    const newSheet = {
      id: `custom-sheet-${Date.now()}`,
      title: sheetData.title,
      artist: sheetData.artist,
      genre: sheetData.genre,
      difficulty: sheetData.difficulty,
      archiveUrl: sheetData.archiveUrl,
      uploadedAt: new Date().toISOString(),
    }
    
    localStorage.setItem('custom_sheets', JSON.stringify([newSheet, ...sheets]))
    
    // Reset and success
    setSuccess(true)
    setSheetData({
      title: '',
      artist: '',
      genre: 'Rock',
      difficulty: 'Intermediate',
      archiveUrl: '',
    })
    setTimeout(() => setSuccess(false), 4000)
  }

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sampleData.title || !sampleData.creator || !sampleData.archiveUrl) return

    // Get current local sample packs
    const existing = localStorage.getItem('custom_sample_packs')
    const packs = existing ? JSON.parse(existing) : []
    
    // Add new sample pack
    const newPack = {
      id: `custom-pack-${Date.now()}`,
      title: sampleData.title,
      creator: sampleData.creator,
      genre: sampleData.genre,
      description: sampleData.description || 'Premium studio-grade drum sample pack.',
      archiveUrl: sampleData.archiveUrl,
      uploadedAt: new Date().toISOString(),
    }
    
    localStorage.setItem('custom_sample_packs', JSON.stringify([newPack, ...packs]))
    
    // Reset and success
    setSuccess(true)
    setSampleData({
      title: '',
      creator: '',
      genre: 'Rock',
      description: '',
      archiveUrl: '',
    })
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Upload Center</h1>
        <p className="text-gray-400 mt-1">Publish drum sheets and sample packs to DrumShuffle (linked directly to Archive.org).</p>
      </div>

      {/* Select Upload Type tabs */}
      <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl max-w-md">
        <button
          onClick={() => { setUploadType('sheet'); setSuccess(false); }}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            uploadType === 'sheet'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          Drum Sheet PDF
        </button>
        <button
          onClick={() => { setUploadType('sample'); setSuccess(false); }}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            uploadType === 'sample'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Music className="w-4 h-4" />
          Sample Pack ZIP
        </button>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold">Successfully Published!</p>
            <p className="text-xs text-emerald-400/80 mt-0.5">Your item has been uploaded and is immediately live on the main platform pages.</p>
          </div>
        </motion.div>
      )}

      {uploadType === 'sheet' ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Sheet Music Details
          </h3>

          <form onSubmit={handleSheetSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Sheet / Song Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Puppets"
                  value={sheetData.title}
                  onChange={(e) => setSheetData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Artist / Band</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Metallica"
                  value={sheetData.artist}
                  onChange={(e) => setSheetData(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Genre</label>
                <select
                  value={sheetData.genre}
                  onChange={(e) => setSheetData(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
                >
                  {['Rock', 'Metal', 'Jazz', 'Pop', 'Funk', 'Blues', 'Punk'].map(g => (
                    <option key={g} value={g} className="bg-night-950">{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Difficulty</label>
                <select
                  value={sheetData.difficulty}
                  onChange={(e) => setSheetData(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
                >
                  {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                    <option key={d} value={d} className="bg-night-950">{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Archive.org Direct Download URL (PDF)</label>
              <input
                type="url"
                required
                placeholder="e.g. https://archive.org/download/drumsheetname/sheet.pdf"
                value={sheetData.archiveUrl}
                onChange={(e) => setSheetData(prev => ({ ...prev, archiveUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
              />
              <p className="text-xs text-gray-500">Provide the direct PDF file download link from your Archive.org item files.</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 mt-6 shadow-lg shadow-blue-600/20"
            >
              <Send className="w-4 h-4" />
              Publish Drum Sheet
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-400" />
            Sample Pack Details
          </h3>

          <form onSubmit={handleSampleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Sample Pack Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Rock Snares"
                  value={sampleData.title}
                  onChange={(e) => setSampleData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Creator / Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DrumShuffle Originals"
                  value={sampleData.creator}
                  onChange={(e) => setSampleData(prev => ({ ...prev, creator: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Genre / Style</label>
              <select
                value={sampleData.genre}
                onChange={(e) => setSampleData(prev => ({ ...prev, genre: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all"
              >
                {['Rock', 'Acoustic', 'Electronic', 'Metal', 'Lo-Fi', 'Hip Hop', 'Jazz'].map(g => (
                  <option key={g} value={g} className="bg-night-950">{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Description</label>
              <textarea
                rows={4}
                placeholder="e.g. A premium compilation of deep maple snare shots, rich overhead cymbal hits, and punchy kicks."
                value={sampleData.description}
                onChange={(e) => setSampleData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all placeholder:text-gray-600 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Archive.org Direct Download URL (ZIP)</label>
              <input
                type="url"
                required
                placeholder="e.g. https://archive.org/download/drumpackname/samples.zip"
                value={sampleData.archiveUrl}
                onChange={(e) => setSampleData(prev => ({ ...prev, archiveUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all placeholder:text-gray-600"
              />
              <p className="text-xs text-gray-500">Provide the direct ZIP file download link from your Archive.org item files.</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2 mt-6 shadow-lg shadow-red-600/20"
            >
              <Send className="w-4 h-4" />
              Publish Sample Pack
            </button>
          </form>
        </motion.div>
      )}
    </div>
  )
}
