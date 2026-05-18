'use client'

import { useState } from 'react'
import { Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react'

const initialCategories = [
  { id: '1', name: 'Rock', slug: 'rock', count: 120 },
  { id: '2', name: 'Jazz', slug: 'jazz', count: 85 },
  { id: '3', name: 'Pop', slug: 'pop', count: 200 },
  { id: '4', name: 'Metal', slug: 'metal', count: 64 },
]

export default function CategoriesPage() {
  const [categories] = useState(initialCategories)

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Categories</h1>
          <p className="text-gray-400 mt-1">Manage genres, tags, and sheet categories.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm text-gray-400 bg-white/[0.02]">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Slug</th>
                <th className="p-4 font-medium">Items Count</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categories.map((cat) => (
                <tr key={cat.id} className="group hover:bg-white/[0.04] transition-colors">
                  <td className="p-4 font-medium text-white">{cat.name}</td>
                  <td className="p-4 text-gray-400 text-sm">{cat.slug}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
                      {cat.count} sheets
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors sm:hidden">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
