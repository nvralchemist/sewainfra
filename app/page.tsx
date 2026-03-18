'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const initialSeconds = 28 * 60 + 14

export default function Page() {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('QRIS')
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (step !== 3 || secondsLeft <= 0) return

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

  const resetFlow = () => {
    setStep(1)
    setPhone('')
    setPaymentMethod('QRIS')
    setSecondsLeft(initialSeconds)
  }

  return (
    <main className="min-h-screen bg-brand-sand bg-grain px-4 py-8 text-brand-ink sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden rounded-[2rem] border border-white/60 bg-white/55 p-8 shadow-card backdrop-blur lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-moss/70">
                Sewain Prototype
              </p>
              <div className="space-y-3">
                <h1 className="max-w-md text-5xl font-semibold leading-tight">
                  Checkout rasa real buat booking dari WhatsApp.
                </h1>
                <p className="max-w-md text-base leading-7 text-brand-ink/72">
                  Satu halaman, tanpa backend, cukup realistis untuk demo Vercel:
                  booking detail, hold timer, dan pilihan pembayaran dummy.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-brand-ink/78">
              <div className="rounded-3xl border border-brand-moss/10 bg-white/75 p-4">
                Status booking dibuat terasa aman dengan summary, aturan singkat,
                dan countdown pembayaran.
              </div>
              <div className="rounded-3xl border border-brand-moss/10 bg-white/75 p-4">
                Semua data bersifat fake, jadi cocok untuk prototype investor,
                internal demo, atau testing UX.
              </div>
            </div>
          </div>

          <div className="w-full rounded-[2rem] border border-white/70 bg-white/90 shadow-card backdrop-blur">
            <div className="flex items-center justify-between border-b border-brand-ink/8 px-5 pb-3 pt-5 sm:px-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-moss/70">
                  Sewain Demo
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  WhatsApp booking checkout
                </h2>
              </div>
              <div className="rounded-full bg-brand-sand px-3 py-1 text-xs font-medium text-brand-ink/65">
                Step {step}/4
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/camera.svg"
                    alt="Camera"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Sony A7 III Camera</h3>
                  <div className="space-y-1 text-sm text-brand-ink/75">
                    <p>12-14 March</p>
                    <p>Rp150k / day</p>
                    <p>4.8 rating from 120 transaksi</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-brand-moss/10 bg-brand-sand/70 p-4 text-sm text-brand-ink/76">
                  <p>Booking aman</p>
                  <p>Tidak bentrok dengan customer lain</p>
                  <p>Deposit dilindungi dengan aturan jelas</p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-[1.4rem] bg-brand-moss py-3.5 text-base font-medium text-white transition hover:bg-brand-leaf"
                >
                  Amankan Booking
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-semibold">Masukkan nomor WhatsApp</h3>
                  <p className="mt-1 text-sm text-brand-ink/60">
                    Biar detail booking langsung terkirim ke chat kamu.
                  </p>
                </div>

                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+62 812 xxx xxxx"
                  className="h-12 w-full rounded-2xl border border-brand-ink/15 bg-white px-4 text-base outline-none transition focus:border-brand-moss focus:ring-2 focus:ring-brand-leaf/20"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-[1.4rem] border border-brand-ink/15 py-3.5 font-medium text-brand-ink/75"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!phone.trim()}
                    className="flex-1 rounded-[1.4rem] bg-brand-moss py-3.5 font-medium text-white transition disabled:cursor-not-allowed disabled:bg-brand-ink/20"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-semibold">Amankan Booking</h3>
                  <p className="mt-2 text-4xl font-semibold">Rp 20.000</p>
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
                    {['QRIS', 'GoPay', 'VA BCA'].map((method) => (
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

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-[1.4rem] border border-brand-ink/15 py-3.5 font-medium text-brand-ink/75"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 rounded-[1.4rem] bg-brand-moss py-3.5 font-medium text-white transition hover:bg-brand-leaf"
                  >
                    Bayar &amp; Amankan
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-moss/12 text-2xl text-brand-moss">
                  ✓
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold">Booking berhasil!</h3>
                  <p className="text-sm text-brand-ink/62">
                    Detail sudah dikirim ke WhatsApp kamu.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-brand-ink/10 bg-brand-sand/60 p-4 text-sm text-brand-ink/76">
                  <p>12-14 March</p>
                  <p>Jakarta Selatan</p>
                  <p>Metode pembayaran: {paymentMethod}</p>
                  <p>WhatsApp: {phone}</p>
                </div>

                <button
                  onClick={resetFlow}
                  className="w-full rounded-[1.4rem] bg-brand-moss py-3.5 font-medium text-white transition hover:bg-brand-leaf"
                >
                  Kembali ke WhatsApp
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
