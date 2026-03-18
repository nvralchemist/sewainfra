import Link from 'next/link'

import { bookingMock, sellerBookings, sellerSummary, sellerTimeline } from '@/lib/mock-data'

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

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sellerSummary.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur"
            >
              <p className="text-sm text-brand-ink/58">{item.label}</p>
              <p className="mt-3 text-4xl font-semibold">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Booking list</h2>
                <p className="mt-1 text-sm text-brand-ink/60">Ringkasan operasional harian seller.</p>
              </div>
              <span className="rounded-full bg-brand-sand px-3 py-1 text-xs font-medium text-brand-ink/65">
                4 contoh booking
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {sellerBookings.map((booking) => (
                <article
                  key={`${booking.item}-${booking.renter}`}
                  className="rounded-[1.5rem] border border-brand-ink/10 bg-brand-sand/50 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">{booking.item}</h3>
                      <p className="text-sm text-brand-ink/60">{booking.renter}</p>
                      <p className="text-sm text-brand-ink/70">{booking.date}</p>
                    </div>
                    <div className="space-y-2 text-sm sm:text-right">
                      <p>{booking.payment}</p>
                      <p className="font-medium text-brand-moss">{booking.status}</p>
                      <button className="rounded-full border border-brand-ink/10 px-3 py-1.5 text-brand-ink/75 hover:bg-white">
                        {booking.action}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-moss/70">Selected booking</p>
            <h2 className="mt-2 text-2xl font-semibold">{bookingMock.itemName}</h2>
            <div className="mt-5 space-y-3 rounded-[1.5rem] border border-brand-ink/10 bg-brand-sand/55 p-4 text-sm text-brand-ink/74">
              <p>Booking ID: {bookingMock.bookingReference}</p>
              <p>Item: {bookingMock.itemName}</p>
              <p>Rental period: {bookingMock.date}</p>
              <p>Secure booking fee paid: {bookingMock.secureFee}</p>
              <p>Status: Active</p>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <div className="mt-3 space-y-3">
                {sellerTimeline.map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-moss/12 text-xs font-medium text-brand-moss">
                      {index + 1}
                    </div>
                    <p className="text-sm text-brand-ink/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
