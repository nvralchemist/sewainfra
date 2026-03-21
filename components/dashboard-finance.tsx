'use client'

import { ArrowUpRight, ArrowDownLeft, Clock, Wallet } from 'lucide-react'

const financeStats = [
  { label: 'Total Pendapatan', value: 'Rp 4.200.000', icon: <Wallet size={20} />, color: 'bg-sewain-primary-light text-sewain-primary' },
  { label: 'Dana Masuk (Bulan Ini)', value: 'Rp 2.850.000', icon: <ArrowDownLeft size={20} />, color: 'bg-green-50 text-green-600' },
  { label: 'Deposit Tertahan', value: 'Rp 1.800.000', icon: <Clock size={20} />, color: 'bg-amber-50 text-amber-600' },
  { label: 'Dana Keluar (Refund)', value: 'Rp 600.000', icon: <ArrowUpRight size={20} />, color: 'bg-red-50 text-red-500' },
]

const transactions = [
  { id: 'TXN-001', date: '12 Apr 2025', customer: 'Rina Ayu', item: 'Gaun Pesta Merah', type: 'Pembayaran', amount: 550000, status: 'Selesai' },
  { id: 'TXN-002', date: '12 Apr 2025', customer: 'Rina Ayu', item: 'Gaun Pesta Merah', type: 'Dana ke Merchant', amount: 350000, status: 'Selesai' },
  { id: 'TXN-003', date: '13 Apr 2025', customer: 'Budi Wijaya', item: 'Jas Formal Hitam', type: 'Pembayaran', amount: 400000, status: 'Pending' },
  { id: 'TXN-004', date: '10 Apr 2025', customer: 'Sari Putri', item: 'Kebaya Hijau', type: 'Refund Deposit', amount: -100000, status: 'Selesai' },
  { id: 'TXN-005', date: '8 Apr 2025', customer: 'Ahmad Fauzi', item: 'Jas Wedding', type: 'Deposit Ditahan', amount: 250000, status: 'Dispute' },
]

const statusColor: Record<string, string> = {
  'Selesai': 'bg-sewain-primary-light text-sewain-primary',
  'Pending': 'bg-amber-50 text-amber-700',
  'Dispute': 'bg-red-50 text-sewain-red',
}

export default function DashboardFinance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-sewain-text-primary">Keuangan</h2>
        <p className="text-sm text-sewain-text-secondary mt-1">Ringkasan keuangan dan riwayat transaksi</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {financeStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-sewain-border p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="mt-3 text-sm text-sewain-text-secondary">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-sewain-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Escrow info */}
      <div className="bg-sewain-primary-light border border-sewain-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">🔒</span>
          <div>
            <p className="font-medium text-sewain-primary-dark">Escrow Sewain</p>
            <p className="text-sm text-sewain-primary-dark/80 mt-1">
              Dana customer disimpan aman di escrow Sewain. Dana sewa dilepas ke merchant setelah customer konfirmasi terima barang. Deposit dikembalikan ke customer setelah barang kembali dalam kondisi baik.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-xl border border-sewain-border overflow-hidden">
        <div className="px-4 py-3 border-b border-sewain-border">
          <h3 className="font-semibold text-sewain-text-primary">Riwayat Transaksi</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-sewain-border">
                <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Tanggal</th>
                <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Item</th>
                <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Tipe</th>
                <th className="text-right px-4 py-3 font-medium text-sewain-text-secondary">Jumlah</th>
                <th className="text-left px-4 py-3 font-medium text-sewain-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-sewain-border last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sewain-text-secondary">{tx.date}</td>
                  <td className="px-4 py-3 font-medium text-sewain-text-primary">{tx.customer}</td>
                  <td className="px-4 py-3 text-sewain-text-secondary">{tx.item}</td>
                  <td className="px-4 py-3 text-sewain-text-secondary">{tx.type}</td>
                  <td className={`px-4 py-3 text-right font-medium ${tx.amount < 0 ? 'text-sewain-red' : 'text-sewain-text-primary'}`}>
                    {tx.amount < 0 ? '- ' : ''}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[tx.status] || 'bg-gray-100 text-gray-600'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="md:hidden divide-y divide-sewain-border">
          {transactions.map((tx) => (
            <div key={tx.id} className="px-4 py-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm text-sewain-text-primary">{tx.customer}</p>
                  <p className="text-xs text-sewain-text-secondary mt-0.5">{tx.type} · {tx.item}</p>
                </div>
                <p className={`font-medium text-sm ${tx.amount < 0 ? 'text-sewain-red' : 'text-sewain-text-primary'}`}>
                  {tx.amount < 0 ? '-' : '+'}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[tx.status] || 'bg-gray-100 text-gray-600'}`}>
                  {tx.status}
                </span>
                <span className="text-xs text-sewain-text-secondary">{tx.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
