import { getTranslations } from 'next-intl/server'
import { getCategories, getCategory } from '@/entities/post-category'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { defaultLocale, locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateStaticParams() {
  const categories = await getCategories(defaultLocale)

  return locales.flatMap((locale) => categories.map((category) => ({ locale, category: category.slug })))
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/category/[category]'>) {
  const { locale, category } = await params
  const t = await getTranslations({ locale, namespace: 'shared.blog.meta' })
  const found = await getCategory(category, locale)

  return buildMetadata({
    title: found?.name ?? t('title'),
    description: t('description'),
    locale,
    pathname: `/blog/category/${category}`,
  })
}

export default BlogPage
