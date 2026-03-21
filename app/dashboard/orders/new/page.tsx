import DashboardLayout from '@/components/dashboard-layout'
import DashboardCreateOrder from '@/components/dashboard-create-order'

export default function NewOrderPage() {
  return (
    <DashboardLayout activeNav="create">
      <DashboardCreateOrder />
    </DashboardLayout>
  )
}
