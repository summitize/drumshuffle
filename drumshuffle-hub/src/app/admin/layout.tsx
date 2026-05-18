'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Tags, 
  BarChart3, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,
  Drum,
  Search,
  Bell
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Upload PDFs', href: '/admin/upload', icon: Upload },
  { name: 'Manage PDFs', href: '/admin/pdfs', icon: FileText },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem('admin_session')
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden selection:bg-blue-500/30">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 260 : 80,
        }}
        className={`fixed lg:static inset-y-0 left-0 z-50 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
          <Link href="/admin" className="flex items-center gap-3 text-white overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-red-500 p-1.5 rounded-lg shrink-0">
              <Drum className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg whitespace-nowrap tracking-tight">DrumShuffle <span className="text-blue-400">CMS</span></span>
            )}
          </Link>
          <button 
            className="lg:hidden p-1 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full" 
                  />
                )}
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`} />
                {sidebarOpen && (
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-white/5 shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all ${sidebarOpen ? '' : 'justify-center'}`}
            title="Log Out"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="font-medium">Log Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(true)
                } else {
                  setSidebarOpen(!sidebarOpen)
                }
              }}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-48 focus:w-64 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#050505]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 relative">
          {/* Subtle background gradients for content area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="relative z-10 h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
