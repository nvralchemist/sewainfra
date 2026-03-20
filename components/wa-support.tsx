'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { supportMessages, type SupportMessage } from '@/lib/mock-data'

function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex justify-center my-3">
      <span className="bg-white/90 text-[11px] text-gray-600 px-3 py-1 rounded-md shadow-sm">
        {date}
      </span>
    </div>
  )
}

function SupportBubble({ msg }: { msg: SupportMessage }) {
  const borderClass =
    msg.style === 'warning'
      ? 'border-l-4 border-l-sewain-amber'
      : msg.style === 'urgent'
      ? 'border-l-4 border-l-sewain-red'
      : ''

  return (
    <div className="flex justify-start px-4 mb-2">
      <div className={`max-w-[300px] bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm ${borderClass}`}>
        <p className="text-[13px] text-gray-900 whitespace-pre-wrap leading-relaxed">{msg.text}</p>
        <p className="text-[10px] text-gray-500 mt-1">{msg.time}</p>
      </div>
    </div>
  )
}

export function WASupport() {
  const [visibleMessages, setVisibleMessages] = useState<SupportMessage[]>([])
  const [animating, setAnimating] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  const runAnimation = useCallback(async () => {
    cancelRef.current = false
    setVisibleMessages([])
    setAnimating(true)

    for (let i = 0; i < supportMessages.length; i++) {
      if (cancelRef.current) return
      await new Promise<void>((r) => setTimeout(r, i === 0 ? 500 : 1200))
      if (cancelRef.current) return
      setVisibleMessages((prev) => [...prev, supportMessages[i]])
    }
    setAnimating(false)
  }, [])

  useEffect(() => {
    runAnimation()
    return () => {
      cancelRef.current = true
    }
  }, [runAnimation])

  useEffect(() => {
    scrollToBottom()
  }, [visibleMessages, scrollToBottom])

  const handleReplay = () => {
    cancelRef.current = true
    setTimeout(() => runAnimation(), 100)
  }

  // Group messages by date for date separators
  const dateSections: { date: string; messages: SupportMessage[] }[] = []
  const firstDate = '12 April 2025'
  let currentDate = firstDate

  supportMessages.forEach((msg) => {
    const msgDate = msg.date
      ? msg.date.replace('Apr', 'April') + ' 2025'
      : currentDate

    if (dateSections.length === 0 || dateSections[dateSections.length - 1].date !== msgDate) {
      dateSections.push({ date: msgDate, messages: [] })
    }
    dateSections[dateSections.length - 1].messages.push(msg)
    currentDate = msgDate
  })

  const visibleIds = new Set(visibleMessages.map((m) => m.id))

  return (
    <div className="w-full max-w-[390px] mx-auto h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-card-lg border border-gray-200 bg-[#ECE5DD]">
      {/* Header */}
      <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-3 flex-shrink-0">
        <button className="text-white/80 hover:text-white">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-sewain-primary flex items-center justify-center text-[11px] font-bold">
          S
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold truncate">Sewain Support</p>
            <span className="text-[10px] bg-blue-500 text-white rounded-full px-1.5 py-0.5 leading-none">✓</span>
          </div>
          <p className="text-[11px] text-white/70">official account</p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9c4b8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {dateSections.map((section) => {
          const sectionVisible = section.messages.some((m) => visibleIds.has(m.id))
          if (!sectionVisible) return null
          return (
            <div key={section.date}>
              <DateSeparator date={section.date} />
              {section.messages.map(
                (msg) => visibleIds.has(msg.id) && <SupportBubble key={msg.id} msg={msg} />
              )}
            </div>
          )
        })}
      </div>

      {/* Input bar */}
      <div className="bg-[#f0f0f0] px-2 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-gray-400 text-lg">😊</span>
          <span className="text-sm text-gray-400 flex-1">Ketik pesan...</span>
          <span className="text-gray-400 text-lg">📎</span>
        </div>
        <div className="w-10 h-10 bg-[#075E54] rounded-full flex items-center justify-center">
          <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Replay button */}
      {!animating && (
        <div className="bg-[#075E54] px-4 py-2 flex-shrink-0">
          <button
            onClick={handleReplay}
            className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 rounded-full transition-colors"
          >
            ↻ Replay
          </button>
        </div>
      )}
    </div>
  )
}
