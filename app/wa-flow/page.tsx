'use client'

import { useState } from 'react'
import { WAChat } from '@/components/wa-chat'
import { WASupport } from '@/components/wa-support'

const tabs = [
  { id: 'merchant', label: 'Merchant View' },
  { id: 'customer', label: 'Customer Notifications' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function WAFlowPage() {
  const [activeTab, setActiveTab] = useState<TabId>('merchant')

  return (
    <main className="min-h-screen bg-sewain-bg py-8 px-4">
      <div className="max-w-[420px] mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sewain-text-primary">WhatsApp Flow</h1>
          <p className="text-sm text-sewain-text-secondary mt-1">Simulasi alur percakapan WhatsApp</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-xl bg-white shadow-card overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-sewain-primary text-white'
                  : 'text-sewain-text-secondary hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'merchant' ? <WAChat /> : <WASupport />}
      </div>
    </main>
  )
}
