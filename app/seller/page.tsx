import Link from 'next/link'

import { SellerDashboard } from '@/components/seller-dashboard'
import { bookingMock } from '@/lib/mock-data'

export default function SellerPage() {
  return (
    <main className="min-h-screen bg-brand-sand bg-grain px-4 py-8 text-brand-ink sm:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-moss/70">Sewain MVP</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Seller dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-ink/68">
                Dashboard ringan untuk melihat pembayaran booking, status rental,
                reminder pengembalian, dan visibilitas dispute tanpa mengubah
                seller keluar dari alur WhatsApp.
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/" className="rounded-full border border-brand-ink/10 px-4 py-2 hover:bg-brand-sand">
                Landing page
              </Link>
              <Link href={`/b/${bookingMock.bookingId}`} className="rounded-full bg-brand-moss px-4 py-2 text-white">
                Lihat customer flow
              </Link>
            </div>
          </div>
        </header>

        <SellerDashboard />
      </div>
    </main>
  )
}
