import Link from 'next/link'

import { bookingMock } from '@/lib/mock-data'

const entryCards = [
  {
    title: 'Lihat Journey Customer',
    description:
      'Customer buka unique booking link dari WhatsApp, bayar secure booking fee, lalu lanjut koordinasi via chat.',
    href: `/b/${bookingMock.bookingId}`,
  },
  {
    title: 'Lihat Seller Dashboard',
    description:
      'Seller memantau pembayaran, status booking, return reminder, dan dispute support dalam satu tampilan ringan.',
    href: '/seller',
  },
  {
    title: 'Lihat WhatsApp Journey',
    description:
      'Illustration screens untuk booking intro, payment success, return reminder, late return, dan dispute.',
    href: '/wa',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-sand bg-grain px-4 py-8 text-brand-ink sm:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-moss/70">
            Sewain MVP Prototype
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
                Checkout layer untuk rental yang tetap berpusat di WhatsApp.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-brand-ink/70">
                Sewain bukan marketplace penuh. Prototype ini menunjukkan bagaimana
                seller tetap beroperasi lewat WhatsApp, sementara Sewain memberi
                secure booking checkout, konfirmasi pembayaran, reminder pengembalian,
                dan dukungan dispute yang ringan.
              </p>
            </div>

            <div className="space-y-3 text-sm text-brand-ink/78">
              <div className="rounded-3xl border border-brand-moss/10 bg-brand-sand/60 p-4">
                Customer booking dari WhatsApp via unique link.
              </div>
              <div className="rounded-3xl border border-brand-moss/10 bg-brand-sand/60 p-4">
                Customer bayar secure booking fee kecil untuk lock jadwal.
              </div>
              <div className="rounded-3xl border border-brand-moss/10 bg-brand-sand/60 p-4">
                Seller mendapat view operasional sederhana tanpa alur yang berat.
              </div>
              <div className="rounded-3xl border border-brand-moss/10 bg-brand-sand/60 p-4">
                WhatsApp tetap jadi kanal komunikasi utama.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {entryCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-card transition hover:-translate-y-1 hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-brand-moss/70">
                Demo route
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-brand-ink/68">
                {card.description}
              </p>
              <div className="mt-6 inline-flex rounded-full bg-brand-moss px-4 py-2 text-sm font-medium text-white">
                Buka
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
