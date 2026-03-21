import DashboardLayout from '@/components/dashboard-layout'
import DashboardOrderDetail from '@/components/dashboard-order-detail'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <DashboardLayout activeNav="orders">
      <DashboardOrderDetail orderId={id} />
    </DashboardLayout>
  )
}
