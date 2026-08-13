'use server'

import { getTranslations } from 'next-intl/server'
import { generateToken, setResetToken } from '@/entities/user'
import { sendEmail } from '@/shared/api/email/send-email'
import { env } from '@/shared/lib/env'
import type { Locale } from '@/shared/lib/i18n'
import { forgotPasswordSchema } from '../model/forgot-password-schema'

const RESET_TTL_MS = 60 * 60 * 1000

export async function forgotPassword(values: unknown, locale: Locale) {
  const parsed = forgotPasswordSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const { email } = parsed.data

  const resetToken = generateToken()
  const resetTokenExpiry = new Date(Date.now() + RESET_TTL_MS)

  const { count } = await setResetToken(email, resetToken, resetTokenExpiry)

  if (count > 0) {
    const resetUrl = `${env('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')}/${locale}/reset-password/${resetToken}`
    const t = await getTranslations({ locale, namespace: 'shared.auth.forgotPassword' })

    await sendEmail({
      to: email,
      subject: t('emailSubject'),
      html: `<p>${t('emailIntro')}</p><a href="${resetUrl}">${t('emailButton')}</a>`,
    })
  }

  return { success: true as const }
}
