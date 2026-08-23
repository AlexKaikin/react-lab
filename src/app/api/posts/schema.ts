import { POST_ACCESS_LEVEL } from '@prisma/client'
import { z } from 'zod'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'

const META_TITLE_MAX_LENGTH = 60
const META_DESCRIPTION_MAX_LENGTH = 160

const metaSchema = z.object({
  title: z.string().min(1).max(META_TITLE_MAX_LENGTH),
  description: z.string().min(1).max(META_DESCRIPTION_MAX_LENGTH),
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
  accessLevel: z.enum(POST_ACCESS_LEVEL).default('FREE'),
  ...localeShape,
})

export type CreatePostApiInput = z.infer<typeof createPostApiSchema>
