import '@/assets/styles/globals.css'
import { getTranslations } from 'next-intl/server'
import { fontText } from '@/assets/fonts'
import { ThemeProvider } from '@/features/theme'
import { classNames } from '@/shared/lib/classNames'
import { defaultLocale } from '@/shared/lib/i18n'
import { getButtonStyle } from '@/shared/ui/button'

export default async function NotFound() {
  const t = await getTranslations({ locale: defaultLocale, namespace: 'shared.notFound' })

  return (
    <html lang={defaultLocale} className={`${fontText.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <main className="grow relative bg-primary rounded-md py-4">
            <div className="absolute inset-0 container flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-2xl font-bold">{t('title')}</h1>
              <p className="text-secondary">{t('description')}</p>
              <a href="/" className={classNames(...getButtonStyle({ variant: 'outlined', color: 'primary' }))}>
                {t('backHome')}
              </a>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
