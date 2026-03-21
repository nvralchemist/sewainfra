'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import {
  orders as mockOrders,
  getCustomer,
  formatRp,
  statusLabels,
  statusColors,
  riskColors,
  riskLabels,
  type Order,
  type OrderStatus,
} from '@/lib/mock-data'
import Modal from '@/components/modal'
import { useToast } from '@/components/toast'

const statusTabs: { label: string; value: string }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Aktif', value: 'aktif' },
  { label: 'Menunggu Bayar', value: 'menunggu_bayar' },
  { label: 'Baru', value: 'baru' },
  { label: 'Dikembalikan', value: 'dikembalikan' },
  { label: 'Dispute', value: 'dispute' },
]

export default function DashboardOrders() {
  const { showToast } = useToast()
  const [filteredStatus, setFilteredStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [localOrders, setLocalOrders] = useState<Order[]>([...mockOrders])

  // Modal states
  const [reminderModal, setReminderModal] = useState<Order | null>(null)
  const [selesaiModal, setSelesaiModal] = useState<Order | null>(null)

  const filtered = useMemo(() => {
    return localOrders.filter((order) => {
      // Status filter
      if (filteredStatus !== 'all' && order.status !== filteredStatus) return false

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const customer = getCustomer(order.customerId)
        const matchName = customer?.name.toLowerCase().includes(q)
        const matchItem = order.item.toLowerCase().includes(q)
        if (!matchName && !matchItem) return false
      }

      return true
    })
  }, [localOrders, filteredStatus, searchQuery])

  function handleSelesaiConfirm(order: Order) {
    setLocalOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'selesai' as OrderStatus } : o))
    )
    setSelesaiModal(null)
    showToast('Order ditandai selesai')
  }

  function getWaLink(phone: string, message: string) {
    const clean = phone.replace(/\s/g, '').replace('+', '')
    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
  }

  function renderAction(order: Order) {
    const customer = getCustomer(order.customerId)
    switch (order.status) {
      case 'aktif':
        return (
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="text-sewain-primary hover:text-sewain-primary-dark font-medium text-sm"
          >
            Detail
          </Link>
        )
      case 'menunggu_bayar':
        return (
          <button
            onClick={() => setReminderModal(order)}
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            Ingatkan
          </button>
        )
      case 'dikembalikan':
        return (
          <button
            onClick={() => setSelesaiModal(order)}
            className="text-sewain-primary hover:text-sewain-primary-dark font-medium text-sm"
          >
            Selesai
          </button>
        )
      case 'baru':
        return (
          <Link
            href="/dashboard/orders/new"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Buat Order
          </Link>
        )
      case 'dispute':
        return (
          <Link
            href={`/dashboard/disputes/${order.id}`}
            className="text-sewain-red hover:text-red-700 font-medium text-sm"
          >
            Lihat
          </Link>
        )
      default:
        return null
    }
  }

  function renderMobileAction(order: Order) {
    const customer = getCustomer(order.customerId)
    switch (order.status) {
      case 'aktif':
        return (
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sewain-primary-light text-sewain-primary"
          >
            Detail
          </Link>
        )
      case 'menunggu_bayar':
        return (
          <button
            onClick={(e) => { e.preventDefault(); setReminderModal(order) }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700"
          >
            Ingatkan
          </button>
        )
      case 'dikembalikan':
        return (
          <button
            onClick={(e) => { e.preventDefault(); setSelesaiModal(order) }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700"
          >
            Selesai
          </button>
        )
      case 'baru':
        return (
          <Link
            href="/dashboard/orders/new"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700"
          >
            Buat Order
          </Link>
        )
      case 'dispute':
        return (
          <Link
            href={`/dashboard/disputes/${order.id}`}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-sewain-red"
          >
            Lihat
          </Link>
        )
      default:
        return null
    }
  }

  const reminderCustomer = reminderModal ? getCustomer(reminderModal.customerId) : null
  const reminderMessage = reminderModal && reminderCustomer
    ? `Halo kak ${reminderCustomer.name}! Ini pengingat untuk pembayaran order ${reminderModal.item} sebesar ${formatRp(reminderModal.sewa + reminderModal.deposit)}.\n\nMohon segera selesaikan pembayaran ya kak. Terima kasih! 🙏\n— Powered by sewain.id`
    : ''

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-sewain-text-primary">Orders</h2>
          <p className="text-sm text-sewain-text-secondary mt-1">Kelola semua order rental kamu</p>
        </div>
        <Link
          href="/dashboard/orders/new"
          className="inline-flex items-center justify-center gap-2 bg-sewain-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-sewain-primary-dark transition"
        >
          + Buat Order Baru
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sewain-text-secondary" />
          <input
            type="text"
            placeholder="Cari customer atau item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-sewain-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sewain-primary/20 focus:border-sewain-primary"
          />
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilteredStatus(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              filteredStatus === tab.value
                ? 'bg-sewain-primary text-white'
                : 'bg-white text-sewain-text-secondary border border-sewain-border hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-sewain-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-sewain-border">
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Order ID</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Customer</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Item</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Periode</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Total</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Risiko</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Status</th>
              <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const customer = getCustomer(order.customerId)
              return (
                <tr key={order.id} className="border-b border-sewain-border last:border-0 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono text-xs text-sewain-text-secondary">{order.id}</td>
                  <td className="px-4 py-3 font-medium text-sewain-text-primary">{customer?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-sewain-text-secondary">{order.item}</td>
                  <td className="px-4 py-3 text-sewain-text-secondary">{order.start} — {order.end}</td>
                  <td className="px-4 py-3 font-medium text-sewain-text-primary">{formatRp(order.sewa + order.deposit)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${riskColors[customer?.risk ?? 'rendah']}`} />
                      <span className="text-sewain-text-secondary">{riskLabels[customer?.risk ?? 'rendah']}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {renderAction(order)}
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sewain-text-secondary">
                  Tidak ada order ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((order) => {
          const customer = getCustomer(order.customerId)
          return (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-sewain-border p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sewain-text-primary">{customer?.name ?? '-'}</p>
                  <p className="text-sm text-sewain-text-secondary mt-0.5">{order.item}</p>
                </div>
                {renderMobileAction(order)}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${riskColors[customer?.risk ?? 'rendah']}`} />
                  <span className="text-xs text-sewain-text-secondary">{riskLabels[customer?.risk ?? 'rendah']}</span>
                </div>
                <span className="text-sm font-medium text-sewain-text-primary ml-auto">
                  {formatRp(order.sewa + order.deposit)}
                </span>
              </div>
              <p className="text-xs text-sewain-text-secondary mt-2">{order.start} — {order.end} · {order.id}</p>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-sewain-text-secondary text-sm">
            Tidak ada order ditemukan
          </div>
        )}
      </div>

      {/* Reminder Modal (WhatsApp) */}
      <Modal
        open={!!reminderModal}
        onClose={() => setReminderModal(null)}
        title="Kirim Pengingat Pembayaran"
      >
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">
            Pesan akan dikirim ke <strong>{reminderCustomer?.name}</strong> via WhatsApp:
          </p>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line border border-sewain-border">
            {reminderMessage}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (reminderCustomer) {
                  window.open(getWaLink(reminderCustomer.phone, reminderMessage), '_blank')
                }
                setReminderModal(null)
              }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition"
            >
              Buka WhatsApp
            </button>
            <button
              onClick={() => setReminderModal(null)}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>

      {/* Selesai Confirm Modal */}
      <Modal
        open={!!selesaiModal}
        onClose={() => setSelesaiModal(null)}
        title="Konfirmasi Selesai"
      >
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">
            Tandai order <strong>{selesaiModal?.item}</strong> sebagai selesai? Deposit akan dikembalikan ke customer.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => selesaiModal && handleSelesaiConfirm(selesaiModal)}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition"
            >
              Ya, Selesai
            </button>
            <button
              onClick={() => setSelesaiModal(null)}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
