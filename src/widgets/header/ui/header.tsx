import { getTranslations } from 'next-intl/server'
import type { ComponentProps, FC } from 'react'
import { LanguageToggle } from '@/features/language-toggle'
import { MenuButton } from '@/features/menu-button'
// import { ProfileButton } from '@/features/profile-button'
import { SearchButton } from '@/features/search-button'
import { ThemeToggle } from '@/features/theme'
import { classNames } from '@/shared/lib/class-names'
import type { Locale } from '@/shared/lib/i18n'

type HeaderProps = ComponentProps<'div'> & { locale: Locale }

export const Header: FC<HeaderProps> = async ({ className, locale }) => {
  const t = await getTranslations({ locale, namespace: 'shared.header' })

  return (
    <header className={classNames('flex items-center', className)}>
      <div className="flex-1 flex items-center gap-2 uppercase font-bold">
        <MenuButton />
        {t('title')}
      </div>
      <SearchButton />
      <LanguageToggle />
      <ThemeToggle />
      {/* <ProfileButton /> */}
    </header>
  )
}
