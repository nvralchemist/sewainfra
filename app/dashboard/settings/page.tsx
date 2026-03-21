import DashboardLayout from '@/components/dashboard-layout'
import DashboardSettings from '@/components/dashboard-settings'

export default function SettingsPage() {
  return (
    <DashboardLayout activeNav="settings">
      <DashboardSettings />
    </DashboardLayout>
  )
}
