'use client'

import { useState } from 'react'
import { Lock, Mail, Loader2, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Simulate delay for premium loading experience
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === 'vedsumeet7@gmail.com' && password === 'Ved070112!') {
      // Authenticate via client-side cookie
      document.cookie = "admin_session=authenticated; path=/; max-age=86400; SameSite=Lax"
      
      // Store in localStorage as fallback
      localStorage.setItem('admin_session', 'authenticated')
      
      // Redirect to main admin dashboard
      window.location.href = '/admin'
    } else {
      setError('Invalid email or password. Please use authorized credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] text-white p-4 relative overflow-hidden">
      {/* Background neon accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="relative group">
          {/* Animated colorful outline */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 via-purple-600 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex p-3 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-2xl mb-4"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <h1 className="text-3xl font-display font-extrabold tracking-tight">
                Admin <span className="gradient-text">Sign In</span>
              </h1>
              <p className="text-night-400 text-sm mt-2">Access the DrumShuffle Control Panel</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-night-300" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-night-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-2xl leading-5 bg-white/5 text-white placeholder-night-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm transition-all"
                    placeholder="vedsumeet7@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-night-300" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-night-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-2xl leading-5 bg-white/5 text-white placeholder-night-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg text-sm font-bold text-white bg-brand-500 hover:bg-brand-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all group shadow-brand-500/25 mt-6"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
