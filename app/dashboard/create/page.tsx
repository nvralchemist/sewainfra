import { redirect } from 'next/navigation'

export default function CreatePage() {
  redirect('/dashboard/orders/new')
}
