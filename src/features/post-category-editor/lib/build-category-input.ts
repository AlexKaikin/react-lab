import type { CategoryAdminInput } from '@/entities/post-category'
import { defaultLocale, locales } from '@/shared/lib/i18n'
import type { CategoryEditorFormValues } from '../model/category-editor-schema'

export const buildCategoryInput = (values: CategoryEditorFormValues): CategoryAdminInput => {
  const translations = Object.fromEntries(
    locales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => [locale, values[locale].name ? { name: values[locale].name } : null]),
  )

  return {
    slug: values.slug,
    ru: { name: values[defaultLocale].name },
    ...translations,
  } as CategoryAdminInput
}
