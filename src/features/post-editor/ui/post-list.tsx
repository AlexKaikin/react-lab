'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { lazy } from 'react'
import { Button, LinkButton } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'
import { useToastStore } from '@/shared/ui/toast'
import { deletePostAction } from '../api/delete-post-action'

const ConfirmModal = lazy(() => import('@/shared/ui/confirm-modal'))

type PostListItem = {
  id: string
  slug: string
  title: string
  category: { name: string }
  createdAt: Date
  hasTranslation: boolean
}

export const PostList = ({ posts }: { posts: PostListItem[] }) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal } = useModalStore()
  const addToast = useToastStore((state) => state.addToast)

  const handleDelete = (id: string) => {
    openModal({
      component: ConfirmModal,
      props: {
        cb: async () => {
          const result = await deletePostAction(id)

          if (result.error) {
            addToast({ variant: 'error', message: t('shared.admin.posts.deleteError') })
            return
          }

          addToast({ variant: 'success', message: t('shared.admin.posts.deleted') })
          router.refresh()
        },
      },
    })
  }

  if (posts.length === 0) return <p className="text-secondary">{t('shared.admin.posts.empty')}</p>

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <div key={post.id} className="paper flex items-center justify-between gap-4 p-4">
          <div className="flex flex-col">
            <span className="font-bold">{post.title}</span>
            <span className="text-secondary text-sm">
              {post.category.name} · {post.createdAt.toLocaleDateString()}
              {!post.hasTranslation && ` · ${t('shared.admin.posts.noTranslation')}`}
            </span>
          </div>
          <Dropdown
            trigger={(triggerProps) => (
              <Button shape="square" variant="text" color="secondary" {...triggerProps}>
                <Icon name="EllipsisVertical" />
              </Button>
            )}
          >
            <div className="flex flex-col gap-1 *:w-full *:px-3 *:py-2">
              <LinkButton href={`/admin/blog/posts/${post.slug}/edit`} variant="text" color="secondary">
                {t('shared.admin.posts.edit')}
              </LinkButton>
              <Button variant="text" color="error" onClick={() => handleDelete(post.id)}>
                {t('shared.admin.posts.delete')}
              </Button>
            </div>
          </Dropdown>
        </div>
      ))}
    </div>
  )
}
