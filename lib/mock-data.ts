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
}

export const paymentMethods = ['QRIS', 'GoPay', 'VA BCA']

export const whatsappScenes = [
  {
    title: 'Booking intro',
    subtitle: 'Seller kirim link booking dari chat',
    messages: [
      { side: 'customer', text: 'Halo kak, Sony A7 III untuk 12-14 March masih ada?' },
      {
        side: 'seller',
        text: 'Masih available. Kalau mau saya hold, saya kirim secure booking link ya.',
      },
      { side: 'seller', text: 'Link ini untuk amankan tanggal tanpa perlu login.' },
    ],
  },
  {
    title: 'Payment success',
    subtitle: 'Konfirmasi setelah secure fee dibayar',
    messages: [
      { side: 'seller', text: 'Pembayaran secure booking sudah masuk.' },
      { side: 'seller', text: 'Slot 12-14 March sekarang sudah kami lock untuk kakak.' },
      { side: 'customer', text: 'Siap, nanti saya lanjut koordinasi pickup lewat sini ya.' },
    ],
  },
  {
    title: 'Return reminder',
    subtitle: 'Reminder H-1 pengembalian',
    messages: [
      { side: 'seller', text: 'Reminder ya kak, kamera dijadwalkan kembali besok jam 15.00.' },
      { side: 'seller', text: 'Kalau butuh extend, tinggal balas chat ini sebelum jam 12.00.' },
    ],
  },
  {
    title: 'Late return reminder',
    subtitle: 'Follow up jika melewati jadwal',
    messages: [
      { side: 'seller', text: 'Halo kak, kami belum terima update pengembalian untuk booking SWA-2941-AX3.' },
      { side: 'seller', text: 'Mohon kirim estimasi return hari ini supaya status booking bisa diperbarui.' },
    ],
  },
  {
    title: 'Dispute support',
    subtitle: 'Permintaan bukti dan ringkasan resolusi',
    messages: [
      { side: 'seller', text: 'Kami butuh foto kondisi item saat diterima kembali untuk dokumentasi.' },
      { side: 'customer', text: 'Siap, saya kirim foto dan video unboxing sekarang.' },
      { side: 'seller', text: 'Sewain mencatat bukti dan menyiapkan ringkasan penyelesaian untuk kedua pihak.' },
    ],
  },
]

export const sellerSummary = [
  { label: 'Booking Aktif', value: '3' },
  { label: 'Menunggu Pembayaran', value: '2' },
  { label: 'Return Hari Ini', value: '1' },
  { label: 'Dispute Aktif', value: '1' },
]

export const sellerBookings = [
  {
    item: 'Sony A7 III',
    renter: 'Renter A-14',
    date: '12-14 March',
    payment: 'Paid',
    status: 'Active',
    action: 'Lihat detail',
  },
  {
    item: 'Fujifilm XT-3',
    renter: 'Renter B-08',
    date: '15-16 March',
    payment: 'Pending Payment',
    status: 'Awaiting confirmation',
    action: 'Kirim reminder',
  },
  {
    item: 'GoPro Hero 12',
    renter: 'Renter C-02',
    date: '10-12 March',
    payment: 'Paid',
    status: 'Return Today',
    action: 'Kirim pengingat',
  },
  {
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
  'Return reminder sent',
  'Awaiting return',
]
