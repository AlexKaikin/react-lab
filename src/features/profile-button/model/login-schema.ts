import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ error: 'shared.auth.validation.invalidEmail' }),
  password: z.string().min(1, { error: 'shared.auth.validation.passwordRequired' }),
})

export type LoginFormValues = z.infer<typeof loginSchema>
