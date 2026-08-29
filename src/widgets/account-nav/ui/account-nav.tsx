'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from '@/shared/lib/i18n/navigation'
import { Button, LinkButton } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'
import { SectionNav } from '@/shared/ui/section-nav'

const NAV_ITEMS = [
  { href: '/account/profile', key: 'profile' },
  { href: '/account/subscription', key: 'subscription' },
  { href: '/account/settings', key: 'settings' },
] as const

export const AccountNav = () => {
  const t = useTranslations('account.nav')
  const pathname = usePathname()
  const items = NAV_ITEMS.map((item) => ({
    ...item,
    label: t(item.key),
    isExact: true,
  }))
  const activeItem = items.find((item) => item.href === pathname) ?? items[0]

  return (
    <>
      <div className="t:hidden">
        <Dropdown
          matchTriggerWidth
          panelLabel={t('label')}
          trigger={(triggerProps) => (
            <Button {...triggerProps} variant="outlined" color="secondary" className="w-full justify-between">
              {activeItem.label}
              <Icon name="ChevronDown" size={20} aria-hidden="true" />
            </Button>
          )}
        >
          {items.map((item) => (
            <LinkButton
              key={item.href}
              href={item.href}
              variant="text"
              color={item.href === pathname ? 'primary' : 'secondary'}
              className="w-full p-2"
              role="menuitem"
            >
              {item.label}
            </LinkButton>
          ))}
        </Dropdown>
      </div>

      <div className="hidden t:block">
        <SectionNav label={t('label')} items={items} />
      </div>
    </>
  )
}
