'use client'

import Link from 'next/link'
import { useState } from 'react'

import { bookingMock, disputeMock, sellerBookings, sellerSummary, sellerTimeline } from '@/lib/mock-data'

type Booking = (typeof sellerBookings)[number]

export function SellerDashboard() {
  const [selectedId, setSelectedId] = useState(sellerBookings[0].id)
  const [statusNotice, setStatusNotice] = useState('Belum ada aksi dijalankan.')

  const selectedBooking: Booking =
    sellerBookings.find((booking) => booking.id === selectedId) ?? sellerBookings[0]

  const actionButtons = [
    {
      label: 'Kirim Reminder Return',
      onClick: () => setStatusNotice(`Reminder return dikirim untuk ${selectedBooking.id}.`),
    },
    {
      label: 'Tandai Sudah Kembali',
      onClick: () => setStatusNotice(`Booking ${selectedBooking.id} ditandai selesai kembali.`),
    },
    {
      label: 'Buka Dispute',
      onClick: () => setStatusNotice(`Dispute panel dibuka untuk ${selectedBooking.id}.`),
    },
  ]

  return (
    <div className="space-y-6">
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

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Booking list</h2>
              <p className="mt-1 text-sm text-brand-ink/60">Ringkasan operasional harian seller.</p>
            </div>
            <span className="rounded-full bg-brand-sand px-3 py-1 text-xs font-medium text-brand-ink/65">
              4 booking aktif
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {sellerBookings.map((booking) => {
              const isSelected = booking.id === selectedId

              return (
                <button
                  key={booking.id}
                  onClick={() => setSelectedId(booking.id)}
                  className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                    isSelected
                      ? 'border-brand-moss bg-brand-moss/8 shadow-sm'
                      : 'border-brand-ink/10 bg-brand-sand/50 hover:bg-brand-sand/70'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">{booking.item}</h3>
                      <p className="text-sm text-brand-ink/60">{booking.renter}</p>
                      <p className="text-sm text-brand-ink/70">{booking.date}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-brand-ink/48">
                        {booking.id}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm sm:text-right">
                      <p>{booking.payment}</p>
                      <p className="font-medium text-brand-moss">{booking.status}</p>
                      <p className="text-brand-ink/60">{booking.action}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <article className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-moss/70">Selected booking</p>
            <h2 className="mt-2 text-2xl font-semibold">{selectedBooking.item}</h2>
            <div className="mt-5 space-y-3 rounded-[1.5rem] border border-brand-ink/10 bg-brand-sand/55 p-4 text-sm text-brand-ink/74">
              <p>Booking ID: {selectedBooking.id}</p>
              <p>Item: {selectedBooking.item}</p>
              <p>Rental period: {selectedBooking.date}</p>
              <p>Payment status: {selectedBooking.payment}</p>
              <p>Booking status: {selectedBooking.status}</p>
              <p>Secure booking fee paid: {bookingMock.secureFee}</p>
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

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  onClick={button.onClick}
                  className="rounded-[1.1rem] border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink/78 transition hover:bg-brand-sand"
                >
                  {button.label}
                </button>
              ))}
              <Link
                href="/wa"
                className="rounded-[1.1rem] bg-brand-moss px-4 py-3 text-center text-sm font-medium text-white"
              >
                Lihat Simulasi WA
              </Link>
            </div>

            <div className="mt-4 rounded-[1.3rem] border border-brand-moss/12 bg-brand-sand/55 p-4 text-sm text-brand-ink/72">
              {statusNotice}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-moss/70">Dispute module</p>
            <h3 className="mt-2 text-2xl font-semibold">{disputeMock.booking}</h3>
            <div className="mt-4 space-y-3 rounded-[1.5rem] border border-brand-clay/18 bg-brand-clay/10 p-4 text-sm text-brand-ink/74">
              <p>Issue: {disputeMock.issue}</p>
              <p>Evidence status: {disputeMock.evidenceStatus}</p>
              <p>Status: {disputeMock.reviewStatus}</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => setStatusNotice('Evidence viewer dibuka untuk dispute DJI Mini.')}
                className="rounded-[1.1rem] border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink/78"
              >
                Lihat Evidence
              </button>
              <button
                onClick={() => setStatusNotice('Permintaan bukti tambahan dikirim via WhatsApp.')}
                className="rounded-[1.1rem] border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink/78"
              >
                Kirim Permintaan Bukti
              </button>
              <button
                onClick={() => setStatusNotice('Dispute DJI Mini ditandai selesai.')}
                className="rounded-[1.1rem] border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink/78"
              >
                Tandai Selesai
              </button>
            </div>
          </article>
        </aside>
      </section>
    </div>
  )
}
