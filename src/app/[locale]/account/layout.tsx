import { AccountNav } from '@/widgets/account-nav'

export default function AccountLayout({ children }: LayoutProps<'/[locale]/account'>) {
  return (
    <div className="flex flex-col gap-6 t:flex-row">
      <aside className="container t:w-50 t:shrink-0">
        <AccountNav />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
