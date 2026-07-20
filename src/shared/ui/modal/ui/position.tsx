import type { ComponentProps, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'

export type Position =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

const POSITION_STYLE: Record<Position, string> = {
  center: 'items-center justify-center',
  top: 'items-start justify-center',
  bottom: 'items-end justify-center',
  left: 'items-center justify-start',
  right: 'items-center justify-end',
  'top-left': 'items-start justify-start',
  'top-right': 'items-start justify-end',
  'bottom-left': 'items-end justify-start',
  'bottom-right': 'items-end justify-end',
} as const

type Props = ComponentProps<'div'> & {
  position?: Position
  children: ReactNode
  className?: string
}

export const Position: React.FC<Props> = ({ position = 'center', children, className, ...rest }) => {
  return (
    <div className={classNames(POSITION_STYLE[position], className)} {...rest}>
      {children}
    </div>
  )
}
