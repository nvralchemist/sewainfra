You are helping me build a frontend-only MVP prototype for a startup called Sewain.

## Product context
Sewain is a WhatsApp-first rental checkout and operations flow.
The purpose of this MVP is to simulate how a rental seller can continue operating through WhatsApp while Sewain provides a lightweight booking checkout flow, booking confirmation, return reminders, and dispute-related operational support.

This is NOT a marketplace yet.
This is NOT a backend-complete product.
This is a high-fidelity prototype for Vercel to validate UX, trust, seller value, and operational flow.

## Core product decisions
For MVP:
- DO NOT require login
- DO NOT require signup
- DO NOT build auth
- DO NOT require identity input form
- Use a unique booking link shared via WhatsApp
- Treat this as a session-based checkout flow, not an account-based product
- The user should be able to open a booking link and continue immediately
- The seller should also be able to preview a simple dashboard view from the prototype

## Main goal
Build a mobile-first Next.js prototype that simulates this journey:

1. WhatsApp conversation from customer and seller
2. Customer opens a unique booking link
3. Customer sees booking page
4. Customer completes secure booking payment step
5. Customer sees success confirmation
6. Seller can switch to a simple seller dashboard
7. Prototype also includes WhatsApp-like illustration screens for:
   - booking intro
   - payment success confirmation
   - return reminder
   - late return reminder
   - dispute flow / evidence request / resolution summary

The prototype must feel like a natural continuation of WhatsApp chat, not like joining a new platform.

## Tech requirements
- Use Next.js with App Router
- Use React
- Use Tailwind CSS
- Make it Vercel-ready
- Frontend-only for now
- No real backend
- No real payment gateway
- No database
- No auth/login
- No signup
- No complicated architecture

## UX principles
- Mobile-first layout
- Clean, polished, modern UI
- Demo-friendly
- Must feel trustworthy
- Must feel like “secure booking”, not “register to a new platform”
- Avoid unnecessary complexity
- Use Indonesian copy where appropriate because the target market is Indonesia
- Keep the flow realistic enough to demo to merchants or users
- Navigation between customer flow, seller dashboard, and WhatsApp illustrations should be easy

## Product framing
This prototype should communicate that Sewain is:

- a checkout layer for WhatsApp rental
- a way to secure bookings
- a way to reduce cancellation through commitment
- a way to help seller operations with reminders and dispute support

This prototype should NOT communicate that Sewain is already:
- a full marketplace
- a full escrow engine
- a full inventory management system
- a full KYC platform

## Routes to implement

Please structure the prototype with multiple simple routes:

- app/page.tsx
- app/b/[id]/page.tsx
- app/seller/page.tsx
- optionally app/wa/page.tsx or include WhatsApp illustrations inside the landing page

If cleaner, you may also use additional small components files, but keep the project simple.

## Landing page behavior (app/page.tsx)
Build a clean demo landing page that explains this is a Sewain MVP prototype and provides clear entry points:

Buttons / cards:
- “Lihat Journey Customer”
- “Lihat Seller Dashboard”
- “Lihat WhatsApp Journey”

The landing page should briefly explain:
- customer books from WhatsApp via unique link
- customer pays a small secure booking fee
- seller gets a simple operations view
- WhatsApp remains the main communication channel

## Customer flow route (app/b/[id]/page.tsx)

### Unique Link Behavior
This route represents a booking link sent by the seller via WhatsApp.

Example routes:
- /b/abc123
- /b/demo001

The page should already know the booking context via mocked data:
- bookingId: abc123
- itemName: Sony A7 III Camera
- date: 12–14 March
- pricePerDay: Rp150k / day
- rating: 4.8 (120 transaksi)
- location: Jakarta Selatan
- sellerName: Andreas Camera Rental

For MVP, any booking ID can map to the same mocked booking data, or use a tiny mock object lookup.

Do NOT ask the user to choose item/date.
Do NOT ask the user to login.
Do NOT ask the user to input identity.

## Customer checkout flow
Because identity input is removed, the customer flow should only have 3 steps:

### Step 1: Booking Page
Show:
- Item image
- Item name: Sony A7 III Camera
- Date: 12–14 March
- Price: Rp150k / day
- Optional rating: ⭐ 4.8 (120 transaksi)
- Seller info if useful: Andreas Camera Rental

Show a trust box with:
- ✅ Booking aman
- ✅ Tidak bentrok dengan customer lain
- ✅ Aturan booking jelas & transparan

Primary CTA:
- “Amankan Booking”

Secondary link or text button:
- “Lihat dashboard seller” → navigate to /seller
- optional small link: “Lihat simulasi WhatsApp” → navigate to /wa or scroll to WA section

Important:
- Do not show login/signup
- This should feel like a lightweight booking checkout page

### Step 2: Secure Booking Payment
Show:
- Title: “Amankan Booking”
- Price: “Rp 20.000”
- Subtitle: “Dipotong dari total pembayaran nanti.”

Show a rules card:
- “📜 Aturan singkat”
- “• Cancel <24 jam → hangus”
- “• Cancel >24 jam → refund”

Show countdown timer:
- “⏳ Expired dalam MM:SS”

Show fake payment method selector:
- QRIS
- GoPay
- VA BCA

Buttons:
- Secondary: “Kembali”
- Primary: “Bayar & Amankan”

No real payment processing needed.
Clicking primary CTA should simulate success.

Also include a small link:
- “Lihat dashboard seller”

### Step 3: Success Page
Show:
- Success icon/checkmark
- Title: “Booking berhasil!”
- Subtitle: “Seller akan lanjutkan proses via WhatsApp.”

Show summary:
- 📅 12–14 March
- 📍 Jakarta Selatan
- 💳 selected payment method
- 🧾 Booking ID / reference

Primary CTA:
- “Kembali ke awal” or “Ulangi demo”

Secondary links:
- “Lihat dashboard seller”
- “Lihat simulasi WhatsApp”

## Seller dashboard route (app/seller/page.tsx)

This is a simple MVP dashboard, not a full SaaS admin.
The goal is to show seller-side value based on our discussions:
- order tracking
- payment status
- booking status
- return reminder visibility
- basic dispute support visibility

### Dashboard should include:

#### Section 1: Top summary cards
Examples:
- Booking Aktif: 3
- Menunggu Pembayaran: 2
- Return Hari Ini: 1
- Dispute Aktif: 1

#### Section 2: Booking list
A simple list/table/card layout showing example bookings:
1. Sony A7 III — 12–14 March — Paid — Active
2. Fujifilm XT-3 — 15–16 March — Pending Payment
3. GoPro Hero 12 — 10–12 March — Return Today
4. DJI Mini — 8–10 March — Dispute

Suggested columns or fields:
- item
- renter name or masked renter reference
- date
- payment status
- booking status
- quick action

Statuses:
- Pending Payment
- Paid
- Active
- Return Today
- Late Return
- Dispute

#### Section 3: Booking detail panel/card
When a booking card is selected (or just render one example detail), show:
- Booking ID
- Item
- Rental period
- Secure booking fee paid
- Status
- Timeline

Example timeline:
- Booking created
- Secure booking paid
- Item picked up
- Return reminder sent
- Awaiting return

#### Section 4: Reminder / operations actions
Show fake action buttons:
- “Kirim Reminder Return”
- “Tandai Sudah Kembali”
- “Buka Dispute”
- “Lihat Simulasi WA”

These buttons can navigate to the WhatsApp journey page/section or just switch local UI state.

#### Section 5: Dispute card
Show a simple card for one active dispute:
- Booking: DJI Mini
- Issue: Body lecet saat pengembalian
- Evidence status: 2 foto diterima
- Suggested status: Menunggu review seller

Optional action buttons:
- “Lihat Evidence”
- “Kirim Permintaan Bukti”
- “Tandai Selesai”

The dashboard should demonstrate value but remain lightweight and demo-friendly.

## WhatsApp journey / illustration route or section
Build a WhatsApp-like UI screen or a set of cards showing message flows.
This is important because WhatsApp is a core part of the product story.

Please create several WhatsApp-style message screens or stacked sections for these scenarios:

### WA Scenario 1: Booking Intro
Customer:
“Kak, masih available?”

Seller:
“Halo kak 🙌 masih available ya
Untuk tanggal berapa kak?”

Customer:
“12–14 Maret”

Seller:
“Siap kak 👍

📦 Sony A7 III
💰 Rp150k / hari
📅 12–14 Maret masih available

Kalau mau dibooking, biar ga bentrok sama customer lain, kita pakai sistem booking ya kak 🙏

Cukup 1 menit aja:
👉 Amankan Booking”

Include a button/link that goes to /b/abc123

### WA Scenario 2: Payment Success Confirmation
System / Seller style message:
“✅ Booking kakak sudah berhasil diamankan!

📅 12–14 Maret
💰 Secure booking fee sudah dibayar

Nanti kita lanjut prosesnya ya 🙏”

### WA Scenario 3: Return Reminder
System / Seller style message:
“⏰ Reminder ya kak, itemnya dijadwalkan kembali hari ini.

📦 Sony A7 III
📅 Return: 14 Maret, 18:00

Kalau sudah siap dikembalikan, kabari di sini ya 👍”

### WA Scenario 4: Late Return Reminder
System / Seller style message:
“⚠️ Reminder ya kak, item sudah melewati waktu pengembalian.

Mohon info estimasi return hari ini ya 🙏
Kalau ada kendala, bisa kabari lewat chat ini.”

### WA Scenario 5: Dispute Evidence Request
System / Seller style message:
“Untuk bantu review kondisi barang, mohon kirim foto kondisi item saat ini ya kak.

Minimal:
- tampak depan
- tampak samping
- bagian yang bermasalah

Nanti seller akan review dari bukti yang masuk 🙏”

### WA Scenario 6: Dispute Resolution Summary
System / Seller style message:
“Update dispute:
Booking DJI Mini
Status: selesai direview

Ringkasan:
- bukti seller diterima
- bukti customer diterima
- diputuskan ada potongan deposit untuk perbaikan ringan

Kalau ada pertanyaan, bisa balas chat ini.”

These do not need real functionality.
They are illustrative screens to show how Sewain still relies on WhatsApp communication.

## Functional behavior
- Use React state to manage customer flow step
- Use React state to store selected payment method
- Use a timer countdown using useEffect
- Reset timer and selected state when flow restarts
- Everything should work client-side only

For seller dashboard:
- It can be static mock data
- Buttons can switch tabs, highlight cards, or navigate to WhatsApp illustrations
- No backend needed

## Design direction
- Modern rounded mobile card look
- Soft shadows
- White surfaces on a light neutral background
- Clear hierarchy
- Visually polished enough for a real demo
- Buttons should be prominent and easy to tap
- WhatsApp simulation should feel familiar but not require exact WhatsApp cloning
- Seller dashboard should be simple but believable
- Use Tailwind only
- No external state library needed

## Suggested file structure
Please generate clean, minimal files suitable for a Vercel deployment.

Recommended:
- app/layout.tsx
- app/globals.css
- app/page.tsx
- app/b/[id]/page.tsx
- app/seller/page.tsx
- app/wa/page.tsx

If needed, a small shared component folder is acceptable, but keep file count low.

If simpler, common UI helpers can stay inline in each page.

## Coding requirements
- Produce complete code, not pseudocode
- Ensure the app runs without extra explanation-heavy setup
- Use clean React code
- Use TypeScript if convenient, but keep it simple
- Avoid unnecessary abstractions
- Keep the implementation clean and demo-friendly
- Make sure it can be pasted into a fresh Next.js app and run immediately

## Output format
Please provide:
1. Full code for app/layout.tsx
2. Full code for app/globals.css
3. Full code for app/page.tsx
4. Full code for app/b/[id]/page.tsx
5. Full code for app/seller/page.tsx
6. Full code for app/wa/page.tsx
7. Any brief notes for running locally and deploying to Vercel

## Important constraints
Do not build:
- backend
- payment integration
- database
- auth
- signup
- inventory logic
- real dispute engine
- real WhatsApp API integration

This is strictly a frontend-only MVP prototype for UX validation using unique booking links from WhatsApp plus a lightweight seller dashboard and WhatsApp journey illustrations.