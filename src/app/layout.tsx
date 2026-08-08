import type { Metadata } from 'next'
import { env } from '@/shared/lib/env'

export const metadata: Metadata = {
  metadataBase: new URL(env('NEXT_PUBLIC_SITE_URL')),
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return children
}
