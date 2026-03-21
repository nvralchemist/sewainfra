import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ToastProvider } from '@/components/toast'

export const metadata: Metadata = {
  title: 'Sewain — Infrastruktur Transaksi Rental',
  description: 'WhatsApp-first transaction infrastructure for Indonesian rental merchants',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
