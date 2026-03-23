import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sewain-bg flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-sewain-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sewain-primary flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="font-bold text-xl text-sewain-text-primary">Sewain</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-sewain-text-primary leading-tight">
            Infrastruktur Transaksi Rental via WhatsApp
          </h1>
          <p className="text-lg text-sewain-text-secondary mt-4 leading-relaxed">
            Escrow, identity scoring, pembayaran, tracking, dan dispute resolution — semua dari satu link checkout di WhatsApp.
          </p>
        </div>

        {/* Prototype cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="group bg-white rounded-2xl border border-sewain-border p-6 hover:shadow-lg hover:border-sewain-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-sewain-primary-light flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-sewain-text-primary group-hover:text-sewain-primary transition-colors">
              Merchant Dashboard
            </h2>
            <p className="text-sm text-sewain-text-secondary mt-2">
              Kelola order, risiko customer, dispute, dan keuangan dari satu dashboard.
            </p>
          </Link>

          {/* WA Flow */}
          <Link
            href="/wa-flow"
            className="group bg-white rounded-2xl border border-sewain-border p-6 hover:shadow-lg hover:border-sewain-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-sewain-primary-light flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-sewain-text-primary group-hover:text-sewain-primary transition-colors">
              WhatsApp Flow
            </h2>
            <p className="text-sm text-sewain-text-secondary mt-2">
              Simulasi chat WhatsApp antara merchant dan customer baru.
            </p>
          </Link>

          {/* Checkout */}
          <Link
            href="/checkout"
            className="group bg-white rounded-2xl border border-sewain-border p-6 hover:shadow-lg hover:border-sewain-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-sewain-primary-light flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-sewain-text-primary group-hover:text-sewain-primary transition-colors">
              Customer Checkout
            </h2>
            <p className="text-sm text-sewain-text-secondary mt-2">
              Halaman pembayaran yang customer buka dari link di WhatsApp.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-sewain-text-secondary border-t border-sewain-border">
        Sewain — Prototype Demo
      </footer>
    </div>
  )
}
