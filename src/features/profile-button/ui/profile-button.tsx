'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'

const ConfirmModal = lazy(() => import('@/shared/ui/confirm-modal'))

export const ProfileButton = () => {
  const { openModal } = useModalStore()

  return (
    <Button shape="square" onClick={() => openModal({ component: ConfirmModal, props: { cb: () => {} } })}>
      <Icon name="User" />
    </Button>
  )
}
