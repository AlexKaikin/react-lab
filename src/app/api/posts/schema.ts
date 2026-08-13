import { z } from 'zod'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'

const metaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.url().nullable().default(null),
})

const localeContentSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  meta: metaSchema,
})

const nullableLocaleContentSchema = localeContentSchema.nullable().default(null)

const localeShape = Object.fromEntries(
  locales.map((locale) => [locale, locale === defaultLocale ? localeContentSchema : nullableLocaleContentSchema]),
) as Record<Locale, typeof nullableLocaleContentSchema>

export const createPostApiSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  categoryId: z.string().min(1),
  ...localeShape,
})

export type CreatePostApiInput = z.infer<typeof createPostApiSchema>
