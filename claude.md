# CLAUDE.md — Sewain Prototype Instructions

## Product Context

Sewain is a WhatsApp-first transaction infrastructure layer for Indonesian rental merchants.
It slides underneath existing WhatsApp conversations without changing how merchants or customers communicate.
It gives every rental transaction the structure of a formal transaction: escrow, identity scoring, payment, order tracking, and dispute resolution — all triggered from a single checkout link shared inside WhatsApp.

**Starting vertical:** Fashion and formal wear rental merchants in Jabodetabek (greater Jakarta area).

**Key principle:** The customer never needs to download an app. The merchant operates from a web dashboard. Everything else happens in WhatsApp.

**Language:** All UI copy must be in Bahasa Indonesia. All currency in Rupiah (Rp). Dates in Indonesian format (DD MMM YYYY). Phone numbers in Indonesian format (+62).

**Brand colors:**
- Primary: #1D9E75 (teal green)
- Primary light: #E1F5EE
- Primary dark: #0F6E56
- Amber warning: #EF9F27
- Red danger: #E24B4A
- Text primary: #1a1a1a
- Text secondary: #6b7280
- Border: #e5e7eb
- Background: #f9fafb

---

## Prototype 1: WhatsApp Chat Flow

Build a realistic WhatsApp chat UI prototype that simulates the full Sewain-powered conversation flow between a merchant and a new customer.

### Tech stack
- React single-page app
- Tailwind CSS for styling
- Simulate WA UI as closely as possible (green bubbles for outgoing, white for incoming, WA-style header with contact name and online status)

### Screens to build

#### Screen 1A — New customer messages merchant
Simulate the moment a new customer sends their first message to the merchant's WhatsApp.

**Flow:**
1. Customer sends: "Halo kak, ada gaun pesta warna merah size M?"
2. Sewain auto-reply fires immediately (shown as merchant message with ⚡ indicator):
```
Halo! Selamat datang di CEA Atelier 👗

Untuk memudahkan proses pemesanan, mohon isi data berikut ya kak:

Nama lengkap :
Lokasi (kota/kecamatan) :
Tujuan acara :
Akun Instagram :

Terima kasih, kami akan segera membantu! 🙏
```
3. Customer replies with form data:
```
Rina Ayu / Jakarta Selatan / Pernikahan teman sabtu depan / @rinaayu_
```
4. Show a "Sewain sedang memverifikasi..." typing indicator for 2 seconds
5. Show Sewain system notification (distinct style — blue info bubble, centered):
```
✓ Scoring selesai · Nama ✓ · Lokasi ✓ · Acara ✓ · No HP ✓
Risiko: RENDAH 🟢
```
6. Merchant replies (shown as sent/outgoing):
```
Ada kak Rina! 😊

Gaun pesta merah size M tersedia untuk tanggal berapa ya kak?
Harga sewa Rp 350.000 / 2 hari + deposit Rp 200.000 (refund setelah kembali dalam kondisi baik)
```
7. Customer: "Tanggal 12-14 April ya kak, oke deal!"
8. Merchant sends order link (special link card style, like WA link preview):
```
Baik kak! Ini link pembayaran amannya ya 🙏

[CARD PREVIEW]
🔒 Bayar via Sewain
CEA Atelier — Gaun Pesta Merah
Rp 550.000 (termasuk deposit Rp 200.000)
sewain.id/pay/TRX-20250412-CEA-001
Powered by sewain.id
```
9. Customer: "Oke kak, sudah saya bayar!"
10. Sewain system notification (green success bubble):
```
✓ Pembayaran Rp 550.000 diterima
Dana disimpan aman di escrow Sewain sampai barang diterima kak Rina
```

#### Screen 1B — Sewain Support notification thread (customer side)
Separate WA chat showing automated notifications from "Sewain Support" to the customer.

Show the following messages in chronological order with timestamps:

1. **09:16** — Payment confirmation:
```
Halo kak Rina! 👋

Pembayaran kamu sebesar Rp 550.000 sudah kami terima dan disimpan aman oleh Sewain.

Rincian:
• Sewa gaun: Rp 350.000
• Deposit: Rp 200.000 (akan dikembalikan)

Dana akan dilepas ke merchant setelah kamu konfirmasi barang diterima ya kak 🙏
```

2. **14:31** — Shipping notification:
```
Gaun kamu sudah dikirim kak! 🚚

Kurir: JNE Regular
Resi: JX123456789
Estimasi tiba: Sabtu, 13 Apr

Tap link untuk tracking:
sewain.id/track/TRX-20250412-CEA-001
```

3. **13 Apr 10:00** — Confirm receipt prompt:
```
Halo kak Rina, paketnya sudah sampai? 📦

Mohon konfirmasi penerimaan barang ya kak supaya periode sewa bisa dimulai:
sewain.id/confirm/TRX-20250412-CEA-001

Kalau ada masalah dengan kondisi barang, bisa langsung buka dispute di link tersebut 🙏
```

4. **13 Apr 20:00** — Return reminder D-1 (amber/warning style):
```
⚠️ Pengingat Pengembalian

Halo kak Rina! Besok adalah hari terakhir periode sewa ya kak (14 Apr 2025).

Mohon kirimkan gaun kembali ke CEA Atelier besok dan share resi pengirimannya ke merchant.

Deposit kamu Rp 200.000 akan dikembalikan otomatis setelah merchant konfirmasi kondisi barang 💚
```

5. **14 Apr 08:00** — Return reminder D-day (red/urgent style):
```
🔴 Hari ini batas pengembalian!

Kak Rina, hari ini (14 Apr) adalah batas waktu pengembalian gaun.

Mohon segera kirim barang dan share resi ke merchant ya kak supaya deposit kamu bisa segera dikembalikan 🙏
```

### UX details
- WA header: contact avatar circle with initials, name, "online" status, back arrow, call/video icons
- Message timestamps visible on each bubble
- Read receipts (double blue tick) on sent messages
- Typing indicator (three animated dots) during scoring
- System notifications styled differently — centered, rounded pill, blue background, smaller text
- Sewain system messages have a small Sewain logo/badge
- **No Quick Send shortcuts in the WA chat view** — WA screens are read-only simulations of WhatsApp. Quick Send lives exclusively in the Merchant Dashboard (see Prototype 3).

---

## Prototype 2: Customer Checkout Page

Build a mobile-first checkout web page that customers see when they tap the payment link sent by the merchant.

### Tech stack
- React
- Tailwind CSS
- Mobile viewport (max-width 390px, centered on desktop)
- No app download required

### URL context
The page is accessed via: `sewain.id/pay/TRX-20250412-CEA-001`

### Page sections (top to bottom)

#### Section 1 — Header / Trust bar
- Sewain logo (small, top left)
- Text: "Transaksi Dilindungi Sewain" with shield icon
- Green badge: "🔒 Aman & Terverifikasi"

#### Section 2 — Merchant identity card
- Merchant avatar/logo circle (initials "CA" in purple)
- Merchant name: "CEA Atelier"
- Verified badge: "✓ Merchant Terverifikasi"
- Subtext: "Jakarta Selatan · Fashion Rental"

#### Section 3 — Order details card
White card with shadow, showing:
- Item name: "Gaun Pesta Merah — Size M"
- Item photo placeholder (grey rectangle with dress icon)
- Rental period: "12 Apr – 14 Apr 2025"
- Duration: "2 hari"
- Condition: "Kondisi: Sangat Baik"

#### Section 4 — KYC / Identity section
Show a compact form:
- Title: "Verifikasi Identitas"
- Subtitle: "Diperlukan untuk keamanan transaksi"
- Input: Nama lengkap (pre-filled: "Rina Ayu")
- Input: Nomor WhatsApp (pre-filled: "+62 812 3456 7890")
- Upload KTP button (shows "Upload Foto KTP" with camera icon)
- Small text: "Data kamu aman dan hanya digunakan untuk verifikasi transaksi ini"

#### Section 5 — Payment breakdown
White card:
- Row: "Harga sewa" — "Rp 350.000"
- Row: "Deposit (refundable)" — "Rp 200.000"
- Row: "Biaya layanan" — "Rp 0" (gratis)
- Divider
- Row bold: "Total Pembayaran" — "Rp 550.000"

Below total, show a green info box:
```
💚 Deposit Rp 200.000 akan dikembalikan otomatis setelah barang kembali dalam kondisi baik
```

#### Section 6 — Payment method selector
Title: "Pilih Metode Pembayaran"

Show radio-button style options:
1. QRIS (selected by default) — show QR code placeholder when selected
2. GoPay — show "Masukkan nomor GoPay" input when selected
3. OVO — similar
4. Transfer Bank — show bank details (BCA, BNI, BRI) when selected
5. ShopeePay

Each option shows the payment method logo/icon.

When QRIS is selected, show a QR code placeholder with:
- "Scan QR code ini dengan aplikasi e-wallet atau mobile banking kamu"
- Countdown timer: "QR Code berlaku: 14:59" (counting down)
- "Atau gunakan metode lain" link

#### Section 7 — TnC acknowledgement
Small text:
```
Dengan melanjutkan pembayaran, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi Sewain.
Dana kamu dilindungi oleh sistem escrow Sewain hingga transaksi selesai.
```
Link: "Baca S&K lengkap"

#### Section 8 — Pay button
Full-width green button: "Bayar Sekarang — Rp 550.000"
Below button: small lock icon + "Pembayaran aman dienkripsi"

#### Section 9 — Post-payment success state
When pay button is clicked, transition to success screen:
- Large green checkmark animation
- Title: "Pembayaran Berhasil! 🎉"
- Subtitle: "Dana kamu disimpan aman di escrow Sewain"
- Order summary card (compact)
- "Lacak Status Order" button
- "Kembali ke WhatsApp" button

### UX details
- Sticky pay button at bottom on mobile
- Progress indicator at top: "Verifikasi → Pembayaran → Konfirmasi"
- Show trust signals throughout: escrow badge, encryption icon, merchant verified badge
- Smooth transitions between payment method selections
- Loading state on pay button when processing

---

## Prototype 3: Merchant Dashboard

Build a full merchant web dashboard for CEA Atelier. This is the primary tool merchants use to manage orders, view risk scores, create orders, and track returns.

### Tech stack
- React
- Tailwind CSS
- Recharts for charts/analytics
- Full desktop layout with mobile-responsive sidebar

### Layout
- Left sidebar navigation (collapsible on mobile)
- Top header bar with merchant name, notification bell, profile avatar
- Main content area

### Sidebar navigation items
- Dashboard (home icon)
- Chat & Risiko (chat bubble icon)
- Orders (clipboard icon) with badge "3" (pending)
- Buat Order (plus icon)
- Katalog Produk (tag icon)
- Keuangan (wallet icon)
- Dispute (alert icon) with badge "1"
- Pengaturan (gear icon)

---

### Page 3A — Dashboard Home

#### Top stats row (4 metric cards)
1. "Order Aktif" — 12
2. "GMV Bulan Ini" — Rp 4.2M
3. "Dispute Rate" — 2.1%
4. "Deposit Tertahan" — Rp 1.8M

#### Return alerts section
Title: "⚠️ Perlu Perhatian"
Show 2 alert cards:
1. "Gaun Kebaya Biru — Rina Ayu · Jatuh tempo HARI INI" — red badge + "Kirim Reminder" button
2. "Jas Formal Hitam — Budi W · Jatuh tempo besok" — amber badge + "Kirim Reminder" button

#### Recent orders table
Columns: Customer, Item, Periode, Total, Status Risiko, Status Order, Aksi

Show 5 rows with mixed statuses:
1. Rina Ayu | Gaun Pesta Merah | 12-14 Apr | Rp 550K | 🟢 Rendah | Aktif | [Detail]
2. Budi Wijaya | Jas Formal Hitam | 13-15 Apr | Rp 400K | 🔴 Tinggi | Menunggu Bayar | [Ingatkan]
3. Sari Putri | Kebaya Hijau | 10-12 Apr | Rp 300K | 🟡 Sedang | Dikembalikan | [Selesai]
4. Dewi Nuraini | Gaun Cocktail | 15-17 Apr | Rp 450K | 🟢 Rendah | Baru | [Buat Order]
5. Ahmad Fauzi | Jas Wedding | 8-10 Apr | Rp 600K | 🟢 Rendah | Dispute | [Lihat]

#### GMV chart
Line chart showing last 30 days GMV using Recharts.
Use realistic-looking data with slight upward trend.
Title: "GMV 30 Hari Terakhir"

---

### Page 3B — Chat & Risiko

Split view:
- Left panel (35%): List of recent chats
- Right panel (65%): Active chat with risk profile

#### Left panel — Chat list
Each item shows:
- Customer avatar (initials circle, color varies by risk)
- Customer name
- Risk badge (🟢/🟡/🔴)
- Last message preview (truncated)
- Unread dot if new

Show 5 chats:
1. Rina Ayu 🟢 — "Oke kak, sudah saya bayar!" — [unread dot]
2. Budi Wijaya 🔴 — "Mau sewa untuk acara besok kak" — [unread]
3. Sari Putri 🟡 — "Sudah transfer ya kak"
4. Dewi Nuraini 🟢 — "Halo kak ada gaun size S?" — [unread]
5. Ahmad Fauzi 🟢 — "Terima kasih kak"

#### Right panel — Active chat (Budi Wijaya, HIGH RISK)

Top bar shows:
- Customer name: "Budi Wijaya"
- Risk profile pill: "🔴 RISIKO TINGGI"
- "Lihat Detail Profil" button

**Risk profile card (expanded, pinned at top of chat):**
White card with red left border showing:
- Risk score: 🔴 TINGGI (72/100)
- Flag breakdown:
  - ⚠️ Nama: Nama laki-laki menyewa gaun wanita
  - ⚠️ Tujuan acara: "untuk acara besok" — terlalu vague
  - ✓ Lokasi: Jakarta (sesuai)
  - ⚠️ No HP: Nomor baru terdaftar < 3 bulan
  - ✓ Riwayat: Tidak ada riwayat di Sewain
- Recommendation: "Pertimbangkan untuk meminta deposit lebih tinggi atau verifikasi tambahan"
- Two buttons: "Tetap Lanjut" | "Tolak Customer"

**Chat messages below the risk card:**
Show 4-5 messages in WA style.

**Quick Send panel (right sidebar, above risk profile card):**
This is where Quick Send shortcuts live — accessible only from the Merchant Dashboard chat view, NOT from WhatsApp itself. The merchant taps a shortcut here, sees a preview of the pre-filled WA message, then taps "Buka di WhatsApp" which opens WhatsApp with the message ready to send.

Show 3 shortcut buttons:
1. **Kirim Link Pembayaran** — pre-fills: "Kak [Nama], ini link pembayaran untuk sewa [Item] ya 🙏 [link] — Powered by sewain.id"
2. **Kirim Pengingat Kembali** — pre-fills: "Halo kak [Nama], reminder pengembalian [Item] ya kak, due date: [Tanggal] 🙏 Deposit akan otomatis dikembalikan setelah merchant konfirmasi."
3. **Kirim Ringkasan Order** — pre-fills full order recap with item, dates, amounts

Each shortcut:
- Shows a preview card with the message text
- Has a green "Buka di WhatsApp ↗" button that simulates opening WA deep link
- Has a "Salin Pesan" secondary button

**Bottom bar (chat input area):**
- Simple message input field (for reference only — actual messaging happens in WhatsApp)
- Note label: "Pesan dikirim melalui WhatsApp"

---

### Page 3C — Buat Order (Create Order)

Two-column form layout:

**Left column — Detail Item**
- Label: "Nama Item"
- Input: "Gaun Pesta Merah — Size M"
- Label: "Kategori"
- Dropdown: "Gaun Pesta"
- Label: "Periode Sewa"
- Date range picker: 12 Apr – 14 Apr 2025
- Label: "Durasi"
- Auto-calculated: "2 hari"

**Right column — Pembayaran**
- Label: "Harga Sewa"
- Input: "Rp 350.000"
- Label: "Deposit"
- Input: "Rp 200.000"
- Label: "Total"
- Auto-calculated display: "Rp 550.000"
- Toggle: "Wajib KYC untuk order ini" (on/off)

**Customer section**
- Label: "Nama Customer"
- Input: "Rina Ayu"
- Label: "No WhatsApp"
- Input: "+62 812 3456 7890"
- Read-only: Risk Score: 🟢 Rendah

**Bottom action bar**
- "Simpan Draft" button (outline)
- "Generate Link Pembayaran" button (primary green)

**After clicking Generate:**
Show success state with:
- Generated link: "sewain.id/pay/TRX-20250412-CEA-001"
- Copy link button
- **Quick Send shortcuts panel** (this is the primary way merchant sends the link — NOT from WhatsApp):
  - Button: "Kirim Link Bayar via WA ↗" — opens WhatsApp with pre-filled message
  - Button: "Kirim Ringkasan Order via WA ↗" — opens WhatsApp with order recap
  - Button: "Salin Link" — copies to clipboard
- Pre-filled WA message preview shown before opening WA:
```
Halo kak Rina! Ini link pembayaran untuk sewa Gaun Pesta Merah ya 🙏

sewain.id/pay/TRX-20250412-CEA-001

Total: Rp 550.000 (termasuk deposit Rp 200.000)
— Powered by sewain.id
```
- Note: "Quick Send membuka WhatsApp dengan pesan siap kirim — merchant cukup tap Send"

---

### Page 3D — Order Detail & Tracking

**Header**
- Order ID: TRX-20250412-CEA-001
- Status badge: "AKTIF" (green)
- Created: 12 Apr 2025, 09:15

**Two-column layout**

Left column — Order Info:
- Item: Gaun Pesta Merah — Size M
- Customer: Rina Ayu
- Risk: 🟢 Rendah
- Periode: 12–14 Apr 2025
- Harga sewa: Rp 350.000
- Deposit tertahan: Rp 200.000
- Total dibayar: Rp 550.000
- Status escrow: "Dana dalam escrow Sewain"

Right column — Timeline:
1. ✅ Pembayaran diterima — 12 Apr 09:15
2. ✅ Item dikirim — 12 Apr 14:30 · JNE JX123456789
3. 🔄 Customer konfirmasi terima — Menunggu (with "Ingatkan" button)
4. ⬜ Item dikembalikan — Due: 14 Apr 2025
5. ⬜ Deposit dikembalikan — Menunggu pengembalian item

**Action buttons**
- "Input Resi Pengiriman"
- "Konfirmasi Item Kembali"
- "Buka Dispute" (outline red)
- "Kirim Reminder ke Customer"

---

### Page 3E — Dispute View

**Header**
- Dispute ID: DSP-042
- Order: TRX-20250408-CEA-005
- Status: "DALAM REVIEW" (amber badge)
- Opened: 10 Apr 2025, 14:22

**Escrow hold notice** (amber card):
```
⚠️ Dana Ditahan
Rp 750.000 ditahan dalam escrow selama proses dispute berlangsung.
```

**Timeline:**
1. ✅ Dispute dibuka oleh merchant — 10 Apr 14:22
2. ✅ Sewain Support bergabung — WA Group dibuat
3. ✅ Bukti dari merchant diterima — 2 foto diunggah
4. 🔄 Menunggu respons customer — Due: 12 Apr
5. ⬜ Keputusan admin

**Evidence — Merchant:**
2 photo thumbnails + "+ Tambah Bukti" button

**Evidence — Customer:**
"Belum ada bukti diunggah oleh customer"

**WA Group section:**
- Members: Ahmad Fauzi, CEA Atelier, Sewain Support
- "Buka WA Group" button (green)

---

## Global requirements

---

### Routing — CRITICAL

Use React Router v6. Every page must have its own route. No page should ever return 404.

```
/                          → redirect to /dashboard
/dashboard                 → Dashboard home (stats + order table)
/dashboard/chat            → Chat & Risiko tab
/dashboard/chat/:customerId → Open specific chat
/dashboard/orders          → All orders list
/dashboard/orders/new      → Create new order
/dashboard/orders/:orderId → Order detail & tracking
/dashboard/disputes        → All disputes
/dashboard/disputes/:id    → Dispute detail
/wa-flow                   → WA Chat prototype (merchant view)
/wa-flow/notifications     → WA notifications (customer view)
/checkout                  → Customer checkout page
```

Add a `vercel.json` at the project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**All sidebar nav links must use React Router `<Link>` or `useNavigate()` — never `<a href>` tags for internal navigation.**

---

### Interactivity — ALL buttons must work

Every single button, link, and interactive element must have a defined behavior. Nothing should be a dead end. Here is the complete list:

#### Dashboard home buttons:
- **[+ Buat Order Baru]** → navigate to `/dashboard/orders/new`
- **[Detail]** on any order row → navigate to `/dashboard/orders/:orderId`
- **[Ingatkan]** on any order row → open a modal showing pre-filled WA reminder message with "Buka WhatsApp ↗" and "Tutup" buttons
- **[Selesai]** on completed order → open confirmation modal: "Tandai order ini sebagai selesai?" with [Konfirmasi] and [Batal] buttons. On confirm, update order status in local state.
- **[Buat Order]** on new customer row → navigate to `/dashboard/orders/new` with customer name pre-filled
- **[Lihat]** on dispute row → navigate to `/dashboard/disputes/:id`
- **[Kirim Reminder]** in return reminder section → open modal with WA message preview

#### Chat tab buttons:
- **Clicking any chat row** → load that customer's chat in the right panel, mark as read (remove unread dot)
- **[Lihat Detail Profil]** → expand/collapse the risk profile card (toggle)
- **[Tetap Lanjut]** on high risk card → dismiss the risk warning card, show green "Lanjut diproses" badge
- **[Tolak Customer]** on high risk card → show modal "Yakin tolak customer ini? Mereka tidak akan bisa melanjutkan transaksi." with [Tolak] and [Batal]. On confirm, show "Customer ditolak" state.
- **[Kirim Link Pembayaran]** Quick Send → show message preview modal with "Buka WhatsApp ↗" and "Salin Pesan" buttons
- **[Kirim Pengingat Kembali]** Quick Send → show message preview modal
- **[Kirim Ringkasan Order]** Quick Send → show message preview modal
- **[Buka WhatsApp ↗]** in any Quick Send modal → simulate opening with `window.open('https://wa.me/?text=...', '_blank')` using pre-filled message
- **[Salin Pesan]** → copy message to clipboard, show "Tersalin! ✓" toast

#### Order creation buttons:
- **Date range inputs** → functional date pickers. When both dates are selected, auto-calculate and display duration in days
- **Harga Sewa / Deposit inputs** → on change, auto-calculate Total in real time
- **KYC toggle** → toggles a "KYC wajib" badge on the order summary
- **[Simpan Draft]** → save order to local state, show toast "Draft tersimpan", navigate to `/dashboard/orders` with draft visible
- **[Generate Link Pembayaran]** → validate all fields first. If empty, show inline validation errors in red. If valid, show success state with generated link
- **[Kirim Link Bayar via WA ↗]** → open `window.open('https://wa.me/+628123456789?text=...', '_blank')`
- **[Kirim Ringkasan Order via WA ↗]** → open WA with order recap message
- **[Salin Link]** → copy link to clipboard, show "Link tersalin! ✓" toast notification

#### Order detail buttons:
- **[Input Resi Pengiriman]** → open inline form with resi number input and courier dropdown (JNE, JNT, SiCepat, Anteraja, GoSend). On submit, update timeline step 2 to show resi and "Lacak ↗" link
- **[Lacak ↗]** → open `window.open('https://cekresi.com/?noresi=JX123456789', '_blank')`
- **[Ingatkan]** on timeline step 3 → show WA message preview modal, then open WA
- **[Konfirmasi Item Kembali]** → open modal: "Konfirmasi item sudah kembali dalam kondisi baik?" with condition options: [Baik] [Ada Kerusakan Minor] [Rusak]. On selecting "Baik" → update timeline, trigger deposit refund animation, show success toast "Deposit Rp 200.000 sedang dikembalikan ke customer". On selecting damage options → redirect to open dispute flow.
- **[Buka Dispute]** → navigate to dispute creation flow at `/dashboard/disputes/new` with order ID pre-filled
- **[Kirim Reminder ke Customer]** → open modal with WA message template, "Buka WhatsApp ↗" button

#### Dispute view buttons:
- **[+ Tambah Bukti]** → open file upload modal. On "upload" (simulate with any file selection), add a thumbnail to the evidence grid
- **[Buka WA Group ↗]** → open `window.open('https://wa.me/...', '_blank')`

#### Checkout page buttons:
- **Payment method radio buttons** → selecting each one shows different UI:
  - QRIS: show QR placeholder + countdown timer (starts at 15:00, counts down every second using setInterval)
  - GoPay/OVO/ShopeePay: show phone number input field
  - Transfer Bank: show bank account details (BCA: 1234567890 a.n. Sewain Indonesia)
- **[Upload Foto KTP]** → simulate file picker. On file selected, show thumbnail + "✓ KTP terupload" badge
- **TnC checkbox** → must be checked before pay button is enabled
- **[Bayar Sekarang — Rp 550.000]** → disabled until: KTP uploaded + TnC checked + payment method selected. On click, show loading spinner for 2 seconds, then show full-screen success state
- **Success state [Lihat Status Order]** → navigate to a simple order status page showing the timeline from the customer's perspective
- **[Baca S&K lengkap]** → open a modal with full TnC text in Bahasa Indonesia (3-4 paragraphs)

#### WA Flow buttons:
- **Tab switcher** between "Merchant View" and "Customer Notifications" → switches the visible screen
- **[Play / Replay flow]** button → replays the chat animation from the beginning
- **[Quick Send ↗]** shortcut button in merchant view → opens a bottom sheet showing the 3 shortcut options

---

### Form validation

All forms must validate before submission:
- Empty required fields → show red border + error message below field
- Invalid phone format → "Format nomor tidak valid. Gunakan format +62xxx"
- Invalid date range (end before start) → "Tanggal kembali harus setelah tanggal mulai"
- Zero or negative amounts → "Nominal harus lebih dari Rp 0"

---

### Toast notifications

Use a simple toast system (bottom of screen, auto-dismiss after 3 seconds) for:
- "Link tersalin! ✓" — green
- "Draft tersimpan" — green
- "Pesan tersalin! ✓" — green
- "Order berhasil dibuat" — green
- "Customer ditolak" — red
- Any error states — red

---

### Modal system

All modals must:
- Have a dark overlay behind them
- Be closeable by clicking the overlay or pressing Escape
- Have a clear [✕] close button
- Not break page scroll

---

### Navigation

- Sidebar nav items use React Router `<Link>` — active item highlighted with teal left border
- **Back buttons** on all detail pages navigate to the parent list page using `useNavigate(-1)` or explicit path
- **Breadcrumbs** on dashboard sub-pages: "Dashboard / Orders / TRX-20250412-CEA-001"
- Top nav of dashboard shows: merchant name "CEA Atelier", notification bell with badge "3", avatar

---

### Viewport

- WA prototype: mobile only (390px max-width, phone frame border)
- Checkout page: mobile only (390px max-width, centered on desktop with phone frame)
- Merchant dashboard: full desktop layout, sidebar 220px fixed, main content scrollable

---

### Consistent mock data

Use this data consistently across all prototypes:

```js
// mockData.js
export const merchant = {
  name: "CEA Atelier",
  location: "Jakarta Selatan",
  category: "Fashion Rental",
  plan: "Growth",
  avatar: "CA"
}

export const customers = [
  { id: "c1", name: "Rina Ayu", phone: "+62 812 3456 7890", instagram: "@rinaayu_", risk: "rendah", score: 12 },
  { id: "c2", name: "Budi Wijaya", phone: "+62 813 9999 0001", instagram: "@budiwjy", risk: "tinggi", score: 72 },
  { id: "c3", name: "Sari Putri", phone: "+62 856 1234 5678", instagram: "@sariputri_", risk: "sedang", score: 45 },
  { id: "c4", name: "Dewi Nuraini", phone: "+62 878 5555 4444", instagram: "@dewinuraini", risk: "rendah", score: 18 },
  { id: "c5", name: "Ahmad Fauzi", phone: "+62 821 7777 8888", instagram: "@ahmadfz", risk: "rendah", score: 20 }
]

export const orders = [
  { id: "TRX-20250412-CEA-001", customerId: "c1", item: "Gaun Pesta Merah — Size M", start: "12 Apr 2025", end: "14 Apr 2025", sewa: 350000, deposit: 200000, status: "aktif", timeline: ["paid", "shipped", "pending_confirm", "", ""] },
  { id: "TRX-20250413-CEA-002", customerId: "c2", item: "Jas Formal Hitam", start: "13 Apr 2025", end: "15 Apr 2025", sewa: 300000, deposit: 100000, status: "menunggu_bayar", timeline: ["", "", "", "", ""] },
  { id: "TRX-20250410-CEA-003", customerId: "c3", item: "Kebaya Hijau", start: "10 Apr 2025", end: "12 Apr 2025", sewa: 200000, deposit: 100000, status: "dikembalikan", timeline: ["paid", "shipped", "confirmed", "returned", ""] },
  { id: "TRX-20250415-CEA-004", customerId: "c4", item: "Gaun Cocktail Biru", start: "15 Apr 2025", end: "17 Apr 2025", sewa: 350000, deposit: 100000, status: "baru", timeline: ["", "", "", "", ""] },
  { id: "TRX-20250408-CEA-005", customerId: "c5", item: "Jas Wedding Putih", start: "8 Apr 2025", end: "10 Apr 2025", sewa: 500000, deposit: 250000, status: "dispute", timeline: ["paid", "shipped", "confirmed", "returned", ""] }
]
```

---

### Copy tone
- Friendly, conversational Bahasa Indonesia
- Use "kak" as honorific consistently
- Emojis used sparingly but naturally (matches Indonesian WA culture)
- Trust-building language around escrow and deposit safety

### Empty states
All list views must have a sensible empty state with an icon and descriptive message in Bahasa Indonesia.

### Loading states
Show skeleton loaders (gray animated rectangles) while data would load. For buttons that trigger async actions, show a spinner inside the button during the 2-second simulated delay.