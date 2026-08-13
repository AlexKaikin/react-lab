import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email({ error: 'shared.auth.validation.invalidEmail' }),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
