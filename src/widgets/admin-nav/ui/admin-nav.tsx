'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from '@/shared/lib/i18n/navigation'
import { LinkButton } from '@/shared/ui/button'

const NAV_ITEMS = [
  { href: '/admin', key: 'dashboard' },
  { href: '/admin/blog/posts', key: 'posts' },
  { href: '/admin/blog/categories', key: 'categories' },
] as const

export const AdminNav = () => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <nav aria-label={t('shared.admin.label')} className="flex flex-col items-start gap-2">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href)

        return (
          <LinkButton key={item.href} href={item.href} variant="text" color={isActive ? 'primary' : 'secondary'}>
            {t(`shared.admin.nav.${item.key}`)}
          </LinkButton>
        )
      })}
    </nav>
  )
}
