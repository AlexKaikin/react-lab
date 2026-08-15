import '@/assets/styles/globals.css'
import type { ReactNode } from 'react'
import { fontHeading, fontText } from '@/assets/fonts'

type HtmlLayoutProps = {
  lang: string
  children: ReactNode
}

export const HtmlLayout = ({ lang, children }: HtmlLayoutProps) => (
  <html lang={lang} className={`${fontText.variable} ${fontHeading.variable} h-full`} suppressHydrationWarning>
    <body className="min-h-full flex flex-col">{children}</body>
  </html>
)
