'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { POST_ACCESS_LEVEL } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm, useFormContext, useWatch } from 'react-hook-form'
import type { PostLocaleInput } from '@/entities/post'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Divider } from '@/shared/ui/divider'
import { Form } from '@/shared/ui/form/form'
import { FormInput } from '@/shared/ui/form/form-input'
import { FormSelect } from '@/shared/ui/form/form-select'
import { MarkdownEditor } from '@/shared/ui/form/markdown-editor'
import { TabPanel, Tabs } from '@/shared/ui/tabs'
import { useToastStore } from '@/shared/ui/toast'
import { createPostAction } from '../api/create-post-action'
import { updatePostAction } from '../api/update-post-action'
import {
  META_DESCRIPTION_MAX_LENGTH,
  META_TITLE_MAX_LENGTH,
  type PostEditorFormValues,
  postEditorSchema,
} from '../model/post-editor-schema'

const orderedLocales: Locale[] = [defaultLocale, ...locales.filter((loc) => loc !== defaultLocale)]

type PostFormInitial = {
  id: string
  slug: string
  categoryId: string
  accessLevel: POST_ACCESS_LEVEL
} & Record<Locale, PostLocaleInput | null>

type PostFormCategory = {
  id: string
  name: string
  locales: Locale[]
}

type PostFormProps = {
  categories: PostFormCategory[]
  initialPost?: PostFormInitial
}

const buildLocaleDefaultValues = (locale?: PostLocaleInput | null): PostEditorFormValues['ru'] => ({
  title: locale?.title ?? '',
  content: locale?.content ?? '',
  tags: locale?.tags.join(', ') ?? '',
  meta: {
    title: locale?.meta.title ?? '',
    description: locale?.meta.description ?? '',
    image: locale?.meta.image ?? '',
  },
})

const buildDefaultValues = (initialPost?: PostFormInitial): PostEditorFormValues => ({
  slug: initialPost?.slug ?? '',
  categoryId: initialPost?.categoryId ?? '',
  accessLevel: initialPost?.accessLevel ?? 'FREE',
  ...(Object.fromEntries(locales.map((loc) => [loc, buildLocaleDefaultValues(initialPost?.[loc])])) as Record<
    Locale,
    PostEditorFormValues['ru']
  >),
})

type LocaleFieldsProps = { locale: Locale }

const LocaleFields = ({ locale }: LocaleFieldsProps) => {
  const t = useTranslations()
  const { control } = useFormContext<PostEditorFormValues>()
  const metaTitle = useWatch({ control, name: `${locale}.meta.title` })
  const metaDescription = useWatch({ control, name: `${locale}.meta.description` })

  return (
    <>
      <FormInput<PostEditorFormValues>
        name={`${locale}.title`}
        placeholder={t('shared.admin.posts.titlePlaceholder')}
      />
      <MarkdownEditor<PostEditorFormValues> name={`${locale}.content`} />
      <FormInput<PostEditorFormValues> name={`${locale}.tags`} placeholder={t('shared.admin.posts.tagsPlaceholder')} />

      <Divider textAlign="left" className="mt-2">
        {t('shared.admin.posts.seoSection')}
      </Divider>

      <FormInput<PostEditorFormValues>
        name={`${locale}.meta.title`}
        label={`${t('shared.admin.posts.metaTitlePlaceholder')} (${metaTitle.length}/${META_TITLE_MAX_LENGTH})`}
      />
      <FormInput<PostEditorFormValues>
        name={`${locale}.meta.description`}
        label={`${t('shared.admin.posts.metaDescriptionPlaceholder')} (${metaDescription.length}/${META_DESCRIPTION_MAX_LENGTH})`}
      />
      <FormInput<PostEditorFormValues>
        name={`${locale}.meta.image`}
        placeholder={t('shared.admin.posts.metaImagePlaceholder')}
      />
    </>
  )
}

export const PostForm = ({ categories, initialPost }: PostFormProps) => {
  const t = useTranslations()
  const router = useRouter()
  const addToast = useToastStore((state) => state.addToast)
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const form = useForm<PostEditorFormValues>({
    resolver: zodResolver(postEditorSchema),
    defaultValues: buildDefaultValues(initialPost),
  })
  const {
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { isSubmitting },
  } = form

  const categoryId = useWatch({ control, name: 'categoryId' })
  const categoryLocales: Locale[] = categories.find((category) => category.id === categoryId)?.locales ?? [
    defaultLocale,
  ]
  const visibleLocales = orderedLocales.filter((loc) => categoryLocales.includes(loc))
  const accessLevelOptions = [
    { value: 'FREE', label: t('subscription.plans.free') },
    { value: 'BASIC', label: t('subscription.plans.basic') },
    { value: 'PREMIUM', label: t('subscription.plans.premium') },
  ]

  useEffect(() => {
    if (!categoryLocales.includes(locale)) setLocale(defaultLocale)

    for (const loc of locales) {
      if (loc !== defaultLocale && !categoryLocales.includes(loc)) setValue(`${loc}.title`, '')
    }
  }, [categoryLocales, locale, setValue])

  const onSubmit = handleSubmit(async (values) => {
    const result = initialPost ? await updatePostAction(initialPost.id, values) : await createPostAction(values)

    if (result.error === 'slugTaken') {
      setError('slug', { message: 'shared.admin.posts.validation.slugTaken' })
      return
    }

    if (result.error) {
      addToast({ variant: 'error', message: t('shared.admin.posts.invalidData') })
      return
    }

    addToast({ variant: 'success', message: t('shared.admin.posts.saved') })
    router.push('/admin/blog/posts')
  })

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput<PostEditorFormValues> name="slug" placeholder={t('shared.admin.posts.slugPlaceholder')} />
        <FormSelect<PostEditorFormValues>
          name="categoryId"
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
          placeholder={t('shared.admin.posts.categoryPlaceholder')}
        />
        <FormSelect<PostEditorFormValues>
          name="accessLevel"
          options={accessLevelOptions}
          label={t('shared.admin.posts.accessLevel')}
        />

        <Tabs
          items={visibleLocales.map((loc) => ({ value: loc, label: t(`shared.locale.${loc}`) }))}
          value={locale}
          onChange={(newLocale) => setLocale(newLocale as Locale)}
          label={t('shared.admin.posts.tabsLabel')}
        />

        {visibleLocales.map((loc) => (
          <TabPanel key={loc} value={loc} activeValue={locale} className="flex flex-col gap-4">
            <LocaleFields locale={loc} />
          </TabPanel>
        ))}
      </div>

      <Button type="submit" variant="contained" color="primary" loading={isSubmitting} className="mt-4">
        {t('shared.admin.posts.submit')}
      </Button>
    </Form>
  )
}
