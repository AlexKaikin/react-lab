'use client'

import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/shared/lib/i18n'
import { usePathname, useRouter } from '@/shared/lib/i18n/navigation'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

export const LanguageToggle = () => {
  const t = useTranslations('shared.languageToggle')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const nextLocale = locales.find((item) => item !== locale) ?? locale

  return (
    <Button aria-label={t('label')} shape="square" onClick={() => router.replace(pathname, { locale: nextLocale })}>
      <Icon name="Globe" />
    </Button>
  )
}
