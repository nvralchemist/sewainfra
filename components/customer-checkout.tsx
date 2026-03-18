'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { bookingMock, paymentMethods } from '@/lib/mock-data'

const initialSeconds = 28 * 60 + 14

export function CustomerCheckout({ bookingId }: { bookingId: string }) {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (step !== 2 || secondsLeft <= 0) return

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => current - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [secondsLeft, step])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const remainder = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')

    return `${minutes}:${remainder}`
  }

  const resetDemo = () => {
    setStep(1)
    setPaymentMethod(paymentMethods[0])
    setSecondsLeft(initialSeconds)
  }

  return (
    <main className="min-h-screen bg-brand-sand bg-grain px-4 py-8 text-brand-ink sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-card backdrop-blur lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-moss/70">
                Booking Link / {bookingId}
              </p>
              <div className="space-y-3">
                <h1 className="max-w-md text-5xl font-semibold leading-tight">
                  Checkout ringan yang terasa seperti lanjutan dari chat.
                </h1>
                <p className="max-w-md text-base leading-7 text-brand-ink/72">
                  Tidak ada login. Tidak ada signup. Customer cukup buka unique
                  link dari seller, bayar secure booking fee, lalu lanjut
                  koordinasi tetap lewat WhatsApp.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-brand-ink/78">
              <div className="rounded-3xl border border-brand-moss/10 bg-white/80 p-4">
                Seller: {bookingMock.sellerName}
              </div>
              <div className="rounded-3xl border border-brand-moss/10 bg-white/80 p-4">
                Booking reference: {bookingMock.bookingReference}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/90 shadow-card backdrop-blur">
            <div className="flex items-center justify-between border-b border-brand-ink/8 px-5 pb-3 pt-5 sm:px-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-moss/70">
                  Sewain / Secure booking
                </p>
                <h2 className="mt-1 text-xl font-semibold">{bookingMock.itemName}</h2>
              </div>
              <div className="rounded-full bg-brand-sand px-3 py-1 text-xs font-medium text-brand-ink/65">
                Step {step}/3
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div className="rounded-[1.3rem] border border-brand-moss/12 bg-brand-sand/65 p-4 text-sm text-brand-ink/72">
                  Booking link ini dikirim seller via WhatsApp untuk amankan tanggal
                  rental tanpa perlu akun baru.
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                  <Image src="/camera.svg" alt={bookingMock.itemName} fill priority className="object-cover" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">{bookingMock.itemName}</h3>
                  <div className="space-y-1 text-sm text-brand-ink/75">
                    <p>{bookingMock.date}</p>
                    <p>{bookingMock.pricePerDay}</p>
                    <p>{bookingMock.rating}</p>
                    <p>Seller: {bookingMock.sellerName}</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-brand-moss/10 bg-brand-sand/70 p-4 text-sm text-brand-ink/76">
                  <p>Booking aman</p>
                  <p>Tidak bentrok dengan customer lain</p>
                  <p>Aturan booking jelas &amp; transparan</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full rounded-[1.4rem] bg-brand-moss py-3.5 text-base font-medium text-white transition hover:bg-brand-leaf"
                  >
                    Amankan Booking
                  </button>
                  <div className="flex items-center justify-between text-sm">
                    <Link href="/seller" className="text-brand-moss underline-offset-4 hover:underline">
                      Lihat dashboard seller
                    </Link>
                    <Link href="/wa" className="text-brand-moss underline-offset-4 hover:underline">
                      Lihat simulasi WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-semibold">Amankan Booking</h3>
                  <p className="mt-2 text-4xl font-semibold">{bookingMock.secureFee}</p>
                  <p className="mt-1 text-sm text-brand-ink/60">
                    Dipotong dari total pembayaran nanti.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-brand-clay/20 bg-brand-clay/10 p-4 text-sm text-brand-ink/76">
                  <p className="font-medium text-brand-ink">Aturan singkat</p>
                  <p className="mt-1">Cancel &lt;24 jam: hangus</p>
                  <p>Cancel &gt;24 jam: refund</p>
                </div>

                <div className="rounded-[1.5rem] border border-brand-ink/10 bg-brand-sand/60 p-4">
                  <p className="text-sm font-medium text-brand-clay">
                    Expired dalam {formatTime(secondsLeft)}
                  </p>
                  <div className="mt-3 space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          paymentMethod === method
                            ? 'border-brand-moss bg-brand-moss/10 text-brand-moss'
                            : 'border-brand-ink/15 text-brand-ink/74'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-[1.4rem] border border-brand-ink/15 py-3.5 font-medium text-brand-ink/75"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 rounded-[1.4rem] bg-brand-moss py-3.5 font-medium text-white transition hover:bg-brand-leaf"
                    >
                      Bayar &amp; Amankan
                    </button>
                  </div>

                  <Link href="/seller" className="block text-sm text-brand-moss underline-offset-4 hover:underline">
                    Lihat dashboard seller
                  </Link>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 p-5 text-center sm:p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-moss/12 text-2xl text-brand-moss">
                  ✓
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Booking berhasil!</h3>
                  <p className="text-sm text-brand-ink/62">
                    Seller akan lanjutkan proses via WhatsApp.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-brand-ink/10 bg-brand-sand/60 p-4 text-left text-sm text-brand-ink/76">
                  <p>{bookingMock.date}</p>
                  <p>{bookingMock.location}</p>
                  <p>{paymentMethod}</p>
                  <p>{bookingMock.bookingReference}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={resetDemo}
                    className="w-full rounded-[1.4rem] bg-brand-moss py-3.5 font-medium text-white transition hover:bg-brand-leaf"
                  >
                    Ulangi demo
                  </button>
                  <div className="flex items-center justify-between text-sm">
                    <Link href="/seller" className="text-brand-moss underline-offset-4 hover:underline">
                      Lihat dashboard seller
                    </Link>
                    <Link href="/wa" className="text-brand-moss underline-offset-4 hover:underline">
                      Lihat simulasi WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
