import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, locales } from '.'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(locales, requested) ? requested : defaultLocale

  return {
    locale,
    messages: (await import(`./translations/${locale}`)).default,
  }
})
