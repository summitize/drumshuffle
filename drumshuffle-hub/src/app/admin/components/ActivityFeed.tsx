'use client'

import { motion } from 'framer-motion'
import { FilePlus, Download, UserPlus, Star } from 'lucide-react'

const mockActivities = [
  { id: 1, type: 'upload', title: 'New Sheet Uploaded', desc: 'Rosanna - Toto by Admin', time: '10 mins ago', icon: FilePlus, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, type: 'download', title: 'High Download Volume', desc: '50+ downloads for "Take Five"', time: '1 hour ago', icon: Download, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, type: 'user', title: 'New Pro User', desc: 'Alex D. joined the platform', time: '3 hours ago', icon: UserPlus, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 4, type: 'favorite', title: 'Sheet Trending', desc: '"In The Air Tonight" got 20 new favorites', time: '5 hours ago', icon: Star, color: 'text-orange-400', bg: 'bg-orange-500/10' },
]

export function ActivityFeed() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full">
      <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="flex items-start gap-4 group"
          >
            <div className={`p-2.5 rounded-xl ${activity.bg} shrink-0 mt-1 transition-transform group-hover:scale-110`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">{activity.title}</p>
              <p className="text-sm text-gray-400 truncate mt-0.5">{activity.desc}</p>
            </div>
            
            <div className="shrink-0 text-xs text-gray-500 font-medium">
              {activity.time}
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-gray-300 transition-colors border border-white/5">
        View All Activity
      </button>
    </div>
  )
}
