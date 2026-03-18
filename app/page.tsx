'use client'
/*starts here*/
import Image from 'next/image'
import { useEffect, useState } from 'react'

const initialSeconds = 28 * 60 + 14
const paymentMethods = ['QRIS', 'GoPay', 'VA BCA']
const fakeLink = 'sewain.id/pay/SNY-A7-BOOK-2941'

export default function Page() {
  const [step, setStep] = useState(0)
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
    setStep(0)
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
                  Dari chat seller ke secure checkout, dalam satu prototype.
                </h1>
                <p className="max-w-md text-base leading-7 text-brand-ink/72">
                  Entry point sekarang dimulai dari percakapan WhatsApp yang terasa
                  natural, lalu user masuk ke halaman pembayaran booking yang tetap
                  ringan dan dummy.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-brand-ink/78">
              <div className="rounded-3xl border border-brand-moss/10 bg-white/75 p-4">
                Seller mengirim detail stok, hold window, dan secure link langsung
                dari chat.
              </div>
              <div className="rounded-3xl border border-brand-moss/10 bg-white/75 p-4">
                Sesudah klik link, user masuk ke flow booking confirmation,
                nomor WhatsApp, dan payment hold timer.
              </div>
            </div>
          </div>

          <div className="w-full rounded-[2rem] border border-white/70 bg-white/90 shadow-card backdrop-blur">
            <div className="flex items-center justify-between border-b border-brand-ink/8 px-5 pb-3 pt-5 sm:px-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-moss/70">
                  Sewain Demo
                </p>
                <h2 className="mt-1 text-xl font-semibold">WhatsApp to checkout</h2>
              </div>
              <div className="rounded-full bg-brand-sand px-3 py-1 text-xs font-medium text-brand-ink/65">
                {step === 0 ? 'Chat' : `Step ${step}/4`}
              </div>
            </div>

            {step === 0 && (
              <div className="space-y-4 bg-[#e7ded0] p-5 sm:p-6">
                <div className="rounded-[1.75rem] bg-[#efe7db] p-3">
                  <div className="flex items-center gap-3 rounded-[1.25rem] bg-[#0b5f4f] px-4 py-3 text-white">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
                      SR
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">Sewain Rentals</p>
                      <p className="text-xs text-white/75">
                        online • biasanya balas dalam 3 menit
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 px-1 py-4 text-sm">
                    <p className="mx-auto w-fit rounded-full bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-brand-ink/55">
                      Today
                    </p>

                    <div className="flex justify-end">
                      <div className="max-w-[82%] rounded-[1.25rem] rounded-br-md bg-[#dcf8c6] px-4 py-3 text-brand-ink shadow-sm">
                        Halo kak, Sony A7 III buat 12-14 March masih available?
                        Lokasi saya di Jakarta Selatan.
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[84%] rounded-[1.25rem] rounded-bl-md bg-white px-4 py-3 text-brand-ink shadow-sm">
                        Masih available kak. Untuk amankan tanggal, booking bisa di-hold
                        dulu dengan deposit Rp20.000.
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[84%] rounded-[1.25rem] rounded-bl-md bg-white px-4 py-3 text-brand-ink shadow-sm">
                        Saya kirim secure checkout link ya. Setelah bayar deposit,
                        slot langsung kami lock supaya tidak diambil penyewa lain.
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[88%] rounded-[1.5rem] rounded-bl-md bg-white p-3 shadow-sm">
                        <div className="rounded-[1.2rem] border border-brand-moss/15 bg-brand-sand/55 p-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-brand-moss/60">
                            Secure booking link
                          </p>
                          <p className="mt-2 text-sm font-medium text-brand-ink">
                            Hold Sony A7 III for 12-14 March
                          </p>
                          <p className="mt-1 text-xs text-brand-ink/55">
                            Expires in 30 min after opened
                          </p>
                          <div className="mt-3 rounded-xl bg-white px-3 py-2 text-xs text-brand-moss shadow-sm">
                            {fakeLink}
                          </div>
                        </div>

                        <button
                          onClick={() => setStep(1)}
                          className="mt-3 w-full rounded-[1.1rem] bg-brand-moss py-3 text-sm font-medium text-white transition hover:bg-brand-leaf"
                        >
                          Buka secure checkout
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-[78%] rounded-[1.25rem] rounded-br-md bg-[#dcf8c6] px-4 py-3 text-brand-ink shadow-sm">
                        Oke, saya amankan sekarang.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5 p-5 sm:p-6">
                <div className="rounded-[1.3rem] border border-brand-moss/12 bg-brand-sand/65 p-4 text-sm text-brand-ink/72">
                  Link ini dikirim seller via WhatsApp untuk hold tanggal booking
                  selama 30 menit.
                </div>

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
                  Kembali ke chat WhatsApp
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
