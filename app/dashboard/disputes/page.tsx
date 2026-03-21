import DashboardLayout from '@/components/dashboard-layout'
import DashboardDisputesList from '@/components/dashboard-disputes-list'

export default function DisputesPage() {
  return (
    <DashboardLayout activeNav="dispute">
      <DashboardDisputesList />
    </DashboardLayout>
  )
}
