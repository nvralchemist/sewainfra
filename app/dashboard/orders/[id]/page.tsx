import DashboardLayout from '@/components/dashboard-layout'
import DashboardOrderDetail from '@/components/dashboard-order-detail'

export default function OrderDetailPage() {
  return (
    <DashboardLayout activeNav="orders">
      <DashboardOrderDetail />
    </DashboardLayout>
  )
}
