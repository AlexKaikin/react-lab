'use client'

import { useTranslations } from 'next-intl'
import { THEME, useTheme } from '@/shared/lib/theme'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

export const ThemeToggle = () => {
  const t = useTranslations('shared.themeToggle')
  const { theme, setTheme } = useTheme()

  if (theme === null) {
    return (
      <div className="hidden t:block">
        <div className="size-12 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
      </div>
    )
  }

  const isDark = theme !== THEME.LIGHT

  return (
    <div className="hidden t:block">
      <Button
        aria-label={t('label')}
        shape="square"
        onClick={() => setTheme(isDark ? THEME.LIGHT : THEME.DARK)}
        className="animate-fade-in"
      >
        <Icon name={isDark ? 'Sun' : 'Moon'} />
      </Button>
    </div>
  )
}
