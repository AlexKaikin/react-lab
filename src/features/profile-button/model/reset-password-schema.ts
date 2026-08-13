import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { error: 'shared.auth.validation.passwordTooShort' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'shared.auth.validation.passwordsMismatch',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
