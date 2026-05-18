'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MoreVertical, Edit2, Trash2, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock Data
const mockPdfs = Array.from({ length: 25 }).map((_, i) => ({
  id: `pdf-${i}`,
  title: `Drum Sheet ${i + 1} - Advanced Fill`,
  artist: `Artist ${Math.floor(i / 5) + 1}`,
  genre: ['Rock', 'Jazz', 'Pop', 'Metal', 'Funk'][i % 5],
  difficulty: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
  downloads: Math.floor(Math.random() * 1000),
  uploadedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  status: ['Published', 'Draft'][Math.floor(Math.random() * 1.2)], // More likely to be published
}))

export default function ManagePdfsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPdfs, setSelectedPdfs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const toggleSelectAll = () => {
    if (selectedPdfs.length === mockPdfs.length) {
      setSelectedPdfs([])
    } else {
      setSelectedPdfs(mockPdfs.map(p => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedPdfs(prev => 
      prev.includes(id) ? prev.filter(pdfId => pdfId !== id) : [...prev, id]
    )
  }

  const filteredPdfs = mockPdfs.filter(pdf => 
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pdf.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPdfs.length / itemsPerPage)
  const paginatedPdfs = filteredPdfs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manage PDFs</h1>
          <p className="text-gray-400 mt-1">View, edit, and organize all drum sheets.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          {selectedPdfs.length > 0 && (
            <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-colors text-sm font-medium">
              Delete Selected ({selectedPdfs.length})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/20">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by title or artist..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Showing {paginatedPdfs.length} of {filteredPdfs.length} items</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm text-gray-400 bg-white/[0.02]">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedPdfs.length === mockPdfs.length && mockPdfs.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50"
                  />
                </th>
                <th className="p-4 font-medium">Sheet Title</th>
                <th className="p-4 font-medium hidden sm:table-cell">Artist</th>
                <th className="p-4 font-medium hidden md:table-cell">Genre</th>
                <th className="p-4 font-medium hidden lg:table-cell">Difficulty</th>
                <th className="p-4 font-medium hidden xl:table-cell">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedPdfs.map((pdf, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  key={pdf.id} 
                  className={`group hover:bg-white/[0.04] transition-colors ${selectedPdfs.includes(pdf.id) ? 'bg-blue-500/5' : ''}`}
                >
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedPdfs.includes(pdf.id)}
                      onChange={() => toggleSelect(pdf.id)}
                      className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-400 shrink-0 hidden sm:block">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200 line-clamp-1">{pdf.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 sm:hidden">{pdf.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-400 hidden sm:table-cell">{pdf.artist}</td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                      {pdf.genre}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      pdf.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                      pdf.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {pdf.difficulty}
                    </span>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${pdf.status === 'Published' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                      <span className="text-sm text-gray-400">{pdf.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors" title="Edit Metadata">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors hidden sm:block" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors sm:hidden">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {paginatedPdfs.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No PDFs found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
