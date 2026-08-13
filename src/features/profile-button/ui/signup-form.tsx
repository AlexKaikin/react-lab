'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Link } from '@/shared/lib/i18n/navigation'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormCheckbox } from '@/shared/ui/form/form-checkbox'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { signup } from '../api/signup-action'
import { type SignupFormValues, signupSchema } from '../model/signup-schema'

export const SignupForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const t = useTranslations()
  const locale = useLocale()
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = await signup(values, locale)

    if (result.error === 'emailTaken') {
      setError('email', { message: 'shared.auth.signup.emailTaken' })
      return
    }

    if (result.error === 'invalid') {
      addToast({ variant: 'error', message: t('shared.auth.signup.invalidData') })
      return
    }

    addToast({ variant: 'success', message: t('shared.auth.signup.success'), autoClose: false })
    onSuccess()
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<SignupFormValues> name="firstName" placeholder={t('shared.auth.firstNamePlaceholder')} />
        <FormInput<SignupFormValues> name="email" type="email" placeholder={t('shared.auth.emailPlaceholder')} />
        <FormInput<SignupFormValues>
          name="password"
          type="password"
          placeholder={t('shared.auth.passwordPlaceholder')}
        />
        <FormInput<SignupFormValues>
          name="confirmPassword"
          type="password"
          placeholder={t('shared.auth.confirmPasswordPlaceholder')}
        />
        <FormCheckbox<SignupFormValues>
          name="agreeToTerms"
          label={t.rich('shared.auth.signup.agreeToTerms', {
            terms: (chunks) => (
              <Link href="/terms" target="_blank" className="text-primary underline">
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link href="/privacy" target="_blank" className="text-primary underline">
                {chunks}
              </Link>
            ),
          })}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.auth.signup.submit')}
      </Button>
    </Form>
  )
}
