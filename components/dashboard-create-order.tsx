'use client'

import React, { useState, useMemo } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { formatRp } from '@/lib/mock-data'
import { useToast } from '@/components/toast'
import { useRouter } from 'next/navigation'

type Errors = {
  itemName?: string
  startDate?: string
  endDate?: string
  sewa?: string
  deposit?: string
  customerName?: string
  customerPhone?: string
}

export default function DashboardCreateOrder() {
  const { showToast } = useToast()
  const router = useRouter()

  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('Gaun Pesta')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sewa, setSewa] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [kycRequired, setKycRequired] = useState(true)
  const [errors, setErrors] = useState<Errors>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null)

  // Auto-calculate duration
  const duration = useMemo(() => {
    if (!startDate || !endDate) return null
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (diff <= 0) return null
    return diff
  }, [startDate, endDate])

  // Auto-calculate total
  const total = useMemo(() => sewa + deposit, [sewa, deposit])

  // Generated order ID
  const orderId = useMemo(() => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
    return `TRX-${dateStr}-NEW-001`
  }, [])

  const paymentLink = `sewain.id/pay/${orderId}`

  const waPaymentMsg = `Halo kak ${customerName}! Ini link pembayaran untuk sewa ${itemName} ya \ud83d\ude4f\n\n${paymentLink}\n\nTotal: ${formatRp(total)} (termasuk deposit ${formatRp(deposit)})\n\u2014 Powered by sewain.id`

  const waOrderSummaryMsg = `Ringkasan Order \u2014 ${orderId}\n\nItem: ${itemName}\nPeriode: ${startDate} \u2013 ${endDate}\nSewa: ${formatRp(sewa)}\nDeposit: ${formatRp(deposit)}\nTotal: ${formatRp(total)}\n\nStatus: Baru\n\u2014 Powered by sewain.id`

  const waDeepLink = (text: string) => {
    const phone = customerPhone.replace(/\s/g, '').replace('+', '')
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  const validate = (): boolean => {
    const newErrors: Errors = {}

    if (!itemName.trim()) {
      newErrors.itemName = 'Nama item wajib diisi'
    }
    if (!startDate) {
      newErrors.startDate = 'Tanggal wajib diisi'
    }
    if (!endDate) {
      newErrors.endDate = 'Tanggal wajib diisi'
    }
    if (startDate && endDate) {
      const s = new Date(startDate)
      const e = new Date(endDate)
      if (e <= s) {
        newErrors.endDate = 'Tanggal kembali harus setelah tanggal mulai'
      }
    }
    if (sewa <= 0) {
      newErrors.sewa = 'Nominal harus lebih dari Rp 0'
    }
    if (deposit <= 0) {
      newErrors.deposit = 'Nominal harus lebih dari Rp 0'
    }
    if (!customerName.trim()) {
      newErrors.customerName = 'Nama customer wajib diisi'
    }
    if (!customerPhone.trim() || !customerPhone.trim().startsWith('+62')) {
      newErrors.customerPhone = 'Format nomor tidak valid. Gunakan format +62xxx'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerate = () => {
    if (validate()) {
      setShowSuccess(true)
    }
  }

  const handleSaveDraft = () => {
    showToast('Draft tersimpan')
    router.push('/dashboard/orders')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink)
      setCopiedLink(true)
      showToast('Link tersalin!')
      setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleCopyMsg = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMsg(id)
      showToast('Pesan tersalin!')
      setTimeout(() => setCopiedMsg(null), 2000)
    } catch {
      // fallback
    }
  }

  const inputClass = (field: keyof Errors) =>
    `w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary ${
      errors[field] ? 'border-red-500' : 'border-sewain-border'
    }`

  const rpInputClass = (field: keyof Errors) =>
    `w-full px-4 py-2.5 text-sm border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary ${
      errors[field] ? 'border-red-500' : 'border-sewain-border'
    }`

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

          {/* Generated link with copy */}
          <div className="bg-sewain-bg rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="flex-1 text-sm font-mono text-sewain-primary truncate">
              {paymentLink}
            </span>
            <button
              onClick={handleCopyLink}
              className="shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-primary hover:bg-gray-100 flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
              {copiedLink ? 'Tersalin' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Quick Send shortcuts panel */}
        <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <h3 className="font-semibold text-sewain-text-primary">Quick Send</h3>
          <p className="text-xs text-sewain-text-secondary">
            Quick Send membuka WhatsApp dengan pesan siap kirim — merchant cukup tap Send
          </p>

          {/* Payment link shortcut */}
          <div className="border border-sewain-border rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-sewain-text-primary">\ud83d\udcb3 Kirim Link Bayar via WA</p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line border border-sewain-border">
              {waPaymentMsg}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.open(waDeepLink(waPaymentMsg), '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
              >
                Buka di WhatsApp <ExternalLink size={14} />
              </button>
              <button
                onClick={() => handleCopyMsg('payment', waPaymentMsg)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-100 transition-colors"
              >
                {copiedMsg === 'payment' ? <Check size={14} /> : <Copy size={14} />}
                {copiedMsg === 'payment' ? 'Tersalin' : 'Salin Pesan'}
              </button>
            </div>
          </div>

          {/* Order summary shortcut */}
          <div className="border border-sewain-border rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-sewain-text-primary">\ud83d\udccb Kirim Ringkasan Order via WA</p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line border border-sewain-border">
              {waOrderSummaryMsg}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.open(waDeepLink(waOrderSummaryMsg), '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
              >
                Buka di WhatsApp <ExternalLink size={14} />
              </button>
              <button
                onClick={() => handleCopyMsg('summary', waOrderSummaryMsg)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-100 transition-colors"
              >
                {copiedMsg === 'summary' ? <Check size={14} /> : <Copy size={14} />}
                {copiedMsg === 'summary' ? 'Tersalin' : 'Salin Pesan'}
              </button>
            </div>
          </div>

          {/* Copy link button */}
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedLink ? <Check size={14} /> : <Copy size={14} />}
            {copiedLink ? 'Link Tersalin!' : 'Salin Link'}
          </button>
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
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
                if (errors.itemName) setErrors((prev) => ({ ...prev, itemName: undefined }))
              }}
              placeholder="contoh: Gaun Pesta Merah — Size M"
              className={inputClass('itemName')}
            />
            {errors.itemName && (
              <p className="text-xs text-red-500 mt-1">{errors.itemName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: undefined }))
                }}
                className={inputClass('startDate')}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
                Selesai
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: undefined }))
                }}
                className={inputClass('endDate')}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          <div className="bg-sewain-bg rounded-lg px-4 py-2.5 text-sm">
            <span className="text-sewain-text-secondary">Durasi: </span>
            <span className="font-medium text-sewain-text-primary">
              {duration ? `${duration} hari` : '-'}
            </span>
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
              <span className={`px-3 py-2.5 text-sm bg-sewain-bg border border-r-0 rounded-l-lg text-sewain-text-secondary ${errors.sewa ? 'border-red-500' : 'border-sewain-border'}`}>
                Rp
              </span>
              <input
                type="number"
                value={sewa || ''}
                onChange={(e) => {
                  setSewa(Number(e.target.value) || 0)
                  if (errors.sewa) setErrors((prev) => ({ ...prev, sewa: undefined }))
                }}
                placeholder="0"
                className={rpInputClass('sewa')}
              />
            </div>
            {errors.sewa && (
              <p className="text-xs text-red-500 mt-1">{errors.sewa}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Deposit
            </label>
            <div className="flex items-center">
              <span className={`px-3 py-2.5 text-sm bg-sewain-bg border border-r-0 rounded-l-lg text-sewain-text-secondary ${errors.deposit ? 'border-red-500' : 'border-sewain-border'}`}>
                Rp
              </span>
              <input
                type="number"
                value={deposit || ''}
                onChange={(e) => {
                  setDeposit(Number(e.target.value) || 0)
                  if (errors.deposit) setErrors((prev) => ({ ...prev, deposit: undefined }))
                }}
                placeholder="0"
                className={rpInputClass('deposit')}
              />
            </div>
            {errors.deposit && (
              <p className="text-xs text-red-500 mt-1">{errors.deposit}</p>
            )}
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
              onClick={() => setKycRequired(!kycRequired)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              Nama Customer
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value)
                if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: undefined }))
              }}
              placeholder="Nama lengkap customer"
              className={inputClass('customerName')}
            />
            {errors.customerName && (
              <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">
              No WhatsApp
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value)
                if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: undefined }))
              }}
              placeholder="+62 812 3456 7890"
              className={inputClass('customerPhone')}
            />
            {errors.customerPhone && (
              <p className="text-xs text-red-500 mt-1">{errors.customerPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleSaveDraft}
          className="px-6 py-3 text-sm font-medium rounded-xl border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors"
        >
          Simpan Draft
        </button>
        <button
          onClick={handleGenerate}
          className="px-6 py-3 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
        >
          Generate Link Pembayaran
        </button>
      </div>
    </div>
  )
}
