import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { error: 'shared.auth.validation.passwordRequired' }),
    newPassword: z.string().min(8, { error: 'shared.auth.validation.passwordTooShort' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: 'shared.auth.validation.passwordsMismatch',
    path: ['confirmPassword'],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
