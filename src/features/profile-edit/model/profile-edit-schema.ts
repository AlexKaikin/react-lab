import { z } from 'zod'

export const profileEditSchema = z.object({
  firstName: z.string().min(2, { error: 'shared.auth.validation.firstNameTooShort' }),
  lastName: z.string(),
  about: z.string(),
  location: z.string(),
  birthDate: z.string(),
  avatarUrl: z.union([z.literal(''), z.url({ error: 'shared.account.validation.invalidUrl' })]),
})

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>
