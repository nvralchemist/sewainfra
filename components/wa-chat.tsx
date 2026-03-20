'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { waChatMessages, ORDER, formatRp, type WAMessage } from '@/lib/mock-data'

function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 mb-1">
      <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 shadow-sm flex items-center gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function LinkCard() {
  return (
    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div className="bg-sewain-primary-light px-3 py-2 flex items-center gap-2">
        <span className="text-sm">🔒</span>
        <span className="text-xs font-semibold text-sewain-primary-dark">Bayar via Sewain</span>
      </div>
      <div className="px-3 py-2 space-y-1">
        <p className="text-sm font-medium text-gray-900">CEA Atelier — {ORDER.item}</p>
        <p className="text-sm font-bold text-sewain-primary">{formatRp(ORDER.total)}</p>
        <p className="text-xs text-gray-500">termasuk deposit {formatRp(ORDER.deposit)}</p>
        <p className="text-xs text-blue-600 underline">sewain.id/pay/{ORDER.id}</p>
      </div>
      <div className="bg-gray-50 px-3 py-1.5 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">Powered by sewain.id</p>
      </div>
    </div>
  )
}

function MessageBubble({ msg }: { msg: WAMessage }) {
  if (msg.sender === 'system-info') {
    return (
      <div className="flex justify-center px-4 mb-2">
        <div className="border border-sewain-primary/30 bg-sewain-primary-light/50 rounded-full px-4 py-1.5 max-w-[320px]">
          <p className="text-[11px] text-sewain-primary-dark text-center whitespace-pre-wrap">{msg.text}</p>
          <p className="text-[10px] text-gray-400 text-center mt-0.5">{msg.time}</p>
        </div>
      </div>
    )
  }

  if (msg.sender === 'system-success') {
    return (
      <div className="flex justify-center px-4 mb-2">
        <div className="bg-sewain-primary rounded-full px-4 py-2 max-w-[320px]">
          <p className="text-[11px] text-white text-center whitespace-pre-wrap">{msg.text}</p>
          <p className="text-[10px] text-white/60 text-center mt-0.5">{msg.time}</p>
        </div>
      </div>
    )
  }

  const isOutgoing = msg.sender === 'merchant' || msg.sender === 'sewain-auto' || msg.sender === 'link-card'

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} px-4 mb-1`}>
      <div
        className={`relative max-w-[280px] rounded-lg px-3 py-2 shadow-sm ${
          isOutgoing
            ? 'bg-[#dcf8c6] rounded-tr-none'
            : 'bg-white rounded-tl-none'
        }`}
      >
        {msg.sender === 'sewain-auto' && (
          <span className="absolute -top-1.5 -left-1.5 bg-sewain-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">⚡</span>
        )}
        <p className="text-[13px] text-gray-900 whitespace-pre-wrap leading-relaxed">{msg.text}</p>
        {msg.sender === 'link-card' && <LinkCard />}
        <div className={`flex items-center gap-1 mt-1 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[10px] text-gray-500">{msg.time}</span>
          {isOutgoing && (
            <span className={`text-[10px] ${msg.read ? 'text-blue-500' : 'text-gray-400'}`}>✓✓</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function WAChat() {
  const [visibleMessages, setVisibleMessages] = useState<WAMessage[]>([])
  const [showTyping, setShowTyping] = useState(false)
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
    setShowTyping(false)
    setAnimating(true)

    for (let i = 0; i < waChatMessages.length; i++) {
      if (cancelRef.current) return
      const msg = waChatMessages[i]
      const delay = msg.delay ?? 800

      await new Promise<void>((r) => setTimeout(r, delay))
      if (cancelRef.current) return

      // Show typing indicator before message id:4
      if (msg.id === 4) {
        setShowTyping(true)
        await new Promise<void>((r) => setTimeout(r, 2000))
        if (cancelRef.current) return
        setShowTyping(false)
      }

      setVisibleMessages((prev) => [...prev, msg])
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
  }, [visibleMessages, showTyping, scrollToBottom])

  const handleReplay = () => {
    cancelRef.current = true
    setTimeout(() => runAnimation(), 100)
  }

  return (
    <div className="w-full max-w-[390px] mx-auto h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-card-lg border border-gray-200 bg-[#ECE5DD]">
      {/* WA Header */}
      <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-3 flex-shrink-0">
        <button className="text-white/80 hover:text-white">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-[#0F6E56] flex items-center justify-center text-sm font-semibold">
          CA
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">CEA Atelier</p>
          <p className="text-[11px] text-white/70">online</p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M23 7l-7 5 7 5V7z" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
          </svg>
        </div>
      </div>

      {/* Chat messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9c4b8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {visibleMessages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {showTyping && <TypingIndicator />}
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
