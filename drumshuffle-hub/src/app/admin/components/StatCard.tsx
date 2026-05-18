'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  trend?: number
  icon: LucideIcon
  color: 'blue' | 'red' | 'green' | 'purple' | 'orange'
  delay?: number
}

const colorMap = {
  blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20',
  red: 'from-red-500/20 to-red-500/5 text-red-400 border-red-500/20',
  green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20',
  purple: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/20',
  orange: 'from-orange-500/20 to-orange-500/5 text-orange-400 border-orange-500/20',
}

export function StatCard({ title, value, prefix = '', suffix = '', trend, icon: Icon, color, delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0)

  // Animated counter
  useEffect(() => {
    let startTime: number
    const duration = 1500 // ms
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeProgress * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm group hover:border-white/20 transition-all`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[color]} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full -mr-10 -mt-10 pointer-events-none`} />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 font-medium text-sm mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {prefix}{count.toLocaleString()}{suffix}
            </h3>
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color].split(' ')[0]} ${colorMap[color].split(' ')[1]} border ${colorMap[color].split(' ')[3]}`}>
          <Icon className={`w-5 h-5 ${colorMap[color].split(' ')[2]}`} />
        </div>
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-2 mt-4 text-sm">
          <span className={`px-2 py-0.5 rounded-md flex items-center gap-1 font-medium ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </motion.div>
  )
}
