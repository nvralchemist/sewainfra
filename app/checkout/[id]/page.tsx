import { CustomerCheckout } from '@/components/customer-checkout'

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mx-auto max-w-[390px] min-h-screen bg-sewain-bg shadow-card-lg">
        <CustomerCheckout bookingId={id} />
      </div>
    </div>
  )
}
