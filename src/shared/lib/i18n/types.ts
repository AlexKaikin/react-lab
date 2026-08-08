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
}

export type LocalePageProps<Route extends keyof LocaleParamMap> = {
  params: Promise<LocaleParamMap[Route]>
}
