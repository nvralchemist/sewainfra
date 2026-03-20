export const bookingMock = {
  bookingId: 'abc123',
  itemName: 'Sony A7 III Camera',
  date: '12-14 March',
  pricePerDay: 'Rp150k / day',
  rating: '4.8 (120 transaksi)',
  location: 'Jakarta Selatan',
  sellerName: 'Andreas Camera Rental',
  secureFee: 'Rp 20.000',
  bookingReference: 'SWA-2941-AX3',
  pickupTime: '12 March, 10.00 WIB',
  returnTime: '14 March, 15.00 WIB',
}

export const paymentMethods = ['QRIS', 'GoPay', 'VA BCA']

type MessageActor = 'customer' | 'seller' | 'system'

export type WhatsAppScene = {
  id: string
  title: string
  subtitle: string
  kicker: string
  summary: string
  ctaLabel: string
  ctaHref: string
  messages: Array<{
    actor: MessageActor
    text: string
  }>
}

export const whatsappScenes: WhatsAppScene[] = [
  {
    id: 'intro',
    title: 'Scenario A',
    subtitle: 'Initial inquiry / booking introduction',
    kicker: 'Booking intro',
    summary:
      'Seller menjaga percakapan tetap natural, lalu memperkenalkan sistem booking sebagai cara yang aman dan cepat.',
    ctaLabel: 'Buka secure booking link',
    ctaHref: `/b/${bookingMock.bookingId}`,
    messages: [
      { actor: 'customer', text: 'Kak, Sony A7 III masih available?' },
      { actor: 'seller', text: 'Halo kak 🙌 masih available ya. Untuk tanggal berapa kak?' },
      { actor: 'customer', text: '12-14 Maret kak, buat shooting di Jaksel.' },
      { actor: 'seller', text: 'Siap kak 👍 untuk 12-14 Maret masih kosong.' },
      { actor: 'seller', text: '📦 Sony A7 III\n💰 Rp150k / hari\n📍 Pickup Jakarta Selatan' },
      {
        actor: 'seller',
        text: 'Kalau mau dibooking, biar aman dan ga bentrok sama customer lain, kita pakai sistem booking ya kak 🙏',
      },
      { actor: 'seller', text: 'Cukup 1 menit aja, nanti saya tetap lanjut prosesnya via WhatsApp.' },
      { actor: 'system', text: 'Sewain secure link siap dibuka. Booking context sudah terisi otomatis.' },
    ],
  },
  {
    id: 'paid',
    title: 'Scenario B',
    subtitle: 'Booking paid / success notification',
    kicker: 'Payment success',
    summary:
      'Setelah secure fee dibayar, customer langsung menerima kepastian booking tanpa keluar dari alur chat.',
    ctaLabel: 'Lihat checkout success state',
    ctaHref: `/b/${bookingMock.bookingId}`,
    messages: [
      { actor: 'system', text: 'Pembayaran secure booking Rp20.000 sudah tercatat untuk booking SWA-2941-AX3.' },
      { actor: 'seller', text: 'Siap kak, booking untuk 12-14 Maret sudah aman ya.' },
      { actor: 'seller', text: 'Nanti detail pickup dan pengembalian saya lanjutkan di chat ini.' },
      { actor: 'customer', text: 'Oke kak, noted. Saya tunggu detail pickupnya.' },
    ],
  },
  {
    id: 'return-reminder',
    title: 'Scenario C',
    subtitle: 'Return reminder',
    kicker: 'Return reminder',
    summary:
      'Reminder dikirim dengan nada operasional yang sopan dan berguna, bukan seperti spam otomatis.',
    ctaLabel: 'Lihat seller dashboard',
    ctaHref: '/seller',
    messages: [
      { actor: 'system', text: 'Reminder return hari ini untuk booking SWA-2941-AX3.' },
      { actor: 'seller', text: 'Halo kak, reminder ya. Kamera dijadwalkan kembali hari ini jam 15.00 WIB.' },
      { actor: 'seller', text: 'Kalau ada perubahan waktu atau butuh extend, kabari sebelum jam 12.00 ya kak.' },
      { actor: 'customer', text: 'Siap kak, saya usahakan sebelum jam 15.00.' },
    ],
  },
  {
    id: 'late-return',
    title: 'Scenario D',
    subtitle: 'Late return reminder',
    kicker: 'Late return',
    summary:
      'Ketika melewati jadwal, seller dibantu follow-up yang jelas agar status booking tidak abu-abu.',
    ctaLabel: 'Lihat operasional seller',
    ctaHref: '/seller',
    messages: [
      { actor: 'system', text: 'Status booking berubah menjadi late return. Seller disarankan follow-up.' },
      { actor: 'seller', text: 'Halo kak, kami belum menerima update pengembalian untuk booking hari ini.' },
      { actor: 'seller', text: 'Bisa dibantu info estimasi return terbaru supaya kami update status rentalnya?' },
      { actor: 'customer', text: 'Maaf kak, saya telat. Estimasi sampai sekitar jam 18.30.' },
    ],
  },
  {
    id: 'evidence',
    title: 'Scenario E',
    subtitle: 'Dispute evidence request',
    kicker: 'Evidence request',
    summary:
      'Sewain membantu seller meminta bukti dengan struktur yang netral sehingga percakapan tidak langsung memanas.',
    ctaLabel: 'Buka dispute module',
    ctaHref: '/seller',
    messages: [
      { actor: 'seller', text: 'Kak, kami menemukan lecet baru di body DJI Mini saat pengembalian.' },
      { actor: 'system', text: 'Mohon kirim 2-3 foto kondisi item dari sisi depan, samping, dan bawah untuk verifikasi.' },
      { actor: 'customer', text: 'Siap, saya kirim sekarang ya.' },
      { actor: 'seller', text: 'Terima kasih kak. Biar kami review dulu dan update hasilnya di chat ini.' },
    ],
  },
  {
    id: 'resolution',
    title: 'Scenario F',
    subtitle: 'Dispute resolution update',
    kicker: 'Resolution summary',
    summary:
      'Hasil penyelesaian dibuat ringkas dan netral supaya kedua pihak tahu keputusan tanpa debat panjang di chat.',
    ctaLabel: 'Lihat dashboard seller',
    ctaHref: '/seller',
    messages: [
      { actor: 'system', text: 'Ringkasan dispute SWA-1882-DJI: bukti diterima dan telah direview.' },
      { actor: 'system', text: 'Hasil: biaya perbaikan ringan Rp75.000 dibebankan ke penyewa sesuai dokumentasi kondisi.' },
      { actor: 'seller', text: 'Kami sudah kirim ringkasan final ya kak. Kalau ada pertanyaan, boleh balas di sini.' },
      { actor: 'customer', text: 'Oke, saya sudah lihat ringkasannya.' },
    ],
  },
]

export const sellerSummary = [
  { label: 'Booking Aktif', value: '3', tone: 'moss' },
  { label: 'Menunggu Pembayaran', value: '2', tone: 'sand' },
  { label: 'Return Hari Ini', value: '1', tone: 'clay' },
  { label: 'Dispute Aktif', value: '1', tone: 'ink' },
]

export const sellerBookings = [
  {
    id: 'SWA-2941-AX3',
    item: 'Sony A7 III',
    renter: 'Renter A-14',
    date: '12-14 March',
    payment: 'Paid',
    status: 'Active',
    action: 'Lihat detail',
  },
  {
    id: 'SWA-3012-FJX',
    item: 'Fujifilm XT-3',
    renter: 'Renter B-08',
    date: '15-16 March',
    payment: 'Pending Payment',
    status: 'Pending Payment',
    action: 'Kirim reminder',
  },
  {
    id: 'SWA-2876-GP12',
    item: 'GoPro Hero 12',
    renter: 'Renter C-02',
    date: '10-12 March',
    payment: 'Paid',
    status: 'Return Today',
    action: 'Kirim pengingat',
  },
  {
    id: 'SWA-1882-DJI',
    item: 'DJI Mini',
    renter: 'Renter D-19',
    date: '8-10 March',
    payment: 'Paid',
    status: 'Dispute',
    action: 'Buka kasus',
  },
]

export const sellerTimeline = [
  'Booking created',
  'Secure booking paid',
  'Item picked up',
  'Reminder sent',
  'Awaiting return',
]

export const disputeMock = {
  booking: 'DJI Mini',
  issue: 'Body lecet saat pengembalian',
  evidenceStatus: '2 foto diterima',
  reviewStatus: 'Menunggu review seller',
}
