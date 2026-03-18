import { CustomerCheckout } from '@/components/customer-checkout'

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <CustomerCheckout bookingId={id} />
}
