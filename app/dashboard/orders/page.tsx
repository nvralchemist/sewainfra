import DashboardLayout from '@/components/dashboard-layout'
import DashboardOrders from '@/components/dashboard-orders'

export default function OrdersPage() {
  return (
    <DashboardLayout activeNav="orders">
      <DashboardOrders />
    </DashboardLayout>
  )
}
