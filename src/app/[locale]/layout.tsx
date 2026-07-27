import '@/assets/styles/globals.css'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { fontText } from '@/assets/fonts'
import { ThemeProvider } from '@/features/theme'
import { locales } from '@/shared/lib/i18n'
import { ModalProvider } from '@/shared/ui/modal'
import { Header } from '@/widgets/header'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(locales, locale)) notFound()

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${fontText.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header className="py-4" />
            <main className="grow relative bg-primary rounded-md py-4">{children}</main>
            <ModalProvider />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
