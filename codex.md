# Sewain Prototype Build Instruction

You are building a **high-fidelity frontend prototype** for **Sewain**, a WhatsApp-first rental checkout and seller operations product for the Indonesian market.

This prototype is **not** a full production system.
This prototype is for **Vercel demo / stakeholder validation / UX testing**.

The current prototype result is too shallow.
I need a much more detailed and thoughtful prototype that reflects the product thinking below.

---

## 1. Product Context

Sewain is **not a marketplace yet**.

Sewain’s wedge is:

- customer and seller still interact primarily through **WhatsApp**
- seller sends a **booking / order link**
- customer completes a lightweight **secure booking flow**
- seller gets a simple **operational dashboard**
- WhatsApp remains the main communication channel for:
  - booking intro
  - payment confirmation
  - return reminder
  - late return reminder
  - dispute evidence request
  - dispute resolution update

### What problem Sewain is solving

In rental businesses handled manually through WhatsApp:

- bookings are informal
- customers can ghost or cancel easily
- seller manually enforces rules inconsistently
- seller manually tracks payment, return, reminders, and disputes
- trust is weak and process is not standardized

Sewain introduces a lightweight layer that helps:

- turn chat intent into committed booking
- reduce cancellation by adding commitment friction
- make rules feel clearer and more standardized
- help seller operations through reminders and simple dashboard visibility

---

## 2. Product Positioning

This prototype must communicate Sewain as:

> a WhatsApp-native rental checkout + operations layer

It should **not** feel like:

- a generic SaaS admin template
- a marketplace
- a complicated ERP
- a dashboard-first company
- a login-first product

The product should feel:

- conversational
- operationally useful
- low friction
- realistic for Indonesian rental sellers

---

## 3. Core Product Decisions

For this prototype:

- DO NOT build auth
- DO NOT build signup
- DO NOT require login
- DO NOT ask customer to create account
- DO NOT ask customer for unnecessary identity form
- DO NOT add real backend
- DO NOT add real database
- DO NOT add real payment integration
- DO NOT add real WhatsApp integration

The prototype should be **session-based** and **link-based**.

Meaning:

- seller shares a unique booking link in WhatsApp
- customer clicks link and immediately enters booking flow
- booking context is already prefilled from the link
- WhatsApp is treated as the identity / relationship layer

---

## 4. Required Prototype Areas

Build the prototype in three major areas:

1. **WhatsApp Prototype Flow**
2. **Checkout / Booking Page Flow**
3. **Seller Dashboard Prototype**

All three must feel connected as one product story.

The current shallow version is not enough.
I need depth in:
- UX reasoning
- screen detail
- copywriting
- transitions
- realistic scenarios
- believable mock data
- operational context

---

# 5. Area 1 — WhatsApp Prototype Flow

This is extremely important.
Do not treat WhatsApp flow as a tiny extra.
For Sewain, WhatsApp is a core surface of the product.

## Goal of WA Prototype Flow

Show how seller and customer would realistically interact in WhatsApp before and after checkout.

The WA prototype should illustrate:

- initial inquiry
- seller qualification
- seller sharing booking link
- payment success notification
- return reminder
- late return reminder
- dispute evidence request
- dispute resolution summary

## UX Requirements

The WhatsApp prototype must:

- feel like a familiar chat interface
- visually resemble WhatsApp enough to be intuitive
- not need pixel-perfect cloning
- support multiple scenarios
- show clear distinction between:
  - customer message
  - seller message
  - system / Sewain-assisted message

## Required WA Scenarios

### Scenario A — Initial Inquiry / Booking Introduction
Need to show:
- customer asks if item available
- seller confirms
- seller asks for date
- seller confirms price and availability
- seller introduces booking system in a soft way
- seller shares booking link

The copy should reflect our discussion:
seller should not suddenly force a system.
The framing should be:

- “biar aman”
- “biar ga bentrok”
- “cukup 1 menit”

Example structure:

Customer:
- Kak, masih available?

Seller:
- Halo kak 🙌 masih available ya
- Untuk tanggal berapa kak?

Customer:
- 12–14 Maret

Seller:
- Siap kak 👍
- 📦 Sony A7 III
- 💰 Rp150k / hari
- 📅 12–14 Maret masih available
- Kalau mau dibooking, biar ga bentrok sama customer lain, kita pakai sistem booking ya kak 🙏
- Cukup 1 menit aja:
- [Amankan Booking]

This CTA should link to the booking route.

### Scenario B — Booking Paid / Success Notification
Show how customer gets confirmation after secure booking fee is paid.

Need to communicate:
- booking is secured
- payment has been recorded
- seller will continue in WhatsApp

### Scenario C — Return Reminder
Show a realistic reminder that item must be returned today.
Need to feel operationally useful, not spammy.

### Scenario D — Late Return Reminder
Show a follow-up if item is already overdue.

### Scenario E — Dispute Evidence Request
Show seller / system asking customer to upload/send photos of current item condition.

### Scenario F — Dispute Resolution Update
Show a message summarizing a dispute decision in a neutral, structured way.

## Important WA UX Notes

- The messages should feel natural in Indonesian
- Do not sound robotic
- Some messages can be “seller voice”
- Some can be “system-assisted voice”
- Make it visible that Sewain supports seller operations through WhatsApp, not replaces the seller relationship

## WA Prototype Deliverable

The WhatsApp route or page must contain:

- clear segmented scenario cards or tabs
- visually rich chat examples
- CTA links into booking page and seller dashboard where relevant

---

# 6. Area 2 — Checkout / Booking Page Flow

This is the core conversion flow.
It should feel like a natural continuation of WhatsApp, not a new platform signup.

## Goal

Demonstrate how a customer goes from:
- interest in chat
to
- committed booking

## Core UX Principle

No login.
No signup.
No identity input step unless absolutely necessary.

We have decided that input identity is **not important for MVP**.
Remove unnecessary friction.

## Use Unique Booking Link

The customer opens a route like:
- /b/abc123

This route already knows the booking context.

The page should already show:
- item
- date
- price
- seller
- rating
- location
- booking reference

## Checkout Flow Structure

The customer flow should only have 3 steps:

### Step 1 — Booking Page
Must include:

- item image
- item name
- booking date / rental period
- price per day
- optional rating / social proof
- seller name
- location

Also include a trust section.

Trust section should communicate:
- booking aman
- tidak bentrok dengan customer lain
- aturan jelas & transparan

Main CTA:
- Amankan Booking

Secondary links:
- lihat dashboard seller
- lihat simulasi WhatsApp

### Step 2 — Secure Booking Payment
This is the most important screen.

Must include:

- secure booking fee amount
- short explanation that fee is deducted from total later
- rule card:
  - cancel <24 jam → hangus
  - cancel >24 jam → refund
- countdown timer
- payment method selection:
  - QRIS
  - GoPay
  - VA BCA

Main CTA:
- Bayar & Amankan

Secondary CTA:
- Kembali

Need to feel:
- trustworthy
- simple
- fast
- like a payment step, not registration

### Step 3 — Success
Must include:
- success state
- booking summary
- selected payment method
- booking reference
- message that seller will continue process via WhatsApp

CTA options:
- kembali ke awal
- lihat dashboard seller
- lihat simulasi WhatsApp

## Checkout UX Notes

- mobile-first
- polished
- demo-quality
- not shallow
- use good spacing and hierarchy
- use believable Indonesian copy
- the secure booking fee should feel intentional, not random

## Important Product Framing

The checkout flow is not “escrow app onboarding”.
It is:
- secure booking step
- commitment step
- standardization step

---

# 7. Area 3 — Seller Dashboard Prototype

The seller dashboard must not be generic or shallow.
It should reflect the actual seller-side value we have discussed.

## Goal of Seller Dashboard

Show how seller benefits from Sewain operationally even while continuing business through WhatsApp.

The dashboard is not the main surface for customers.
It is a simple seller view that helps with:

- booking tracking
- payment visibility
- return reminder visibility
- late return awareness
- dispute management support

## Dashboard Principles

- lightweight
- believable
- simple
- no giant enterprise dashboard
- focused on daily rental operations
- must feel useful for a WhatsApp-first rental seller

## Required Seller Dashboard Sections

### Section A — Top Summary Cards
Need summary cards like:

- Booking Aktif
- Menunggu Pembayaran
- Return Hari Ini
- Dispute Aktif

Cards should be visually useful and at-a-glance.

### Section B — Booking List
Need a list of current bookings with different statuses.

Statuses should include:
- Pending Payment
- Paid
- Active
- Return Today
- Late Return
- Dispute

Include realistic sample items:
- Sony A7 III
- Fujifilm XT-3
- GoPro Hero 12
- DJI Mini

Include date ranges and short renter references.

### Section C — Booking Detail Panel / Card
For one selected booking, show detail such as:
- booking ID
- item
- rental period
- payment status
- booking status
- timeline of activity

Timeline example:
- Booking created
- Secure booking paid
- Item picked up
- Reminder sent
- Awaiting return

### Section D — Operations Actions
Include simple action buttons such as:
- Kirim Reminder Return
- Tandai Sudah Kembali
- Buka Dispute
- Lihat Simulasi WA

These can be frontend-only actions.
They may:
- switch local state
- navigate to WA scenarios
- update the demo panel

### Section E — Dispute Module Card
Show one active dispute example.

Need to communicate:
- issue summary
- evidence collected
- current review status
- simple next actions

Example:
- Booking: DJI Mini
- Issue: body lecet saat pengembalian
- Evidence status: 2 foto diterima
- Status: menunggu review seller

Buttons:
- Lihat Evidence
- Kirim Permintaan Bukti
- Tandai Selesai

## Seller Dashboard UX Notes

- should feel like a useful daily operations cockpit
- should not try to solve everything
- should feel like a natural extension of the checkout / WhatsApp product story
- must help explain seller value, not just customer value

---

# 8. Relationship Between the 3 Areas

The prototype should feel like one connected narrative:

- WhatsApp conversation introduces booking
- booking link opens checkout
- checkout success connects back to WhatsApp
- seller dashboard shows operational follow-through
- WhatsApp reminder/dispute scenarios show how operations continue post-booking

Each area should link to the others.
Do not make them feel isolated.

I want a product story, not disconnected pages.

---

# 9. Routes / File Structure

Use Next.js App Router.

Recommended routes:

- app/page.tsx
- app/b/[id]/page.tsx
- app/seller/page.tsx
- app/wa/page.tsx

Optional shared components folder is acceptable, but keep the project manageable.

## app/page.tsx
This should be a polished landing/demo page that explains the prototype and gives three clear entry points:

- Lihat Journey Customer
- Lihat Seller Dashboard
- Lihat WhatsApp Journey

It should also briefly explain the Sewain concept:
- booking via WhatsApp
- secure booking checkout
- seller ops dashboard
- WhatsApp reminders and dispute support

---

# 10. Design Direction

Use:
- Next.js
- React
- Tailwind CSS

Design must be:
- modern
- mobile-first
- high-fidelity prototype quality
- rounded cards
- good visual hierarchy
- soft shadows
- neutral background
- believable UI
- no template-looking output
- no shallow placeholder style

The WhatsApp page can look more like chat.
The seller dashboard can be desktop-friendly but still clean.
The checkout flow should strongly prioritize mobile.

---

# 11. Mock Data Quality

Use mock data that feels believable and specific.

Need realistic:
- item names
- dates
- statuses
- payment method names
- dispute examples
- reminder examples
- booking IDs
- seller name

Avoid generic placeholder junk like:
- Item 1
- User A
- Lorem ipsum

---

# 12. Coding Requirements

- frontend only
- code must be complete, not pseudocode
- TypeScript preferred if convenient
- avoid unnecessary complexity
- avoid overengineering
- avoid backend simulation beyond simple mock state/data
- output should be runnable in a fresh Next.js app
- prioritize quality of prototype experience over perfect architecture

---

# 13. Output Requirements

Generate the full code for:

1. app/layout.tsx
2. app/globals.css
3. app/page.tsx
4. app/b/[id]/page.tsx
5. app/seller/page.tsx
6. app/wa/page.tsx

If needed, also generate small reusable components, but only if it genuinely improves clarity.

Also include:
- short run instructions
- short Vercel deployment notes

---

# 14. Most Important Instruction

Do not generate a shallow prototype.

I need:
- thoughtful screen composition
- good Indonesian copy
- realistic scenario design
- strong product narrative
- clear connections between chat, checkout, seller operations, reminders, and disputes

Build this like a founder demo for an early-stage but serious startup.