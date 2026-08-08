import type { Locale } from '@/shared/lib/i18n'

export type BlogPageProps =
  | { params: Promise<{ locale: Locale }> }
  | { params: Promise<{ locale: Locale; page: string }> }
  | { params: Promise<{ locale: Locale; category: string }> }
  | { params: Promise<{ locale: Locale; category: string; page: string }> }
  | { params: Promise<{ locale: Locale; tag: string }> }
  | { params: Promise<{ locale: Locale; tag: string; page: string }> }

export type BlogParams = Awaited<BlogPageProps['params']>
