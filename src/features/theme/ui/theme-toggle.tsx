'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { THEME } from '../model/constants'
import { useTheme } from '../model/use-theme'

export const ThemeToggle = () => {
  const t = useTranslations('shared.themeToggle')
  const { theme, setTheme } = useTheme()

  if (theme === null) {
    return <div className="size-12 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
  }

  const isDark = theme !== THEME.LIGHT

  return (
    <Button
      aria-label={t('label')}
      shape="square"
      onClick={() => setTheme(isDark ? THEME.LIGHT : THEME.DARK)}
      className="animate-fade-in"
    >
      <Icon name={isDark ? 'Sun' : 'Moon'} />
    </Button>
  )
}
