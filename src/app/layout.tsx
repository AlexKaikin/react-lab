import '@/assets/styles/globals.css'
import { fontText } from '@/assets/fonts'
import { ThemeProvider } from '@/features/theme'
import { ModalProvider } from '@/shared/ui/modal'
import { Header } from '@/widgets/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${fontText.variable} h-full dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header className="py-4" />
          <main className="bg-primary grow rounded-md py-4">{children}</main>
        </ThemeProvider>
        <ModalProvider />
      </body>
    </html>
  )
}
