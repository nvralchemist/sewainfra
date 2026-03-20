'use client'

import React from 'react'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { ORDER, CUSTOMER, formatRp, orderTimeline } from '@/lib/mock-data'

export default function DashboardOrderDetail() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-sewain-text-primary">{ORDER.id}</h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              AKTIF
            </span>
          </div>
          <p className="text-sm text-sewain-text-secondary mt-1">
            Created: {ORDER.rentalStart}, 09:15
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Order Info */}
        <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <h2 className="font-semibold text-sewain-text-primary">Detail Order</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Item</span>
              <span className="font-medium text-sewain-text-primary">
                {ORDER.item} — Size {ORDER.size}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Customer</span>
              <span className="font-medium text-sewain-text-primary">{CUSTOMER.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sewain-text-secondary">Risk</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-medium text-sewain-text-primary">Rendah</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Periode</span>
              <span className="font-medium text-sewain-text-primary">
                {ORDER.rentalStart} — {ORDER.rentalEnd}
              </span>
            </div>
            <hr className="border-sewain-border" />
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Sewa</span>
              <span className="text-sewain-text-primary">{formatRp(ORDER.sewa)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Deposit</span>
              <span className="text-sewain-text-primary">{formatRp(ORDER.deposit)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-sewain-text-primary">Total</span>
              <span className="text-sewain-primary">{formatRp(ORDER.total)}</span>
            </div>
            <hr className="border-sewain-border" />
            <div className="flex justify-between items-center">
              <span className="text-sewain-text-secondary">Escrow</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Dana Aman di Escrow
              </span>
            </div>
          </div>
        </div>

        {/* Right - Timeline */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-sewain-text-primary mb-4">Timeline</h2>

          <div className="space-y-0">
            {orderTimeline.map((step, i) => {
              const isLast = i === orderTimeline.length - 1
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
                      <p className="text-xs text-sewain-text-secondary mt-0.5">
                        {step.date}
                      </p>
                    )}
                    {step.status === 'active' && (
                      <button className="mt-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                        Ingatkan
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors">
          Input Resi Pengiriman
        </button>
        <button className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors">
          Konfirmasi Item Kembali
        </button>
        <button className="px-5 py-2.5 text-sm font-medium rounded-xl border border-sewain-red text-sewain-red hover:bg-red-50 transition-colors">
          Buka Dispute
        </button>
        <button className="px-5 py-2.5 text-sm font-medium rounded-xl border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors">
          Kirim Reminder ke Customer
        </button>
      </div>
    </div>
  )
}
