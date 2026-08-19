import { getTranslations } from 'next-intl/server'
import type { ComponentProps, FC } from 'react'
import { getCategories } from '@/entities/post-category'
import { LanguageToggle } from '@/features/language-toggle'
import { MenuButton } from '@/features/menu-button'
import { ProfileButton } from '@/features/profile-button'
import { SearchButton, SearchField } from '@/features/search'
import { ThemeToggle } from '@/features/theme'
import { classNames } from '@/shared/lib/class-names'
import type { Locale } from '@/shared/lib/i18n'
import { HeaderContainer } from './header-container'

type HeaderProps = ComponentProps<'div'> & { locale: Locale }

export const Header: FC<HeaderProps> = async ({ className, locale }) => {
  const t = await getTranslations({ locale, namespace: 'shared.header' })
  const categories = await getCategories(locale)

  return (
    <HeaderContainer className={classNames('flex items-center', className)}>
      <div className="flex-1 flex items-center gap-2 uppercase font-bold -ml-3">
        <MenuButton categories={categories} />
        {t('title')}
      </div>

      <SearchField className="hidden t:block t:w-100 d:w-150" />

      <div className="flex-1 flex items-center justify-end">
        <div className="t:hidden">
          <SearchButton />
        </div>
        <LanguageToggle />
        <ThemeToggle />
        <ProfileButton />
      </div>
    </HeaderContainer>
  )
}
