// ============================================================
// Sewain Prototype — Mock Data
// All data consistent across prototypes per claude.md spec
// ============================================================

// --- Shared constants ---
export const MERCHANT = {
  name: 'CEA Atelier',
  initials: 'CA',
  location: 'Jakarta Selatan',
  category: 'Fashion Rental',
  verified: true,
}

export const CUSTOMER = {
  name: 'Rina Ayu',
  phone: '+62 812 3456 7890',
  instagram: '@rinaayu_',
  location: 'Jakarta Selatan',
}

export const ORDER = {
  id: 'TRX-20250412-CEA-001',
  item: 'Gaun Pesta Merah',
  size: 'M',
  rentalStart: '12 Apr 2025',
  rentalEnd: '14 Apr 2025',
  duration: '2 hari',
  condition: 'Sangat Baik',
  sewa: 350000,
  deposit: 200000,
  serviceFee: 0,
  total: 550000,
}

// --- Rupiah formatter ---
export function formatRp(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID')
}

// ============================================================
// Prototype 1A — WhatsApp Chat Flow Messages
// ============================================================
export type WAMessage = {
  id: number
  sender: 'customer' | 'merchant' | 'sewain-auto' | 'system-info' | 'system-success' | 'link-card'
  text: string
  time: string
  read?: boolean
  delay?: number
}

export const waChatMessages: WAMessage[] = [
  {
    id: 1,
    sender: 'customer',
    text: 'Halo kak, ada gaun pesta warna merah size M?',
    time: '09:01',
  },
  {
    id: 2,
    sender: 'sewain-auto',
    text: 'Halo! Selamat datang di CEA Atelier 👗\n\nUntuk memudahkan proses pemesanan, mohon isi data berikut ya kak:\n\nNama lengkap :\nLokasi (kota/kecamatan) :\nTujuan acara :\nAkun Instagram :\n\nTerima kasih, kami akan segera membantu! 🙏',
    time: '09:01',
    delay: 500,
  },
  {
    id: 3,
    sender: 'customer',
    text: 'Rina Ayu / Jakarta Selatan / Pernikahan teman sabtu depan / @rinaayu_',
    time: '09:03',
    delay: 2000,
  },
  {
    id: 4,
    sender: 'system-info',
    text: '✓ Scoring selesai · Nama ✓ · Lokasi ✓ · Acara ✓ · No HP ✓\nRisiko: RENDAH 🟢',
    time: '09:03',
    delay: 4000,
  },
  {
    id: 5,
    sender: 'merchant',
    text: 'Ada kak Rina! 😊\n\nGaun pesta merah size M tersedia untuk tanggal berapa ya kak?\nHarga sewa Rp 350.000 / 2 hari + deposit Rp 200.000 (refund setelah kembali dalam kondisi baik)',
    time: '09:05',
    read: true,
    delay: 1000,
  },
  {
    id: 6,
    sender: 'customer',
    text: 'Tanggal 12-14 April ya kak, oke deal!',
    time: '09:07',
    delay: 2000,
  },
  {
    id: 7,
    sender: 'link-card',
    text: 'Baik kak! Ini link pembayaran amannya ya 🙏',
    time: '09:08',
    read: true,
    delay: 1500,
  },
  {
    id: 8,
    sender: 'customer',
    text: 'Oke kak, sudah saya bayar!',
    time: '09:16',
    delay: 3000,
  },
  {
    id: 9,
    sender: 'system-success',
    text: '✓ Pembayaran Rp 550.000 diterima\nDana disimpan aman di escrow Sewain sampai barang diterima kak Rina',
    time: '09:16',
    delay: 1000,
  },
]

// ============================================================
// Prototype 1B — Sewain Support Notifications
// ============================================================
export type SupportMessage = {
  id: number
  text: string
  time: string
  date?: string
  style: 'normal' | 'warning' | 'urgent'
}

export const supportMessages: SupportMessage[] = [
  {
    id: 1,
    text: 'Halo kak Rina! 👋\n\nPembayaran kamu sebesar Rp 550.000 sudah kami terima dan disimpan aman oleh Sewain.\n\nRincian:\n• Sewa gaun: Rp 350.000\n• Deposit: Rp 200.000 (akan dikembalikan)\n\nDana akan dilepas ke merchant setelah kamu konfirmasi barang diterima ya kak 🙏',
    time: '09:16',
    style: 'normal',
  },
  {
    id: 2,
    text: 'Gaun kamu sudah dikirim kak! 🚚\n\nKurir: JNE Regular\nResi: JX123456789\nEstimasi tiba: Sabtu, 13 Apr\n\nTap link untuk tracking:\nsewain.id/track/TRX-20250412-CEA-001',
    time: '14:31',
    style: 'normal',
  },
  {
    id: 3,
    text: 'Halo kak Rina, paketnya sudah sampai? 📦\n\nMohon konfirmasi penerimaan barang ya kak supaya periode sewa bisa dimulai:\nsewain.id/confirm/TRX-20250412-CEA-001\n\nKalau ada masalah dengan kondisi barang, bisa langsung buka dispute di link tersebut 🙏',
    time: '10:00',
    date: '13 Apr',
    style: 'normal',
  },
  {
    id: 4,
    text: '⚠️ Pengingat Pengembalian\n\nHalo kak Rina! Besok adalah hari terakhir periode sewa ya kak (14 Apr 2025).\n\nMohon kirimkan gaun kembali ke CEA Atelier besok dan share resi pengirimannya ke merchant.\n\nDeposit kamu Rp 200.000 akan dikembalikan otomatis setelah merchant konfirmasi kondisi barang 💚',
    time: '20:00',
    date: '13 Apr',
    style: 'warning',
  },
  {
    id: 5,
    text: '🔴 Hari ini batas pengembalian!\n\nKak Rina, hari ini (14 Apr) adalah batas waktu pengembalian gaun.\n\nMohon segera kirim barang dan share resi ke merchant ya kak supaya deposit kamu bisa segera dikembalikan 🙏',
    time: '08:00',
    date: '14 Apr',
    style: 'urgent',
  },
]

// ============================================================
// Prototype 1C — Merchant Quick Send Templates
// ============================================================
export type QuickSendTemplate = {
  id: string
  label: string
  icon: string
  message: string
}

export const quickSendTemplates: QuickSendTemplate[] = [
  {
    id: 'payment',
    label: 'Kirim Link Pembayaran',
    icon: '💳',
    message: 'Halo kak Rina! Ini link pembayaran untuk sewa Gaun Pesta Merah ya 🙏\n\nsewain.id/pay/TRX-20250412-CEA-001\n\nTotal: Rp 550.000 (termasuk deposit Rp 200.000)\n— Powered by sewain.id',
  },
  {
    id: 'return',
    label: 'Kirim Pengingat Kembali',
    icon: '📦',
    message: 'Halo kak Rina! 😊\n\nIni pengingat bahwa batas pengembalian Gaun Pesta Merah adalah tanggal 14 Apr 2025.\n\nMohon kirimkan kembali dan share resi pengirimannya ya kak.\n\nDeposit Rp 200.000 akan dikembalikan setelah kami konfirmasi kondisi barang 💚',
  },
  {
    id: 'summary',
    label: 'Kirim Ringkasan Order',
    icon: '📋',
    message: 'Ringkasan Order — TRX-20250412-CEA-001\n\nItem: Gaun Pesta Merah — Size M\nPeriode: 12–14 Apr 2025\nSewa: Rp 350.000\nDeposit: Rp 200.000\nTotal: Rp 550.000\n\nStatus: Aktif\n— Powered by sewain.id',
  },
]

// ============================================================
// Prototype 2 — Payment Methods
// ============================================================
export type PaymentMethod = {
  id: string
  name: string
  icon: string
}

export const paymentMethods: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS', icon: '📱' },
  { id: 'gopay', name: 'GoPay', icon: '💚' },
  { id: 'ovo', name: 'OVO', icon: '💜' },
  { id: 'bank', name: 'Transfer Bank', icon: '🏦' },
  { id: 'shopeepay', name: 'ShopeePay', icon: '🧡' },
]

// ============================================================
// Prototype 3A — Dashboard Stats
// ============================================================
export type DashboardStat = {
  label: string
  value: string
  color: string
}

export const dashboardStats: DashboardStat[] = [
  { label: 'Order Aktif', value: '12', color: 'text-sewain-primary' },
  { label: 'GMV Bulan Ini', value: 'Rp 4.2M', color: 'text-sewain-primary' },
  { label: 'Dispute Rate', value: '2.1%', color: 'text-sewain-amber' },
  { label: 'Deposit Tertahan', value: 'Rp 1.8M', color: 'text-sewain-text-secondary' },
]

// --- Return Alerts ---
export type ReturnAlert = {
  id: string
  item: string
  customer: string
  urgency: 'red' | 'amber'
  label: string
}

export const returnAlerts: ReturnAlert[] = [
  { id: '1', item: 'Gaun Kebaya Biru', customer: 'Rina Ayu', urgency: 'red', label: 'Jatuh tempo HARI INI' },
  { id: '2', item: 'Jas Formal Hitam', customer: 'Budi W', urgency: 'amber', label: 'Jatuh tempo besok' },
]

// --- Recent Orders ---
export type RecentOrder = {
  id: string
  customer: string
  item: string
  period: string
  total: string
  risk: 'rendah' | 'sedang' | 'tinggi'
  status: string
  action: string
}

export const recentOrders: RecentOrder[] = [
  { id: 'TRX-001', customer: 'Rina Ayu', item: 'Gaun Pesta Merah', period: '12-14 Apr', total: 'Rp 550K', risk: 'rendah', status: 'Aktif', action: 'Detail' },
  { id: 'TRX-002', customer: 'Budi Wijaya', item: 'Jas Formal Hitam', period: '13-15 Apr', total: 'Rp 400K', risk: 'tinggi', status: 'Menunggu Bayar', action: 'Ingatkan' },
  { id: 'TRX-003', customer: 'Sari Putri', item: 'Kebaya Hijau', period: '10-12 Apr', total: 'Rp 300K', risk: 'sedang', status: 'Dikembalikan', action: 'Selesai' },
  { id: 'TRX-004', customer: 'Dewi Nuraini', item: 'Gaun Cocktail', period: '15-17 Apr', total: 'Rp 450K', risk: 'rendah', status: 'Baru', action: 'Buat Order' },
  { id: 'TRX-005', customer: 'Ahmad Fauzi', item: 'Jas Wedding', period: '8-10 Apr', total: 'Rp 600K', risk: 'rendah', status: 'Dispute', action: 'Lihat' },
]

// --- GMV Chart Data ---
export const gmvChartData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  gmv: Math.round(800000 + Math.random() * 600000 + i * 15000),
}))

// ============================================================
// Prototype 3B — Chat & Risiko
// ============================================================
export type ChatContact = {
  id: string
  name: string
  risk: 'rendah' | 'sedang' | 'tinggi'
  lastMessage: string
  unread: boolean
}

export const chatContacts: ChatContact[] = [
  { id: '1', name: 'Rina Ayu', risk: 'rendah', lastMessage: 'Oke kak, sudah saya bayar!', unread: true },
  { id: '2', name: 'Budi Wijaya', risk: 'tinggi', lastMessage: 'Mau sewa untuk acara besok kak', unread: true },
  { id: '3', name: 'Sari Putri', risk: 'sedang', lastMessage: 'Sudah transfer ya kak', unread: false },
  { id: '4', name: 'Dewi Nuraini', risk: 'rendah', lastMessage: 'Halo kak ada gaun size S?', unread: true },
  { id: '5', name: 'Ahmad Fauzi', risk: 'rendah', lastMessage: 'Terima kasih kak', unread: false },
]

export const budiRiskProfile = {
  score: 72,
  level: 'TINGGI' as const,
  flags: [
    { icon: '⚠️', label: 'Nama', detail: 'Nama laki-laki menyewa gaun wanita' },
    { icon: '⚠️', label: 'Tujuan acara', detail: '"untuk acara besok" — terlalu vague' },
    { icon: '✓', label: 'Lokasi', detail: 'Jakarta (sesuai)' },
    { icon: '⚠️', label: 'No HP', detail: 'Nomor baru terdaftar < 3 bulan' },
    { icon: '✓', label: 'Riwayat', detail: 'Tidak ada riwayat di Sewain' },
  ],
  recommendation: 'Pertimbangkan untuk meminta deposit lebih tinggi atau verifikasi tambahan',
}

export type ChatMessage = {
  id: number
  sender: 'customer' | 'merchant'
  text: string
  time: string
}

export const budiChatMessages: ChatMessage[] = [
  { id: 1, sender: 'customer', text: 'Halo kak, mau sewa gaun wanita size M untuk acara besok', time: '10:15' },
  { id: 2, sender: 'merchant', text: 'Halo kak Budi! Ada kok, boleh tau untuk acara apa ya kak?', time: '10:18' },
  { id: 3, sender: 'customer', text: 'Untuk acara besok aja kak', time: '10:20' },
  { id: 4, sender: 'merchant', text: 'Baik kak, mohon isi data lengkap dulu ya:\nNama lengkap:\nLokasi:\nTujuan acara:\nAkun Instagram:', time: '10:22' },
  { id: 5, sender: 'customer', text: 'Budi Wijaya / Jakarta / acara besok / -', time: '10:25' },
]

// ============================================================
// Prototype 3D — Order Detail Timeline
// ============================================================
export type TimelineStep = {
  id: number
  label: string
  detail?: string
  status: 'done' | 'active' | 'pending'
  date?: string
}

export const orderTimeline: TimelineStep[] = [
  { id: 1, label: 'Pembayaran diterima', status: 'done', date: '12 Apr 09:15' },
  { id: 2, label: 'Item dikirim', detail: 'JNE JX123456789', status: 'done', date: '12 Apr 14:30' },
  { id: 3, label: 'Customer konfirmasi terima', status: 'active', detail: 'Menunggu' },
  { id: 4, label: 'Item dikembalikan', status: 'pending', detail: 'Due: 14 Apr 2025' },
  { id: 5, label: 'Deposit dikembalikan', status: 'pending', detail: 'Menunggu pengembalian item' },
]

// ============================================================
// Prototype 3E — Dispute Data
// ============================================================
export const disputeData = {
  id: 'DSP-042',
  orderId: 'TRX-20250408-CEA-005',
  status: 'DALAM REVIEW',
  openedDate: '10 Apr 2025, 14:22',
  amountHeld: 750000,
  timeline: [
    { id: 1, label: 'Dispute dibuka oleh merchant', status: 'done' as const, date: '10 Apr 14:22' },
    { id: 2, label: 'Sewain Support bergabung', detail: 'WA Group dibuat', status: 'done' as const, date: '10 Apr 14:30' },
    { id: 3, label: 'Bukti dari merchant diterima', detail: '2 foto diunggah', status: 'done' as const, date: '10 Apr 15:00' },
    { id: 4, label: 'Menunggu respons customer', detail: 'Due: 12 Apr', status: 'active' as const },
    { id: 5, label: 'Keputusan admin', status: 'pending' as const },
  ],
  waGroupMembers: ['Ahmad Fauzi', 'CEA Atelier', 'Sewain Support'],
}

// ============================================================
// Dashboard Sidebar Nav
// ============================================================
export type NavItem = {
  id: string
  label: string
  icon: string
  badge?: string
  href: string
}

export const sidebarNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/dashboard' },
  { id: 'chat', label: 'Chat & Risiko', icon: 'message-circle', href: '/dashboard/chat' },
  { id: 'orders', label: 'Orders', icon: 'clipboard-list', badge: '3', href: '/dashboard/orders' },
  { id: 'create', label: 'Buat Order', icon: 'plus-circle', href: '/dashboard/create' },
  { id: 'catalog', label: 'Katalog Produk', icon: 'tag', href: '/dashboard/catalog' },
  { id: 'finance', label: 'Keuangan', icon: 'wallet', href: '/dashboard/finance' },
  { id: 'dispute', label: 'Dispute', icon: 'alert-triangle', badge: '1', href: '/dashboard/dispute' },
  { id: 'settings', label: 'Pengaturan', icon: 'settings', href: '/dashboard/settings' },
]
