import { z } from 'zod'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'

const localeNameSchema = z.object({ name: z.string().min(1) })
const nullableLocaleNameSchema = localeNameSchema.nullable().default(null)

const localeShape = Object.fromEntries(
  locales.map((locale) => [locale, locale === defaultLocale ? localeNameSchema : nullableLocaleNameSchema]),
) as Record<Locale, typeof nullableLocaleNameSchema>

export const createCategoryApiSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  ...localeShape,
})

export type CreateCategoryApiInput = z.infer<typeof createCategoryApiSchema>
