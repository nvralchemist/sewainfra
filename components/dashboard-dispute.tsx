'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Circle, Plus, Users } from 'lucide-react'
import { disputeData, formatRp } from '@/lib/mock-data'
import Modal from '@/components/modal'
import { useToast } from '@/components/toast'

type EvidenceItem = { id: number; label: string }

export default function DashboardDispute() {
  const { showToast } = useToast()
  const [evidence, setEvidence] = useState<EvidenceItem[]>([
    { id: 1, label: 'Foto 1' },
    { id: 2, label: 'Foto 2' },
  ])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const newId = evidence.length + 1
    setEvidence((prev) => [...prev, { id: newId, label: file.name.slice(0, 12) || `Foto ${newId}` }])
    setShowUploadModal(false)
    showToast('Bukti berhasil diunggah')
    // Reset input so the same file can be re-selected
    e.target.value = ''
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back + Breadcrumb */}
      <div>
        <Link
          href="/dashboard/disputes"
          className="inline-flex items-center gap-1.5 text-sm text-sewain-text-secondary hover:text-sewain-primary transition-colors mb-3"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </Link>
        <p className="text-xs text-sewain-text-secondary mb-3">
          Dashboard / Disputes / {disputeData.id}
        </p>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl font-bold text-sewain-text-primary">
            Dispute {disputeData.id}
          </h1>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            {disputeData.status}
          </span>
        </div>
        <p className="text-sm text-sewain-text-secondary mt-1">
          Order: {disputeData.orderId} &middot; Dibuka: {disputeData.openedDate}
        </p>
      </div>

      {/* Escrow hold card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <span className="text-2xl">{'\u26A0\uFE0F'}</span>
        </div>
        <div>
          <p className="font-semibold text-amber-800">Dana Ditahan</p>
          <p className="text-2xl font-bold text-amber-900">
            {formatRp(disputeData.amountHeld)}
          </p>
          <p className="text-sm text-amber-700 mt-0.5">
            Dana escrow ditahan sampai dispute diselesaikan
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="font-semibold text-sewain-text-primary mb-4">Timeline Dispute</h2>
        <div className="space-y-0">
          {disputeData.timeline.map((step, i) => {
            const isLast = i === disputeData.timeline.length - 1
            return (
              <div key={step.id} className="flex gap-3">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  {step.status === 'done' && (
                    <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                  )}
                  {step.status === 'active' && (
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                      <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping" />
                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                    </div>
                  )}
                  {step.status === 'pending' && (
                    <Circle size={24} className="text-gray-300 shrink-0" />
                  )}
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 min-h-[32px] ${
                        step.status === 'done'
                          ? 'bg-green-500'
                          : 'bg-gray-200 border-l border-dashed border-gray-300'
                      }`}
                      style={
                        step.status !== 'done'
                          ? { width: 0, borderLeftWidth: 2 }
                          : {}
                      }
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <p
                    className={`text-sm font-medium ${
                      step.status === 'pending'
                        ? 'text-gray-400'
                        : 'text-sewain-text-primary'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.detail && (
                    <p className="text-xs text-sewain-text-secondary mt-0.5">
                      {step.detail}
                    </p>
                  )}
                  {step.date && (
                    <p className="text-xs text-sewain-text-secondary mt-0.5">{step.date}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Evidence sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Merchant evidence */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-sewain-text-primary mb-4">Bukti Merchant</h2>
          <div className="flex gap-3 flex-wrap">
            {evidence.map((item) => (
              <div
                key={item.id}
                className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center border border-dashed border-gray-300"
              >
                {item.label}
              </div>
            ))}
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-24 h-24 rounded-lg border-2 border-dashed border-sewain-primary flex flex-col items-center justify-center gap-1 text-sewain-primary hover:bg-sewain-primary-light transition-colors"
            >
              <Plus size={20} />
              <span className="text-xs font-medium">Tambah Bukti</span>
            </button>
          </div>
        </div>

        {/* Customer evidence */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-sewain-text-primary mb-4">Bukti Customer</h2>
          <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-sewain-text-secondary">
              Belum ada bukti diunggah oleh customer
            </p>
          </div>
        </div>
      </div>

      {/* WA Group section */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="font-semibold text-sewain-text-primary mb-4">
          WhatsApp Group Dispute
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-sewain-text-secondary" />
            <span className="text-sm text-sewain-text-secondary">Anggota:</span>
          </div>
          <div className="flex -space-x-2">
            {disputeData.waGroupMembers.map((member) => (
              <div
                key={member}
                className="w-9 h-9 rounded-full bg-sewain-primary text-white text-xs font-bold flex items-center justify-center border-2 border-white"
                title={member}
              >
                {member.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {disputeData.waGroupMembers.map((member) => (
              <span
                key={member}
                className="px-3 py-1.5 text-sm bg-gray-100 rounded-full text-sewain-text-primary"
              >
                {member}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => window.open('https://wa.me', '_blank')}
          className="mt-4 px-6 py-2.5 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
        >
          Buka WA Group
        </button>
      </div>

      {/* Upload Modal */}
      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)} title="Tambah Bukti">
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">
            Pilih file foto atau dokumen sebagai bukti dispute.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="block w-full text-sm text-sewain-text-secondary file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sewain-primary file:text-white hover:file:bg-sewain-primary-dark file:cursor-pointer file:transition"
          />
        </div>
      </Modal>
    </div>
  )
}
