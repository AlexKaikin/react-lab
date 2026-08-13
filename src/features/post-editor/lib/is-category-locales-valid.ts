import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'
import type { PostEditorFormValues } from '../model/post-editor-schema'

export const isCategoryLocalesValid = (values: PostEditorFormValues, categoryLocales: Locale[]) =>
  locales.every((locale) => locale === defaultLocale || !values[locale].title || categoryLocales.includes(locale))
