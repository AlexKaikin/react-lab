'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { type LoginFormValues, loginSchema } from '../model/login-schema'

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const t = useTranslations()
  const router = useRouter()
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = await signIn('credentials', { ...values, redirect: false })

    if (result?.error) {
      addToast({ variant: 'error', message: t('shared.auth.login.invalidCredentials') })
      return
    }

    router.refresh()
    onSuccess()
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<LoginFormValues> name="email" type="email" placeholder={t('shared.auth.emailPlaceholder')} />
        <FormInput<LoginFormValues>
          name="password"
          type="password"
          placeholder={t('shared.auth.passwordPlaceholder')}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.auth.login.submit')}
      </Button>
    </Form>
  )
}
