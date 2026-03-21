'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Circle, Loader2, ExternalLink } from 'lucide-react'
import {
  orders,
  getCustomer,
  formatRp,
  statusLabels,
  statusColors,
  riskColors,
  riskLabels,
  orderTimeline as defaultTimeline,
  type TimelineStep,
} from '@/lib/mock-data'
import Modal from '@/components/modal'
import { useToast } from '@/components/toast'

const couriers = ['JNE', 'JNT', 'SiCepat', 'Anteraja', 'GoSend']

type ConditionOption = 'baik' | 'minor' | 'rusak'

export default function DashboardOrderDetail({ orderId }: { orderId: string }) {
  const router = useRouter()
  const { showToast } = useToast()

  const order = orders.find((o) => o.id === orderId)
  const customer = order ? getCustomer(order.customerId) : undefined

  const [timeline, setTimeline] = useState<TimelineStep[]>(
    defaultTimeline.map((s) => ({ ...s }))
  )

  // Modal states
  const [resiModalOpen, setResiModalOpen] = useState(false)
  const [resiInput, setResiInput] = useState('')
  const [courierInput, setCourierInput] = useState(couriers[0])

  const [reminderModalOpen, setReminderModalOpen] = useState(false)
  const [confirmReturnModalOpen, setConfirmReturnModalOpen] = useState(false)
  const [selectedCondition, setSelectedCondition] = useState<ConditionOption>('baik')

  const [waReminderModalOpen, setWaReminderModalOpen] = useState(false)

  if (!order || !customer) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-sewain-text-secondary">Order tidak ditemukan</p>
        <Link href="/dashboard/orders" className="text-sewain-primary mt-2 inline-block text-sm font-medium">
          Kembali ke Orders
        </Link>
      </div>
    )
  }

  const total = order.sewa + order.deposit

  function getWaLink(phone: string, message: string) {
    const clean = phone.replace(/\s/g, '').replace('+', '')
    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
  }

  // Resi submit
  function handleResiSubmit() {
    if (!resiInput.trim()) return
    setTimeline((prev) =>
      prev.map((step) =>
        step.id === 2
          ? {
              ...step,
              status: 'done' as const,
              detail: `${courierInput} ${resiInput}`,
              date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
            }
          : step
      )
    )
    showToast('Resi berhasil diinput')
    setResiModalOpen(false)
    setResiInput('')
  }

  // Confirm return
  function handleConfirmReturn() {
    if (selectedCondition === 'baik') {
      setTimeline((prev) =>
        prev.map((step) => {
          if (step.id === 4) return { ...step, status: 'done' as const, detail: 'Kondisi: Baik', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
          if (step.id === 5) return { ...step, status: 'active' as const, detail: 'Deposit akan dikembalikan' }
          return step
        })
      )
      showToast(`Deposit ${formatRp(order!.deposit)} akan dikembalikan ke customer`)
      setConfirmReturnModalOpen(false)
    } else {
      setConfirmReturnModalOpen(false)
      router.push('/dashboard/disputes/new')
    }
  }

  const reminderMessage = `Halo kak ${customer.name}! Mohon konfirmasi penerimaan barang untuk order ${order.item} ya kak.\n\nKalau barang sudah diterima, mohon konfirmasi supaya periode sewa bisa dimulai.\n\nTerima kasih! 🙏\n— Powered by sewain.id`

  const waTemplateMessage = `Halo kak ${customer.name}! Ini pengingat untuk order ${order.item}.\n\nPeriode sewa: ${order.start} — ${order.end}\nTotal: ${formatRp(total)}\n\nMohon pastikan item dikembalikan sebelum batas waktu ya kak. Terima kasih! 🙏\n— Powered by sewain.id`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-sewain-text-secondary mb-3">
          <Link href="/dashboard/orders" className="flex items-center gap-1 hover:text-sewain-primary transition">
            <ArrowLeft size={16} />
            Orders
          </Link>
          <span>/</span>
          <span className="text-sewain-text-primary">{order.id}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-sewain-text-primary">{order.id}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                {statusLabels[order.status].toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-sewain-text-secondary mt-1">
              Periode: {order.start} — {order.end}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Order Info */}
        <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <h2 className="font-semibold text-sewain-text-primary">Detail Order</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Item</span>
              <span className="font-medium text-sewain-text-primary">{order.item}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Customer</span>
              <span className="font-medium text-sewain-text-primary">{customer.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sewain-text-secondary">Risk</span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${riskColors[customer.risk]}`} />
                <span className="font-medium text-sewain-text-primary">{riskLabels[customer.risk]}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Periode</span>
              <span className="font-medium text-sewain-text-primary">{order.start} — {order.end}</span>
            </div>
            <hr className="border-sewain-border" />
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Sewa</span>
              <span className="text-sewain-text-primary">{formatRp(order.sewa)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Deposit</span>
              <span className="text-sewain-text-primary">{formatRp(order.deposit)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-sewain-text-primary">Total</span>
              <span className="text-sewain-primary">{formatRp(total)}</span>
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
            {timeline.map((step, i) => {
              const isLast = i === timeline.length - 1
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

                    {/* Step 2 action: Lacak */}
                    {step.id === 2 && step.status === 'done' && (
                      <button
                        onClick={() => window.open('https://cekresi.com', '_blank')}
                        className="mt-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                      >
                        Lacak <ExternalLink size={12} />
                      </button>
                    )}

                    {/* Step 3 action: Ingatkan */}
                    {step.id === 3 && step.status === 'active' && (
                      <button
                        onClick={() => setReminderModalOpen(true)}
                        className="mt-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
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
        <button
          onClick={() => setResiModalOpen(true)}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
        >
          Input Resi Pengiriman
        </button>
        <button
          onClick={() => setConfirmReturnModalOpen(true)}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-sewain-primary text-white hover:bg-sewain-primary-dark transition-colors"
        >
          Konfirmasi Item Kembali
        </button>
        <Link
          href="/dashboard/disputes/new"
          className="px-5 py-2.5 text-sm font-medium rounded-xl border border-sewain-red text-sewain-red hover:bg-red-50 transition-colors"
        >
          Buka Dispute
        </Link>
        <button
          onClick={() => setWaReminderModalOpen(true)}
          className="px-5 py-2.5 text-sm font-medium rounded-xl border border-sewain-border text-sewain-text-primary hover:bg-gray-50 transition-colors"
        >
          Kirim Reminder ke Customer
        </button>
      </div>

      {/* Modal: Input Resi */}
      <Modal open={resiModalOpen} onClose={() => setResiModalOpen(false)} title="Input Resi Pengiriman">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">Kurir</label>
            <select
              value={courierInput}
              onChange={(e) => setCourierInput(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary bg-white"
            >
              {couriers.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sewain-text-secondary mb-1">Nomor Resi</label>
            <input
              type="text"
              value={resiInput}
              onChange={(e) => setResiInput(e.target.value)}
              placeholder="Masukkan nomor resi"
              className="w-full px-4 py-2.5 text-sm border border-sewain-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sewain-primary/30 focus:border-sewain-primary"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleResiSubmit}
              disabled={!resiInput.trim()}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Simpan Resi
            </button>
            <button
              onClick={() => setResiModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Ingatkan (Step 3 - confirm receipt) */}
      <Modal open={reminderModalOpen} onClose={() => setReminderModalOpen(false)} title="Kirim Pengingat">
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">
            Kirim pengingat konfirmasi penerimaan ke <strong>{customer.name}</strong>:
          </p>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line border border-sewain-border">
            {reminderMessage}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                window.open(getWaLink(customer.phone, reminderMessage), '_blank')
                setReminderModalOpen(false)
              }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition"
            >
              Buka WhatsApp
            </button>
            <button
              onClick={() => setReminderModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Konfirmasi Item Kembali */}
      <Modal open={confirmReturnModalOpen} onClose={() => setConfirmReturnModalOpen(false)} title="Konfirmasi Kondisi Item">
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">Pilih kondisi item yang dikembalikan:</p>
          <div className="space-y-2">
            {([
              { value: 'baik' as ConditionOption, label: 'Baik', desc: 'Item dalam kondisi baik, deposit dikembalikan' },
              { value: 'minor' as ConditionOption, label: 'Kerusakan Minor', desc: 'Ada kerusakan kecil, buka dispute untuk klaim' },
              { value: 'rusak' as ConditionOption, label: 'Rusak', desc: 'Item rusak parah, buka dispute' },
            ]).map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  selectedCondition === opt.value
                    ? 'border-sewain-primary bg-sewain-primary-light'
                    : 'border-sewain-border hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value={opt.value}
                  checked={selectedCondition === opt.value}
                  onChange={() => setSelectedCondition(opt.value)}
                  className="mt-0.5 accent-sewain-primary"
                />
                <div>
                  <p className="text-sm font-medium text-sewain-text-primary">{opt.label}</p>
                  <p className="text-xs text-sewain-text-secondary">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmReturn}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition"
            >
              Konfirmasi
            </button>
            <button
              onClick={() => setConfirmReturnModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Kirim Reminder ke Customer */}
      <Modal open={waReminderModalOpen} onClose={() => setWaReminderModalOpen(false)} title="Kirim Reminder ke Customer">
        <div className="space-y-4">
          <p className="text-sm text-sewain-text-secondary">
            Kirim reminder via WhatsApp ke <strong>{customer.name}</strong>:
          </p>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-sewain-text-primary whitespace-pre-line border border-sewain-border">
            {waTemplateMessage}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                window.open(getWaLink(customer.phone, waTemplateMessage), '_blank')
                setWaReminderModalOpen(false)
              }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-sewain-primary text-white hover:bg-sewain-primary-dark transition"
            >
              Buka WhatsApp
            </button>
            <button
              onClick={() => setWaReminderModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-sewain-border text-sewain-text-secondary hover:bg-gray-50 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
