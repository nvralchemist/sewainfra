import DashboardLayout from '@/components/dashboard-layout'
import DashboardFinance from '@/components/dashboard-finance'

export default function FinancePage() {
  return (
    <DashboardLayout activeNav="finance">
      <DashboardFinance />
    </DashboardLayout>
  )
}
