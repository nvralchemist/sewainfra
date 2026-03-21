'use client'

import React from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { orders, customers, getCustomer, statusColors, statusLabels } from '@/lib/mock-data'

export default function DashboardDisputesList() {
  const disputeOrders = orders.filter((o) => o.status === 'dispute')

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-sewain-text-primary">Disputes</h1>
        <p className="text-sm text-sewain-text-secondary mt-1">
          {disputeOrders.length} dispute aktif
        </p>
      </div>

      {disputeOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-card p-10 text-center">
          <AlertTriangle size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-sewain-text-secondary">Tidak ada dispute saat ini</p>
        </div>
      ) : (
        <div className="space-y-3">
          {disputeOrders.map((order) => {
            const customer = getCustomer(order.customerId)
            return (
              <Link
                key={order.id}
                href="/dashboard/disputes/DSP-042"
                className="block bg-white rounded-xl shadow-card p-5 hover:shadow-md transition-shadow border border-sewain-border"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sewain-text-primary">{order.id}</p>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <p className="text-sm text-sewain-text-secondary mt-1">
                      Customer: {customer?.name || 'Unknown'}
                    </p>
                    <p className="text-sm text-sewain-text-secondary mt-0.5">
                      Item: {order.item}
                    </p>
                    <p className="text-xs text-sewain-text-secondary mt-1">
                      Periode: {order.start} &ndash; {order.end}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <AlertTriangle size={20} className="text-red-400" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
