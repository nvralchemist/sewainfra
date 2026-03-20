'use client'

import Link from 'next/link'
import { useState } from 'react'

import { whatsappScenes } from '@/lib/mock-data'

const bubbleStyles = {
  customer: 'rounded-br-md bg-[#dcf8c6] text-brand-ink',
  seller: 'rounded-bl-md bg-white text-brand-ink',
  system: 'rounded-[1rem] border border-brand-moss/15 bg-brand-sand/70 text-brand-ink/75',
}

export function WhatsAppJourney() {
  const [activeId, setActiveId] = useState(whatsappScenes[0].id)

  const activeScene =
    whatsappScenes.find((scene) => scene.id === activeId) ?? whatsappScenes[0]

  return (
    <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
      <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-moss/70">Scenario tabs</p>
        <div className="mt-4 space-y-3">
          {whatsappScenes.map((scene) => {
            const isActive = scene.id === activeId

            return (
              <button
                key={scene.id}
                onClick={() => setActiveId(scene.id)}
                className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                  isActive
                    ? 'border-brand-moss bg-brand-moss/8 shadow-sm'
                    : 'border-brand-ink/10 bg-brand-sand/45 hover:bg-brand-sand/65'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-moss/65">
                  {scene.title}
                </p>
                <h2 className="mt-2 text-lg font-semibold">{scene.kicker}</h2>
                <p className="mt-1 text-sm text-brand-ink/66">{scene.subtitle}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-5">
        <article className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-brand-moss/70">
                {activeScene.title}
              </p>
              <h2 className="mt-2 text-3xl font-semibold">{activeScene.kicker}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-ink/68">
                {activeScene.summary}
              </p>
            </div>
            <Link
              href={activeScene.ctaHref}
              className="rounded-full bg-brand-moss px-4 py-2 text-sm font-medium text-white"
            >
              {activeScene.ctaLabel}
            </Link>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-[#efe7db] p-4 shadow-card">
          <div className="rounded-[1.5rem] bg-[#0b5f4f] px-4 py-3 text-white">
            <p className="text-sm font-medium">Andreas Camera Rental</p>
            <p className="text-xs text-white/75">WhatsApp-assisted journey</p>
          </div>

          <div className="space-y-3 px-1 py-4 text-sm">
            <p className="mx-auto w-fit rounded-full bg-white/65 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-brand-ink/55">
              Today
            </p>

            {activeScene.messages.map((message) => {
              const alignment =
                message.actor === 'customer'
                  ? 'justify-end'
                  : message.actor === 'system'
                    ? 'justify-center'
                    : 'justify-start'

              return (
                <div key={`${activeScene.id}-${message.text}`} className={`flex ${alignment}`}>
                  <div
                    className={`max-w-[88%] whitespace-pre-line rounded-[1.25rem] px-4 py-3 shadow-sm ${
                      bubbleStyles[message.actor]
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              )
            })}
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href={`/b/abc123`} className="rounded-[1.5rem] border border-white/70 bg-white/85 p-4 text-sm shadow-card">
            Customer flow
          </Link>
          <Link href="/seller" className="rounded-[1.5rem] border border-white/70 bg-white/85 p-4 text-sm shadow-card">
            Seller dashboard
          </Link>
          <Link href="/" className="rounded-[1.5rem] border border-white/70 bg-white/85 p-4 text-sm shadow-card">
            Landing page
          </Link>
        </div>
      </div>
    </section>
  )
}
