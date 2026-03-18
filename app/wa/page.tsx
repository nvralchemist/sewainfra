import Link from 'next/link'

import { whatsappScenes } from '@/lib/mock-data'

export default function WhatsAppJourneyPage() {
  return (
    <main className="min-h-screen bg-brand-sand bg-grain px-4 py-8 text-brand-ink sm:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-moss/70">WhatsApp Journey</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Illustration screens</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-ink/68">
                Simulasi bagaimana Sewain tetap membiarkan WhatsApp menjadi kanal
                utama komunikasi, sambil menambah lapisan checkout, reminder, dan
                dukungan dispute.
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/" className="rounded-full border border-brand-ink/10 px-4 py-2 hover:bg-brand-sand">
                Landing page
              </Link>
              <Link href="/b/demo001" className="rounded-full bg-brand-moss px-4 py-2 text-white">
                Lihat customer flow
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {whatsappScenes.map((scene) => (
            <article
              key={scene.title}
              className="rounded-[2rem] border border-white/70 bg-[#efe7db] p-4 shadow-card"
            >
              <div className="rounded-[1.5rem] bg-[#0b5f4f] px-4 py-3 text-white">
                <p className="text-sm font-medium">{scene.title}</p>
                <p className="text-xs text-white/75">{scene.subtitle}</p>
              </div>

              <div className="space-y-3 px-1 py-4 text-sm">
                {scene.messages.map((message) => (
                  <div
                    key={`${scene.title}-${message.text}`}
                    className={message.side === 'customer' ? 'flex justify-end' : 'flex justify-start'}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 shadow-sm ${
                        message.side === 'customer'
                          ? 'rounded-br-md bg-[#dcf8c6]'
                          : 'rounded-bl-md bg-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
