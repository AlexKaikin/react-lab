'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import type { User } from '@/entities/user'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { useToastStore } from '@/shared/ui/toast'
import { editProfile } from '../api/profile-edit-action'
import { type ProfileEditFormValues, profileEditSchema } from '../model/profile-edit-schema'

const buildDefaultValues = (user: User): ProfileEditFormValues => ({
  firstName: user.firstName,
  lastName: user.lastName,
  about: user.about,
  location: user.location,
  birthDate: user.birthDate ? user.birthDate.toISOString().slice(0, 10) : '',
  avatarUrl: user.avatarUrl ?? '',
})

export const ProfileEditForm = ({ user }: { user: User }) => {
  const t = useTranslations()
  const addToast = useToastStore((state) => state.addToast)
  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: buildDefaultValues(user),
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = await editProfile(values)

    if (result.error) {
      addToast({ variant: 'error', message: t('shared.account.profile.invalidData') })
      return
    }

    addToast({ variant: 'success', message: t('shared.account.profile.saved') })
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<ProfileEditFormValues> name="firstName" placeholder={t('shared.auth.firstNamePlaceholder')} />
        <FormInput<ProfileEditFormValues> name="lastName" placeholder={t('shared.account.profile.lastName')} />
        <FormInput<ProfileEditFormValues> name="about" placeholder={t('shared.account.profile.about')} />
        <FormInput<ProfileEditFormValues> name="location" placeholder={t('shared.account.profile.location')} />
        <FormInput<ProfileEditFormValues> name="birthDate" type="date" />
        <FormInput<ProfileEditFormValues> name="avatarUrl" placeholder={t('shared.account.profile.avatarUrl')} />
      </div>
      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.account.profile.submit')}
      </Button>
    </Form>
  )
}
