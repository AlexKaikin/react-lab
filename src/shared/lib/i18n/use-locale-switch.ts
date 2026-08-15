'use client'

import { useLocale } from 'next-intl'
import { locales } from './index'
import { usePathname, useRouter } from './navigation'

export const useLocaleSwitch = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (nextLocale: (typeof locales)[number]) => {
    if (nextLocale === locale) return
    router.replace(pathname, { locale: nextLocale })
  }

  return { locale, locales, switchLocale }
}
