import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'

type CollapseProps = {
  isVisible: boolean
  children: ReactNode
  className?: string
  gapClassName?: string
}

export const Collapse = ({ isVisible, children, className, gapClassName }: CollapseProps) => (
  <div
    className={classNames(
      'grid transition-[grid-template-rows] duration-200 ease-out',
      isVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      className,
    )}
  >
    <div
      className={classNames(
        'overflow-hidden transition-[opacity,padding-top] duration-200 ease-out',
        isVisible ? classNames(gapClassName, 'opacity-100 delay-100') : 'opacity-0',
      )}
    >
      {children}
    </div>
  </div>
)
