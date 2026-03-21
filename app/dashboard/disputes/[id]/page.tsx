import DashboardLayout from '@/components/dashboard-layout'
import DashboardDispute from '@/components/dashboard-dispute'

export default function DisputeDetailPage() {
  return (
    <DashboardLayout activeNav="dispute">
      <DashboardDispute />
    </DashboardLayout>
  )
}
