'use client'

import React from 'react'
import { CheckCircle2, Circle, Loader2, Plus, Users } from 'lucide-react'
import { disputeData, formatRp } from '@/lib/mock-data'

export default function DashboardDispute() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
          <span className="text-2xl">⚠️</span>
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
                    <CheckCircle2 size={24} className="text-sewain-primary shrink-0" />
                  )}
                  {step.status === 'active' && (
                    <Loader2 size={24} className="text-blue-500 shrink-0 animate-spin" />
                  )}
                  {step.status === 'pending' && (
                    <Circle size={24} className="text-gray-300 shrink-0" />
                  )}
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 min-h-[32px] ${
                        step.status === 'done'
                          ? 'bg-sewain-primary'
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
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center border border-dashed border-gray-300">
              Foto 1
            </div>
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center border border-dashed border-gray-300">
              Foto 2
            </div>
            <button className="w-24 h-24 rounded-lg border-2 border-dashed border-sewain-primary flex flex-col items-center justify-center gap-1 text-sewain-primary hover:bg-sewain-primary-light transition-colors">
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
          {disputeData.waGroupMembers.map((member) => (
            <span
              key={member}
              className="px-3 py-1.5 text-sm bg-gray-100 rounded-full text-sewain-text-primary"
            >
              {member}
            </span>
          ))}
        </div>
        <button className="mt-4 px-6 py-2.5 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors">
          Buka WA Group
        </button>
      </div>
    </div>
  )
}
