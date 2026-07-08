import type { ComponentProps, FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { Icon } from '@/shared/ui/icon'

export const Header: FC<ComponentProps<'div'>> = ({ className }) => {
  return (
    <header className={classNames('container flex items-center gap-6', className)}>
      <div className="flex-1 uppercase font-bold">react lab</div>
      <div>
        <Icon name="Search" />
      </div>
      <div>
        <Icon name="Globe" />
      </div>
      <div>
        <Icon name="Sun" />
      </div>
      <div>
        <Icon name="User" />
      </div>
    </header>
  )
}
