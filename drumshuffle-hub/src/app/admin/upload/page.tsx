'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload as UploadIcon, File as FileIcon, X, Loader2 } from 'lucide-react'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf')
      setFiles(prev => [...prev, ...droppedFiles])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf')
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setUploading(false)
    setFiles([])
    // Here we would typically show a success toast or redirect
    alert('Files uploaded successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Upload PDFs</h1>
        <p className="text-gray-400 mt-1">Upload multiple drum sheet PDFs at once.</p>
      </div>

      {/* Upload Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ${
          isDragging 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
        }`}
      >
        <input 
          type="file" 
          multiple 
          accept=".pdf" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center justify-center text-center pointer-events-none">
          <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
            <UploadIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {isDragging ? 'Drop PDFs here' : 'Drag & Drop PDFs here'}
          </h3>
          <p className="text-gray-400 mb-6 max-w-sm">
            Support for bulk uploads. Only PDF files are allowed. Maximum size 50MB per file.
          </p>
          <div className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-medium">
            Browse Files
          </div>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              <h4 className="font-semibold text-white">Selected Files ({files.length})</h4>
              <button 
                onClick={() => setFiles([])}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
                disabled={uploading}
              >
                Clear All
              </button>
            </div>
            
            <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
              {files.map((file, index) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={`${file.name}-${index}`} 
                  className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl shrink-0">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate pr-4">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    disabled={uploading}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-black/20 border-t border-white/10">
              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading {files.length} files...
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-5 h-5" />
                    Upload {files.length} Files
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
