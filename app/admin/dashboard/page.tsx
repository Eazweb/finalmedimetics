import AdminLayout from '@/components/admin/AdminLayout'
import Dashboard from './Dashboard'
export const runtime = 'edge';
export const metadata = {
  title: 'Admin Dashboard',
}
const DashbaordPage = () => {
  return (
    <AdminLayout activeItem="dashboard">
      <Dashboard />
    </AdminLayout>
  )
}

export default DashbaordPage
