'use client'

import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', downloads: 120, views: 240 },
  { name: 'Tue', downloads: 200, views: 350 },
  { name: 'Wed', downloads: 150, views: 280 },
  { name: 'Thu', downloads: 280, views: 420 },
  { name: 'Fri', downloads: 210, views: 380 },
  { name: 'Sat', downloads: 350, views: 550 },
  { name: 'Sun', downloads: 300, views: 480 },
]

export function AdminChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
          <p className="text-sm text-gray-400 mt-1">Downloads vs Views this week</p>
        </div>
        <select className="bg-white/5 border border-white/10 text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '12px' }}
              itemStyle={{ fontSize: '14px' }}
            />
            <Area type="monotone" dataKey="views" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
            <Area type="monotone" dataKey="downloads" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDownloads)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
