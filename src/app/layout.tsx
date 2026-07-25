import '@/assets/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { fontText } from '@/assets/fonts'
import { ThemeProvider } from '@/features/theme'
import { ModalProvider } from '@/shared/ui/modal'
import { Header } from '@/widgets/header'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${fontText.variable} h-full dark`} suppressHydrationWarning>
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
