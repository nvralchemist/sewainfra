'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import {
  chatContacts,
  budiRiskProfile,
  budiChatMessages,
} from '@/lib/mock-data'

const riskColors: Record<string, string> = {
  rendah: 'bg-green-500',
  sedang: 'bg-yellow-500',
  tinggi: 'bg-red-500',
}

const riskBadge: Record<string, { bg: string; text: string; label: string }> = {
  rendah: { bg: 'bg-green-100', text: 'text-green-700', label: 'Rendah' },
  sedang: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Sedang' },
  tinggi: { bg: 'bg-red-100', text: 'text-red-700', label: 'Tinggi' },
}

export default function DashboardChat() {
  const [selectedId, setSelectedId] = useState('2')
  const [message, setMessage] = useState('')

  const selectedContact = chatContacts.find((c) => c.id === selectedId)

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-8rem)]">
      {/* Left panel - Chat list */}
      <div className="w-full lg:w-[35%] bg-white rounded-xl shadow-card flex flex-col overflow-hidden shrink-0 lg:max-h-full max-h-64 lg:min-h-0">
        <div className="p-4 border-b border-sewain-border">
          <h2 className="font-semibold text-sewain-text-primary">Chat Customers</h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-sewain-border">
          {chatContacts.map((contact) => {
            const isSelected = contact.id === selectedId
            const badge = riskBadge[contact.risk]
            return (
              <button
                key={contact.id}
                onClick={() => setSelectedId(contact.id)}
                className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                  isSelected ? 'bg-sewain-primary-light' : 'hover:bg-gray-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${riskColors[contact.risk]}`}
                >
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-sewain-text-primary truncate">
                      {contact.name}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-sewain-text-secondary truncate mt-0.5">
                    {contact.lastMessage}
                  </p>
                </div>
                {contact.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right panel - Active chat */}
      <div className="flex-1 bg-white rounded-xl shadow-card flex flex-col overflow-hidden min-h-0">
        {/* Chat header */}
        <div className="p-4 border-b border-sewain-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-sewain-text-primary">
              {selectedContact?.name || 'Select a contact'}
            </h2>
            {selectedId === '2' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                🔴 RISIKO TINGGI
              </span>
            )}
          </div>
          {selectedId === '2' && (
            <button className="text-sm text-sewain-primary font-medium hover:underline shrink-0">
              Lihat Detail Profil
            </button>
          )}
        </div>

        {/* Chat body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Risk profile card (only for Budi) */}
          {selectedId === '2' && (
            <div className="bg-white rounded-lg border-l-4 border-red-500 p-4 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-sewain-text-primary">
                  Profil Risiko
                </h3>
                <span className="text-xs font-bold text-red-600">
                  🔴 {budiRiskProfile.level} ({budiRiskProfile.score}/100)
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${budiRiskProfile.score}%` }}
                />
              </div>
              {/* Flags */}
              <div className="space-y-1.5">
                {budiRiskProfile.flags.map((flag, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 text-xs rounded-md px-2.5 py-1.5 ${
                      flag.icon === '⚠️' ? 'bg-amber-50 text-amber-800' : 'bg-green-50 text-green-800'
                    }`}
                  >
                    <span className="shrink-0">{flag.icon}</span>
                    <span>
                      <strong>{flag.label}:</strong> {flag.detail}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-sewain-text-secondary italic">
                {budiRiskProfile.recommendation}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors">
                  Tetap Lanjut
                </button>
                <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-sewain-red text-white hover:bg-red-600 transition-colors">
                  Tolak Customer
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          {selectedId === '2' &&
            budiChatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'merchant' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.sender === 'merchant'
                      ? 'bg-[#dcf8c6] text-sewain-text-primary rounded-tr-none'
                      : 'bg-white text-sewain-text-primary rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      msg.sender === 'merchant' ? 'text-green-700/60' : 'text-sewain-text-secondary'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

          {selectedId !== '2' && (
            <div className="flex items-center justify-center h-32 text-sewain-text-secondary text-sm">
              Pilih Budi Wijaya untuk melihat demo chat
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-sewain-border p-3 space-y-2">
          {/* Quick send buttons */}
          <div className="flex gap-2 flex-wrap">
            {['Link Bayar', 'Reminder Kembali', 'Ringkasan Order'].map((label) => (
              <button
                key={label}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-sewain-primary text-sewain-primary hover:bg-sewain-primary-light transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          {/* Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-2.5 text-sm border border-sewain-border rounded-full focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
            />
            <button className="w-10 h-10 rounded-full bg-sewain-primary text-white flex items-center justify-center hover:bg-sewain-primary-dark transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
