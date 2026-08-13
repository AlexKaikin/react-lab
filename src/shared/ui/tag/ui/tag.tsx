import type { ComponentProps, ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { Link } from '@/shared/lib/i18n/navigation'
import type { TColor, TSize, TVariant } from '@/shared/lib/variant-style'
import { getTagStyle } from '../lib'

type TagProps = {
  href?: ComponentProps<typeof Link>['href']
  variant?: TVariant
  size?: TSize
  color?: TColor
  className?: string
  children: ReactNode
}

export const Tag = ({ href, variant, size, color, className, children }: TagProps) => {
  const tagClassName = classNames(...getTagStyle({ variant, size, color }), href && 'cursor-pointer', className)

  if (href) {
    return (
      <Link href={href} className={tagClassName}>
        {children}
      </Link>
    )
  }

  return <span className={tagClassName}>{children}</span>
}
