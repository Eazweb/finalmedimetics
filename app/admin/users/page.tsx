import AdminLayout from '@/components/admin/AdminLayout'
import Users from './Users'
export const runtime = 'edge';
export const metadata = {
  title: 'Admin Users',
}
const AdminUsersPage = () => {
  return (
    <AdminLayout activeItem="users">
      <Users />
    </AdminLayout>
  )
}

export default AdminUsersPage
