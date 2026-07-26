'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'

const MenuModal = lazy(() => import('./menu-modal'))

export const MenuButton = () => {
  const { openModal } = useModalStore()

  return (
    <Button shape="square" onClick={() => openModal({ component: MenuModal })}>
      <Icon name="Menu" />
    </Button>
  )
}
