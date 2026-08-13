import type { Locale } from './'

type LocaleParamMap = {
  '/[locale]': { locale: Locale }
  '/[locale]/blog': { locale: Locale }
  '/[locale]/blog/page/[page]': { locale: Locale; page: string }
  '/[locale]/blog/category/[category]': { locale: Locale; category: string }
  '/[locale]/blog/category/[category]/page/[page]': { locale: Locale; category: string; page: string }
  '/[locale]/blog/tag/[tag]': { locale: Locale; tag: string }
  '/[locale]/blog/tag/[tag]/page/[page]': { locale: Locale; tag: string; page: string }
  '/[locale]/blog/[slug]': { locale: Locale; slug: string }
  '/[locale]/reset-password/[token]': { locale: Locale; token: string }
  '/[locale]/activate/[token]': { locale: Locale; token: string }
  '/[locale]/account': { locale: Locale }
  '/[locale]/terms': { locale: Locale }
  '/[locale]/privacy': { locale: Locale }
  '/[locale]/admin': { locale: Locale }
  '/[locale]/admin/blog/posts': { locale: Locale }
  '/[locale]/admin/blog/posts/new': { locale: Locale }
  '/[locale]/admin/blog/posts/[slug]/edit': { locale: Locale; slug: string }
  '/[locale]/admin/blog/categories': { locale: Locale }
}

export type LocalePageProps<Route extends keyof LocaleParamMap> = {
  params: Promise<LocaleParamMap[Route]>
}
