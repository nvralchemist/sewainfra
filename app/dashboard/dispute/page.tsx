import DashboardLayout from '@/components/dashboard-layout'
import DashboardDispute from '@/components/dashboard-dispute'

export default function DisputePage() {
  return (
    <DashboardLayout activeNav="dispute">
      <DashboardDispute />
    </DashboardLayout>
  )
}
