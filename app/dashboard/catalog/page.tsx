import DashboardLayout from '@/components/dashboard-layout'
import DashboardCatalog from '@/components/dashboard-catalog'

export default function CatalogPage() {
  return (
    <DashboardLayout activeNav="catalog">
      <DashboardCatalog />
    </DashboardLayout>
  )
}
