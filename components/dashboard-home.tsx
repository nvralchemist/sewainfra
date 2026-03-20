'use client'

import React from 'react'
import {
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Landmark,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  dashboardStats,
  returnAlerts,
  recentOrders,
  gmvChartData,
} from '@/lib/mock-data'

const statIcons = [
  <ShoppingBag key="0" size={24} className="text-sewain-primary" />,
  <TrendingUp key="1" size={24} className="text-sewain-primary" />,
  <AlertTriangle key="2" size={24} className="text-sewain-amber" />,
  <Landmark key="3" size={24} className="text-sewain-text-secondary" />,
]

const riskColor: Record<string, string> = {
  rendah: 'bg-green-500',
  sedang: 'bg-yellow-500',
  tinggi: 'bg-red-500',
}

const statusColor: Record<string, string> = {
  Aktif: 'bg-green-100 text-green-700',
  'Menunggu Bayar': 'bg-yellow-100 text-yellow-700',
  Dikembalikan: 'bg-blue-100 text-blue-700',
  Baru: 'bg-gray-100 text-gray-700',
  Dispute: 'bg-red-100 text-red-700',
}

export default function DashboardHome() {
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
          ⚠️ Perlu Perhatian
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
            <button className="shrink-0 px-4 py-2 text-sm font-medium rounded-lg border border-sewain-primary text-sewain-primary hover:bg-sewain-primary-light transition-colors">
              Kirim Reminder
            </button>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-sewain-border">
          <h2 className="text-lg font-semibold text-sewain-text-primary">Order Terbaru</h2>
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
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-sewain-text-primary">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3 text-sewain-text-secondary">{order.item}</td>
                  <td className="px-5 py-3 text-sewain-text-secondary">{order.period}</td>
                  <td className="px-5 py-3 text-sewain-text-primary font-medium">
                    {order.total}
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-sewain-text-secondary capitalize">
                      <span className={`w-2.5 h-2.5 rounded-full ${riskColor[order.risk]}`} />
                      {order.risk}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusColor[order.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-sewain-primary text-sm font-medium hover:underline">
                      {order.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-sewain-border">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sewain-text-primary">{order.customer}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusColor[order.status] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-sewain-text-secondary">{order.item}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sewain-text-secondary">{order.period}</span>
                <span className="font-medium text-sewain-text-primary">{order.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-sewain-text-secondary capitalize">
                  <span className={`w-2 h-2 rounded-full ${riskColor[order.risk]}`} />
                  {order.risk}
                </span>
                <button className="text-sewain-primary text-sm font-medium hover:underline">
                  {order.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GMV Chart */}
      <div className="bg-white rounded-xl shadow-card p-5">
        <h2 className="text-lg font-semibold text-sewain-text-primary mb-4">
          GMV 30 Hari Terakhir
        </h2>
        <div className="h-64">
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
        </div>
      </div>
    </div>
  )
}
