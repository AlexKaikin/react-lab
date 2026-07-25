'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModal } from '@/shared/ui/modal'

const ConfirmModal = lazy(() => import('@/shared/ui/confirm-modal'))

export const ProfileButton = () => {
  const { openModal } = useModal()

  return (
    <Button
      shape="square"
      onClick={() =>
        openModal({
          id: 'profile',
          component: ConfirmModal,
          props: { cb: () => {} },
        })
      }
    >
      <Icon name="User" />
    </Button>
  )
}
