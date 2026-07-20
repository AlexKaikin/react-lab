import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, type Locale, locales } from '.'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }
  return {
    locale,
    messages: (await import(`./translations/${locale}`)).default,
  }
})
