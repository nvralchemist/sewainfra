'use client'

import { Search, Plus } from 'lucide-react'

const catalogItems = [
  { id: '1', name: 'Gaun Pesta Merah', size: 'M', price: 350000, deposit: 200000, status: 'Tersedia', category: 'Gaun Pesta', condition: 'Sangat Baik' },
  { id: '2', name: 'Jas Formal Hitam', size: 'L', price: 250000, deposit: 150000, status: 'Tersedia', category: 'Jas', condition: 'Baik' },
  { id: '3', name: 'Kebaya Hijau', size: 'S', price: 200000, deposit: 100000, status: 'Disewa', category: 'Kebaya', condition: 'Sangat Baik' },
  { id: '4', name: 'Gaun Cocktail Silver', size: 'M', price: 300000, deposit: 200000, status: 'Tersedia', category: 'Gaun Pesta', condition: 'Baik' },
  { id: '5', name: 'Jas Wedding Putih', size: 'XL', price: 400000, deposit: 250000, status: 'Maintenance', category: 'Jas', condition: 'Perlu Perbaikan' },
  { id: '6', name: 'Kebaya Modern Biru', size: 'M', price: 250000, deposit: 150000, status: 'Tersedia', category: 'Kebaya', condition: 'Sangat Baik' },
]

const statusColor: Record<string, string> = {
  'Tersedia': 'bg-sewain-primary-light text-sewain-primary',
  'Disewa': 'bg-amber-50 text-amber-700',
  'Maintenance': 'bg-red-50 text-sewain-red',
}

export default function DashboardCatalog() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-sewain-text-primary">Katalog Produk</h2>
          <p className="text-sm text-sewain-text-secondary mt-1">Kelola item yang tersedia untuk disewa</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-sewain-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-sewain-primary-dark transition">
          <Plus size={16} />
          Tambah Item
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sewain-text-secondary" />
        <input
          type="text"
          placeholder="Cari item di katalog..."
          className="w-full pl-9 pr-4 py-2.5 border border-sewain-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sewain-primary/20 focus:border-sewain-primary"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['Semua', 'Gaun Pesta', 'Kebaya', 'Jas', 'Aksesoris'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              i === 0
                ? 'bg-sewain-primary text-white'
                : 'bg-white text-sewain-text-secondary border border-sewain-border hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalogItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-sewain-border overflow-hidden hover:shadow-card transition">
            {/* Image placeholder */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">👗</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-sewain-text-primary">{item.name}</h3>
                  <p className="text-xs text-sewain-text-secondary mt-0.5">Size {item.size} · {item.category}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[item.status] || 'bg-gray-100 text-gray-600'}`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-lg font-bold text-sewain-text-primary">Rp {item.price.toLocaleString('id-ID')}</span>
                <span className="text-xs text-sewain-text-secondary">/ sewa</span>
              </div>
              <p className="text-xs text-sewain-text-secondary mt-1">Deposit: Rp {item.deposit.toLocaleString('id-ID')}</p>
              <p className="text-xs text-sewain-text-secondary mt-0.5">Kondisi: {item.condition}</p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-2 text-xs font-medium text-sewain-primary border border-sewain-primary rounded-lg hover:bg-sewain-primary-light transition">
                  Edit
                </button>
                <button className="flex-1 py-2 text-xs font-medium text-white bg-sewain-primary rounded-lg hover:bg-sewain-primary-dark transition">
                  Buat Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
