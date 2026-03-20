'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  CUSTOMER,
  MERCHANT,
  ORDER,
  formatRp,
  paymentMethods,
} from '@/lib/mock-data'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function CustomerCheckout({ bookingId }: { bookingId: string }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedPayment, setSelectedPayment] = useState('qris')
  const [countdown, setCountdown] = useState(899) // 14:59
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Countdown timer
  useEffect(() => {
    if (step !== 1 || countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [step, countdown])

  const fmt = useCallback((s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }, [])

  const handlePay = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
  }

  // -----------------------------------------------------------------------
  // Step 2 — Success
  // -----------------------------------------------------------------------
  if (step === 2) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10 text-center">
        {/* Animated checkmark */}
        <div className="animate-check mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sewain-primary text-4xl text-white">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-sewain-text-primary">
          Pembayaran Berhasil! {'\u{1F389}'}
        </h2>
        <p className="mt-2 text-sm text-sewain-text-secondary">
          Dana kamu disimpan aman di escrow Sewain
        </p>

        {/* Compact order summary */}
        <div className="mt-6 w-full rounded-xl border border-sewain-border bg-white p-4 text-left shadow-card">
          <p className="text-xs font-medium uppercase tracking-wider text-sewain-text-secondary">
            Ringkasan Order
          </p>
          <div className="mt-3 space-y-2 text-sm text-sewain-text-primary">
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Order ID</span>
              <span className="font-medium">{ORDER.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Item</span>
              <span className="font-medium">{ORDER.item} &mdash; Size {ORDER.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Periode</span>
              <span className="font-medium">{ORDER.rentalStart} &ndash; {ORDER.rentalEnd}</span>
            </div>
            <div className="flex justify-between border-t border-sewain-border pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-sewain-primary">{formatRp(ORDER.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 w-full space-y-3">
          <button className="w-full rounded-xl border-2 border-sewain-primary py-3 text-sm font-semibold text-sewain-primary transition hover:bg-sewain-primary-light">
            Lacak Status Order
          </button>
          <Link
            href="/wa"
            className="block w-full rounded-xl bg-sewain-primary py-3 text-center text-sm font-semibold text-white transition hover:bg-sewain-primary-dark"
          >
            Kembali ke WhatsApp
          </Link>
        </div>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Step 1 — Checkout Flow
  // -----------------------------------------------------------------------
  return (
    <div className="relative scroll-smooth pb-36">
      {/* ── Progress Bar ────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-sewain-border bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-5 py-3 text-xs">
          {['Verifikasi', 'Pembayaran', 'Konfirmasi'].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                  i === 1
                    ? 'bg-sewain-primary text-white'
                    : i < 1
                    ? 'bg-sewain-primary-light text-sewain-primary'
                    : 'bg-gray-100 text-sewain-text-secondary'
                }`}
              >
                {i < 1 ? '\u2713' : i + 1}
              </div>
              <span
                className={`${
                  i === 1
                    ? 'font-semibold text-sewain-primary'
                    : 'text-sewain-text-secondary'
                }`}
              >
                {label}
              </span>
              {i < 2 && (
                <span className="mx-1 text-sewain-text-secondary">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust Bar ───────────────────────────────────────── */}
      <div className="border-b border-sewain-border bg-sewain-primary-light px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-sewain-primary">Sewain</span>
            <span className="text-xs text-sewain-text-secondary">
              {'\uD83D\uDEE1\uFE0F'} Transaksi Dilindungi Sewain
            </span>
          </div>
          <span className="rounded-full bg-sewain-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-sewain-primary">
            {'\uD83D\uDD12'} Aman &amp; Terverifikasi
          </span>
        </div>
      </div>

      <div className="space-y-4 px-4 pt-4">
        {/* ── Merchant Identity Card ────────────────────────── */}
        <div className="rounded-xl border border-sewain-border bg-white p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              {MERCHANT.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sewain-text-primary">
                  {MERCHANT.name}
                </p>
                <span className="inline-flex items-center rounded-full bg-sewain-primary-light px-2 py-0.5 text-[10px] font-medium text-sewain-primary">
                  {'\u2713'} Merchant Terverifikasi
                </span>
              </div>
              <p className="mt-0.5 text-xs text-sewain-text-secondary">
                {MERCHANT.location} &middot; {MERCHANT.category}
              </p>
            </div>
          </div>
        </div>

        {/* ── Order Details Card ────────────────────────────── */}
        <div className="rounded-xl border border-sewain-border bg-white p-4 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wider text-sewain-text-secondary">
            Detail Pesanan
          </p>
          <p className="mt-2 font-semibold text-sewain-text-primary">
            {ORDER.item} &mdash; Size {ORDER.size}
          </p>
          {/* Image placeholder */}
          <div className="mt-3 flex h-44 items-center justify-center rounded-lg bg-gray-100 text-4xl">
            {'\uD83D\uDC57'}
          </div>
          <div className="mt-3 space-y-1.5 text-sm text-sewain-text-secondary">
            <p>Periode sewa: {ORDER.rentalStart} &ndash; {ORDER.rentalEnd}</p>
            <p>Durasi: {ORDER.duration}</p>
            <p>Kondisi: {ORDER.condition}</p>
          </div>
        </div>

        {/* ── KYC Section ───────────────────────────────────── */}
        <div className="rounded-xl border border-sewain-border bg-white p-4 shadow-card">
          <p className="font-semibold text-sewain-text-primary">
            Verifikasi Identitas
          </p>
          <p className="mt-0.5 text-xs text-sewain-text-secondary">
            Diperlukan untuk keamanan transaksi
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-sewain-text-secondary">
                Nama lengkap
              </label>
              <input
                type="text"
                defaultValue={CUSTOMER.name}
                className="mt-1 w-full rounded-lg border border-sewain-border bg-sewain-bg px-3 py-2.5 text-sm text-sewain-text-primary outline-none focus:border-sewain-primary focus:ring-1 focus:ring-sewain-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-sewain-text-secondary">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                defaultValue={CUSTOMER.phone}
                className="mt-1 w-full rounded-lg border border-sewain-border bg-sewain-bg px-3 py-2.5 text-sm text-sewain-text-primary outline-none focus:border-sewain-primary focus:ring-1 focus:ring-sewain-primary"
              />
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-sewain-border bg-sewain-bg py-3 text-sm text-sewain-text-secondary transition hover:border-sewain-primary hover:text-sewain-primary">
              {'\uD83D\uDCF7'} Upload Foto KTP
            </button>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-sewain-text-secondary">
            {'\uD83D\uDD12'} Data kamu aman dan hanya digunakan untuk verifikasi transaksi ini
          </p>
        </div>

        {/* ── Payment Breakdown Card ────────────────────────── */}
        <div className="rounded-xl border border-sewain-border bg-white p-4 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wider text-sewain-text-secondary">
            Rincian Pembayaran
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Harga sewa</span>
              <span className="text-sewain-text-primary">{formatRp(ORDER.sewa)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sewain-text-secondary">Deposit (refundable)</span>
              <span className="text-sewain-text-primary">{formatRp(ORDER.deposit)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sewain-text-secondary">Biaya layanan</span>
              <span className="flex items-center gap-1.5 text-sewain-text-primary">
                {formatRp(ORDER.serviceFee)}
                <span className="rounded bg-sewain-primary-light px-1.5 py-0.5 text-[10px] font-semibold text-sewain-primary">
                  gratis
                </span>
              </span>
            </div>
            <div className="my-1 border-t border-sewain-border" />
            <div className="flex justify-between font-bold">
              <span className="text-sewain-text-primary">Total Pembayaran</span>
              <span className="text-sewain-text-primary">{formatRp(ORDER.total)}</span>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-sewain-primary-light px-3 py-2.5 text-xs leading-relaxed text-sewain-primary-dark">
            {'\uD83D\uDC9A'} Deposit {formatRp(ORDER.deposit)} akan dikembalikan otomatis setelah barang kembali dalam kondisi baik
          </div>
        </div>

        {/* ── Payment Method Selector ───────────────────────── */}
        <div className="rounded-xl border border-sewain-border bg-white p-4 shadow-card">
          <p className="font-semibold text-sewain-text-primary">
            Pilih Metode Pembayaran
          </p>
          <div className="mt-3 space-y-2">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => {
                  setSelectedPayment(pm.id)
                  setSelectedBank(null)
                }}
                className={`flex w-full items-center gap-3 rounded-lg border-2 px-3 py-3 text-left text-sm transition ${
                  selectedPayment === pm.id
                    ? 'border-sewain-primary bg-sewain-primary-light/50'
                    : 'border-sewain-border bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{pm.icon}</span>
                <span
                  className={`font-medium ${
                    selectedPayment === pm.id
                      ? 'text-sewain-primary'
                      : 'text-sewain-text-primary'
                  }`}
                >
                  {pm.name}
                </span>
                <div className="ml-auto">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      selectedPayment === pm.id
                        ? 'border-sewain-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedPayment === pm.id && (
                      <div className="h-2.5 w-2.5 rounded-full bg-sewain-primary" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* ── QRIS expanded ──────────────────────────────── */}
          {selectedPayment === 'qris' && (
            <div className="mt-4 rounded-lg border border-sewain-border bg-sewain-bg p-4 text-center">
              {/* QR placeholder */}
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-sewain-border bg-white">
                <div className="space-y-1 text-center">
                  <span className="block text-4xl">{'\uD83D\uDCF1'}</span>
                  <span className="block text-xs text-sewain-text-secondary">
                    QR Code
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-sewain-text-secondary">
                Scan QR code menggunakan aplikasi e-wallet atau mobile banking kamu
              </p>
              <p className="mt-2 text-sm font-medium text-sewain-amber">
                QR Code berlaku: {fmt(countdown)}
              </p>
              <button
                onClick={() => setSelectedPayment('gopay')}
                className="mt-2 text-xs text-sewain-primary underline underline-offset-2"
              >
                Atau gunakan metode lain
              </button>
            </div>
          )}

          {/* ── GoPay / OVO / ShopeePay expanded ──────────── */}
          {(selectedPayment === 'gopay' ||
            selectedPayment === 'ovo' ||
            selectedPayment === 'shopeepay') && (
            <div className="mt-4 rounded-lg border border-sewain-border bg-sewain-bg p-4">
              <label className="block text-xs font-medium text-sewain-text-secondary">
                Nomor{' '}
                {selectedPayment === 'gopay'
                  ? 'GoPay'
                  : selectedPayment === 'ovo'
                  ? 'OVO'
                  : 'ShopeePay'}
              </label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                className="mt-1.5 w-full rounded-lg border border-sewain-border bg-white px-3 py-2.5 text-sm outline-none focus:border-sewain-primary focus:ring-1 focus:ring-sewain-primary"
              />
            </div>
          )}

          {/* ── Transfer Bank expanded ─────────────────────── */}
          {selectedPayment === 'bank' && (
            <div className="mt-4 space-y-2">
              {['BCA', 'BNI', 'BRI'].map((bank) => (
                <button
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 px-3 py-2.5 text-left text-sm transition ${
                    selectedBank === bank
                      ? 'border-sewain-primary bg-sewain-primary-light/50'
                      : 'border-sewain-border bg-sewain-bg hover:border-gray-300'
                  }`}
                >
                  <span className="text-base">{'\uD83C\uDFE6'}</span>
                  <span
                    className={`font-medium ${
                      selectedBank === bank
                        ? 'text-sewain-primary'
                        : 'text-sewain-text-primary'
                    }`}
                  >
                    {bank}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── T&C ───────────────────────────────────────────── */}
        <div className="px-1 pb-2">
          <p className="text-[11px] leading-relaxed text-sewain-text-secondary">
            Dengan melanjutkan pembayaran, kamu menyetujui{' '}
            <span className="text-sewain-primary underline underline-offset-2 cursor-pointer">
              Syarat &amp; Ketentuan
            </span>{' '}
            serta{' '}
            <span className="text-sewain-primary underline underline-offset-2 cursor-pointer">
              Kebijakan Privasi
            </span>{' '}
            Sewain.{' '}
            <span className="text-sewain-primary underline underline-offset-2 cursor-pointer">
              Baca S&amp;K lengkap
            </span>
          </p>
        </div>
      </div>

      {/* ── Sticky Pay Button ───────────────────────────────── */}
      <div ref={bottomRef} className="fixed bottom-0 left-1/2 z-30 w-full max-w-[390px] -translate-x-1/2 border-t border-sewain-border bg-white/95 px-4 pb-5 pt-3 backdrop-blur">
        <button
          onClick={handlePay}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-sewain-primary py-3.5 text-sm font-bold text-white transition hover:bg-sewain-primary-dark disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Memproses...</span>
            </>
          ) : (
            <>Bayar Sekarang &mdash; {formatRp(ORDER.total)}</>
          )}
        </button>
        <p className="mt-2 text-center text-[11px] text-sewain-text-secondary">
          {'\uD83D\uDD12'} Pembayaran aman dienkripsi
        </p>
      </div>
    </div>
  )
}
