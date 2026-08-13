import { z } from 'zod'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'

const metaSchema = z.object({
  title: z.string().min(1, { error: 'shared.admin.posts.validation.metaTitleRequired' }),
  description: z.string().min(1, { error: 'shared.admin.posts.validation.metaDescriptionRequired' }),
  image: z.union([z.literal(''), z.url({ error: 'shared.account.validation.invalidUrl' })]),
})

const requiredLocaleSchema = z.object({
  title: z.string().min(1, { error: 'shared.admin.posts.validation.titleRequired' }),
  content: z.string().min(1, { error: 'shared.admin.posts.validation.contentRequired' }),
  tags: z.string(),
  meta: metaSchema,
})

const optionalLocaleSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
    image: z.union([z.literal(''), z.url({ error: 'shared.account.validation.invalidUrl' })]),
  }),
})

const localeShape = Object.fromEntries(
  locales.map((locale) => [locale, locale === defaultLocale ? requiredLocaleSchema : optionalLocaleSchema]),
) as Record<Locale, typeof optionalLocaleSchema>

export const postEditorSchema = z
  .object({
    slug: z
      .string()
      .min(1, { error: 'shared.admin.posts.validation.slugRequired' })
      .regex(/^[a-z0-9-]+$/, { error: 'shared.admin.posts.validation.slugInvalid' }),
    categoryId: z.string().min(1, { error: 'shared.admin.posts.validation.categoryRequired' }),
    ...localeShape,
  })
  .superRefine((data, ctx) => {
    for (const locale of locales) {
      if (locale === defaultLocale) continue

      const value = data[locale]
      if (value.title && !(value.content && value.meta.title && value.meta.description)) {
        ctx.addIssue({
          code: 'custom',
          path: [locale, 'content'],
          message: 'shared.admin.posts.validation.enIncomplete',
        })
      }
    }
  })

export type PostEditorFormValues = z.infer<typeof postEditorSchema>
