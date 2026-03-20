'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { ORDER, CUSTOMER, formatRp } from '@/lib/mock-data'

export default function DashboardCreateOrder() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  const [itemName] = useState(`${ORDER.item} — Size ${ORDER.size}`)
  const [category] = useState('Gaun Pesta')
  const [startDate] = useState('2025-04-12')
  const [endDate] = useState('2025-04-14')
  const [sewa] = useState('350.000')
  const [deposit] = useState('200.000')
  const [kycRequired] = useState(true)

  const total = 550000
  const paymentLink = `sewain.id/pay/${ORDER.id}`
  const waMessage = `Halo kak ${CUSTOMER.name}! Ini link pembayaran untuk sewa ${ORDER.item} ya 🙏\n\n${paymentLink}\n\nTotal: ${formatRp(total)} (termasuk deposit ${formatRp(ORDER.deposit)})\n— Powered by sewain.id`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  if (showSuccess) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-card p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check size={32} className="text-sewain-primary" />
          </div>
          <h2 className="text-xl font-bold text-sewain-text-primary">
            Link Pembayaran Berhasil Dibuat!
          </h2>
          <div className="bg-sewain-bg rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="flex-1 text-sm font-mono text-sewain-primary truncate">
              {paymentLink}
            </span>
            <button
              onClick={handleCopy}
              className="shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-primary hover:bg-gray-100 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Tersalin' : 'Copy'}
            </button>
          </div>
          <a
            href={`https://wa.me/${CUSTOMER.phone.replace(/\s/g, '').replace('+', '')}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-3 bg-sewain-primary text-white font-semibold rounded-xl hover:bg-sewain-primary-dark transition-colors"
          >
            Kirim via WhatsApp
          </a>
        </div>

        {/* WA preview */}
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-xs font-medium text-sewain-text-secondary mb-2">
            Preview Pesan WhatsApp:
          </p>
          <div className="bg-white rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line">
            {waMessage}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-sewain-text-primary">Buat Order Baru</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Detail Item */}
        <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <h2 className="font-semibold text-sewain-text-primary">Detail Item</h2>

          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Nama Item
            </label>
            <input
              type="text"
              defaultValue={itemName}
              className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Kategori
            </label>
            <select
              defaultValue={category}
              className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary bg-white"
            >
              <option>Gaun Pesta</option>
              <option>Kebaya</option>
              <option>Jas</option>
              <option>Aksesoris</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
                Mulai
              </label>
              <input
                type="date"
                defaultValue={startDate}
                className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
                Selesai
              </label>
              <input
                type="date"
                defaultValue={endDate}
                className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
              />
            </div>
          </div>

          <div className="bg-sewain-bg rounded-lg px-4 py-2.5 text-sm">
            <span className="text-sewain-text-secondary">Durasi: </span>
            <span className="font-medium text-sewain-text-primary">{ORDER.duration}</span>
          </div>
        </div>

        {/* Right - Pembayaran */}
        <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <h2 className="font-semibold text-sewain-text-primary">Pembayaran</h2>

          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Harga Sewa
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 text-sm bg-sewain-bg border border-r-0 border-sewain-border rounded-l-lg text-sewain-text-secondary">
                Rp
              </span>
              <input
                type="text"
                defaultValue={sewa}
                className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Deposit
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 text-sm bg-sewain-bg border border-r-0 border-sewain-border rounded-l-lg text-sewain-text-secondary">
                Rp
              </span>
              <input
                type="text"
                defaultValue={deposit}
                className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
              />
            </div>
          </div>

          <div className="bg-sewain-primary-light rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-sewain-text-secondary">Total</span>
            <span className="text-lg font-bold text-sewain-primary">{formatRp(total)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-sewain-text-primary">
              Wajib KYC untuk order ini
            </span>
            <button
              className={`w-11 h-6 rounded-full relative transition-colors ${
                kycRequired ? 'bg-sewain-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  kycRequired ? 'left-[22px]' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Customer */}
      <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
        <h2 className="font-semibold text-sewain-text-primary">Customer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Nama Customer
            </label>
            <input
              type="text"
              defaultValue={CUSTOMER.name}
              className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              No WhatsApp
            </label>
            <input
              type="text"
              defaultValue={CUSTOMER.phone}
              className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Risk Score
            </label>
            <div className="px-4 py-2.5 text-sm border border-sewain-border rounded-lg bg-sewain-bg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-sewain-text-primary">🟢 Rendah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 text-sm font-medium rounded-xl border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors">
          Simpan Draft
        </button>
        <button
          onClick={() => setShowSuccess(true)}
          className="px-6 py-3 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
        >
          Generate Link Pembayaran
        </button>
      </div>
    </div>
  )
}
