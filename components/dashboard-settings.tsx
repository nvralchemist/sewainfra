'use client'

import { useState } from 'react'
import { MERCHANT } from '@/lib/mock-data'

export default function DashboardSettings() {
  const [autoReply, setAutoReply] = useState(true)
  const [kyc, setKyc] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-sewain-text-primary">Pengaturan</h2>
        <p className="text-sm text-sewain-text-secondary mt-1">Kelola pengaturan toko dan akun kamu</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-sewain-border p-6">
        <h3 className="font-semibold text-sewain-text-primary">Profil Merchant</h3>
        <div className="mt-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-purple-600">
            {MERCHANT.initials}
          </div>
          <div>
            <p className="font-medium text-sewain-text-primary">{MERCHANT.name}</p>
            <p className="text-sm text-sewain-text-secondary">{MERCHANT.location} · {MERCHANT.category}</p>
            <span className="inline-flex items-center gap-1 mt-1 text-xs text-sewain-primary font-medium">
              ✓ Merchant Terverifikasi
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">Nama Toko</label>
            <input
              type="text"
              defaultValue={MERCHANT.name}
              className="w-full px-3 py-2.5 border border-sewain-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sewain-primary/20 focus:border-sewain-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">Lokasi</label>
            <input
              type="text"
              defaultValue={MERCHANT.location}
              className="w-full px-3 py-2.5 border border-sewain-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sewain-primary/20 focus:border-sewain-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">Kategori</label>
            <select className="w-full px-3 py-2.5 border border-sewain-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sewain-primary/20 focus:border-sewain-primary bg-white">
              <option>Fashion Rental</option>
              <option>Elektronik Rental</option>
              <option>Dekorasi & Event</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">No WhatsApp</label>
            <input
              type="text"
              defaultValue="+62 812 9876 5432"
              className="w-full px-3 py-2.5 border border-sewain-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sewain-primary/20 focus:border-sewain-primary"
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white rounded-xl border border-sewain-border p-6 space-y-5">
        <h3 className="font-semibold text-sewain-text-primary">Preferensi</h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sewain-text-primary">Auto-Reply Sewain</p>
            <p className="text-xs text-sewain-text-secondary mt-0.5">Otomatis balas pesan pertama customer baru</p>
          </div>
          <button
            onClick={() => setAutoReply(!autoReply)}
            className={`w-11 h-6 rounded-full transition relative ${autoReply ? 'bg-sewain-primary' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoReply ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="border-t border-sewain-border pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sewain-text-primary">Wajib KYC</p>
            <p className="text-xs text-sewain-text-secondary mt-0.5">Minta verifikasi identitas untuk setiap order baru</p>
          </div>
          <button
            onClick={() => setKyc(!kyc)}
            className={`w-11 h-6 rounded-full transition relative ${kyc ? 'bg-sewain-primary' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${kyc ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="border-t border-sewain-border pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sewain-text-primary">Notifikasi WhatsApp</p>
            <p className="text-xs text-sewain-text-secondary mt-0.5">Kirim reminder otomatis ke customer via WA</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition relative ${notifications ? 'bg-sewain-primary' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2.5 border border-sewain-border rounded-lg text-sm font-medium text-sewain-text-secondary hover:bg-gray-50 transition">
          Batal
        </button>
        <button className="px-6 py-2.5 bg-sewain-primary text-white rounded-lg text-sm font-medium hover:bg-sewain-primary-dark transition">
          Simpan Pengaturan
        </button>
      </div>
    </div>
  )
}
