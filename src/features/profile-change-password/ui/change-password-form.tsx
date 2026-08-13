'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { changePassword } from '../api/change-password-action'
import { type ChangePasswordFormValues, changePasswordSchema } from '../model/change-password-schema'

export const ChangePasswordForm = () => {
  const t = useTranslations()
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<ChangePasswordFormValues>({ resolver: zodResolver(changePasswordSchema) })
  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = await changePassword(values)

    if (result.error === 'invalidPassword') {
      setError('currentPassword', { message: 'shared.account.changePassword.invalidPassword' })
      return
    }

    if (result.error) {
      addToast({ variant: 'error', message: t('shared.account.changePassword.invalidData') })
      return
    }

    reset()
    addToast({ variant: 'success', message: t('shared.account.changePassword.success') })
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<ChangePasswordFormValues>
          name="currentPassword"
          type="password"
          placeholder={t('shared.account.changePassword.currentPasswordPlaceholder')}
        />
        <FormInput<ChangePasswordFormValues>
          name="newPassword"
          type="password"
          placeholder={t('shared.account.changePassword.newPasswordPlaceholder')}
        />
        <FormInput<ChangePasswordFormValues>
          name="confirmPassword"
          type="password"
          placeholder={t('shared.auth.confirmPasswordPlaceholder')}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.account.changePassword.submit')}
      </Button>
    </Form>
  )
}
