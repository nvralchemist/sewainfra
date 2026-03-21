'use client'

import React, { useState } from 'react'
import { Send, Copy, Check, ExternalLink } from 'lucide-react'
import {
  chatContacts as initialChatContacts,
  budiRiskProfile,
  budiChatMessages,
  quickSendTemplates,
  customers,
  type ChatContact,
} from '@/lib/mock-data'
import Modal from '@/components/modal'
import { useToast } from '@/components/toast'

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

interface DashboardChatProps {
  initialCustomerId?: string
}

export default function DashboardChat({ initialCustomerId }: DashboardChatProps) {
  const { showToast } = useToast()

  // Local state for contacts so we can toggle unread
  const [contacts, setContacts] = useState<ChatContact[]>(() => [...initialChatContacts])

  // Find the contact matching initialCustomerId, default to '2' (Budi)
  const defaultId = (() => {
    if (initialCustomerId) {
      const match = initialChatContacts.find((c) => c.customerId === initialCustomerId)
      if (match) return match.id
    }
    return '2'
  })()

  const [selectedId, setSelectedId] = useState(defaultId)
  const [message, setMessage] = useState('')
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Risk card visibility
  const [showRiskCard, setShowRiskCard] = useState(true)
  // "Lanjut diproses" badge state
  const [lanjutBadge, setLanjutBadge] = useState(false)
  // "Customer ditolak" state
  const [customerDitolak, setCustomerDitolak] = useState(false)
  // Modal state for reject confirmation
  const [showRejectModal, setShowRejectModal] = useState(false)
  // Profile detail visibility
  const [showProfile, setShowProfile] = useState(false)

  const selectedContact = contacts.find((c) => c.id === selectedId)

  const handleSelectContact = (id: string) => {
    setSelectedId(id)
    // Mark as read (remove unread dot)
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    )
    // Reset states when switching contacts
    if (id !== '2') {
      setShowRiskCard(true)
      setLanjutBadge(false)
      setCustomerDitolak(false)
      setShowProfile(false)
    }
  }

  const handleCopyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      showToast('Pesan tersalin! \u2713')
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback
    }
  }

  const getCustomerPhone = () => {
    if (!selectedContact) return ''
    const customer = customers.find((c) => c.id === selectedContact.customerId)
    return customer?.phone || ''
  }

  const waDeepLink = (text: string) => {
    const phone = getCustomerPhone()
    return `https://wa.me/${phone.replace(/\s/g, '').replace('+', '')}?text=${encodeURIComponent(text)}`
  }

  const handleTetapLanjut = () => {
    setShowRiskCard(false)
    setLanjutBadge(true)
  }

  const handleTolakCustomer = () => {
    setShowRejectModal(true)
  }

  const confirmReject = () => {
    setShowRejectModal(false)
    setCustomerDitolak(true)
    setShowRiskCard(false)
    showToast('Customer ditolak', 'error')
  }

  const handleToggleProfile = () => {
    setShowProfile((prev) => !prev)
    if (!showProfile) {
      setShowRiskCard(true)
    } else {
      setShowRiskCard(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-8rem)]">
      {/* Left panel - Chat list */}
      <div className="w-full lg:w-[35%] bg-white rounded-xl shadow-card flex flex-col overflow-hidden shrink-0 lg:max-h-full max-h-64 lg:min-h-0">
        <div className="p-4 border-b border-sewain-border">
          <h2 className="font-semibold text-sewain-text-primary">Chat Customers</h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-sewain-border">
          {contacts.map((contact) => {
            const isSelected = contact.id === selectedId
            const badge = riskBadge[contact.risk]
            return (
              <button
                key={contact.id}
                onClick={() => handleSelectContact(contact.id)}
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
            {selectedId === '2' && !customerDitolak && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                \ud83d\udd34 RISIKO TINGGI
              </span>
            )}
            {selectedId === '2' && lanjutBadge && !customerDitolak && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Lanjut diproses
              </span>
            )}
            {selectedId === '2' && customerDitolak && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Customer ditolak
              </span>
            )}
          </div>
          {selectedId === '2' && !customerDitolak && (
            <button
              onClick={handleToggleProfile}
              className="text-sm text-sewain-primary font-medium hover:underline shrink-0"
            >
              {showProfile ? 'Tutup Detail Profil' : 'Lihat Detail Profil'}
            </button>
          )}
        </div>

        {/* Chat body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Customer ditolak state */}
          {selectedId === '2' && customerDitolak && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center space-y-2">
              <p className="text-sm font-semibold text-red-700">Customer Ditolak</p>
              <p className="text-xs text-red-600">Customer ini telah ditolak. Chat tidak dapat dilanjutkan.</p>
            </div>
          )}

          {/* Quick Send panel */}
          {selectedId === '2' && !customerDitolak && (
            <div className="bg-white rounded-lg border border-sewain-border p-4 space-y-3">
              <h3 className="font-semibold text-sm text-sewain-text-primary">Quick Send</h3>
              <div className="flex flex-wrap gap-2">
                {quickSendTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() =>
                      setExpandedTemplate(expandedTemplate === tpl.id ? null : tpl.id)
                    }
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      expandedTemplate === tpl.id
                        ? 'border-sewain-primary bg-sewain-primary-light text-sewain-primary'
                        : 'border-sewain-border text-sewain-text-secondary hover:bg-gray-50'
                    }`}
                  >
                    {tpl.icon} {tpl.label}
                  </button>
                ))}
              </div>

              {/* Expanded template preview */}
              {expandedTemplate && (() => {
                const tpl = quickSendTemplates.find((t) => t.id === expandedTemplate)
                if (!tpl) return null
                return (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-3 animate-slide-up">
                    <p className="text-xs font-medium text-sewain-text-secondary">Preview Pesan:</p>
                    <div className="bg-white rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line border border-sewain-border">
                      {tpl.message}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(waDeepLink(tpl.message), '_blank')}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
                      >
                        Buka di WhatsApp <ExternalLink size={12} />
                      </button>
                      <button
                        onClick={() => handleCopyMessage(tpl.id, tpl.message)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-100 transition-colors"
                      >
                        {copiedId === tpl.id ? <Check size={12} /> : <Copy size={12} />}
                        {copiedId === tpl.id ? 'Tersalin' : 'Salin Pesan'}
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Risk profile card (only for Budi, toggleable) */}
          {selectedId === '2' && showRiskCard && showProfile && !customerDitolak && (
            <div className="bg-white rounded-lg border-l-4 border-red-500 p-4 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-sewain-text-primary">
                  Profil Risiko
                </h3>
                <span className="text-xs font-bold text-red-600">
                  \ud83d\udd34 {budiRiskProfile.level} ({budiRiskProfile.score}/100)
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
                      flag.icon === '\u26a0\ufe0f' ? 'bg-amber-50 text-amber-800' : 'bg-green-50 text-green-800'
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
                <button
                  onClick={handleTetapLanjut}
                  className="flex-1 py-2 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors"
                >
                  Tetap Lanjut
                </button>
                <button
                  onClick={handleTolakCustomer}
                  className="flex-1 py-2 text-sm font-medium rounded-lg bg-sewain-red text-white hover:bg-red-600 transition-colors"
                >
                  Tolak Customer
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          {selectedId === '2' && !customerDitolak &&
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
          <p className="text-[10px] text-sewain-text-secondary text-center">
            Pesan dikirim melalui WhatsApp
          </p>
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

      {/* Reject confirmation modal */}
      <Modal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Konfirmasi Tolak"
      >
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-primary">
            Yakin tolak customer ini?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowRejectModal(false)}
              className="flex-1 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={confirmReject}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-red text-white hover:bg-red-600 transition-colors"
            >
              Ya, Tolak
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
