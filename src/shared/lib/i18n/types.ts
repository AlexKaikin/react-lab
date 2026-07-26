import type { Locale } from './'

type LocaleParamMap = {
  '/[locale]': { locale: Locale }
  '/[locale]/blog/[slug]': { locale: Locale; slug: string }
}

export type LocalePageProps<Route extends keyof LocaleParamMap> = {
  params: Promise<LocaleParamMap[Route]>
}
