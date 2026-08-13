'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { lazy } from 'react'
import type { CategoryLocaleInput } from '@/entities/post-category'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'
import { useToastStore } from '@/shared/ui/toast'
import { deleteCategoryAction } from '../api/delete-category-action'

const ConfirmModal = lazy(() => import('@/shared/ui/confirm-modal/ui/confirm-modal'))
const CategoryFormModal = lazy(() => import('./category-form-modal'))

type CategoryListItem = {
  id: string
  slug: string
  postsCount: number
} & Record<Locale, CategoryLocaleInput | null>

export const CategoryList = ({ categories }: { categories: CategoryListItem[] }) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal } = useModalStore()
  const addToast = useToastStore((state) => state.addToast)

  const handleCreate = () => {
    openModal({ component: CategoryFormModal, props: {} })
  }

  const handleEdit = (category: CategoryListItem) => {
    openModal({ component: CategoryFormModal, props: { initialCategory: category } })
  }

  const handleDelete = (category: CategoryListItem) => {
    openModal({
      component: ConfirmModal,
      props: {
        cb: async () => {
          const result = await deleteCategoryAction(category.id)

          if (result.error === 'hasPosts') {
            addToast({
              variant: 'error',
              message: t('shared.admin.categories.deleteHasPosts', { count: result.postsCount }),
            })
            return
          }

          if (result.error) {
            addToast({ variant: 'error', message: t('shared.admin.categories.deleteError') })
            return
          }

          addToast({ variant: 'success', message: t('shared.admin.categories.deleted') })
          router.refresh()
        },
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1>{t('shared.admin.categories.label')}</h1>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          {t('shared.admin.categories.create')}
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="text-secondary">{t('shared.admin.categories.empty')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div key={category.id} className="paper flex items-center justify-between gap-4 p-4">
              <div className="flex flex-col">
                <span className="font-bold">{category[defaultLocale]?.name}</span>
                <span className="text-secondary text-sm">
                  {category.slug}
                  {locales.some((loc) => loc !== defaultLocale && !category[loc]) &&
                    ` · ${t('shared.admin.categories.noTranslation')}`}
                </span>
              </div>
              <Dropdown
                trigger={(triggerProps) => (
                  <Button shape="square" variant="text" color="secondary" {...triggerProps}>
                    <Icon name="EllipsisVertical" />
                  </Button>
                )}
              >
                <div className="flex flex-col gap-1 *:justify-start *:px-3 *:py-2">
                  <Button variant="text" color="secondary" onClick={() => handleEdit(category)}>
                    {t('shared.admin.categories.edit')}
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    disabled={category.postsCount > 0}
                    onClick={() => handleDelete(category)}
                  >
                    {t('shared.admin.categories.delete')}
                  </Button>
                </div>
              </Dropdown>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
