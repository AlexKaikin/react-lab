import type { ComponentProps, FC } from 'react'
import { SearchButton } from '@/features/search-button'
import { classNames } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui/icon'

export const Header: FC<ComponentProps<'div'>> = ({ className }) => {
  return (
    <header className={classNames('container flex items-center', className)}>
      <div className="flex-1 flex items-center gap-2 uppercase font-bold">
        <Icon name="Menu" />
        react lab
      </div>
      <SearchButton />
      <Button>
        <Icon name="Globe" />
      </Button>
      <Button>
        <Icon name="Sun" />
      </Button>
      <Button className="pr-0">
        <Icon name="User" />
      </Button>
    </header>
  )
}
