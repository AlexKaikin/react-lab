'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { forgotPassword } from '../api/forgot-password-action'
import { type ForgotPasswordFormValues, forgotPasswordSchema } from '../model/forgot-password-schema'

export const ForgotPasswordForm = () => {
  const t = useTranslations()
  const locale = useLocale()
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) })
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    await forgotPassword(values, locale)
    reset()
    addToast({ variant: 'success', message: t('shared.auth.forgotPassword.success'), autoClose: false })
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormInput<ForgotPasswordFormValues> name="email" type="email" placeholder={t('shared.auth.emailPlaceholder')} />
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.auth.forgotPassword.submit')}
      </Button>
    </Form>
  )
}
