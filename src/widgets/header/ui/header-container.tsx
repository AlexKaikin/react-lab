'use client'

import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { useHeaderVisibility } from '../model/use-header-visibility'

type HeaderContainerProps = {
  className?: string
  children: ReactNode
}

export const HeaderContainer = ({ className, children }: HeaderContainerProps) => {
  const { isHidden, headerRef } = useHeaderVisibility<HTMLElement>()

  return (
    <header
      ref={headerRef}
      className={classNames(
        'transition-transform duration-300 motion-reduce:transition-none',
        isHidden && '-translate-y-full',
        className,
      )}
    >
      {children}
    </header>
  )
}
