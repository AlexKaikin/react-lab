'use client'

import { useTranslations } from 'next-intl'
import { useLocaleSwitch } from '@/shared/lib/i18n/use-locale-switch'
import { Button } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'

export const LanguageToggle = () => {
  const t = useTranslations()
  const { locale, locales, switchLocale } = useLocaleSwitch()

  return (
    <div className="hidden sm:block">
      <Dropdown
        trigger={(triggerProps) => (
          <Button aria-label={t('shared.languageToggle.label')} shape="square" {...triggerProps}>
            <Icon name="Globe" />
          </Button>
        )}
      >
        <div className="flex flex-col gap-1 *:justify-start *:px-3 *:py-2">
          {locales.map((item) => (
            <Button
              key={item}
              variant="text"
              color={item === locale ? 'primary' : 'secondary'}
              onClick={() => switchLocale(item)}
            >
              {t(`shared.locale.${item}`)}
            </Button>
          ))}
        </div>
      </Dropdown>
    </div>
  )
}
