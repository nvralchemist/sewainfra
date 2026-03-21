'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  MessageCircle,
  ClipboardList,
  PlusCircle,
  Tag,
  Wallet,
  AlertTriangle,
  Settings,
  Bell,
  Menu,
  X,
} from 'lucide-react'
import { sidebarNav, MERCHANT } from '@/lib/mock-data'

const iconMap: Record<string, React.ReactNode> = {
  home: <Home size={20} />,
  'message-circle': <MessageCircle size={20} />,
  'clipboard-list': <ClipboardList size={20} />,
  'plus-circle': <PlusCircle size={20} />,
  tag: <Tag size={20} />,
  wallet: <Wallet size={20} />,
  'alert-triangle': <AlertTriangle size={20} />,
  settings: <Settings size={20} />,
}

interface DashboardLayoutProps {
  children: React.ReactNode
  activeNav: string
}

export default function DashboardLayout({ children, activeNav }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-sewain-bg flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-sewain-border flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-sewain-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sewain-primary flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-bold text-lg text-sewain-text-primary">Sewain</span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-sewain-text-secondary" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarNav.map((item) => {
            const isActive = item.id === activeNav
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sewain-primary text-white'
                    : 'text-sewain-text-secondary hover:bg-gray-100 hover:text-sewain-text-primary'
                }`}
              >
                {iconMap[item.icon] || <Home size={20} />}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center ${
                      isActive ? 'bg-white text-sewain-primary' : 'bg-sewain-red text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header bar */}
        <header className="h-16 bg-white border-b border-sewain-border flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-sewain-text-primary" />
            </button>
            <h1 className="text-lg font-semibold text-sewain-text-primary">{MERCHANT.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={20} className="text-sewain-text-secondary" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-sewain-red rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-sewain-primary flex items-center justify-center text-white text-sm font-bold">
              {MERCHANT.initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
