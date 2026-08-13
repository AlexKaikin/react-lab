'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { CategoryLocaleInput } from '@/entities/post-category'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { Modal, type ModalContentProps, useModalStore } from '@/shared/ui/modal'
import { TabPanel, Tabs } from '@/shared/ui/tabs'
import { useToastStore } from '@/shared/ui/toast'
import { createCategoryAction } from '../api/create-category-action'
import { updateCategoryAction } from '../api/update-category-action'
import { type CategoryEditorFormValues, categoryEditorSchema } from '../model/category-editor-schema'

const orderedLocales: Locale[] = [defaultLocale, ...locales.filter((loc) => loc !== defaultLocale)]

type CategoryFormInitial = {
  id: string
  slug: string
} & Record<Locale, CategoryLocaleInput | null>

type CategoryFormModalProps = ModalContentProps & {
  initialCategory?: CategoryFormInitial
}

const buildLocaleDefaultValues = (locale?: CategoryLocaleInput | null): CategoryEditorFormValues['ru'] => ({
  name: locale?.name ?? '',
})

const buildDefaultValues = (initialCategory?: CategoryFormInitial): CategoryEditorFormValues => ({
  slug: initialCategory?.slug ?? '',
  ...(Object.fromEntries(
    locales.map((locale) => [locale, buildLocaleDefaultValues(initialCategory?.[locale])]),
  ) as Record<Locale, CategoryEditorFormValues['ru']>),
})

export const CategoryFormModal = ({ initialCategory }: CategoryFormModalProps) => {
  const t = useTranslations()
  const router = useRouter()
  const closeModal = useModalStore((state) => state.closeModal)
  const addToast = useToastStore((state) => state.addToast)
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const form = useForm<CategoryEditorFormValues>({
    resolver: zodResolver(categoryEditorSchema),
    defaultValues: buildDefaultValues(initialCategory),
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    const result = initialCategory
      ? await updateCategoryAction(initialCategory.id, values)
      : await createCategoryAction(values)

    if (result.error === 'slugTaken') {
      setError('slug', { message: 'shared.admin.categories.validation.slugTaken' })
      return
    }

    if (result.error) {
      addToast({ variant: 'error', message: t('shared.admin.categories.invalidData') })
      return
    }

    addToast({ variant: 'success', message: t('shared.admin.categories.saved') })
    router.refresh()
    closeModal()
  })

  return (
    <Modal
      className="m-2 w-[calc(100%-1rem)] max-w-100"
      animation="slideDown"
      position="center"
      aria-label={t(initialCategory ? 'shared.admin.categories.editLabel' : 'shared.admin.categories.createLabel')}
    >
      <div className="flex flex-col gap-6 p-8">
        <h2>{t(initialCategory ? 'shared.admin.categories.editLabel' : 'shared.admin.categories.createLabel')}</h2>

        <Form form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <FormInput<CategoryEditorFormValues>
              name="slug"
              placeholder={t('shared.admin.categories.slugPlaceholder')}
            />

            <Tabs
              items={orderedLocales.map((loc) => ({ value: loc, label: t(`shared.locale.${loc}`) }))}
              value={locale}
              onChange={(newLocale) => setLocale(newLocale as Locale)}
              label={t('shared.admin.categories.tabsLabel')}
            />

            {orderedLocales.map((loc) => (
              <TabPanel key={loc} value={loc} activeValue={locale}>
                <FormInput<CategoryEditorFormValues>
                  name={`${loc}.name`}
                  placeholder={t('shared.admin.categories.namePlaceholder')}
                />
              </TabPanel>
            ))}
          </div>

          <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
            {t('shared.admin.categories.submit')}
          </Button>
        </Form>
      </div>
    </Modal>
  )
}

export default CategoryFormModal
