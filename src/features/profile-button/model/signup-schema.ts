import { z } from 'zod'

export const signupSchema = z
  .object({
    firstName: z.string().min(2, { error: 'shared.auth.validation.firstNameTooShort' }),
    email: z.email({ error: 'shared.auth.validation.invalidEmail' }),
    password: z.string().min(8, { error: 'shared.auth.validation.passwordTooShort' }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((value) => value, { error: 'shared.auth.validation.agreeRequired' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'shared.auth.validation.passwordsMismatch',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
