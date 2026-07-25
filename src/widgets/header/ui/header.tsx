import { getTranslations } from 'next-intl/server'
import type { ComponentProps, FC } from 'react'
import { MenuButton } from '@/features/menu-button'
import { ProfileButton } from '@/features/profile-button'
import { SearchButton } from '@/features/search-button'
import { classNames } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui/icon'

export const Header: FC<ComponentProps<'div'>> = async ({ className }) => {
  const t = await getTranslations('shared.header')

  return (
    <header className={classNames('flex items-center', className)}>
      <div className="flex-1 flex items-center gap-2 uppercase font-bold">
        <MenuButton />
        {t('title')}
      </div>
      <SearchButton />
      <Button>
        <Icon name="Globe" />
      </Button>
      <Button>
        <Icon name="Sun" />
      </Button>
      <ProfileButton />
    </header>
  )
}
