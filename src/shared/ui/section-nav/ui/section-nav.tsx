'use client'

import { classNames } from '@/shared/lib/class-names'
import { usePathname } from '@/shared/lib/i18n/navigation'
import { LinkButton } from '@/shared/ui/button'

export type SectionNavItem = {
  href: string
  label: string
  isExact?: boolean
}

type SectionNavProps = {
  label: string
  items: readonly SectionNavItem[]
  className?: string
}

export const SectionNav = ({ label, items, className }: SectionNavProps) => {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className={classNames('flex flex-col items-start gap-2', className)}>
      {items.map((item) => {
        const isActive = item.isExact ? pathname === item.href : pathname.startsWith(item.href)

        return (
          <LinkButton key={item.href} href={item.href} variant="text" color={isActive ? 'primary' : 'secondary'}>
            {item.label}
          </LinkButton>
        )
      })}
    </nav>
  )
}
