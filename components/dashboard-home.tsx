'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Landmark,
  Plus,
} from 'lucide-react'
import {
  dashboardStats,
  returnAlerts,
  gmvChartData,
  orders as initialOrders,
  getCustomer,
  formatRp,
  statusLabels,
  statusColors,
  riskColors,
  riskLabels,
  customers,
  type Order,
  type OrderStatus,
} from '@/lib/mock-data'
import Modal from '@/components/modal'
import { useToast } from '@/components/toast'

const RechartsLine = dynamic(
  () =>
    import('recharts').then((mod) => {
      const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = mod
      return function GMVChart() {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gmvChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
                tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'GMV']}
                labelFormatter={(label) => `Hari ke-${label}`}
              />
              <Line
                type="monotone"
                dataKey="gmv"
                stroke="#1D9E75"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    }),
  { ssr: false, loading: () => <div className="h-64 flex items-center justify-center text-sm text-gray-400">Memuat chart...</div> }
)

const statIcons = [
  <ShoppingBag key="0" size={24} className="text-sewain-primary" />,
  <TrendingUp key="1" size={24} className="text-sewain-primary" />,
  <AlertTriangle key="2" size={24} className="text-sewain-amber" />,
  <Landmark key="3" size={24} className="text-sewain-text-secondary" />,
]

function buildWaLink(phone: string, message: string) {
  const cleaned = phone.replace(/\s+/g, '').replace('+', '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
}

export default function DashboardHome() {
  const { showToast } = useToast()
  const [localOrders, setLocalOrders] = useState<Order[]>([...initialOrders])

  // Modal state
  const [reminderModal, setReminderModal] = useState<{ open: boolean; message: string; phone: string; title: string }>({
    open: false,
    message: '',
    phone: '',
    title: '',
  })
  const [selesaiModal, setSelesaiModal] = useState<{ open: boolean; orderId: string }>({
    open: false,
    orderId: '',
  })

  // --- Return Alert reminder ---
  function openAlertReminder(alert: (typeof returnAlerts)[number]) {
    const customer = customers.find((c) => c.id === alert.customerId)
    const phone = customer?.phone || ''
    const message = `Halo kak ${alert.customer}! Ini pengingat bahwa item "${alert.item}" sudah ${alert.label.toLowerCase()}. Mohon segera dikembalikan ya kak. Terima kasih!`
    setReminderModal({ open: true, message, phone, title: 'Kirim Reminder WhatsApp' })
  }

  // --- Order action: Ingatkan (menunggu_bayar) ---
  function openPaymentReminder(order: Order) {
    const customer = getCustomer(order.customerId)
    const phone = customer?.phone || ''
    const total = order.sewa + order.deposit
    const message = `Halo kak ${customer?.name || ''}! Ini pengingat untuk menyelesaikan pembayaran order ${order.id}.\n\nItem: ${order.item}\nTotal: ${formatRp(total)}\n\nMohon segera diselesaikan ya kak. Terima kasih!`
    setReminderModal({ open: true, message, phone, title: 'Ingatkan Pembayaran' })
  }

  // --- Order action: Selesai (dikembalikan) ---
  function openSelesaiConfirm(orderId: string) {
    setSelesaiModal({ open: true, orderId })
  }

  function confirmSelesai() {
    setLocalOrders((prev) =>
      prev.map((o) => (o.id === selesaiModal.orderId ? { ...o, status: 'selesai' as OrderStatus } : o))
    )
    setSelesaiModal({ open: false, orderId: '' })
    showToast('Order berhasil diselesaikan')
  }

  // --- Render action button per order ---
  function renderAction(order: Order) {
    switch (order.status) {
      case 'aktif':
        return (
          <Link href={`/dashboard/orders/${order.id}`} className="text-sewain-primary text-sm font-medium hover:underline">
            Detail
          </Link>
        )
      case 'menunggu_bayar':
        return (
          <button onClick={() => openPaymentReminder(order)} className="text-sewain-primary text-sm font-medium hover:underline">
            Ingatkan
          </button>
        )
      case 'dikembalikan':
        return (
          <button onClick={() => openSelesaiConfirm(order.id)} className="text-sewain-primary text-sm font-medium hover:underline">
            Selesai
          </button>
        )
      case 'baru':
        return (
          <Link href="/dashboard/orders/new" className="text-sewain-primary text-sm font-medium hover:underline">
            Buat Order
          </Link>
        )
      case 'dispute':
        return (
          <Link href={`/dashboard/disputes/${order.id}`} className="text-sewain-primary text-sm font-medium hover:underline">
            Lihat
          </Link>
        )
      case 'selesai':
        return <span className="text-sm text-gray-400">Selesai</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-card p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-sewain-bg flex items-center justify-center shrink-0">
              {statIcons[i]}
            </div>
            <div>
              <p className="text-sm text-sewain-text-secondary">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Return Alerts */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-sewain-text-primary">
          Perlu Perhatian
        </h2>
        {returnAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg p-4 border-l-4 flex items-center justify-between gap-4 ${
              alert.urgency === 'red'
                ? 'bg-red-50 border-red-500'
                : 'bg-amber-50 border-amber-500'
            }`}
          >
            <div className="min-w-0">
              <p className="font-medium text-sewain-text-primary">
                {alert.item} — {alert.customer}
              </p>
              <span
                className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  alert.urgency === 'red'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {alert.label}
              </span>
            </div>
            <button
              onClick={() => openAlertReminder(alert)}
              className="shrink-0 px-4 py-2 text-sm font-medium rounded-lg border border-sewain-primary text-sewain-primary hover:bg-sewain-primary-light transition-colors"
            >
              Kirim Reminder
            </button>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-sewain-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-sewain-text-primary">Order Terbaru</h2>
          <Link
            href="/dashboard/orders/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
          >
            <Plus size={16} />
            Buat Order Baru
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sewain-bg text-sewain-text-secondary">
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium">Item</th>
                <th className="text-left px-5 py-3 font-medium">Periode</th>
                <th className="text-left px-5 py-3 font-medium">Total</th>
                <th className="text-left px-5 py-3 font-medium">Status Risiko</th>
                <th className="text-left px-5 py-3 font-medium">Status Order</th>
                <th className="text-left px-5 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sewain-border">
              {localOrders.map((order) => {
                const customer = getCustomer(order.customerId)
                const total = order.sewa + order.deposit
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-sewain-text-primary">
                      {customer?.name || '-'}
                    </td>
                    <td className="px-5 py-3 text-sewain-text-secondary">{order.item}</td>
                    <td className="px-5 py-3 text-sewain-text-secondary">
                      {order.start} – {order.end}
                    </td>
                    <td className="px-5 py-3 text-sewain-text-primary font-medium">
                      {formatRp(total)}
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-sewain-text-secondary capitalize">
                        <span className={`w-2.5 h-2.5 rounded-full ${riskColors[customer?.risk || 'rendah']}`} />
                        {riskLabels[customer?.risk || 'rendah']}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {renderAction(order)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-sewain-border">
          {localOrders.map((order) => {
            const customer = getCustomer(order.customerId)
            const total = order.sewa + order.deposit
            return (
              <div key={order.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sewain-text-primary">{customer?.name || '-'}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <p className="text-sm text-sewain-text-secondary">{order.item}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sewain-text-secondary">{order.start} – {order.end}</span>
                  <span className="font-medium text-sewain-text-primary">{formatRp(total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-sewain-text-secondary capitalize">
                    <span className={`w-2 h-2 rounded-full ${riskColors[customer?.risk || 'rendah']}`} />
                    {riskLabels[customer?.risk || 'rendah']}
                  </span>
                  {renderAction(order)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* GMV Chart */}
      <div className="bg-white rounded-xl shadow-card p-5">
        <h2 className="text-lg font-semibold text-sewain-text-primary mb-4">
          GMV 30 Hari Terakhir
        </h2>
        <div className="h-64">
          <RechartsLine />
        </div>
      </div>

      {/* Reminder Modal */}
      <Modal open={reminderModal.open} onClose={() => setReminderModal((s) => ({ ...s, open: false }))} title={reminderModal.title}>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-sewain-text-secondary whitespace-pre-wrap">{reminderModal.message}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.open(buildWaLink(reminderModal.phone, reminderModal.message), '_blank')}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
            >
              Buka WhatsApp
            </button>
            <button
              onClick={() => setReminderModal((s) => ({ ...s, open: false }))}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>

      {/* Selesai Confirmation Modal */}
      <Modal open={selesaiModal.open} onClose={() => setSelesaiModal({ open: false, orderId: '' })} title="Konfirmasi Selesai">
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">Tandai order ini sebagai selesai?</p>
          <div className="flex gap-3">
            <button
              onClick={confirmSelesai}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
            >
              Konfirmasi
            </button>
            <button
              onClick={() => setSelesaiModal({ open: false, orderId: '' })}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
