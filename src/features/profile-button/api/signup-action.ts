'use server'

import { getTranslations } from 'next-intl/server'
import { createUser, generateToken, getUserByEmail, hashPassword } from '@/entities/user'
import { sendEmail } from '@/shared/api/email/send-email'
import { env } from '@/shared/lib/env'
import type { Locale } from '@/shared/lib/i18n'
import { signupSchema } from '../model/signup-schema'

const ACTIVATION_TTL_MS = 24 * 60 * 60 * 1000

export async function signup(values: unknown, locale: Locale) {
  const parsed = signupSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const { email, firstName, password } = parsed.data

  const existing = await getUserByEmail(email)
  if (existing) return { error: 'emailTaken' as const }

  const passwordHash = await hashPassword(password)
  const activationToken = generateToken()
  const activationExpires = new Date(Date.now() + ACTIVATION_TTL_MS)

  await createUser({ email, firstName, passwordHash, activationToken, activationExpires })

  const activationUrl = `${env('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')}/${locale}/activate/${activationToken}`
  const t = await getTranslations({ locale, namespace: 'shared.auth.signup' })

  await sendEmail({
    to: email,
    subject: t('activationEmailSubject'),
    html: `<p>${t('activationEmailIntro')}</p><a href="${activationUrl}">${t('activationEmailButton')}</a>`,
  })

  return { success: true as const }
}
