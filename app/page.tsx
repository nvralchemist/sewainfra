import Link from 'next/link'

const prototypes = [
  {
    tag: 'Prototype 1',
    title: 'WhatsApp Chat Flow',
    description:
      'Simulasi alur percakapan WhatsApp antara merchant dan customer baru — dari pesan pertama hingga pembayaran via escrow Sewain.',
    href: '/wa',
    color: 'bg-sewain-primary',
  },
  {
    tag: 'Prototype 2',
    title: 'Checkout Customer',
    description:
      'Halaman checkout mobile-first yang dilihat customer saat tap link pembayaran dari merchant — lengkap dengan KYC, escrow, dan QRIS.',
    href: '/checkout/TRX-20250412-CEA-001',
    color: 'bg-sewain-primary',
  },
  {
    tag: 'Prototype 3',
    title: 'Dashboard Merchant',
    description:
      'Dashboard web lengkap untuk merchant — kelola orders, lihat risk score, buat order, tracking, dan dispute resolution.',
    href: '/dashboard',
    color: 'bg-sewain-primary',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-sewain-bg">
      {/* Hero */}
      <div className="bg-sewain-primary px-4 pb-16 pt-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-2xl font-bold text-white">sewain</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">prototype</span>
          </div>
          <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Infrastruktur transaksi rental yang tetap berpusat di WhatsApp.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Escrow, identity scoring, payment, order tracking, dan dispute resolution — semua dari checkout link yang di-share di WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
              <span>🔒</span> Escrow Protection
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
              <span>📊</span> Identity Scoring
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
              <span>💬</span> WhatsApp-First
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
              <span>⚖️</span> Dispute Resolution
            </div>
          </div>
        </div>
      </div>

      {/* Prototype Cards */}
      <div className="mx-auto max-w-5xl px-4 -mt-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {prototypes.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group rounded-2xl border border-sewain-border bg-white p-6 shadow-card transition hover:shadow-card-lg hover:-translate-y-0.5"
            >
              <span className="inline-block rounded-full bg-sewain-primary-light px-3 py-1 text-xs font-medium text-sewain-primary">
                {p.tag}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-sewain-text-primary">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-sewain-text-secondary">
                {p.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-sewain-primary px-4 py-2 text-sm font-medium text-white transition group-hover:bg-sewain-primary-dark">
                Buka Prototype
                <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 mb-16 rounded-2xl border border-sewain-border bg-white p-6">
          <h3 className="text-lg font-semibold text-sewain-text-primary">Data Konsisten</h3>
          <p className="mt-2 text-sm text-sewain-text-secondary">
            Semua prototype menggunakan data yang sama untuk pengalaman yang kohesif:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div className="rounded-xl bg-sewain-bg p-3">
              <div className="font-medium text-sewain-text-primary">Merchant</div>
              <div className="text-sewain-text-secondary">CEA Atelier, Jakarta Selatan</div>
            </div>
            <div className="rounded-xl bg-sewain-bg p-3">
              <div className="font-medium text-sewain-text-primary">Customer</div>
              <div className="text-sewain-text-secondary">Rina Ayu, +62 812 3456 7890</div>
            </div>
            <div className="rounded-xl bg-sewain-bg p-3">
              <div className="font-medium text-sewain-text-primary">Order</div>
              <div className="text-sewain-text-secondary">TRX-20250412-CEA-001</div>
            </div>
            <div className="rounded-xl bg-sewain-bg p-3">
              <div className="font-medium text-sewain-text-primary">Item</div>
              <div className="text-sewain-text-secondary">Gaun Pesta Merah, Size M — Rp 550.000</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
