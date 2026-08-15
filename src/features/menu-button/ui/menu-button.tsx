'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'
import type { MenuCategory } from './menu-modal'

const MenuModal = lazy(() => import('./menu-modal'))

type MenuButtonProps = {
  categories: MenuCategory[]
}

export const MenuButton = ({ categories }: MenuButtonProps) => {
  const { openModal } = useModalStore()

  return (
    <Button shape="square" onClick={() => openModal({ component: MenuModal, props: { categories } })}>
      <Icon name="Menu" />
    </Button>
  )
}
