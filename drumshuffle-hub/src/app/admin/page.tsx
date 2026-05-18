'use client'

import { StatCard } from './components/StatCard'
import { ActivityFeed } from './components/ActivityFeed'
import { AdminChart } from './components/AdminChart'
import { FileText, Download, Users, Star, TrendingUp, Clock } from 'lucide-react'

export default function AdminDashboard() {
  // We can fetch initial stats here if we have tables.
  // For now, we use mockup data as per UI requirements.

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3 hidden sm:flex">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors text-sm font-medium">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all text-sm font-medium">
            Upload PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="xl:col-span-2">
          <StatCard title="Total PDFs" value={342} icon={FileText} color="blue" trend={12} delay={0} />
        </div>
        <div className="xl:col-span-2">
          <StatCard title="Total Downloads" value={45231} icon={Download} color="green" trend={24} delay={0.1} />
        </div>
        <div className="xl:col-span-2">
          <StatCard title="Active Users" value={1204} icon={Users} color="purple" trend={8} delay={0.2} />
        </div>
        <div className="xl:col-span-2">
          <StatCard title="Favorites Count" value={892} icon={Star} color="orange" trend={15} delay={0.3} />
        </div>
        <div className="xl:col-span-2">
          <StatCard title="Avg. Downloads/Day" value={145} icon={TrendingUp} color="red" trend={-2} delay={0.4} />
        </div>
        <div className="xl:col-span-2">
          <StatCard title="Recent Uploads" value={12} icon={Clock} color="blue" trend={45} delay={0.5} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AdminChart />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
      
      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { title: 'Manage PDFs', desc: 'Edit metadata, delete or update files.', icon: FileText, color: 'text-blue-400' },
          { title: 'View Analytics', desc: 'Deep dive into your traffic and downloads.', icon: TrendingUp, color: 'text-emerald-400' },
          { title: 'User Settings', desc: 'Manage access and user roles.', icon: Users, color: 'text-purple-400' },
        ].map((card, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-white">{card.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
