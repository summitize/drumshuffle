'use client'

import { useState } from 'react'
import { Search, User, Shield, Ban, MoreVertical, CheckCircle2 } from 'lucide-react'

const mockUsers = Array.from({ length: 15 }).map((_, i) => ({
  id: `usr-${i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i === 0 ? 'Admin' : 'User',
  status: Math.random() > 0.1 ? 'Active' : 'Banned',
  joined: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
}))

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
        <p className="text-gray-400 mt-1">Manage platform users, roles, and access.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors">
            Invite Admin
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm text-gray-400 bg-white/[0.02]">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium hidden sm:table-cell">Joined</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.04] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {user.role === 'Admin' ? (
                        <Shield className="w-4 h-4 text-purple-400" />
                      ) : null}
                      <span className={`text-sm ${user.role === 'Admin' ? 'text-purple-400 font-medium' : 'text-gray-400'}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle2 className="w-3 h-3"/> : <Ban className="w-3 h-3"/>}
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 hidden sm:table-cell">{user.joined}</td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
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
