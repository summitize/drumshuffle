'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, FileText, Music, Link as LinkIcon, Search, Calendar } from 'lucide-react'

interface CustomSheet {
  id: string
  title: string
  artist: string
  genre: string
  difficulty: string
  archiveUrl: string
  uploadedAt: string
}

interface CustomPack {
  id: string
  title: string
  creator: string
  genre: string
  description: string
  archiveUrl: string
  uploadedAt: string
}

export default function ManagePdfsPage() {
  const [sheets, setSheets] = useState<CustomSheet[]>([])
  const [packs, setPacks] = useState<CustomPack[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'sheets' | 'packs'>('sheets')

  // Load custom items from localStorage
  const loadItems = () => {
    if (typeof window !== 'undefined') {
      const localSheets = localStorage.getItem('custom_sheets')
      const localPacks = localStorage.getItem('custom_sample_packs')
      
      setSheets(localSheets ? JSON.parse(localSheets) : [])
      setPacks(localPacks ? JSON.parse(localPacks) : [])
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  // Delete handlers
  const deleteSheet = (id: string) => {
    const updated = sheets.filter(sheet => sheet.id !== id)
    localStorage.setItem('custom_sheets', JSON.stringify(updated))
    setSheets(updated)
  }

  const deletePack = (id: string) => {
    const updated = packs.filter(pack => pack.id !== id)
    localStorage.setItem('custom_sample_packs', JSON.stringify(updated))
    setPacks(updated)
  }

  // Filtering
  const filteredSheets = sheets.filter(sheet =>
    sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPacks = packs.filter(pack =>
    pack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pack.creator.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage Uploads</h1>
          <p className="text-gray-400 mt-1">Review and manage your custom Archive.org uploads stored locally.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button
          onClick={() => setActiveTab('sheets')}
          className={`pb-2 font-semibold text-sm transition-all border-b-2 ${
            activeTab === 'sheets'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Custom Sheets ({sheets.length})
        </button>
        <button
          onClick={() => setActiveTab('packs')}
          className={`pb-2 font-semibold text-sm transition-all border-b-2 ${
            activeTab === 'packs'
              ? 'border-red-500 text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Custom Sample Packs ({packs.length})
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder={`Search by title or ${activeTab === 'sheets' ? 'artist' : 'creator'}...`} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Custom Items List */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <AnimatePresence mode="wait">
          {activeTab === 'sheets' ? (
            <motion.div
              key="sheets"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-semibold text-gray-400 bg-white/[0.01] uppercase tracking-wider">
                    <th className="p-4">Sheet Title</th>
                    <th className="p-4">Artist</th>
                    <th className="p-4">Genre</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Date Added</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-gray-200">
                  {filteredSheets.map((sheet) => (
                    <tr key={sheet.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold">{sheet.title}</p>
                            <a 
                              href={sheet.archiveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <LinkIcon className="w-3 h-3" />
                              Archive.org Direct Link
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{sheet.artist}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">
                          {sheet.genre}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          sheet.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                          sheet.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          {sheet.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(sheet.uploadedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteSheet(sheet.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete Upload"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSheets.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-gray-500">
                        No custom sheets found. Add some in the &quot;Upload Center&quot;!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              key="packs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-semibold text-gray-400 bg-white/[0.01] uppercase tracking-wider">
                    <th className="p-4">Sample Pack Title</th>
                    <th className="p-4">Creator</th>
                    <th className="p-4">Genre</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Date Added</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-gray-200">
                  {filteredPacks.map((pack) => (
                    <tr key={pack.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
                            <Music className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold">{pack.title}</p>
                            <a 
                              href={pack.archiveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-red-400 hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <LinkIcon className="w-3 h-3" />
                              Archive.org Direct Link
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{pack.creator}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">
                          {pack.genre}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 max-w-xs truncate">{pack.description}</td>
                      <td className="p-4 text-gray-400 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(pack.uploadedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deletePack(pack.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete Upload"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPacks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-gray-500">
                        No custom sample packs found. Add some in the &quot;Upload Center&quot;!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
