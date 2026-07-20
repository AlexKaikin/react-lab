import type { ComponentProps, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'

export type Animation = 'fade' | 'slideRight' | 'slideUp' | 'slideDown' | 'slideLeft' | 'scale' | 'none'

const BASE = 'transition-all duration-300 ease-out'

const ANIMATION_CLASSES = (animation: Animation, isAnimating: boolean): string => {
  if (animation === 'none') return ''
  if (animation === 'fade') return isAnimating ? 'opacity-0' : 'opacity-100'
  if (animation === 'scale') return isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
  if (animation === 'slideRight') return isAnimating ? 'translate-x-15 opacity-0' : 'translate-x-0 opacity-100'
  if (animation === 'slideLeft') return isAnimating ? '-translate-x-15 opacity-0' : 'translate-x-0 opacity-100'
  if (animation === 'slideUp') return isAnimating ? 'translate-y-15 opacity-0' : 'translate-y-0 opacity-100'
  if (animation === 'slideDown') return isAnimating ? '-translate-y-15 opacity-0' : 'translate-y-0 opacity-100'
  return ''
}

type Props = ComponentProps<'div'> & {
  animation?: Animation
  isAnimating: boolean
  children: ReactNode
  className?: string
}

export const Animation: React.FC<Props> = (props) => {
  const { animation = 'fade', isAnimating, children, className, ...rest } = props

  return (
    <div className={classNames(BASE, ANIMATION_CLASSES(animation, isAnimating), className)} {...rest}>
      {children}
    </div>
  )
}
