import type { ComponentProps, FC } from 'react'
import { Link } from '@/shared/config/i18n/navigation'
import { classNames } from '@/shared/lib/classNames'
import { getButtonStyle } from '../lib'
import type { TButton } from '../model/schema'

export const LinkButton: FC<TButton<ComponentProps<typeof Link>>> = (props) => {
  const { children, size = 'medium', variant, color, className, shape, ...rest } = props

  return (
    <Link className={classNames(...getButtonStyle({ size, variant, color, shape }), className)} {...rest}>
      {children}
    </Link>
  )
}
