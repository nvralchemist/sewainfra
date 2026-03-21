import { CustomerCheckout } from '@/components/customer-checkout'
import { ORDER } from '@/lib/mock-data'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mx-auto max-w-[390px] min-h-screen bg-sewain-bg shadow-card-lg">
        <CustomerCheckout bookingId={ORDER.id} />
      </div>
    </div>
  )
}
