'use client'

import { AdminChart } from '../components/AdminChart'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts'
import { Download, Users, Star, ArrowUpRight } from 'lucide-react'

const genreData = [
  { name: 'Rock', value: 400, color: '#3b82f6' },
  { name: 'Jazz', value: 300, color: '#8b5cf6' },
  { name: 'Pop', value: 300, color: '#ec4899' },
  { name: 'Metal', value: 200, color: '#ef4444' },
  { name: 'Funk', value: 100, color: '#f59e0b' },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics Dashboard</h1>
        <p className="text-gray-400 mt-1">Deep dive into your platform&apos;s performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
           <div>
             <p className="text-gray-400 text-sm mb-1">Total Downloads</p>
             <h3 className="text-3xl font-bold text-white">45.2K</h3>
             <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1"><ArrowUpRight className="w-4 h-4"/> +12% this month</p>
           </div>
           <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400">
             <Download className="w-6 h-6" />
           </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
           <div>
             <p className="text-gray-400 text-sm mb-1">Active Users</p>
             <h3 className="text-3xl font-bold text-white">1.2K</h3>
             <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1"><ArrowUpRight className="w-4 h-4"/> +8% this month</p>
           </div>
           <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400">
             <Users className="w-6 h-6" />
           </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
           <div>
             <p className="text-gray-400 text-sm mb-1">Total Favorites</p>
             <h3 className="text-3xl font-bold text-white">8.5K</h3>
             <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1"><ArrowUpRight className="w-4 h-4"/> +24% this month</p>
           </div>
           <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400">
             <Star className="w-6 h-6" />
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AdminChart />
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Popular Genres</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '14px', color: '#9ca3af' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
