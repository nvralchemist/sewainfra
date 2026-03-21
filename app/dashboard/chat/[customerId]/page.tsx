import DashboardLayout from '@/components/dashboard-layout'
import DashboardChat from '@/components/dashboard-chat'

interface Props {
  params: Promise<{ customerId: string }>
}

export default async function CustomerChatPage({ params }: Props) {
  const { customerId } = await params

  return (
    <DashboardLayout activeNav="chat">
      <DashboardChat initialCustomerId={customerId} />
    </DashboardLayout>
  )
}
