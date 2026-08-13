import { z } from 'zod'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'

const requiredLocaleSchema = z.object({
  name: z.string().min(1, { error: 'shared.admin.categories.validation.nameRequired' }),
})

const optionalLocaleSchema = z.object({
  name: z.string(),
})

const localeShape = Object.fromEntries(
  locales.map((locale) => [locale, locale === defaultLocale ? requiredLocaleSchema : optionalLocaleSchema]),
) as Record<Locale, typeof optionalLocaleSchema>

export const categoryEditorSchema = z.object({
  slug: z
    .string()
    .min(1, { error: 'shared.admin.categories.validation.slugRequired' })
    .regex(/^[a-z0-9-]+$/, { error: 'shared.admin.categories.validation.slugInvalid' }),
  ...localeShape,
})

export type CategoryEditorFormValues = z.infer<typeof categoryEditorSchema>
