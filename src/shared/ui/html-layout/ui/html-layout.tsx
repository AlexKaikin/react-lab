import '@/assets/styles/globals.css'
import type { ReactNode } from 'react'
import { fontHeading, fontText } from '@/assets/fonts'

type HtmlLayoutProps = {
  lang: string
  children: ReactNode
}

export const HtmlLayout = ({ lang, children }: HtmlLayoutProps) => (
  <html lang={lang} className={`scrollbar ${fontText.variable} ${fontHeading.variable}`} suppressHydrationWarning>
    <body className="min-h-dvh flex flex-col pt-16">{children}</body>
  </html>
)
