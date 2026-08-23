import type { PostAdminInput, PostLocaleInput } from '@/entities/post'
import { defaultLocale, locales } from '@/shared/lib/i18n'
import type { PostEditorFormValues } from '../model/post-editor-schema'

const toTags = (raw: string) =>
  raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

const toLocaleInput = (locale: PostEditorFormValues['ru']): PostLocaleInput => ({
  title: locale.title,
  content: locale.content,
  tags: toTags(locale.tags),
  meta: { title: locale.meta.title, description: locale.meta.description, image: locale.meta.image || null },
})

export const buildPostInput = (values: PostEditorFormValues): PostAdminInput => {
  const translations = Object.fromEntries(
    locales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => [locale, values[locale].title ? toLocaleInput(values[locale]) : null]),
  )

  return {
    slug: values.slug,
    categoryId: values.categoryId,
    accessLevel: values.accessLevel,
    ru: toLocaleInput(values[defaultLocale]),
    ...translations,
  } as PostAdminInput
}
