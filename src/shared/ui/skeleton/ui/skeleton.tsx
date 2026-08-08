import type { ComponentProps } from 'react'
import { classNames } from '@/shared/lib/class-names'

export const Skeleton = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div className={classNames('animate-pulse rounded-md bg-skeleton', className)} {...rest} />
)
