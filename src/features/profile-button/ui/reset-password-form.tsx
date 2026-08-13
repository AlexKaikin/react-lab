'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { resetPassword } from '../api/reset-password-action'
import { type ResetPasswordFormValues, resetPasswordSchema } from '../model/reset-password-schema'

type Status = 'idle' | 'success' | 'expired'

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const t = useTranslations()
  const [status, setStatus] = useState<Status>('idle')
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = await resetPassword(token, values)

    if (result.error === 'tokenExpired') {
      setStatus('expired')
      return
    }

    if (result.error === 'invalid') {
      addToast({ variant: 'error', message: t('shared.auth.resetPassword.invalidData') })
      return
    }

    setStatus('success')
  })

  if (status === 'success') return <p className="text-sm text-secondary">{t('shared.auth.resetPassword.success')}</p>
  if (status === 'expired')
    return <p className="text-sm text-secondary">{t('shared.auth.resetPassword.tokenExpired')}</p>

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<ResetPasswordFormValues>
          name="password"
          type="password"
          placeholder={t('shared.auth.passwordPlaceholder')}
        />
        <FormInput<ResetPasswordFormValues>
          name="confirmPassword"
          type="password"
          placeholder={t('shared.auth.confirmPasswordPlaceholder')}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.auth.resetPassword.submit')}
      </Button>
    </Form>
  )
}
