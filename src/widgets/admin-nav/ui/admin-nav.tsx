'use client'

import { useTranslations } from 'next-intl'
import { SectionNav } from '@/shared/ui/section-nav'

const NAV_ITEMS = [
  { href: '/admin', key: 'dashboard' },
  { href: '/admin/blog/posts', key: 'posts' },
  { href: '/admin/blog/categories', key: 'categories' },
] as const

export const AdminNav = () => {
  const t = useTranslations()
  const items = NAV_ITEMS.map((item) => ({
    ...item,
    label: t(`shared.admin.nav.${item.key}`),
    isExact: item.href === '/admin',
  }))

  return <SectionNav label={t('shared.admin.label')} items={items} />
}
