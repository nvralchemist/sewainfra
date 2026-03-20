'use client'

import { useState } from 'react'
import { quickSendTemplates, type QuickSendTemplate } from '@/lib/mock-data'

function SampleMessages() {
  return (
    <div className="px-4 py-3 space-y-2">
      {/* A few sample chat bubbles for visual context */}
      <div className="flex justify-start">
        <div className="max-w-[240px] bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
          <p className="text-[13px] text-gray-900">Halo kak, ada gaun pesta warna merah size M?</p>
          <p className="text-[10px] text-gray-500 mt-1">09:01</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[240px] bg-[#dcf8c6] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
          <p className="text-[13px] text-gray-900">Ada kak! Mau sewa tanggal berapa ya?</p>
          <div className="flex items-center gap-1 mt-1 justify-end">
            <span className="text-[10px] text-gray-500">09:05</span>
            <span className="text-[10px] text-blue-500">✓✓</span>
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[240px] bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
          <p className="text-[13px] text-gray-900">Tanggal 12-14 April ya kak, oke deal!</p>
          <p className="text-[10px] text-gray-500 mt-1">09:07</p>
        </div>
      </div>
    </div>
  )
}

function TemplatePreview({ template, onClose }: { template: QuickSendTemplate; onClose: () => void }) {
  return (
    <div className="bg-white rounded-t-2xl border-t border-gray-200 shadow-card-lg animate-slide-up">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <h3 className="text-sm font-semibold text-gray-900">{template.icon} {template.label}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
      </div>
      <div className="px-4 pb-3">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-[13px] text-gray-800 whitespace-pre-wrap leading-relaxed">{template.message}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button className="w-full bg-sewain-primary hover:bg-sewain-primary-dark text-white font-medium text-sm py-3 rounded-full transition-colors flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.79 23.329a.75.75 0 00.917.917l4.295-1.494A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.326 0-4.48-.764-6.219-2.056l-.433-.332-3.085 1.073 1.073-3.085-.332-.433A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Buka WhatsApp
        </button>
      </div>
    </div>
  )
}

export function WAQuickSend() {
  const [sheetOpen, setSheetOpen] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<QuickSendTemplate | null>(null)

  const handleTemplateClick = (template: QuickSendTemplate) => {
    setSelectedTemplate(selectedTemplate?.id === template.id ? null : template)
  }

  return (
    <div className="w-full max-w-[390px] mx-auto h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-card-lg border border-gray-200 bg-[#ECE5DD] relative">
      {/* WA Header */}
      <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-3 flex-shrink-0">
        <button className="text-white/80 hover:text-white">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
          RA
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">Rina Ayu</p>
          <p className="text-[11px] text-white/70">online</p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>

      {/* Chat area with sample messages */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9c4b8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <SampleMessages />
      </div>

      {/* Overlay when sheet is open */}
      {sheetOpen && (
        <div
          className="absolute inset-0 top-[60px] bg-black/30 transition-opacity z-10"
          onClick={() => {
            setSheetOpen(false)
            setSelectedTemplate(null)
          }}
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-transform duration-300 ease-out ${
          sheetOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white rounded-t-2xl shadow-card-lg">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">⚡ Quick Send</h2>
              <p className="text-xs text-gray-500">Template pesan siap kirim</p>
            </div>
            <button
              onClick={() => {
                setSheetOpen(false)
                setSelectedTemplate(null)
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Template buttons */}
          <div className="px-4 pb-3 space-y-2">
            {quickSendTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                  selectedTemplate?.id === template.id
                    ? 'bg-sewain-primary-light border-sewain-primary/30'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{template.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{template.label}</span>
                  <svg
                    className={`ml-auto w-4 h-4 text-gray-400 transition-transform ${
                      selectedTemplate?.id === template.id ? 'rotate-180' : ''
                    }`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Preview card */}
          {selectedTemplate && (
            <TemplatePreview
              template={selectedTemplate}
              onClose={() => setSelectedTemplate(null)}
            />
          )}
        </div>
      </div>

      {/* FAB to reopen sheet when closed */}
      {!sheetOpen && (
        <button
          onClick={() => setSheetOpen(true)}
          className="absolute bottom-20 right-4 z-20 w-14 h-14 bg-sewain-primary hover:bg-sewain-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <span className="text-xl">⚡</span>
        </button>
      )}

      {/* Input bar (behind sheet when open) */}
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
    </div>
  )
}
