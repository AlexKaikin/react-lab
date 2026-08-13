import { AdminNav } from '@/widgets/admin-nav'

export default function AdminLayout({ children }: LayoutProps<'/[locale]/admin'>) {
  return (
    <div className="flex">
      <div className="container w-50">
        <AdminNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
