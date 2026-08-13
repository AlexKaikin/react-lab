import { z } from 'zod'

export const changeEmailSchema = z.object({
  email: z.email({ error: 'shared.auth.validation.invalidEmail' }),
  currentPassword: z.string().min(1, { error: 'shared.auth.validation.passwordRequired' }),
})

export type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>
