import DashboardLayout from '@/components/dashboard-layout'
import DashboardChat from '@/components/dashboard-chat'

export default function ChatPage() {
  return (
    <DashboardLayout activeNav="chat">
      <DashboardChat />
    </DashboardLayout>
  )
}
