'use client'

import { Save, Image as ImageIcon, Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="text-gray-400 mt-1">Configure global settings for DrumShuffle Hub.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            General Information
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Site Name</label>
            <input type="text" defaultValue="DrumShuffle Hub" className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Site Description</label>
            <textarea rows={3} defaultValue="Premium drum sheets and metronome tools." className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none" />
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            Branding
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Logo</span>
            </div>
            <div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors border border-white/5">
                Upload New Logo
              </button>
              <p className="text-xs text-gray-500 mt-2">Recommended: 512x512px transparent PNG.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors border border-white/10">
          Cancel
        </button>
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
