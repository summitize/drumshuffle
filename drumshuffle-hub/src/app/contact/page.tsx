'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Copy, Check, Sparkles, Send } from 'lucide-react'

export default function ContactPage() {
  const [copiedType, setCopiedType] = useState<'email' | 'discord' | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const copyToClipboard = (text: string, type: 'email' | 'discord') => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSending(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSending(false)
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-brand-500/30 relative overflow-hidden pt-28 pb-20">
      {/* Background Blurs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="bg-brand-500/10 p-2 rounded-2xl border border-brand-500/20">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-sm font-bold text-brand-400 tracking-[0.2em] uppercase">Connect</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-night-300 text-lg mt-4 max-w-lg mx-auto"
          >
            Have a question, feedback, or want to jam? Send a message or reach out on Discord.
          </motion.p>
        </div>

        {/* Form and Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-brand-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-night-400 text-sm">Email Address</h3>
                  <p className="font-bold text-white text-base sm:text-lg break-all">vedsumeet7@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <a 
                  href="mailto:vedsumeet7@gmail.com" 
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Send Direct Mail
                </a>
                <button
                  onClick={() => copyToClipboard('vedsumeet7@gmail.com', 'email')}
                  className="p-2 hover:bg-white/5 border border-white/10 rounded-xl text-night-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Email
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Discord Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-brand-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c1,.73,2,1.48,3,2.2a74.77,74.77,0,0,0,91.9,0c1-.72,2-1.47,3-2.2a68.86,68.86,0,0,1-10.44,5,77.26,77.26,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.54,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-night-400 text-sm">Discord Username</h3>
                  <p className="font-bold text-white text-base sm:text-lg">vedbub</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <a 
                  href="https://www.discord.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Join Official Discord
                </a>
                <button
                  onClick={() => copyToClipboard('vedbub', 'discord')}
                  className="p-2 hover:bg-white/5 border border-white/10 rounded-xl text-night-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  {copiedType === 'discord' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Username
                    </>
                  )}
                </button>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 glass-card bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-night-300">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-night-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-night-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-night-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-night-300">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Say something inspiring..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-night-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className="w-full justify-center py-3.5 px-6 rounded-2xl font-bold text-white bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-brand-500/20"
              >
                {sending ? (
                  <>Sending Message...</>
                ) : sent ? (
                  <>Message Sent Successfully!</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </div>
  )
}
