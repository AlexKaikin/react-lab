'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModal } from '@/shared/ui/modal'

const MenuModal = lazy(() => import('./menu-modal'))

export const MenuButton = () => {
  const { openModal } = useModal()

  return (
    <Button shape="square" onClick={() => openModal({ id: 'menu', component: MenuModal })}>
      <Icon name="Menu" />
    </Button>
  )
}
