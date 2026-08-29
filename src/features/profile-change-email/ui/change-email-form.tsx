'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { changeEmail } from '../api/change-email-action'
import { type ChangeEmailFormValues, changeEmailSchema } from '../model/change-email-schema'

export const ChangeEmailForm = () => {
  const t = useTranslations()
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<ChangeEmailFormValues>({ resolver: zodResolver(changeEmailSchema) })
  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = await changeEmail(values)

    if (result.error === 'emailTaken') {
      setError('email', { message: 'shared.auth.signup.emailTaken' })
      return
    }

    if (result.error === 'invalidPassword') {
      setError('currentPassword', { message: 'account.changeEmail.invalidPassword' })
      return
    }

    if (result.error) {
      addToast({ variant: 'error', message: t('account.changeEmail.invalidData') })
      return
    }

    reset()
    addToast({ variant: 'success', message: t('account.changeEmail.success') })
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<ChangeEmailFormValues> name="email" type="email" placeholder={t('shared.auth.emailPlaceholder')} />
        <FormInput<ChangeEmailFormValues>
          name="currentPassword"
          type="password"
          placeholder={t('account.changeEmail.currentPasswordPlaceholder')}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('account.changeEmail.submit')}
      </Button>
    </Form>
  )
}
