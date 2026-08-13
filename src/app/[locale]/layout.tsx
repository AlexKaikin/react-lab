import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from '@/features/theme'
import { SessionProvider } from '@/shared/api/auth/session-provider'
import { locales } from '@/shared/lib/i18n'
import { HtmlLayout } from '@/shared/ui/html-layout'
import { ModalProvider } from '@/shared/ui/modal'
import { ToastProvider } from '@/shared/ui/toast'
import { Footer } from '@/widgets/footer'
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
    <HtmlLayout lang={locale}>
      <ThemeProvider>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <Header className="py-4" locale={locale} />
            <main className="flex grow flex-col relative py-4">{children}</main>
            <Footer locale={locale} />
            <ModalProvider />
            <ToastProvider />
          </SessionProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </HtmlLayout>
  )
}
