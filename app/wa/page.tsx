'use client'

import { useState } from 'react'
import { WAChat } from '@/components/wa-chat'
import { WASupport } from '@/components/wa-support'
import { WAQuickSend } from '@/components/wa-quick-send'

const tabs = [
  { id: '1a', label: '1A Chat Flow' },
  { id: '1b', label: '1B Support' },
  { id: '1c', label: '1C Quick Send' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function WAPage() {
  const [activeTab, setActiveTab] = useState<TabId>('1a')

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-[420px] mx-auto space-y-4">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">WhatsApp Prototype</h1>
          <p className="text-sm text-gray-500 mt-1">Simulasi pengalaman WhatsApp Sewain</p>
        </div>

        {/* Tab navigation */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 text-xs font-medium py-2.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-sewain-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active screen */}
        {activeTab === '1a' && <WAChat />}
        {activeTab === '1b' && <WASupport />}
        {activeTab === '1c' && <WAQuickSend />}
      </div>
    </main>
  )
}
